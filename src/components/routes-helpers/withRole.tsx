import React from "react"
import { Navigate } from "react-router-dom"

const withRoleAccess = (allowedRoles: string) => (WrappedComponent: React.ElementType) => {
  return (props: any) => {
    const user = localStorage.getItem("user")
    const userRole = user ? JSON.parse(user)?.role : undefined

    if (!user || userRole !== allowedRoles) {
      return <Navigate to="/unauthorized" replace />
    }

    return <WrappedComponent {...props} />
  }
}

export default withRoleAccess
