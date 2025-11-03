import React from "react";
import EditForm from "./components/EditForm";
import { auth } from "@/auth";

async function page() {
  const session = await auth();
  return (
    <div>
      <EditForm session={session} />
    </div>
  );
}

export default page;
