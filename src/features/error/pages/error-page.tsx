import { PageContainer, SectionContainer } from "@/components/layouts";
import { Heading } from "@/components/ui/heading";
import type { NextPageContext } from "next";
import { GoBackButton } from "../components";

type ErrorPageProps = {
  label: string;
  statusCode: number;
  message: string;
};

export const ErrorPage = ({ label, statusCode, message }: ErrorPageProps) => {
  return (
    <PageContainer title="Internal Server Error">
      <SectionContainer
        container
        className="flex min-h-screen items-center justify-center"
      >
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">{statusCode}</span>
          </div>

          <Heading size={"h3"} className="mb-3 capitalize">
            {label}
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            {message}
          </p>

          <GoBackButton />
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
