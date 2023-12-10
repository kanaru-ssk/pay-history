import type { Metadata } from "next";
import { ChangePassword } from "@/components/ChangePassword";

export const metadata: Metadata = {
  title: "change password",
};

export default function Page() {
  return <ChangePassword />;
}
