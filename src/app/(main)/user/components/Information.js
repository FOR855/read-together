import React from "react";

import { supabase } from "../../lib/database/utils/supabaseClient";

function Information() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []); // <-- add empty dependency array so it runs once on mount

  return <div>Information</div>;
}

export default Information;
