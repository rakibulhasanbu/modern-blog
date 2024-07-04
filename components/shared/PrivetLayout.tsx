'use client'

import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { usePathname, useRouter } from "next/navigation";

const PrivetLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const router = useRouter();
    const accessToken = useAppSelector(useCurrentToken);
    if (!accessToken) {
        const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
        router.push(redirectTo);
        return null;
    }
    return (
        <>{children}</>
    );
};

export default PrivetLayout;