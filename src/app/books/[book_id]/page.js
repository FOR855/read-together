import React from "react";
import BookPage from "./components/BookPage";
import { auth } from "@/auth";

async function page() {
  const session = await auth();
  if (!session || !session.user.id) {
    // Not signed in — redirect or show login link
    return <p>You must sign in to view the book.</p>;
  }
  console.log("session is", JSON.stringify(session));
  const user_id = session.user.id;
  // console.log("user_id is",JSON.stringify(user_id));
  console.log(user_id);

  // return (
  //   <div>
  //     <BookPage user_id={user_id} />
  //   </div>
  // );
  try {
    return <BookPage user_id={user_id} />;
  } catch (e) {
    console.error("BookPage render error:", e);
  }
}

export default page;
