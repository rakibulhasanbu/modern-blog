import AuthForm from "@/components/auth/AuthForm";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";

const page = ({ searchParams }: { searchParams: { from: string } }) => {
  return (
    <SuspenseWrapper>
      <AuthForm from={searchParams.from} type="sign-up" />
    </SuspenseWrapper>
  );
};

export default page;
