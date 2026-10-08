"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { serviceAreas as services } from "@/data/content";
import { type Locale, t } from "@/i18n/config";
export function ContactForm({
  locale,
  enabled,
}: {
  locale: Locale;
  enabled: boolean;
}) {
  const ar = locale === "ar";
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !enabled) return;
    setBusy(true);
    setStatus(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) {
        const messages: Record<number, string> = {
          400: ar
            ? "راجع الحقول وأدخل وصفاً لا يقل عن ٢٠ حرفاً."
            : "Please check the fields and enter a description of at least 20 characters.",
          429: ar
            ? "تم تجاوز عدد المحاولات. يرجى المحاولة لاحقاً."
            : "Too many attempts. Please try again later.",
          503: ar
            ? "الإرسال غير متاح حالياً. لم يتم إرسال طلبك."
            : "Submission is currently unavailable. Your enquiry has not been sent.",
        };
        throw new Error(
          messages[response.status] ??
            (ar
              ? "تعذر تسليم طلبك. حاول مرة أخرى لاحقاً."
              : "Your enquiry could not be delivered. Please try again later."),
        );
      }
      setStatus({
        ok: true,
        text: ar
          ? "تم إرسال طلبك إلى INDEX بنجاح."
          : "Your enquiry has been delivered to INDEX.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        ok: false,
        text:
          error instanceof Error
            ? error.message
            : ar
              ? "تعذر الاتصال. حاول مرة أخرى."
              : "Connection failed. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }
  const labels = ar
    ? [
        "الاسم الكامل",
        "اسم الشركة",
        "البريد الإلكتروني",
        "رقم الهاتف",
        "الدولة",
        "الخدمة المطلوبة",
        "وصف المشروع",
      ]
    : [
        "Full name",
        "Company name",
        "Email",
        "Phone",
        "Country",
        "Service required",
        "Project description",
      ];
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label={ar ? "طلب مشروع" : "Project enquiry"}
    >
      {!enabled && (
        <p className="form-notice">
          {ar
            ? "إرسال الطلبات غير متاح بعد. يمكنك استعراض النموذج، لكن لن تُرسل أو تُحفظ أي بيانات حتى تفعيل قناة التواصل الرسمية."
            : "Enquiries are not yet enabled. You can explore the form, but no information will be sent or stored until the official contact channel is configured."}
        </p>
      )}
      {[
        { key: "name", type: "text", auto: "name", required: true, max: 100 },
        {
          key: "company",
          type: "text",
          auto: "organization",
          required: false,
          max: 160,
        },
        {
          key: "email",
          type: "email",
          auto: "email",
          required: true,
          max: 254,
        },
        { key: "phone", type: "tel", auto: "tel", required: false, max: 40 },
        {
          key: "country",
          type: "text",
          auto: "country-name",
          required: true,
          max: 100,
        },
      ].map((f, i) => (
        <div className="field" key={f.key}>
          <label htmlFor={f.key}>
            {labels[i]}{" "}
            {!f.required && (
              <span className="required-note">
                ({ar ? "اختياري" : "optional"})
              </span>
            )}
          </label>
          <input
            id={f.key}
            name={f.key}
            type={f.type}
            autoComplete={f.auto}
            required={f.required}
            minLength={f.required && f.type === "text" ? 2 : undefined}
            maxLength={f.max}
            dir={f.type === "email" || f.type === "tel" ? "ltr" : undefined}
          />
        </div>
      ))}
      <div className="field">
        <label htmlFor="service">{labels[5]}</label>
        <select name="service" id="service" required defaultValue="">
          <option value="" disabled>
            {ar ? "اختر خدمة" : "Select a service"}
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {t(s.title, locale)}
            </option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="description">{labels[6]}</label>
        <textarea
          id="description"
          name="description"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          aria-describedby="description-hint"
        />
        <span id="description-hint" className="required-note">
          {ar
            ? "من ٢٠ إلى ٥٠٠٠ حرف. يرجى عدم تضمين كلمات مرور أو بيانات حساسة."
            : "20–5,000 characters. Please do not include passwords or sensitive information."}
        </span>
      </div>
      <div className="honey" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-bottom">
        <p>
          {ar
            ? "بإرسال الطلب، تقر بأنك قرأت"
            : "By submitting, you acknowledge the"}{" "}
          <Link href={`/${locale}/privacy`}>
            {ar ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          .
        </p>
        <button type="submit" className="button" disabled={busy || !enabled}>
          {busy
            ? ar
              ? "جارٍ الإرسال…"
              : "Sending…"
            : ar
              ? "ابدأ مشروعك"
              : "Start Your Project"}
        </button>
      </div>
      {status && (
        <div
          className={`form-status ${status.ok ? "success" : "error"}`}
          role={status.ok ? "status" : "alert"}
        >
          {status.text}
        </div>
      )}
    </form>
  );
}
