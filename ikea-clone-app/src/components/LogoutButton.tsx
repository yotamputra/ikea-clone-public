"use client";

import { handleLogout } from "@/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className="btn btn-ghost ml-3"
    >
      Logout
    </button>
  );
}
