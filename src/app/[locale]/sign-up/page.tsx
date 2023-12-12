import type { Metadata } from "next";
import { SignUp } from "@/components/SignUp";

export const metadata: Metadata = {
  title: "sign up",
};

export default function Page() {
  return <SignUp />;
}
