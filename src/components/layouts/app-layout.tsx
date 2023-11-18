import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useUserQuery } from "@/hooks/user";
import { Navigate, Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  const { data: user } = useUserQuery();

  if (user === null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6 md:flex hidden" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
