import { test, expect } from "@playwright/test";

test.describe("Rick & Morty Characters – E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("initial load shows characters table", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();

    // There should be at least one character row
    await expect(
      page.locator("[data-testid^='character-row-']").first()
    ).toBeVisible();
  });

  test("search filters characters by name", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name...");

    // Fill the search input
    await searchInput.fill("Rick");

    // Wait for either table or empty state to appear
    await expect(
      page
        .getByRole("table")
        .or(page.getByText("No characters found. Try a different name."))
    ).toBeVisible();

    const rows = page.locator("[data-testid^='character-row-']");
    const count = await rows.count();

    if (count === 0) {
      // If no results, verify empty state message is visible
      await expect(
        page.getByText("No characters found. Try a different name.")
      ).toBeVisible();
    } else {
      // At least one row should contain "Rick"
      const rickRow = rows.filter({ hasText: "Rick" });
      await expect(rickRow.first()).toBeVisible();
    }
  });
  test("pagination changes the character list", async ({ page }) => {
    const nextButton = page.getByTestId("next-page");
    const prevButton = page.getByTestId("prev-page");

    // We are on the first page
    await expect(prevButton).toBeDisabled();

    const firstRow = page.locator("[data-testid^='character-row-']").first();
    const firstRowId = (await firstRow.getAttribute("data-testid"))!; // non-null

    await nextButton.click();

    // Wait until first row has a new data-testid
    await expect(
      page.locator("[data-testid^='character-row-']").first()
    ).not.toHaveAttribute("data-testid", firstRowId);
  });

  test("clicking a character opens the drawer with details", async ({
    page,
  }) => {
    const firstRow = page.locator("[data-testid^='character-row-']").first();
    const characterName = await firstRow.locator("td").first().textContent();

    await firstRow.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Modal header
    const heading = dialog.locator("span", { hasText: characterName! });
    await expect(heading).toBeVisible();

    // Episode count
    await expect(dialog.getByText("Episode count:")).toBeVisible();
  });

  test("drawer closes when clicking outside", async ({ page }) => {
    const firstRow = page.locator("[data-testid^='character-row-']").first();

    await firstRow.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Click the overlay (outside the modal)
    await page.mouse.click(5, 5);

    await expect(dialog).not.toBeVisible();
  });
});
