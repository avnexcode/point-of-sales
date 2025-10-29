import { LanguageSwitcher } from "@/components/actions";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks";
import {
  api,
  capitalizeWords,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatTime,
  getTimePeriod,
  renderElements,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ProductCard, type Product } from "../components";
import { createProductSchema, type ProductSchema } from "../schemas";
import { toast } from "sonner";

type HomePageProps = {
  sidebarDefaultOpen: boolean;
  products: Product[];
};

export const HomePage = ({ products }: HomePageProps) => {
  const { t } = useTranslation();
  const { isLoading, isLogin, user, settings } = useAuth();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    if (isLoading) return String(t("common.loading"));
    if (isLogin && user) {
      return String(
        t("greeting.welcomeBack", {
          name: capitalizeWords(user.username),
        }),
      );
    }
    return String(t("greeting.guest"));
  };
  const now = new Date(Date.now() - 2 * 60 * 60 * 1);
  const minutes = new Date(Date.now() - 2 * 60 * 60 * 100);
  const hours = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const weeks = new Date(Date.now() - 2 * 60 * 60 * 100000);
  const months = new Date(Date.now() - 2 * 60 * 60 * 1000000);
  const years = new Date(Date.now() - 2 * 60 * 60 * 10000000);

  const { error } = api.post.getProducts.useQuery({
    limit: 100,
  });

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  const { mutate: createProduct } = api.post.create.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ProductSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createProductSchema()),
  });

  return (
    <PageContainer withFooter suppressHydrationWarning>
      <SectionContainer padded>
        <div className="flex items-center justify-center gap-x-5 p-5">
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
        </div>
        <form
          id="some"
          onSubmit={form.handleSubmit((values) => {
            console.log({ values });
            createProduct(values);
          })}
          className="mx-auto w-full max-w-2xl"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Input name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="flex place-content-end pt-10">
            <Button>Submit</Button>
          </div>
        </form>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex items-center gap-x-5">
            <div suppressHydrationWarning>{formatTime(currentTime, "24h")}</div>
            <div>{getTimePeriod(currentTime)}</div>
          </div>
          <Heading size="h1">
            {t("home.title", { highlight: t("home.highlight") })}
          </Heading>
          <LanguageSwitcher />
          <p>{formatCurrency(1000000, settings?.currency)}</p>
          <p>{formatDate(new Date(), "full")}</p>
          <p>{formatRelativeTime(now)}</p>
          <p>{formatRelativeTime(minutes)}</p>
          <p>{formatRelativeTime(hours)}</p>
          <p>{formatRelativeTime(weeks)}</p>
          <p>{formatRelativeTime(months)}</p>
          <p>{formatRelativeTime(years)}</p>
          <p className="text-xl">{t("hello")}</p>
          <p className="text-primary text-2xl">{getGreeting()}</p>
          {renderElements({
            of: products,
            keyExtractor: (product) => product.id,
            render: (product) => <ProductCard product={product} />,
          })}
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

HomePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as HomePageProps;
  return <main>{page}</main>;
};
