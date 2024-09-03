import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

function PrivateRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    // Return the children directly
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
}

export default PrivateRoute
