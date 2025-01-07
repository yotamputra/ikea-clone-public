"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  const response = await res.json();

  if (!res.ok) {
    return redirect(`/login?error=${response.message}`);
  }

  cookies().set("authorization", `Bearer ${response.accessToken}`);

  redirect("/");
};

export const handleRegister = async (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // console.log(rawFormData)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  const response = await res.json();

  if (!res.ok) {
    return redirect(`/register?error=${response.message}`);
  }

  redirect("/login");
};

export const handleLogout = async () => {
  cookies().delete("authorization");
  redirect("/");
};
