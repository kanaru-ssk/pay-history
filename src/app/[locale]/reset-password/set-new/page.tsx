import type { Metadata } from "next";
import { SetNew } from "@/components/SetNew";

export const metadata: Metadata = {
  title: "set new password",
};

export default function Page() {
  return <SetNew />;
}
