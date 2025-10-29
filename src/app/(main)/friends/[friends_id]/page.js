import "@/app/globals.css";
import styles from "../page.module.css";

import { auth } from "@/auth.js";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export default async function ProfilePage({ params }) {
  const { friends_id } = await params;
  // const session = await getServerSession(authConfig);
  // const session = await auth();
  // if (!session || !session.user.email) {
  //   // Not signed in — redirect or show login link
  //   return <p>You must sign in to view profile.</p>;
  // }

  // session.user.email should be populated if you forwarded it via callbacks
  // const email = session.user.email;
  // console.log("Fetching profile for email:", email);

  // const { userData, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("user_id", user_id);
  const FrList = await sql`SELECT * FROM users WHERE id=${friends_id}`;
  const user = FrList[0];

  // if (error) console.error(error);
  // else setNotes(data);
  return (
    <div>
      <div className={styles.list}>
        {/* {user.map(() => ( */}
        {/* <div key={user.user_id} className={styles.profile}> */}
        <img
          src={user.profile_picture_url}
          alt="User profile picture"
          className={styles.profilePicture}
        />
        {/* </div> */}
        <div className={styles.name}>{user.name}</div>
        <div className={styles.bio}>{user.bio}</div>
        <div className={styles.bookHead}>
          一起读过的书/Books we read together
        </div>
      </div>
    </div>
  );
}
