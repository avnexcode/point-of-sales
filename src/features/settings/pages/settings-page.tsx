import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import {
  CurrencySwitcher,
  LanguageSwitcher,
  SettingsCard,
  SettingsSection,
  ThemeSwitcher,
} from "../components";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type SettingsPageProps = {
  sidebarDefaultOpen: boolean;
};

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title="Settings">
      <SectionContainer padded>
        <DashboardLayout title="Settings" className="space-y-10">
          <SettingsSection
            title="General"
            caption="Basic settings for your account"
          >
            {" "}
            {/* Language Selector */}
            <SettingsCard
              label={t("pages.settings.general.language.title")}
              caption={t("pages.settings.general.language.caption")}
              icon="Globe"
            >
              <LanguageSwitcher />
            </SettingsCard>
            {/* Currency Selector */}
            <SettingsCard
              label="Currency"
              caption="Choose your display currency"
              icon="DollarSign"
            >
              <CurrencySwitcher />
            </SettingsCard>
          </SettingsSection>

          <Separator />

          <SettingsSection
            title="Appearance"
            caption="Customize how the app looks"
          >
            {/* Theme Selector */}
            <SettingsCard
              label="Theme"
              caption="Choose your color theme"
              icon="Palette"
            >
              <ThemeSwitcher />
            </SettingsCard>
          </SettingsSection>

          <Separator />

          <SettingsSection
            title="Notifications"
            caption="Manage your notification preferences"
          >
            {/* Theme Selector */}
            <SettingsCard
              label="Push Notifications"
              caption="Receive notifications about updates"
              icon="Bell"
            >
              <div className="">
                <Switch />
              </div>
            </SettingsCard>
          </SettingsSection>
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
