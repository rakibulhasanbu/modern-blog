import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/shared/Navbar";
import PrivetLayout from "@/components/shared/PrivetLayout";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivetLayout>
      <Navbar />
      <section className="relative flex gap-2 md:gap-10 py-0 m-0 max-md:flex-col">
        <Sidebar />
        <div className="md:mt-8 mt-5 w-full">{children}</div>
      </section>
    </PrivetLayout>
  );
};

export default DashboardLayout;
