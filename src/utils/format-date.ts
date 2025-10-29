import { t as translator, type TFunction } from "i18next";

/**
 * Date format types for Indonesian locale formatting
 *
 * @typedef {string} DateFormat
 * @property {'full'} full - Full format with day name: 'Senin, 8 Februari 2025'
 * @property {'medium'} medium - Medium format with abbreviated month: '8 Feb 2025'
 * @property {'short'} short - Short numeric format: '08/02/2025'
 * @property {'time'} time - Time only in 24-hour format: '14:30'
 * @property {'dateTime'} dateTime - Combined date and time: '8 Feb 2025, 14:30'
 */
export type DateFormat =
  | "full" // 'Senin, 8 Februari 2025'
  | "medium" // '8 Feb 2025'
  | "short" // '08/02/2025'
  | "time" // '14:30'
  | "dateTime"; // '8 Feb 2025, 14:30'

/**
 * Full month names
 * @constant
 * @type {string[]}
 */

export const getMonthsId = (t: TFunction) =>
  [
    t("date.months.1"),
    t("date.months.2"),
    t("date.months.3"),
    t("date.months.4"),
    t("date.months.5"),
    t("date.months.6"),
    t("date.months.7"),
    t("date.months.8"),
    t("date.months.9"),
    t("date.months.10"),
    t("date.months.11"),
    t("date.months.12"),
  ] as const;

/**
 * Abbreviated month names
 * @constant
 * @type {string[]}
 */

export const getMonthShortId = (t: TFunction) =>
  [
    t("date.shortMonths.1"),
    t("date.shortMonths.2"),
    t("date.shortMonths.3"),
    t("date.shortMonths.4"),
    t("date.shortMonths.5"),
    t("date.shortMonths.6"),
    t("date.shortMonths.7"),
    t("date.shortMonths.8"),
    t("date.shortMonths.9"),
    t("date.shortMonths.10"),
    t("date.shortMonths.11"),
    t("date.shortMonths.12"),
  ] as const;

/**
 * Day names (Sunday to Saturday)
 * @constant
 * @type {string[]}
 */

export const getDaysId = (t: TFunction) =>
  [
    t("date.days.1"),
    t("date.days.2"),
    t("date.days.3"),
    t("date.days.4"),
    t("date.days.5"),
    t("date.days.6"),
    t("date.days.7"),
  ] as const;

/**
 * Formats a date into various Indonesian locale string formats
 *
 * This utility function provides flexible date formatting with Indonesian
 * language support. It handles multiple input types (Date object, ISO string,
 * timestamp) and outputs in various human-readable formats.
 *
 * **Features:**
 * - Multiple format options (full, medium, short, time, dateTime)
 * - Indonesian language support (month and day names)
 * - Flexible input types (Date, string, number, undefined)
 * - Automatic fallback to current date if no input provided
 * - Robust error handling with fallback messages
 * - Zero-padding for consistent numeric formats
 *
 * **Format Examples:**
 * - `full`: "Senin, 8 Februari 2025" (with day name and full month)
 * - `medium`: "8 Feb 2025" (abbreviated month, no day name)
 * - `short`: "08/02/2025" (numeric DD/MM/YYYY format)
 * - `time`: "14:30" (24-hour time only)
 * - `dateTime`: "8 Feb 2025, 14:30" (combined date and time)
 *
 * @param date - Date to format. Accepts Date object, ISO string, timestamp, or undefined
 * @param formatType - The format type to use (default: "medium")
 * @param t - Translation function from i18next
 *
 * @returns Formatted date string in Indonesian locale, or "Invalid date" on error
 *
 * @example
 * Using Date object
 * const date = new Date(2025, 1, 8, 14, 30); // February 8, 2025, 14:30
 *
 * formatDate(date, "full")
 * Returns: "Sabtu, 8 Februari 2025"
 *
 * formatDate(date, "medium")
 * Returns: "8 Feb 2025"
 *
 * formatDate(date, "short")
 * Returns: "08/02/2025"
 *
 * formatDate(date, "time")
 * Returns: "14:30"
 *
 * formatDate(date, "dateTime")
 * Returns: "8 Feb 2025, 14:30"
 *
 * @example
 * Using ISO string
 * formatDate("2025-02-08T14:30:00Z", "full")
 * Returns: "Sabtu, 8 Februari 2025"
 *
 * @example
 * Using timestamp (milliseconds)
 * formatDate(1738934400000, "medium")
 * Returns: "8 Feb 2025"
 *
 * @example
 * Using current date (no parameter)
 * formatDate()
 * Returns: Current date in medium format, e.g., "25 Okt 2025"
 *
 * @example
 * Default format (medium)
 * formatDate(new Date())
 * Returns: "25 Okt 2025"
 *
 * @example
 * In React component
 * function BlogPost({ publishedAt }: { publishedAt: string }) {
 *   return (
 *     <article>
 *       <time dateTime={publishedAt}>
 *         Published on {formatDate(publishedAt, "full")}
 *       </time>
 *     </article>
 *   );
 * }
 *
 * @example
 * Displaying event schedule
 * function EventCard({ startTime }: { startTime: Date }) {
 *   return (
 *     <div>
 *       <p>Date: {formatDate(startTime, "medium")}</p>
 *       <p>Time: {formatDate(startTime, "time")}</p>
 *     </div>
 *   );
 * }
 *
 * @example
 * Handling invalid dates
 * formatDate("invalid-date", "full")
 * Returns: "Invalid date" (with console error)
 *
 * formatDate(undefined, "medium")
 * Returns: Current date in medium format
 *
 * @remarks
 * - Uses 24-hour time format (00:00 to 23:59)
 * - Short format uses DD/MM/YYYY (day/month/year)
 * - Month index is 0-based (0 = January, 11 = December)
 * - Day index is 0-based (0 = Sunday, 6 = Saturday)
 * - Invalid dates return "Invalid date" string and log error to console
 * - Undefined date parameter defaults to current date/time
 *
 * @throws {Error} Logs error to console but doesn't throw (returns "Invalid date")
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|MDN Date Reference}
 */
export const formatDate = (
  date?: Date | string | number,
  formatType: DateFormat = "medium",
  t: TFunction = translator,
): string => {
  try {
    // Convert input to Date object, default to current date if undefined
    const dateObject = date ? new Date(date) : new Date();

    // Validate date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date input");
    }

    // Extract date components
    const day = dateObject.getDate();
    const month = dateObject.getMonth(); // 0-11
    const year = dateObject.getFullYear();
    const dayName = getDaysId(t)[dateObject.getDay()]; // 0-6
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    // Format based on requested type
    switch (formatType) {
      case "full":
        // Full format: "Senin, 8 Februari 2025"
        return `${dayName}, ${day} ${getMonthsId(t)[month]} ${year}`;

      case "medium":
        // Medium format: "8 Feb 2025"
        return `${day} ${getMonthShortId(t)[month]} ${year}`;

      case "short":
        // Short numeric format: "08/02/2025"
        const monthNumber = (month + 1).toString().padStart(2, "0");
        const dayNumber = day.toString().padStart(2, "0");
        return `${dayNumber}/${monthNumber}/${year}`;

      case "time":
        // Time only format: "14:30"
        return `${hours}:${minutes}`;

      case "dateTime":
        // Combined date and time format: "8 Feb 2025, 14:30"
        return `${day} ${getMonthShortId(t)[month]} ${year}, ${hours}:${minutes}`;

      default:
        // Fallback to medium format
        return `${day} ${getMonthShortId(t)[month]} ${year}`;
    }
  } catch (error) {
    // Log error and return user-friendly message
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Calculates the relative time difference from now (e.g., "2 hours ago")
 *
 * @param date - The date to compare with current time
 * @param t - Translation function from i18next
 * @returns Indonesian relative time string
 *
 * @example
 * const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
 * formatRelativeTime(twoHoursAgo)
 * Returns: "2 jam yang lalu"
 */
export const formatRelativeTime = (
  date: Date | string | number,
  t: TFunction = translator,
): string => {
  try {
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date");
    }
    const now = new Date();
    const diffMs = now.getTime() - dateObject.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return t("date.relativeTime.justNow");
    if (diffMin < 60)
      return t("date.relativeTime.minuteAgo", { count: diffMin });
    if (diffHour < 24)
      return t("date.relativeTime.hourAgo", { count: diffHour });
    if (diffDay < 7) return t("date.relativeTime.dayAgo", { count: diffDay });
    if (diffDay < 30)
      return t("date.relativeTime.weekAgo", { count: Math.floor(diffDay / 7) });
    if (diffDay < 365)
      return t("date.relativeTime.monthAgo", {
        count: Math.floor(diffDay / 30),
      });
    return t("date.relativeTime.yearAgo", { count: Math.floor(diffDay / 365) });
  } catch (error) {
    console.error("Error calculating relative time:", error);
    return "Invalid date";
  }
};

/**
 * Checks if a date is today
 *
 * @param date - The date to check
 * @returns True if the date is today
 *
 * @example
 * isToday(new Date()) // true
 * isToday(new Date(2024, 0, 1)) // false
 */
export const isToday = (date: Date | string | number): boolean => {
  const dateObject = new Date(date);
  const today = new Date();
  return (
    dateObject.getDate() === today.getDate() &&
    dateObject.getMonth() === today.getMonth() &&
    dateObject.getFullYear() === today.getFullYear()
  );
};

/**
 * Gets the start of day (00:00:00.000)
 *
 * @param date - The date (defaults to today)
 * @returns Date object set to start of day
 *
 * @example
 * getStartOfDay(new Date(2025, 1, 8, 14, 30))
 * Returns: Date object for 2025-02-08 00:00:00.000
 */
export const getStartOfDay = (date?: Date | string | number): Date => {
  const dateObject = date ? new Date(date) : new Date();
  dateObject.setHours(0, 0, 0, 0);
  return dateObject;
};

/**
 * Gets the end of day (23:59:59.999)
 *
 * @param date - The date (defaults to today)
 * @returns Date object set to end of day
 *
 * @example
 * getEndOfDay(new Date(2025, 1, 8, 14, 30))
 * Returns: Date object for 2025-02-08 23:59:59.999
 */
export const getEndOfDay = (date?: Date | string | number): Date => {
  const dateObject = date ? new Date(date) : new Date();
  dateObject.setHours(23, 59, 59, 999);
  return dateObject;
};

/**
 * Adds days to a date
 *
 * @param date - The starting date
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added
 *
 * @example
 * addDays(new Date(2025, 1, 8), 7)
 * Returns: Date object for 2025-02-15
 */
export const addDays = (date: Date | string | number, days: number): Date => {
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + days);
  return dateObject;
};
