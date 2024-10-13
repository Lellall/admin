export type UserRoleType = "CONSUMER" | "VENDOR" | "RIDER" | "RESTAURANT" | "ADMIN"

const user = localStorage.getItem("user") ?? ""
export const USER_ROLE: UserRoleType = JSON.parse(user)?.role

export const UserRoles = {
  Consumer: "CONSUMER",
  Vendor: "VENDOR",
  Rider: "RIDER",
  Restaurant: "RESTAURANT",
  LellalAdmin: "ADMIN",
}
