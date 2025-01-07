"use client";

import { useFormStatus } from "react-dom";
import { HiArrowPath } from "react-icons/hi2";

export function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-[#0057a3] hover:bg-[#007aa3] font-bold py-2 px-4 rounded text-white flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <HiArrowPath className="animate-spin h-5 w-5 mr-2" />
      ) : (
        "Register"
      )}
    </button>
  );
}
