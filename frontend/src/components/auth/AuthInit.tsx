import { useEffect, useState } from "react";
import { refreshApi } from "../../services/auth.api";
import { useAuthStore } from "../../store/authStore";

export default function AuthInit({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await refreshApi();
        setAuth(data.accessToken, data.user);
      } catch {
        clearAuth();
      } finally {
        setReady(true);
      }
    };

    init();
  }, [setAuth, clearAuth]);

  if (!ready) return null;

  return <>{children}</>;
}
