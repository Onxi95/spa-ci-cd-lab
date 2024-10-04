import { render, fireEvent, waitFor } from "@testing-library/react";
import { DebouncedInput } from "./DebouncedInput";
import { describe, expect, it, vi } from "vitest";

describe("DebouncedInput", () => {
  it("calls onDebounce after specified delay", async () => {
    const onDebounce = vi.fn();
    const { getByRole } = render(
      <DebouncedInput onDebounce={onDebounce} waitFor={300} />
    );

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(
      () => {
        expect(onDebounce).toHaveBeenCalledTimes(1);
      },
      { timeout: 400 }
    );
  });

  it("does not call onDebounce if the input is changed again before waitFor", async () => {
    const onDebounce = vi.fn();
    const { getByRole } = render(
      <DebouncedInput onDebounce={onDebounce} waitFor={300} />
    );

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input, { target: { value: "test again" } });

    await waitFor(
      () => {
        expect(onDebounce).toHaveBeenCalledTimes(0);
      },
      { timeout: 400 }
    );
  });

  it("calls onChange if provided", async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <DebouncedInput onDebounce={vi.fn()} waitFor={300} onChange={onChange} />
    );

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
