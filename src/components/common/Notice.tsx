type Props = {
  text: string;
  error?: boolean;
};

const Notice = ({ text, error }: Props) => {
  if (text === "") return null;

  return (
    <div
      className={
        (error
          ? "border-red bg-light-red text-red"
          : "border-main-color bg-light-gray text-main-color") +
        " rounded border p-4 "
      }
    >
      {text}
    </div>
  );
};
export default Notice;
