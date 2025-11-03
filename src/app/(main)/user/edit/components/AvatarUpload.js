"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AvatarUpload({ currentUrl, onUploaded }) {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }; //reset file state once the user input a file

  const handleSubmit = async (e) => {
    //submit when the user clicked submit
    e.preventDefault(); //prevent the browser’s default action which sends the form data and refreshes or navigates the page
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!session?.user?.id) {
      alert("You must be logged in");
      return;
    }

    setLoading(true); //set load to prevent user from clicking while submitting

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    }); //see src\app\api\profile\avatar\route.js

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("Upload failed: " + (json.error || "Unknown error"));
    } else {
      onUploaded(json.avatarUrl);
    }
  };

  return (
    <div className="mt-4">
      <img
        src={currentUrl || "/icons/yonghu.svg"}
        alt="Current avatar"
        width={100}
        height={100}
        className="rounded-full mb-2"
      />
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button disabled={loading} type="submit">
          {loading ? "Uploading…" : "Upload Avatar"}
        </button>
      </form>
    </div>
  );
}
