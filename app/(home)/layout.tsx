import Navbar from "@/components/shared/Navbar";

const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default HomeLayout;