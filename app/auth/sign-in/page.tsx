import AuthForm from "@/components/auth/AuthForm";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";

const page = () => {
  return (
    <SuspenseWrapper>
      <AuthForm type="sign-in" />
    </SuspenseWrapper>
  );
};

export default page;
