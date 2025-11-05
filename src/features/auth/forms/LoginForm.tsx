import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLoginForm } from "./AdminLoginForm";
import { EmployeeLoginForm } from "./EmployeeLoginForm";

export const LoginForm = () => {
  return (
    <Tabs defaultValue="admin" className="w-full max-w-2xl">
      <TabsList className="sm:bg-muted w-full bg-transparent">
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="employee">Employee</TabsTrigger>
      </TabsList>
      <TabsContent value="admin">
        <AdminLoginForm />
      </TabsContent>
      <TabsContent value="employee">
        <EmployeeLoginForm />
      </TabsContent>
    </Tabs>
  );
};
