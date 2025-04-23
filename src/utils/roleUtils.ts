// src/utils/roleUtils.ts
import { UserRole } from "@prisma/client";

export function toValidUserRole(role: UserRole): UserRole {
  const upper = role.toUpperCase();

  if (!Object.values(UserRole).includes(upper as UserRole)) {
    throw new Error("Invalid role provided");
  }

  return upper as UserRole;
}
