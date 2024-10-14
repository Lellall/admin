import { UserRoles } from "@/utils/constant"
import { Navigate } from "react-router-dom"
import { appPaths } from "./layout/app-paths"

export function Unauthorized() {
  const user = localStorage.getItem("user")
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const userRole = user ? JSON.parse(user)?.role : undefined
  const userStored = user ? JSON.parse(user) : ""

  if (!userStored && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (userStored && isAuthenticated) {
    if (userRole === UserRoles.Restaurant) {
      return <Navigate to={appPaths.restaurant} replace />
    }
    if (userRole === UserRoles.LellalAdmin) {
      return <Navigate to={"/"} replace />
    }
  }

  return (
    <div className=" min-w-full h-[50vh] flex flex-col justify-center items-center justify-center">
      <p className="block text-3xl">OOPs</p>
      <p className="block text-7xl">401</p>
      <p className="text-[red] text-5xl">Unauthorized page.</p>
    </div>
  )
}
