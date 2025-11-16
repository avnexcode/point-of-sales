import { useAuth } from "@/hooks/useAuth";
import { api } from "@/utils";
import { Currency } from "@prisma/client";
import { toast } from "sonner";

export const useCurrency = () => {
  const { isLogin, settings } = useAuth();

  const currencies = Object.values(Currency) as [Currency, ...Currency[]];

  const apiSettingsUtils = api.useUtils().settings;

  const { mutate: updateSettings, isPending: isUpdateSettingsPending } =
    api.settings.update.useMutation({
      onSuccess: async () => {
        await apiSettingsUtils.invalidate();
        toast.success("Settings update successfully");
      },
    });

  const handleCurrencyChange = (currency: Currency) => {
    if (isLogin) {
      updateSettings({
        id: settings?.id ?? "",
        request: { currency },
      });
    }
  };

  return {
    defaultCurrency: settings?.currency,
    currencies,
    handleCurrencyChange,
    isUpdateSettingsPending,
  };
};
