import { FieldError } from "react-hook-form";

export function ErrorField({
  fieldError,
}: {
  fieldError: FieldError | undefined;
}) {
  return fieldError ? (
    <span className="text-red-600 text-sm">{fieldError.message}</span>
  ) : null;
}
