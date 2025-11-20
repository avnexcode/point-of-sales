/**
 * Currency formatter utilities for multiple currencies
 * Supports IDR (Indonesian Rupiah), USD, JPY (Japanese Yen), and KRW (Korean Won)
 * Uses Intl.NumberFormat for proper localization
 */

/**
 * Current exchange rates relative to USD (updated regularly)
 * Base currency: 1 USD
 */
export const exchangeRates = {
  IDR: 16612, // Indonesian Rupiah
  USD: 1.0, // US Dollar (base)
  JPY: 153, // Japanese Yen
  KRW: 1439, // Korean Won
} as const;

/**
 * Locale codes for each currency
 */
export const currencyLocales = {
  IDR: "id-ID",
  USD: "en-US",
  JPY: "ja-JP",
  KRW: "ko-KR",
} as const;

export type CurrencyCode = keyof typeof exchangeRates;

/**
 * Formats a number as Indonesian Rupiah (IDR)
 * @param amount - The amount to format
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted IDR string
 * @example formatIDR(1000000) // "Rp1.000.000"
 * @example formatIDR(1500.50) // "Rp1.500,50"
 */
export const formatIDR = (amount: number, showSymbol = true): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const formatter = new Intl.NumberFormat(currencyLocales.IDR, {
    style: showSymbol ? "currency" : "decimal",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Formats a number as US Dollar (USD)
 * @param amount - The amount to format
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted USD string
 * @example formatUSD(1000) // "$1,000.00"
 * @example formatUSD(1500.5) // "$1,500.50"
 */
export const formatUSD = (amount: number, showSymbol = true): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const formatter = new Intl.NumberFormat(currencyLocales.USD, {
    style: showSymbol ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Formats a number as Japanese Yen (JPY)
 * Note: Yen typically doesn't use decimal places
 * @param amount - The amount to format
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted JPY string
 * @example formatJPY(1000) // "¥1,000"
 * @example formatJPY(1500000) // "¥1,500,000"
 */
export const formatJPY = (amount: number, showSymbol = true): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const formatter = new Intl.NumberFormat(currencyLocales.JPY, {
    style: showSymbol ? "currency" : "decimal",
    currency: "JPY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

/**
 * Formats a number as Korean Won (KRW)
 * Note: Won typically doesn't use decimal places
 * @param amount - The amount to format
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted KRW string
 * @example formatKRW(1000) // "₩1,000"
 * @example formatKRW(1500000) // "₩1,500,000"
 */
export const formatKRW = (amount: number, showSymbol = true): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const formatter = new Intl.NumberFormat(currencyLocales.KRW, {
    style: showSymbol ? "currency" : "decimal",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

/**
 * Generic currency formatter that supports multiple currencies
 * @param amount - The amount to format
 * @param currency - Currency code (IDR, USD, JPY, KRW)
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted currency string
 * @example formatCurrency(1000, "IDR") // "Rp1.000,00"
 * @example formatCurrency(1000, "USD") // "$1,000.00"
 */
export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = "USD",
  showSymbol = true,
  digitsFraction = true,
): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const locale = currencyLocales[currency];
  const decimalPlaces = currency === "JPY" || currency === "KRW" ? 0 : 2;

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits: digitsFraction ? decimalPlaces : 0,
    maximumFractionDigits: digitsFraction ? decimalPlaces : 0,
  });

  return formatter.format(amount);
};

/**
 * Converts amount from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Converted amount
 * @example convertCurrency(1, "USD", "IDR") // 15847.50
 * @example convertCurrency(100, "USD", "JPY") // 14985
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
): number => {
  if (amount === null || amount === undefined || isNaN(amount)) return 0;
  if (fromCurrency === toCurrency) return amount;

  // Convert to USD first (base currency)
  const amountInUSD = amount / exchangeRates[fromCurrency];

  // Convert from USD to target currency
  return amountInUSD * exchangeRates[toCurrency];
};

/**
 * Converts and formats amount from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @param showSymbol - Whether to show currency symbol (default: true)
 * @returns Formatted converted currency string
 * @example convertAndFormat(1, "USD", "IDR") // "Rp15.847,50"
 * @example convertAndFormat(100, "USD", "JPY") // "¥14,985"
 */
export const convertAndFormat = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  showSymbol = true,
): string => {
  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  return formatCurrency(converted, toCurrency, showSymbol);
};

/**
 * Parses a formatted currency string back to a number
 * Removes currency symbols, dots, commas and other formatting
 * @param formattedAmount - The formatted currency string
 * @param currency - Currency code to help with parsing (default: "USD")
 * @returns Parsed number
 * @example parseCurrency("Rp1.000.000,50", "IDR") // 1000000.50
 * @example parseCurrency("$1,000.00", "USD") // 1000.00
 */
export const parseCurrency = (
  formattedAmount: string,
  currency: CurrencyCode = "USD",
): number => {
  if (!formattedAmount) return 0;

  // Remove all non-numeric characters except dots, commas, and minus
  let cleaned = formattedAmount.replace(/[^0-9.,-]/g, "");

  // Handle different decimal separators based on currency
  if (currency === "IDR") {
    // IDR uses dot for thousands, comma for decimal
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    // USD, JPY, KRW use comma for thousands, dot for decimal
    cleaned = cleaned.replace(/,/g, "");
  }

  return parseFloat(cleaned) || 0;
};

/**
 * Gets the currency symbol for a given currency code
 * @param currency - Currency code
 * @returns Currency symbol
 * @example getCurrencySymbol("IDR") // "Rp"
 * @example getCurrencySymbol("JPY") // "¥"
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  const formatter = new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency: currency,
  });

  // Format a zero and extract just the symbol
  const parts = formatter.formatToParts(0);
  const symbolPart = parts.find((part) => part.type === "currency");
  return symbolPart?.value ?? "";
};

/**
 * Formats a currency comparison showing original and converted amounts
 * @param amount - The amount to display
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Formatted comparison string
 * @example formatCurrencyComparison(1, "USD", "IDR")
 * // "$1.00 = Rp15.847,50"
 */
export const formatCurrencyComparison = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
): string => {
  const original = formatCurrency(amount, fromCurrency);
  const converted = convertAndFormat(amount, fromCurrency, toCurrency);
  return `${original} = ${converted}`;
};

/**
 * Checks if a string is a valid currency format
 * @param text - The text to validate
 * @param currency - Currency code to validate against
 * @returns True if valid currency format, false otherwise
 * @example isValidCurrencyFormat("Rp1.000", "IDR") // true
 * @example isValidCurrencyFormat("$1,000.00", "USD") // true
 */
export const isValidCurrencyFormat = (
  text: string,
  currency: CurrencyCode,
): boolean => {
  if (!text) return false;

  try {
    const parsed = parseCurrency(text, currency);
    // const formatted = formatCurrency(parsed, currency);
    // Remove spaces for comparison as formatting might differ
    return text.replace(/\s/g, "").includes(parsed.toString().substring(0, 3));
  } catch {
    return false;
  }
};

/**
 * Formats currency with custom options using Intl.NumberFormat
 * @param amount - The amount to format
 * @param currency - Currency code
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted currency string
 * @example formatCurrencyCustom(1234.56, "USD", { notation: "compact" }) // "$1.2K"
 */
export const formatCurrencyCustom = (
  amount: number,
  currency: CurrencyCode,
  options: Intl.NumberFormatOptions = {},
): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const locale = currencyLocales[currency];
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    ...options,
  });

  return formatter.format(amount);
};

/**
 * Formats currency in compact notation (K, M, B)
 * @param amount - The amount to format
 * @param currency - Currency code
 * @returns Formatted compact currency string
 * @example formatCurrencyCompact(1500000, "IDR") // "Rp1,5 Jt"
 * @example formatCurrencyCompact(1500000, "USD") // "$1.5M"
 */
export const formatCurrencyCompact = (
  amount: number,
  currency: CurrencyCode,
): string => {
  return formatCurrencyCustom(amount, currency, {
    notation: "compact",
    compactDisplay: "short",
  });
};
