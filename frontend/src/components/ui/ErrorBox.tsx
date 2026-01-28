type ErrorBoxProps = {
  message: string | null;
};

export default function ErrorBox({ message }: ErrorBoxProps) {
  return (
    <div
      className={`
        px-4 py-2 text-sm rounded-lg border transition-all
        ${
          message
            ? "bg-red-50 text-red-600 border-red-200 visible"
            : "bg-transparent text-transparent border-transparent invisible"
        }
      `}
    >
      {message || "placeholder"}
    </div>
  );
}
