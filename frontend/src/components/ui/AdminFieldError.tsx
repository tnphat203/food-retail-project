type Props = {
  message?: string;
};

export default function AdminFieldError({ message }: Props) {
  if (!message) return null;

  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}
