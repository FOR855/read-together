"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function EditForm({ session, user }) {
  const [name, setName] = useState(user.name);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.profile_picture_url);
  const [bio, setBio] = useState(user.bio);

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (session?.user?.id) {
  //     setName(session.user.name);
  //     setBio(session.user.bio || "");
  //     setPreviewUrl(session.user.profile_picture_url || "");
  //   }
  // }, [session]);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreviewUrl(objectUrl);
      // Optionally revoke later: URL.revokeObjectURL(objectUrl)
    }
  };

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
      // const { email, name, profile_picture_url } = user;
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className={styles.list}>
        <img
          src={previewUrl}
          alt="User profile picture"
          className={styles.profilePicture}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className={styles.upload}
        >
          上传图片/Upload Avatar
        </button>
        <input
          id="file"
          className={styles.file}
          type="file"
          ref={fileInputRef}
          accept="image/*"
          // style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {/* </div> */}
        {/* <div className={styles.name}>{user.name}</div> */}
        {/* <div className={styles.list}> */}
        <div className={styles.infoList}>
          <div className={styles.infoItem}>昵称/name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>简介/bio</div>
          <input value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        {/* </div> */}
        {/* <div>
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
      </div> */}
        <button type="submit" disabled={loading} className={styles.edit}>
          {loading ? "保存中/Saving…" : "保存更改/Save Profile"}
        </button>
      </div>
    </form>
  );
}
