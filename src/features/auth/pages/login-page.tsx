import { PageContainer, SectionContainer } from "@/components/layouts";
import { LoginForm } from "../forms";

export const LoginPage = () => {
  return (
    <PageContainer title="Login">
      <SectionContainer className="flex min-h-screen items-center justify-center">
        <LoginForm />
      </SectionContainer>
    </PageContainer>
  );
};

LoginPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};
