import { PageContainer, SectionContainer } from "@/components/layouts";

export const LoginPage = () => {
  return (
    <PageContainer title="Login">
      <SectionContainer></SectionContainer>
    </PageContainer>
  );
};

LoginPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};
