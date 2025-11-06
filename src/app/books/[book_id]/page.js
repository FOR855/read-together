import React from "react";
import BookPage from "./components/BookPage";
import { auth } from "@/auth";

async function page() {
  const session = await auth();
  if (!session || !session.user.id) {
    // Not signed in — redirect or show login link
    return <p>You must sign in to view profile.</p>;
  }
  const user_id = session.user.id;

  return (
    <div>
      <BookPage user_id={user_id}/>
    </div>
  );
}

export default page;
