"use client";

import { Head } from "@/components/ui/contents/Head";
import { Heading1 } from "@/components/ui/text/Heading1";
import { LinkText } from "@/components/ui/text/LinkText";
import { useLocale } from "@/hooks/useLocale";

export function Custom404() {
  const { text } = useLocale();
  return (
    <>
      <Head title="404 Not Found | Pay History" />
      <div className="px-4">
        <Heading1>404 Not Found</Heading1>
        <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
        <LinkText text={text.RETURN_TO_HOME} href="/" />
      </div>
    </>
  );
}
