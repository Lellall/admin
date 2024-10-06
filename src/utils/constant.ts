export type UserRoleType = "CONSUMER" | "VENDOR" | "RIDER" | "RESTAURANT" | "ADMIN"

const user = localStorage.getItem("user")
export const USER_ROLE: UserRoleType | undefined = user ? JSON.parse(user)?.role : undefined
