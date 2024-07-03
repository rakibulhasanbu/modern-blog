import Link from "next/link";

type TAppButtonProps = {
    isLoading?: boolean;
    href?: string;
    label?: string;
    variant?: "light" | "dark" | "deleteOutline" | "deleteSolid";
    className?: string;
    children?: any;
}

const AppButton = ({ isLoading, label, href, variant = "dark", className, children }: TAppButtonProps) => {
    let btnStyle = "btn-dark"

    switch (variant) {
        case "dark":
            btnStyle = "btn-dark";
            break;

        case "light":
            btnStyle = "btn-light";
            break;

        default:
            btnStyle = "btn-dark"
            break;
    }

    return (
        <>
            {
                href ?
                    <Link href={href}>
                        <button disabled={isLoading} type="submit" className={`${btnStyle} ${className}`}>
                            {label}{children}
                        </button>
                    </Link>

                    :

                    isLoading ? (
                        <button type="button" className={`${btnStyle} ${className} px-10`}>
                            <i className="animate-spin text-white text-xl fi fi-rr-loading"></i>
                        </button>
                    ) : (
                        <button disabled={isLoading} type="submit" className={`${btnStyle} ${className}`}>
                            {label} {children}
                        </button>
                    )}
        </>
    );
};

export default AppButton;