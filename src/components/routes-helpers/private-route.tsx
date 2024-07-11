import { Fragment, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, access_token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const auth = !!(user && access_token);
  if (!auth) {
    navigate("/login");
  }

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
