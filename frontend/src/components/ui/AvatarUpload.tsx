import { useEffect, useState } from "react";
import TextInput from "./TextInput";

type Props = {
  value: string | File | undefined;
  onChange: (value: string | File) => void;
  label?: string;
  defaultImage?: string;
};

export default function AvatarUpload({
  value,
  onChange,
  label = "Avatar",
  defaultImage = "/default-avatar.png",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const avatarUrl =
    preview || (typeof value === "string" ? value : undefined) || defaultImage;

  const handleFile = (file: File) => {
    if (preview) URL.revokeObjectURL(preview);

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  const handleUrlChange = (url: string) => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    onChange(url);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          className="w-20 h-20 rounded-full border object-cover"
          alt="avatar"
        />

        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleFile(file);
            }}
            className="block text-sm"
          />

          <TextInput
            label="Hoặc dán URL"
            value={typeof value === "string" ? value : ""}
            placeholder="https://..."
            onChange={handleUrlChange}
          />
        </div>
      </div>
    </div>
  );
}
