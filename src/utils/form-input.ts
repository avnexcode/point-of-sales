/**
 * Event types supported by the input handler
 * - onChange: Handles input value changes
 * - onPaste: Handles clipboard paste events
 */
type InputHandleEvent = "onChange" | "onPaste";

/**
 * Input type constraints for handling
 * - number: Restricts input to numeric characters only
 */
type InputHandleType = "number";

/**
 * Handles input events with type-specific validation and sanitization
 *
 * This utility function intercepts and processes input events to enforce
 * specific data types and formats. Currently supports numeric-only inputs
 * with automatic sanitization of non-numeric characters.
 *
 * **Features:**
 * - Real-time input sanitization during typing
 * - Paste event handling with format enforcement
 * - Automatic event propagation for React state updates
 * - Non-destructive character filtering
 *
 * **Supported Event Types:**
 * - `onChange`: Filters input as user types
 * - `onPaste`: Sanitizes pasted content before insertion
 *
 * **Supported Input Types:**
 * - `number`: Removes all non-digit characters (keeps 0-9 only)
 *
 * @param event - The type of event being handled (onChange or onPaste)
 * @param type - The input type constraint to apply (currently only 'number')
 * @param e - The React synthetic event (ChangeEvent or ClipboardEvent)
 *
 * @example
 * Basic usage with onChange
 * <input
 *   type="text"
 *   onChange={(e) => {
 *     inputHandle("onChange", "number", e);
 *     setPhoneNumber(e.target.value);
 *   }}
 * />
 *
 * @example
 * Handling both onChange and onPaste
 * <input
 *   type="text"
 *   placeholder="Enter phone number"
 *   onChange={(e) => {
 *     inputHandle("onChange", "number", e);
 *     setValue(e.target.value);
 *   }}
 *   onPaste={(e) => {
 *     inputHandle("onPaste", "number", e);
 *     setValue(e.currentTarget.value);
 *   }}
 * />
 *
 * @example
 * User types "abc123xyz" → Input shows "123"
 * User pastes "+1 (555) 123-4567" → Input shows "15551234567"
 *
 * @remarks
 * - The function mutates the input value directly for immediate visual feedback
 * - For paste events, dispatches a synthetic 'change' event to trigger React updates
 * - Uses regex `/\D/g` to remove all non-digit characters
 * - Preserves cursor position during onChange (browser default behavior)
 *
 * @see {@link inputParse} for parsing sanitized values into specific formats
 */
export const inputHandle = (
  event: InputHandleEvent,
  type: InputHandleType,
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ClipboardEvent<HTMLInputElement>,
): void => {
  // Handle real-time input filtering during typing
  if (event === "onChange" && type === "number") {
    const target = e.target as HTMLInputElement;
    // Remove all non-digit characters from current value
    const numericValue = target.value.replace(/\D/g, "");
    target.value = numericValue;
  }

  // Handle paste event with format enforcement
  if (event === "onPaste" && type === "number") {
    // Prevent default paste to control the inserted content
    e.preventDefault();

    const clipboardEvent = e as React.ClipboardEvent<HTMLInputElement>;
    // Extract text from clipboard
    const pastedData = clipboardEvent.clipboardData.getData("text");
    // Sanitize pasted content to numeric-only
    const numericValue = pastedData.replace(/\D/g, "");

    const target = e.target as HTMLInputElement;
    // Set sanitized value to input
    target.value = numericValue;

    // Dispatch synthetic change event to trigger React state updates
    // bubbles: true ensures event propagates through React's event system
    target.dispatchEvent(new Event("change", { bubbles: true }));
  }
};

/**
 * Parse types for converting string input values to desired formats
 * - string-to-number: Converts string to actual number type (parseInt)
 * - string-as-number: Returns numeric string (keeps as string type)
 */
type InputParseType = "string-to-number" | "string-as-number";

/**
 * Parses and converts input string values to specific numeric formats
 *
 * This utility function transforms sanitized string values into the desired
 * output format. Useful for processing form data before submission or validation.
 *
 * **Parse Types:**
 * - `string-to-number`: Converts to actual number type (removes leading zeros)
 * - `string-as-number`: Keeps as string but ensures numeric characters only
 *
 * @param type - The parsing strategy to apply
 * @param value - The input string value to parse
 *
 * @returns
 * - `number` if type is "string-to-number" (returns 0 if invalid)
 * - `string` if type is "string-as-number" (numeric string only)
 * - Original `string` for unknown types (fallback)
 *
 * @example
 * Parse to number type
 * inputParse("string-to-number", "00123")  // Returns: 123
 * inputParse("string-to-number", "abc")     // Returns: 0
 * inputParse("string-to-number", "")        // Returns: 0
 *
 * @example
 * Keep as numeric string
 * inputParse("string-as-number", "00123")   // Returns: "00123"
 * inputParse("string-as-number", "abc456")  // Returns: "456"
 *
 * @example
 * Form submission usage
 * const handleSubmit = (e: React.FormEvent) => {
 *   e.preventDefault();
 *   const formData = {
 *     age: inputParse("string-to-number", ageInput),
 *     phone: inputParse("string-as-number", phoneInput),
 *   };
 *   submitForm(formData);
 * };
 *
 * @example
 * Real-time validation
 * <input
 *   onChange={(e) => {
 *     inputHandle("onChange", "number", e);
 *     const numValue = inputParse("string-to-number", e.target.value);
 *     setIsValid(numValue >= 18 && numValue <= 100);
 *   }}
 * />
 *
 * @remarks
 * - Returns 0 for invalid/empty "string-to-number" conversions
 * - Leading zeros are preserved in "string-as-number" mode
 * - Always sanitizes input by removing non-numeric characters
 * - Type-safe return values based on parse type
 *
 * @see {@link inputHandle} for real-time input sanitization
 */
export const inputParse = (
  type: InputParseType,
  value: string,
): number | string => {
  switch (type) {
    case "string-to-number":
      // Remove non-digits, parse to integer, fallback to 0 if invalid
      return parseInt(value.replace(/\D/g, ""), 10) || 0;

    case "string-as-number":
      // Return numeric string (preserves leading zeros)
      return value.replace(/\D/g, "");

    default:
      // Fallback: return original value unchanged
      return value;
  }
};

/**
 * Formats a numeric string or number with thousand separators
 * Useful for displaying formatted numbers in inputs or labels
 *
 * @param value - Number or numeric string to format
 * @returns Formatted string with thousand separators
 *
 * @example
 * formatNumberWithCommas(1234567)      // "1,234,567"
 * formatNumberWithCommas("1234567")    // "1,234,567"
 */
export const formatNumberWithCommas = (value: number | string): string => {
  const numStr = typeof value === "number" ? value.toString() : value;
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Removes all formatting from a numeric string (commas, spaces, etc.)
 *
 * @param value - Formatted numeric string
 * @returns Clean numeric string
 *
 * @example
 * removeNumberFormatting("1,234,567")     // "1234567"
 * removeNumberFormatting("1 234 567")     // "1234567"
 */
export const removeNumberFormatting = (value: string): string => {
  return value.replace(/[^\d]/g, "");
};

/**
 * Validates if a string contains only numeric characters
 *
 * @param value - String to validate
 * @returns True if string is numeric-only, false otherwise
 *
 * @example
 * isNumericString("12345")    // true
 * isNumericString("123abc")   // false
 * isNumericString("")         // false
 */
export const isNumericString = (value: string): boolean => {
  return /^\d+$/.test(value);
};
