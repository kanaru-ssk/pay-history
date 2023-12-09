import type { Metadata } from "next";
import { SignIn } from "@/components/SignIn";

export const metadata: Metadata = {
  title: "sign in",
};

export default function Page() {
  return <SignIn />;
}
