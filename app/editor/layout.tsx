import PrivetLayout from "@/components/shared/PrivetLayout";
import Link from "next/link";

const EditorLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <PrivetLayout>
            <div className="navbar">
                <Link href="/" className="flex-none w-10">
                    <img src="/logo.png" />
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    New Blog
                </p>
                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2">
                        Publish
                    </button>
                    <button className="btn-light py-2">
                        Save Draft
                    </button>
                </div>
            </div>
            {children}
        </PrivetLayout>
    );
};

export default EditorLayout;