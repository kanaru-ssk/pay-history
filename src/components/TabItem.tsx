import { useRouter } from "next/router";

type Props = {
  text: string;
  href: string;
  isActive: boolean;
};

const TabItem = ({ text, href, isActive }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(href, href, { shallow: true });
      }}
      className={
        (isActive ? "font-bold" : "font-nomal") +
        " horizontal-rl relative mx-2 block h-12 w-12 shrink-0 py-2 text-center"
      }
    >
      {text}
    </button>
  );
};

export default TabItem;
