import axiosInstance from "./axios.instance";
import type { AxiosError } from "axios";

export type UploadResponse = {
  message: string;
  imageUrl: string;
  publicId: string;
  size?: number;
  format?: string;
};

const BASE_URL = "/upload";

export const uploadImageApi = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  console.log("📤 Upload image start", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  try {
    const { data } = await axiosInstance.post<UploadResponse>(
      BASE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
          if (progress.total) {
            const percent = Math.round(
              (progress.loaded / progress.total) * 100,
            );
            console.log(`⬆️ Upload progress: ${percent}%`);
          }
        },
      },
    );

    console.log("✅ Upload image success", data);

    return data;
  } catch (e) {
    const err = e as AxiosError;

    console.error("❌ uploadImageApi failed", {
      status: err.response?.status,
      responseData: err.response?.data,
      message: err.message,
    });

    throw err;
  }
};