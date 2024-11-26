import React from "react"
import { Navigate } from "react-router-dom"

// Types for privileges
type Action = "c" | "r" | "u" | "d"
type Resource = "order" | "inventory" | "user" | "shop" | "role"
type Privilege = `${Action}:${Resource}`

interface ParsedPrivilege {
  action: Action
  resource: Resource
}

interface PrivilegedRouteProps {
  privileges: Privilege[]
  children: React.ReactNode
  redirectTo?: string
  requireAll?: boolean
}

interface UserData {
  privileges: Privilege[]
}

// Helper function to parse privilege string
const parsePrivilege = (privilege: Privilege): ParsedPrivilege => {
  const [action, resource] = privilege.split(":") as [Action, Resource]
  return { action, resource }
}

// Check if user has required privilege
const hasPrivilege = (userPrivileges: Privilege[], requiredPrivilege: Privilege): boolean => {
  const { action, resource } = parsePrivilege(requiredPrivilege)
  return userPrivileges.some((privilege) => {
    const { action: userAction, resource: userResource } = parsePrivilege(privilege)
    return userAction === action && userResource === resource
  })
}

// Check if user has any of the required privileges
const hasAnyPrivilege = (userPrivileges: Privilege[], requiredPrivileges: Privilege[]): boolean => {
  return requiredPrivileges.some((privilege) => hasPrivilege(userPrivileges, privilege))
}

// Main PrivilegedRoute component
const PrivilegedRoute: React.FC<PrivilegedRouteProps> = ({
  privileges = [],
  children,
  redirectTo = "/unauthorized",
  requireAll = false,
}) => {
  // Get user privileges from your auth context/state management
  const getUserPrivileges = (): Privilege[] => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserData
    return user?.privileges || []
  }

  const userPrivileges = getUserPrivileges()

  const isAuthorized = requireAll
    ? privileges.every((privilege) => hasPrivilege(userPrivileges, privilege))
    : hasAnyPrivilege(userPrivileges, privileges)

  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

// Higher order component for privileged components
const withPrivileges = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPrivileges: Privilege[],
  options: Omit<PrivilegedRouteProps, "privileges" | "children"> = {}
) => {
  return (props: P) => (
    <PrivilegedRoute privileges={requiredPrivileges} {...options}>
      <WrappedComponent {...props} />
    </PrivilegedRoute>
  )
}

// Hook for checking privileges in components
const usePrivileges = () => {
  const getUserPrivileges = (): Privilege[] => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserData

    return user?.privileges || []
  }

  const userPrivileges = getUserPrivileges()

  return {
    hasPrivilege: (privilege: Privilege) => hasPrivilege(userPrivileges, privilege),
    hasAnyPrivilege: (privileges: Privilege[]) => hasAnyPrivilege(userPrivileges, privileges),
    hasAllPrivileges: (privileges: Privilege[]) => privileges.every((p) => hasPrivilege(userPrivileges, p)),
    userPrivileges,
  }
}

export {
  PrivilegedRoute,
  withPrivileges,
  usePrivileges,
  // Export types for use in other components
  type Privilege,
  type Action,
  type Resource,
}
