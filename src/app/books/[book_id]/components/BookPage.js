"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/database/supabaseClient";
import Draggable from "react-draggable";
import styles from "../page.module.css";
import { useRef } from "react";
import ReadingPage from "./ReadingPage";

export default function BookPage({ user_id }) {
  const nodeRef = useRef(null);
  const { book_id } = useParams();

  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);

  // 1. Load existing sticky notes
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("book_id", book_id)
        .eq("note_type", "sticky");

      if (error) console.error(error);
      else setNotes(data);
    };

    fetchNotes();

    // 2. Real-time subscription
    const channel = supabase
      .channel("sticky-notes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `book_id=eq.${book_id}`,
        },
        // (payload) => {
        //   if (payload.eventType === "INSERT") {
        //     setNotes((prev) => [...prev, payload.new]);
        //   }
        //   if (payload.eventType === "UPDATE") {
        //     setNotes((prev) =>
        //       prev.map((n) => (n.id === payload.new.id ? payload.new : n))
        //     );
        //   }
        //   if (payload.eventType === "DELETE") {
        //     setNotes((prev) => prev.filter((n) => n.id !== payload.old.id));
        //   }
        // }
        handleRealtimeChange
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    function handleRealtimeChange(payload) {
      console.log("Realtime payload", payload);
      if (payload.eventType === "INSERT") {
        setNotes((prev) => [...prev, payload.new]);
      } else if (payload.eventType === "UPDATE") {
        setNotes((prev) =>
          prev.map((n) => (n.id === payload.new.id ? payload.new : n))
        );
      } else if (payload.eventType === "DELETE") {
        setNotes((prev) => prev.filter((n) => n.id !== payload.old.id));
      }
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [book_id]);

  // 3. Event handler: user clicks to add sticky
  const handleAddSticky = async (e) => {
    if (!addingNote) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const text = prompt("Enter your note:");

    if (!text) {
      setAddingNote(false);
      return;
    }

    const { error } = await supabase.from("notes").insert([
      {
        user_id: user_id,
        book_id,
        note_type: "sticky",
        // position: { x, y, page: 1 }, // later: match actual page
        position_x: x,
        position_y: y,
        content: text,
      },
    ]);

    if (error) console.error(error);
    setAddingNote(false);
  };

  // 4. Update position on drag stop
  const handleDragStop = async (noteId, data) => {
    const { x, y } = data;
    const { error } = await supabase
      .from("notes")
      // .update({ position: { x, y, page: 1 } })
      .update({ position_x: x, position_y: y })
      .eq("id", noteId);

    if (error) console.error(error);
  };

  return (
    <div className="relative w-full h-screen border" onClick={handleAddSticky}>
      {/* Book content placeholder */}
      <div id="book-viewer" className="w-full h-full bg-gray-100">
        {/* Book goes here (PDF/EPUB) */}
        <ReadingPage params={book_id} />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0">
        {notes.map((note) => (
          <Draggable
            nodeRef={nodeRef}
            key={note.id}
            defaultPosition={{ x: note.position_x, y: note.position_y }}
            onStop={(_, data) => handleDragStop(note.id, data)}
          >
            <div
              ref={nodeRef}
              className="absolute bg-yellow-200 p-2 rounded shadow cursor-move pointer-events-auto"
            >
              {note.content}
            </div>
          </Draggable>
        ))}
      </div>

      {/* Button to enable sticky mode */}
      <button
        onClick={() => setAddingNote(true)}
        className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Sticky
      </button>
    </div>
  );
}
