export interface RolesResponse {
  name: string
  id: string
}

export interface RolesRequestBody {
  shopId: string
  name: string
  privileges: string[]
}
export interface RolesUpdateBody {
  roleId: string
  name: string
  privileges: string[]
}

type Privilege = {
  name: string
  value: string
  id: string
}

export interface PrivilegesResponse {
  name: string
  id: string
  privileges: Privilege[]
}
