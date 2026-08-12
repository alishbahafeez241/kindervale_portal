import { apiRequest } from "@/services/api";
import type { Role, User } from "@/types";

export interface LoginPayload {
  username: string;
  password: string;
  role?: Role;
  otp?: string;
}

interface LoginResponseData {
  id: string;
  name: string;
  email?: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
  username?: string;
  avatar?: string;
  linkedStudentIds?: string[];
  homeroom?: string;
  designation?: string;
  user?: Partial<LoginResponseData>;
}

function normalizeRole(role?: Role): string {
  if (role === "daycareadmin") return "daycare_admin";
  return role || "admin";
}

function normalizeBackendRole(role: unknown): Role {
  if (typeof role !== "string") return "parent";
  if (role === "daycare_admin") return "daycareadmin";
  return role as Role;
}

function buildUserFromResponse(data: Partial<LoginResponseData> | undefined, payload: LoginPayload): User {
  if (!data) {
    throw new Error("Login response did not include authentication data.");
  }

  const nestedUser = data.user as Partial<LoginResponseData> | undefined;
  const source = nestedUser ? nestedUser : data;

  return {
    id: String(source.id ?? payload.username),
    name: String(source.name ?? payload.username),
    username: String(source.username ?? payload.username),
    email: String(source.email ?? ""),
    role: normalizeBackendRole(source.role ?? payload.role),
    avatar: source.avatar,
    accessToken: String(data.accessToken),
    refreshToken: String(data.refreshToken),
    linkedStudentIds: source.linkedStudentIds,
    homeroom: source.homeroom,
    designation: source.designation
  };
}

export async function login(payload: LoginPayload): Promise<User> {
  const requestBody = {
    username: payload.username.trim().toLowerCase(),
    password: payload.password,
    role: normalizeRole(payload.role) as string,
    ...(payload.otp ? { otp: payload.otp } : {})
  };

  const responseData = await apiRequest<LoginResponseData>("/auth/login", {
    method: "POST",
    data: requestBody
  });

  if (!responseData?.accessToken || !responseData?.refreshToken) {
    throw new Error("Login response did not include authentication tokens.");
  }

  const user = buildUserFromResponse(responseData, payload);

  if (typeof window !== "undefined") {
    window.localStorage.setItem("kindervale-access-token", responseData.accessToken);
    window.localStorage.setItem("kindervale-refresh-token", responseData.refreshToken);
  }

  return user;
}

export async function logout(): Promise<void> {
  if (typeof window === "undefined") return;

  const refreshToken = window.localStorage.getItem("kindervale-refresh-token");
  try {
    await apiRequest("/auth/logout", {
      method: "POST",
      data: { refreshToken }
    });
  } catch {
    // ignore logout errors; still clear local state
  }

  window.localStorage.removeItem("kindervale-user");
  window.localStorage.removeItem("kindervale-access-token");
  window.localStorage.removeItem("kindervale-refresh-token");
}

export async function getProfile(): Promise<User> {
  const responseData = await apiRequest<Partial<User>>("/auth/profile");
  return {
    id: String(responseData.id ?? ""),
    name: String(responseData.name ?? ""),
    email: String(responseData.email ?? ""),
    role: normalizeBackendRole(responseData.role ?? "parent"),
    username: responseData.username,
    avatar: responseData.avatar,
    linkedStudentIds: responseData.linkedStudentIds,
    homeroom: responseData.homeroom,
    designation: responseData.designation,
    accessToken: window.localStorage.getItem("kindervale-access-token") ?? undefined,
    refreshToken: window.localStorage.getItem("kindervale-refresh-token") ?? undefined
  };
}
