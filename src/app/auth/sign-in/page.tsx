import AuthForm from "@/components/auth/AuthForm";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";

const page = ({ searchParams }: { searchParams: { from: string } }) => {
  return (
    <SuspenseWrapper>
      <AuthForm from={searchParams.from} type="sign-in" />
    </SuspenseWrapper>
  );
};

export default page;
