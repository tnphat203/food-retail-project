type SubmitButtonProps = {
  loading?: boolean;
  text: string;
  loadingText?: string;
};

export default function SubmitButton({
  loading,
  text,
  loadingText = "Đang xử lý...",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        w-full py-2 rounded-lg text-white font-medium
        bg-orange-500 hover:bg-orange-600
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {loading ? loadingText : text}
    </button>
  );
}
