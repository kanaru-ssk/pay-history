import type { Metadata } from "next";
import { SendLink } from "@/components/SendLink";

export const metadata: Metadata = {
  title: "send reset link",
};

export default function Page() {
  return <SendLink />;
}
