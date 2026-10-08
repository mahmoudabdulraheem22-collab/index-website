import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry } from "../lib/contact-validation.ts";
const valid = {
  name: "Test Person",
  company: "",
  email: "test@example.com",
  phone: "",
  country: "Egypt",
  service: "software-development",
  description: "A website to explain our business activities.",
  website: "",
  locale: "en",
};
test("accepts a complete enquiry without optional contact fields", () => {
  assert.equal(validateEnquiry(valid).ok, true);
});
test("supports Arabic text and optional international phone", () => {
  assert.equal(
    validateEnquiry({
      ...valid,
      name: "اسم تجريبي",
      country: "مصر",
      description: "نحتاج إلى نظام لتنظيم المعلومات الخاصة بالعمل.",
      phone: "+20 123 456 7890",
      locale: "ar",
    }).ok,
    true,
  );
});
test("rejects malformed, oversized and forged values", () => {
  for (const change of [
    { email: "bad-address" },
    { description: "too short" },
    { name: "a".repeat(101) },
    { service: "cybersecurity" },
    { locale: "fr" },
    { name: [] },
    { phone: "<script>" },
  ])
    assert.equal(validateEnquiry({ ...valid, ...change }).ok, false);
});
test("rejects invalid top-level input and control characters", () => {
  for (const value of [null, [], 4, { ...valid, name: "Test\u0000Name" }])
    assert.equal(validateEnquiry(value).ok, false);
});
