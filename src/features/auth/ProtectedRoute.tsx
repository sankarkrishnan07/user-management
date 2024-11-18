import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/components/Loader";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const { status, isAuthenticated } = useSelector((store: any) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && status !== "loading") navigate("/login");
  }, [isAuthenticated, status, navigate]);

  if (status === "loading") return <Loader />;

  if (isAuthenticated && status === "idle") return children;
  else return null;
}
