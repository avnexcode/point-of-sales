import { PageContainer, SectionContainer } from "@/components/layouts";
import { Heading } from "@/components/ui/heading";
import { GoBackButton } from "../components";

export const Error404Page = () => {
  return (
    <PageContainer title="Not Found">
      <SectionContainer
        container
        className="flex min-h-screen items-center justify-center"
      >
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">404</span>
          </div>

          <Heading size={"h3"} className="mb-3">
            Page Not Found
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <GoBackButton />
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
