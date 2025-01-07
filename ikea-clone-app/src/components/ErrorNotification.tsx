"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorNotification() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  console.log(error);

  return <div className="text-red-600">‎     ‎{error}</div>;
}
