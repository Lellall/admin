export type UserRoleType = "CONSUMER" | "VENDOR" | "RIDER" | "RESTAURANT" | "ADMIN"

export const USER_ROLE: UserRoleType = JSON.parse(localStorage.getItem("user"))?.role
