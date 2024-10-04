import { TextField, type TextFieldProps } from "@mui/material";
import debounce from "lodash.debounce";
import { forwardRef, useMemo, useRef, type ChangeEvent } from "react";

type TextField = HTMLInputElement | HTMLTextAreaElement;

type DebouncedInputProps = TextFieldProps & {
  onDebounce: (value: ChangeEvent<TextField>) => void;
  waitFor: number;
};

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ onDebounce, waitFor, onChange, ...props }, ref) => {
    // it's required to store `onDebounce` in ref in order
    // to prevent this function from being recreated.
    const onDebounceRef = useRef(onDebounce);

    const debounced = useMemo(
      () =>
        debounce(
          (value: ChangeEvent<TextField>) => onDebounceRef.current(value),
          waitFor
        ),
      [waitFor]
    );

    return (
      <TextField
        {...props}
        ref={ref}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
          debounced(e);
        }}
      />
    );
  }
);
