import { useCallback, useEffect, useRef, useState } from "react";
import type { User,  } from "@/types/user";
import { getAllUsersApi } from "@services/users.api";
import type { GetAllUsersParams } from "@/types/user-api";

type GenderFilter = "all" | NonNullable<User["gender"]>;
type StatusFilter = "all" | NonNullable<User["status"]>;
type LimitFilter = "10" | "20" | "50" | "100";
type RoleFilter = "all" | User["role"];

export function useAdminCustomers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [role, setRole] = useState<RoleFilter>("all");

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

    const params: GetAllUsersParams = {
      page,
      limit: Number(limit),
      role: role === "all" ? "customer" : role,
    };

    if (search) params.search = search;
    if (status !== "all") params.status = status;
    if (gender !== "all") params.gender = gender;

    const res = await getAllUsersApi(params);

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
  }, [page, limit, search, status, gender, role]);

  useEffect(() => {
    setPage(1);
  }, [search, status, gender, role, limit]);

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
    role,

    page,
    limit,
    total,
    totalPages,

    canPrev: page > 1,
    canNext: page < totalPages,

    setSearch,
    setGender,
    setStatus,
    setRole,
    setLimit,

    goToPage: setPage,

    fetchUsers,
  };
}