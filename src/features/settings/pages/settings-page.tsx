import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import {
  CurrencySwitcher,
  LanguageSwitcher,
  ThemeSwitcher,
} from "../components";

type SettingsPageProps = {
  sidebarDefaultOpen: boolean;
};

export const SettingsPage = () => {
  return (
    <PageContainer title="Settings">
      <SectionContainer padded>
        <DashboardLayout title="Settings" className="space-y-10">
          <div className="flex items-center gap-x-5">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <CurrencySwitcher />
          </div>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

SettingsPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as SettingsPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
