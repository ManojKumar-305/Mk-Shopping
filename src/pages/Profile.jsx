import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <h2>My Profile</h2>

        <div className="profile-info">

          <div className="profile-row">
            <span>Name</span>
            <p>{user?.user_metadata?.full_name || "Not Available"}</p>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="profile-row">
            <span>Member Since</span>
            <p>
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="profile-row">
            <span>Status</span>
            <p className="verified">
              {user?.email_confirmed_at ? "Verified" : "Not Verified"}
            </p>
          </div>

        </div>

        <button className="edit-btn">
          Edit Profile
        </button>

      </div>
    </div>
  );
}