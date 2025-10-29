import { PageContainer, SectionContainer } from "@/components/layouts";
import { Heading } from "@/components/ui/heading";
import { GoBackButton, GoHomeButton } from "../components";

export const Error500Page = () => {
  return (
    <PageContainer title="Internal Server Error">
      <SectionContainer
        container
        className="flex min-h-screen items-center justify-center"
      >
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">500</span>
          </div>

          <Heading size={"h3"} className="mb-3">
            Server Error
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            Sorry, something went wrong on our server. Our technical team is
            working to resolve the issue.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <GoBackButton />
            <GoHomeButton />
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
