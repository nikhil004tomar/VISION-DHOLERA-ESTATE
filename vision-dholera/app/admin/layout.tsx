import Sidebar from "@/components/admin/Sidebar";
import NavBar from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <NavBar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}