import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import useAuth from "../hooks/useAuth";
import "./Profile.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const initialFullName = useMemo(
    () => user?.user_metadata?.full_name?.trim() || user?.email?.trim() || "",
    [user]
  );

  const displayName = initialFullName || user?.email || "Not Available";
  const email = user?.email || "Not Available";
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "-";
  const verificationStatus = user?.email_confirmed_at ? "Verified" : "Not Verified";
  const avatarLabel = (displayName || "A").charAt(0).toUpperCase();
  const isDirty = fullName.trim() !== initialFullName;

  useEffect(() => {
    if (!isEditing) {
      setFullName(initialFullName);
    }
  }, [initialFullName, isEditing]);

  useEffect(() => {
    if (messageType === "success") {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("info");
      }, 4000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [messageType]);

  async function handleSave() {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setMessage("Please enter a valid full name.");
      setMessageType("error");
      return;
    }

    if (!isDirty) {
      setMessage("No changes to save.");
      setMessageType("info");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      await updateProfile(trimmedName);
      setMessage("Profile updated successfully.");
      setMessageType("success");
      setIsEditing(false);
    } catch (error) {
      setMessage(error?.message || "Unable to update profile right now.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setIsEditing(false);
    setFullName(initialFullName);
    setMessage("");
    setMessageType("info");
  }

  function handleEditStart() {
    setIsEditing(true);
    setFullName(initialFullName);
    setMessage("");
    setMessageType("info");
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{avatarLabel}</div>

          <div>
            <h2>My Profile</h2>
            <p className="profile-subtitle">
              Keep your account details current and easy to recognize.
            </p>
          </div>
        </div>

        {message && (
          <div className={`profile-message ${messageType === "error" ? "profile-message--error" : ""}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <div className="profile-form">
            <Input
              id="full-name"
              label="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
            />

            <div className="profile-actions">
              <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="secondary" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="profile-info">
              <div className="profile-row">
                <span>Name</span>
                <p>{displayName}</p>
              </div>

              <div className="profile-row">
                <span>Email</span>
                <p>{email}</p>
              </div>

              <div className="profile-row">
                <span>Member Since</span>
                <p>{memberSince}</p>
              </div>

              <div className="profile-row">
                <span>Status</span>
                <p className="verified">{verificationStatus}</p>
              </div>
            </div>

            <div className="profile-actions">
              <Button variant="primary" onClick={handleEditStart}>
                Edit Profile
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}