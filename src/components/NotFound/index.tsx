"use client";

import { Heading1 } from "@/components/ui/text/Heading1";
import { LinkText } from "@/components/ui/text/LinkText";
import { useLocale } from "@/hooks/useLocale";

export function NotFound() {
  const { text } = useLocale();

  return (
    <div className="px-4">
      <Heading1>404 Not Found</Heading1>
      <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
      <LinkText text={text.RETURN_TO_HOME} href="/" />
    </div>
  );
}
