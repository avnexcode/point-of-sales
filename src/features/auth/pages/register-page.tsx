import { PageContainer, SectionContainer } from "@/components/layouts";
import { AuthLayout } from "../components/layouts";
import { RegisterForm } from "../forms";

export const RegisterPage = () => {
  return (
    <PageContainer title="Register">
      <SectionContainer className="flex min-h-screen items-center justify-center">
        <RegisterForm />
      </SectionContainer>
    </PageContainer>
  );
};

RegisterPage.getLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
