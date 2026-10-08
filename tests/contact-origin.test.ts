import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedOrigin } from "../lib/contact-origin.ts";
test("production trusts only the configured origin", () => {
  assert.equal(
    isAllowedOrigin(
      "https://company.example",
      "http://localhost:3000/api/contact",
      "https://company.example",
      false,
    ),
    true,
  );
  assert.equal(
    isAllowedOrigin(
      "https://evil.example",
      "https://evil.example/api/contact",
      "https://company.example",
      false,
    ),
    false,
  );
  assert.equal(
    isAllowedOrigin(null, "http://localhost:3000", undefined, true),
    false,
  );
});
test("development loopback alias permits the same port only", () => {
  assert.equal(
    isAllowedOrigin(
      "http://127.0.0.1:3000",
      "http://localhost:3000/api/contact",
      undefined,
      true,
    ),
    true,
  );
  assert.equal(
    isAllowedOrigin(
      "http://127.0.0.1:3001",
      "http://localhost:3000/api/contact",
      undefined,
      true,
    ),
    false,
  );
  assert.equal(
    isAllowedOrigin(
      "https://evil.example",
      "http://localhost:3000/api/contact",
      undefined,
      true,
    ),
    false,
  );
  assert.equal(
    isAllowedOrigin(
      "http://127.0.0.1:3000",
      "http://localhost:3000/api/contact",
      undefined,
      false,
    ),
    false,
  );
});
