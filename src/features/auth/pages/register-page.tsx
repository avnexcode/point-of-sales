import { PageContainer, SectionContainer } from "@/components/layouts";

export const RegisterPage = () => {
  return (
    <PageContainer title="Register">
      <SectionContainer></SectionContainer>
    </PageContainer>
  );
};

RegisterPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};
