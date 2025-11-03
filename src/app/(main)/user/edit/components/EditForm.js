"use client";
import { useState, useEffect } from "react";

export default function EditForm({ session }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("avatar", file);
    }

    const res = await fetch("/api/profile/update", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("Update failed: " + (json.error || "Unknown error"));
    } else {
      // e.g., call session.update({ user: { ... } }) or refresh UI
      alert("Profile updated!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save Profile"}
      </button>
    </form>
  );
}
