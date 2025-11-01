import { LanguageSwitcher, ThemeToggle } from "../actions";

export const Header = () => {
  return (
    <nav className="flex justify-between p-3">
      <div>
        <h1>Avnexsale</h1>
      </div>
      <div className="flex items-center gap-x-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
