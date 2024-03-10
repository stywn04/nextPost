"use client";

import { useState } from "react";
import { UpdateUserModal } from "./update-user-modal";

interface UpdateUserProps {
  avatar: string;
  username: string;
  name: string;
  bio: string;
}
export function ButtonUpdateUser({
  avatar,
  username,
  name,
  bio,
}: UpdateUserProps) {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="w-full py-2 bg-slate-900 rounded-md mt-10"
      >
        Edit Profile
      </button>
      {open && (
        <UpdateUserModal
          avatar={avatar}
          name={name}
          username={username}
          bio={bio}
          closeModal={closeModal}
        />
      )}
    </>
  );
}