import { describe, test } from "bun:test";
import { browserTest } from "bun:test";

// the tests need to be built and more deterministic i suppose. but this is a start. 
describe("Build System", () => {
  test("asset pipeline", async () => {
    // Test asset transformations
  });
});

//hoping this actually uses playwright api properly 
browserTest("Homepage load", async (page) => {
    await page.goto("http://localhost:1234");
    // Assertions
  });