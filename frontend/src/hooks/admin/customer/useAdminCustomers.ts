import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "../../../types/user";
import { getAllUsersApi } from "../../../services/users.api";

type GenderFilter = "all" | NonNullable<User["gender"]>;
type StatusFilter = "all" | NonNullable<User["status"]>;
type LimitFilter = "10" | "20" | "50" | "100";

export function useAdminCustomers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<LimitFilter>("10");

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const abortRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);

      const res = await getAllUsersApi({
        page,
        limit: Number(limit),
        search: search || undefined,
        role: "customer",
        status: status === "all" ? undefined : status,
        gender: gender === "all" ? undefined : gender,
      });

      if (controller.signal.aborted) return;

      setUsers(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      if (!controller.signal.aborted) console.error("fetchUsers error:", err);
      setUsers([]);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [page, limit, search, status, gender]);

  useEffect(() => {
    setPage(1);
  }, [search, status, gender, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    data: users, 
    loading,

    search,
    gender,
    status,
    page,
    limit,
    total,
    totalPages,

    canPrev: page > 1,
    canNext: page < totalPages,

    setSearch,
    setGender,
    setStatus,
    setLimit,
    goToPage: setPage,

    fetchUsers,
  };
}
