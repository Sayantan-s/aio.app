import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { vi } from "vitest";
import Search from "./Search";

describe("Autocomplete", () => {
  test("Should render autocomplete correctly", () => {
    render(
      <Search
        placeholder="Bitcoin..."
        value=""
        onSearch={() => {}}
        onSearchClear={() => {}}
      />
    );
    const elementInput = screen.getByPlaceholderText(/bitcoin/i);
    expect(elementInput).toBeInTheDocument();
    const closeButton = screen.queryByRole("button");
    expect(closeButton).toBeNull();
  });

  test("Should add close button correctly", () => {
    render(
      <Search
        placeholder="Bitcoin..."
        value="uniswap"
        onSearch={() => {}}
        onSearchClear={() => {}}
      />
    );
    const closeButton = screen.queryByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  test("Should keep close button hidden", () => {
    render(
      <Search
        placeholder="Bitcoin..."
        value="  "
        onSearch={() => {}}
        onSearchClear={() => {}}
      />
    );
    const closeButton = screen.queryByRole("button");
    expect(closeButton).not.toBeInTheDocument();
  });

  test("Should call the search handler correctly", async () => {
    const fnSearch = vi.fn();
    render(
      <Search
        placeholder="Bitcoin..."
        value=""
        onSearch={fnSearch}
        onSearchClear={() => {}}
      />
    );
    const elementInput = screen.getByPlaceholderText(/bitcoin/i);
    await user.type(elementInput, "Matt!");
    expect(fnSearch).toHaveBeenCalledTimes(5);
  });

  test("Should call the search clear handler correctly", async () => {
    const fnClearSearch = vi.fn();
    render(
      <Search
        placeholder="Bitcoin..."
        value={"gmail"}
        onSearch={() => {}}
        onSearchClear={fnClearSearch}
      />
    );
    const closeButton = screen.getByRole("button");
    await user.click(closeButton);
    expect(fnClearSearch).toHaveBeenCalledTimes(1);
  });
});
