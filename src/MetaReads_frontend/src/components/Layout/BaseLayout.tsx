import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../lib/user_provider";

export default function BaseLayout() {
  const { user, isAdmin } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && location.pathname === "/library") {
      navigate("/login");
    }
    else if (!isAdmin && ["/admin/genre", "/admin/author", "/admin/book"].includes(location.pathname)) {
      navigate("/");
    }
  }, [user, isAdmin, location, navigate]);

  return (
    <div className="font-montserrat min-h-screen w-full bg-black">
      <Outlet />
    </div>
  );
}
