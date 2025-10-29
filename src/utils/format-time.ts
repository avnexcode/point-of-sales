import { t as translator, type TFunction } from "i18next";

/**
 * Time format types for Indonesian locale formatting
 *
 * @typedef {string} TimeFormat
 * @property {'24h'} 24h - 24-hour format: '14:30:45'
 * @property {'12h'} 12h - 12-hour format with AM/PM: '2:30:45 PM'
 * @property {'short24h'} short24h - 24-hour format without seconds: '14:30'
 * @property {'short12h'} short12h - 12-hour format without seconds: '2:30 PM'
 * @property {'seconds'} seconds - Seconds only: '45'
 * @property {'milliseconds'} milliseconds - Milliseconds: '123'
 */
export type TimeFormat =
  | "24h" // '14:30:45'
  | "12h" // '2:30:45 PM'
  | "short24h" // '14:30'
  | "short12h" // '2:30 PM'
  | "seconds" // '45'
  | "milliseconds"; // '123'

/**
 * Time period type for AM/PM designation
 * @typedef {string} TimePeriod
 */
export type TimePeriod = "AM" | "PM";

/**
 * Formats a time into various locale string formats
 *
 * This utility function provides flexible time formatting with internationalization
 * support. It handles multiple input types (Date object, ISO string, timestamp)
 * and outputs in various human-readable formats.
 *
 * **Features:**
 * - Multiple format options (24h, 12h, short formats)
 * - Internationalization support for AM/PM labels
 * - Flexible input types (Date, string, number, undefined)
 * - Automatic fallback to current time if no input provided
 * - Robust error handling with fallback messages
 * - Zero-padding for consistent numeric formats
 *
 * **Format Examples:**
 * - `24h`: "14:30:45" (24-hour with seconds)
 * - `12h`: "2:30:45 PM" (12-hour with seconds and period)
 * - `short24h`: "14:30" (24-hour without seconds)
 * - `short12h`: "2:30 PM" (12-hour without seconds)
 * - `seconds`: "45" (seconds only)
 * - `milliseconds`: "123" (milliseconds only)
 *
 * @param time - Time to format. Accepts Date object, ISO string, timestamp, or undefined
 * @param formatType - The format type to use (default: "short24h")
 * @param t - Translation function from i18next
 *
 * @returns Formatted time string, or "Invalid time" on error
 *
 * @example
 * Using Date object
 * const time = new Date(2025, 1, 8, 14, 30, 45); // 14:30:45
 *
 * formatTime(time, "24h")
 * Returns: "14:30:45"
 *
 * formatTime(time, "12h")
 * Returns: "2:30:45 PM"
 *
 * formatTime(time, "short24h")
 * Returns: "14:30"
 *
 * formatTime(time, "short12h")
 * Returns: "2:30 PM"
 *
 * formatTime(time, "seconds")
 * Returns: "45"
 *
 * @example
 * Using ISO string
 * formatTime("2025-02-08T14:30:45Z", "24h")
 * Returns: "14:30:45"
 *
 * @example
 * Using timestamp (milliseconds)
 * formatTime(1738934445000, "12h")
 * Returns: "2:30:45 PM"
 *
 * @example
 * Using current time (no parameter)
 * formatTime()
 * Returns: Current time in short24h format, e.g., "15:45"
 *
 * @example
 * In React component
 * function Clock() {
 *   const [currentTime, setCurrentTime] = useState(new Date());
 *
 *   useEffect(() => {
 *     const interval = setInterval(() => {
 *       setCurrentTime(new Date());
 *     }, 1000);
 *     return () => clearInterval(interval);
 *   }, []);
 *
 *   return <div>{formatTime(currentTime, "24h")}</div>;
 * }
 *
 * @example
 * Displaying appointment time
 * function Appointment({ scheduledTime }: { scheduledTime: string }) {
 *   return (
 *     <div>
 *       <p>Time: {formatTime(scheduledTime, "12h")}</p>
 *     </div>
 *   );
 * }
 *
 * @example
 * Handling invalid times
 * formatTime("invalid-time", "24h")
 * Returns: "Invalid time" (with console error)
 *
 * formatTime(undefined, "short24h")
 * Returns: Current time in short24h format
 *
 * @remarks
 * - 12-hour format uses internationalized AM/PM labels
 * - All numeric values are zero-padded for consistency
 * - Invalid times return "Invalid time" string and log error to console
 * - Undefined time parameter defaults to current time
 * - Milliseconds are always shown as 3 digits (000-999)
 *
 * @throws {Error} Logs error to console but doesn't throw (returns "Invalid time")
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|MDN Date Reference}
 */
export const formatTime = (
  time?: Date | string | number,
  formatType: TimeFormat = "short24h",
  t: TFunction = translator,
): string => {
  try {
    // Convert input to Date object, default to current time if undefined
    const timeObject = time ? new Date(time) : new Date();

    // Validate time is valid
    if (isNaN(timeObject.getTime())) {
      throw new Error("Invalid time input");
    }

    // Extract time components
    const hours24 = timeObject.getHours(); // 0-23
    const minutes = timeObject.getMinutes(); // 0-59
    const seconds = timeObject.getSeconds(); // 0-59
    const milliseconds = timeObject.getMilliseconds(); // 0-999

    // Convert to 12-hour format
    const hours12 = hours24 % 12 || 12; // Convert 0 to 12
    const period: TimePeriod = hours24 >= 12 ? "PM" : "AM";

    // Get internationalized period labels
    const periodLabel =
      period === "AM" ? t(`time.period.am`) : t(`time.period.pm`);

    // Zero-pad helper (inline for better performance)
    const pad2 = (n: number) => n.toString().padStart(2, "0");
    const pad3 = (n: number) => n.toString().padStart(3, "0");

    // Format based on requested type
    switch (formatType) {
      case "24h":
        // 24-hour format with seconds: "14:30:45"
        return `${pad2(hours24)}:${pad2(minutes)}:${pad2(seconds)}`;

      case "12h":
        // 12-hour format with seconds: "2:30:45 PM"
        return `${hours12}:${pad2(minutes)}:${pad2(seconds)} ${periodLabel}`;

      case "short24h":
        // 24-hour format without seconds: "14:30"
        return `${pad2(hours24)}:${pad2(minutes)}`;

      case "short12h":
        // 12-hour format without seconds: "2:30 PM"
        return `${hours12}:${pad2(minutes)} ${periodLabel}`;

      case "seconds":
        // Seconds only: "45"
        return `${pad2(seconds)}`;

      case "milliseconds":
        // Milliseconds only: "123"
        return `${pad3(milliseconds)}`;

      default:
        // Fallback to short24h format
        return `${pad2(hours24)}:${pad2(minutes)}`;
    }
  } catch (error) {
    // Log error and return user-friendly message
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

/**
 * Calculates the time duration between two times
 *
 * @param startTime - The start time
 * @param endTime - The end time (defaults to current time)
 * @param t - Translation function from i18next
 *
 * @returns Formatted duration string
 *
 * @example
 * const start = new Date(2025, 1, 8, 10, 0);
 * const end = new Date(2025, 1, 8, 14, 30);
 * formatDuration(start, end)
 * Returns: "4 hours 30 minutes"
 */
export const formatDuration = (
  startTime: Date | string | number,
  endTime?: Date | string | number,
  t: TFunction = translator,
): string => {
  try {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid time input");
    }

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const hours = diffHour % 24;
    const minutes = diffMin % 60;
    const seconds = diffSec % 60;

    const parts: string[] = [];

    if (diffDay > 0) {
      parts.push(t("time.duration.day", { count: diffDay }));
    }
    if (hours > 0) {
      parts.push(t("time.duration.hour", { count: hours }));
    }
    if (minutes > 0 && diffDay === 0) {
      parts.push(t("time.duration.minute", { count: minutes }));
    }
    if (seconds > 0 && diffHour === 0 && diffMin === 0) {
      parts.push(t("time.duration.second", { count: seconds }));
    }

    return parts.length > 0 ? parts.join(" ") : t("time.duration.justNow");
  } catch (error) {
    console.error("Error calculating duration:", error);
    return "Invalid time";
  }
};

/**
 * Checks if a time is in the morning (AM)
 *
 * @param time - The time to check
 * @returns True if the time is in AM (before noon)
 *
 * @example
 * isMorning(new Date(2025, 1, 8, 10, 0)) // true
 * isMorning(new Date(2025, 1, 8, 14, 0)) // false
 */
export const isMorning = (time: Date | string | number): boolean => {
  const timeObject = new Date(time);
  return timeObject.getHours() < 12;
};

/**
 * Checks if a time is in the afternoon (PM)
 *
 * @param time - The time to check
 * @returns True if the time is in PM (noon or after)
 *
 * @example
 * isAfternoon(new Date(2025, 1, 8, 14, 0)) // true
 * isAfternoon(new Date(2025, 1, 8, 10, 0)) // false
 */
export const isAfternoon = (time: Date | string | number): boolean => {
  const timeObject = new Date(time);
  return timeObject.getHours() >= 12;
};

/**
 * Gets time period of day (morning, afternoon, evening, night)
 *
 * @param time - The time to check
 * @param t - Translation function from i18next
 * @returns Period of day as localized string
 *
 * @example
 * getTimePeriod(new Date(2025, 1, 8, 6, 0)) // "Morning"
 * getTimePeriod(new Date(2025, 1, 8, 14, 0)) // "Afternoon"
 * getTimePeriod(new Date(2025, 1, 8, 18, 0)) // "Evening"
 * getTimePeriod(new Date(2025, 1, 8, 22, 0)) // "Night"
 */
export const getTimePeriod = (
  time: Date | string | number,
  t: TFunction = translator,
): string => {
  const timeObject = new Date(time);
  const hours = timeObject.getHours();

  if (hours >= 5 && hours < 12) {
    return t("time.periodOfDay.morning");
  } else if (hours >= 12 && hours < 17) {
    return t("time.periodOfDay.afternoon");
  } else if (hours >= 17 && hours < 21) {
    return t("time.periodOfDay.evening");
  } else {
    return t("time.periodOfDay.night");
  }
};

/**
 * Adds minutes to a time
 *
 * @param time - The starting time
 * @param minutes - Number of minutes to add (can be negative)
 * @returns New time with minutes added
 *
 * @example
 * addMinutes(new Date(2025, 1, 8, 14, 30), 45)
 * Returns: Date object for 15:15
 */
export const addMinutes = (
  time: Date | string | number,
  minutes: number,
): Date => {
  const timeObject = new Date(time);
  timeObject.setMinutes(timeObject.getMinutes() + minutes);
  return timeObject;
};

/**
 * Adds hours to a time
 *
 * @param time - The starting time
 * @param hours - Number of hours to add (can be negative)
 * @returns New time with hours added
 *
 * @example
 * addHours(new Date(2025, 1, 8, 14, 30), 3)
 * Returns: Date object for 17:30
 */
export const addHours = (time: Date | string | number, hours: number): Date => {
  const timeObject = new Date(time);
  timeObject.setHours(timeObject.getHours() + hours);
  return timeObject;
};

/**
 * Converts time to specific timezone offset
 *
 * @param time - The time to convert
 * @param offsetMinutes - Timezone offset in minutes (e.g., 420 for UTC+7)
 * @returns New Date object adjusted to timezone
 *
 * @example
 * Convert to UTC+7 (Jakarta, Indonesia)
 * toTimezone(new Date(), 420)
 */
export const toTimezone = (
  time: Date | string | number,
  offsetMinutes: number,
): Date => {
  const timeObject = new Date(time);
  const utc = timeObject.getTime() + timeObject.getTimezoneOffset() * 60000;
  return new Date(utc + offsetMinutes * 60000);
};

/**
 * Gets current timestamp in milliseconds
 *
 * @returns Current timestamp
 *
 * @example
 * const now = getCurrentTimestamp();
 * console.log(now); // 1738934445000
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Compares two times
 *
 * @param time1 - First time
 * @param time2 - Second time
 * @returns -1 if time1 < time2, 0 if equal, 1 if time1 > time2
 *
 * @example
 * const time1 = new Date(2025, 1, 8, 10, 0);
 * const time2 = new Date(2025, 1, 8, 14, 0);
 * compareTimes(time1, time2) // -1
 */
export const compareTimes = (
  time1: Date | string | number,
  time2: Date | string | number,
): number => {
  const t1 = new Date(time1).getTime();
  const t2 = new Date(time2).getTime();

  if (t1 < t2) return -1;
  if (t1 > t2) return 1;
  return 0;
};
