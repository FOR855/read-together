"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/database/supabaseClient";

export default function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
