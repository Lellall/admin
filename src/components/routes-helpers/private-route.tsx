import { Fragment, ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return <Fragment>{isAuthenticated ? children : <Navigate to="/login" />}</Fragment>
}

export default PrivateRoute
