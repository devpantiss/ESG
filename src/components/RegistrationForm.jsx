import { useEffect, useRef, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  getLocalizedText,
  registrationSteps,
} from "../data/registrationSchema";

const draftStorageKey = "esg_registration_draft";

const initialForm = {
  representativeType: "",
  name: "",
  gender: "",
  mobile: "",
  email: "",
  company: "",
  sector: "",
  designation: "",
  experience: "",
  address: "",
  exportExperience: "",
  interests: [],
  reference: "",
  participantsCount: "",
  exhibitionInterest: "",
  accessibilitySupport: "",
  paymentProof: null,
};

export default function RegistrationForm({ language = "en" }) {
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") return initialForm;

    try {
      const savedDraft = window.sessionStorage.getItem(draftStorageKey);
      if (!savedDraft) return initialForm;

      const parsedDraft = JSON.parse(savedDraft);
      return { ...initialForm, ...parsedDraft, paymentProof: null };
    } catch {
      return initialForm;
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });
  const formTopRef = useRef(null);
  const contentScrollRef = useRef(null);

  const activeStep = registrationSteps[currentStep];
  const isLastStep = currentStep === registrationSteps.length - 1;

  useEffect(() => {
    const draft = { ...formData };
    delete draft.paymentProof;
    window.sessionStorage.setItem(draftStorageKey, JSON.stringify(draft));
  }, [formData]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentState = query.get("payment");

    if (!paymentState) return;

    if (paymentState === "success") {
      setSubmitState({
        type: "success",
        message:
          language === "hi"
            ? "भुगतान सफल रहा। आपका पंजीकरण सुरक्षित कर लिया गया है।"
            : "Payment completed successfully. Your registration has been recorded.",
      });
      setFormData(initialForm);
      setCurrentStep(0);
      window.sessionStorage.removeItem(draftStorageKey);
    }

    if (paymentState === "cancelled") {
      setSubmitState({
        type: "error",
        message:
          language === "hi"
            ? "भुगतान पूरा नहीं हुआ। आप भुगतान विवरण फिर से जांच सकते हैं।"
            : "Payment was not completed. You can review the payment details and try again.",
      });
      setCurrentStep(registrationSteps.length - 1);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, [language]);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox" && activeStep.fields?.find((field) => field.name === name)?.type === "checkbox") {
      setFormData((current) => {
        const existing = current[name] ?? [];
        return {
          ...current,
          [name]: checked
            ? [...existing, value]
            : existing.filter((item) => item !== value),
        };
      });
      return;
    }

    if (type === "file") {
      setFormData((current) => ({
        ...current,
        [name]: files?.[0] ?? null,
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateStep = () => {
    if (!activeStep.fields) return true;

    const missingField = activeStep.fields.find((field) => {
      if (!field.required) return false;

      const value = formData[field.name];

      if (field.type === "checkbox") {
        return !Array.isArray(value) || value.length === 0;
      }

      if (field.type === "file") {
        return !value;
      }

      return !String(value ?? "").trim();
    });

    if (!missingField) return true;

    setSubmitState({
      type: "error",
      message: `Please complete "${getLocalizedText(missingField.label, language)}" before continuing.`,
    });

    return false;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setSubmitState({ type: "", message: "" });
    setCurrentStep((step) => Math.min(step + 1, registrationSteps.length - 1));
    window.requestAnimationFrame(() => {
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        formTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const handleBack = () => {
    setSubmitState({ type: "", message: "" });
    setCurrentStep((step) => Math.max(step - 1, 0));
    window.requestAnimationFrame(() => {
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        formTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep()) return;

    if (!isSupabaseConfigured || !supabase) {
      setSubmitState({
        type: "error",
        message:
          "Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "", message: "" });

    try {
      if (!formData.paymentProof) {
        throw new Error("Please upload the payment screenshot before submitting.");
      }

      const fileExtension = formData.paymentProof.name.split(".").pop();
      const safeName = formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const paymentProofPath = `proofs/${Date.now()}-${safeName || "participant"}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("registration-files")
        .upload(paymentProofPath, formData.paymentProof, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const questionnaire = {
        language,
        representativeType: formData.representativeType,
        gender: formData.gender,
        sector: formData.sector.trim(),
        experience: formData.experience ? Number(formData.experience) : null,
        address: formData.address.trim(),
        exportExperience: formData.exportExperience,
        interests: formData.interests,
        reference: formData.reference.trim(),
        participantsCount: formData.participantsCount,
        exhibitionInterest: formData.exhibitionInterest,
        accessibilitySupport: formData.accessibilitySupport,
        paymentProofPath,
      };

      const paymentStep = registrationSteps.at(-1);
      const registration = {
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.mobile.trim(),
        organization: formData.company.trim(),
        designation: formData.designation.trim(),
        participant_type: formData.representativeType,
        city: formData.address.trim(),
        attendance_mode: "Paid Registration",
        questionnaire,
        payment_status: "pending",
        payment_provider: "manual_transfer",
        payment_amount: (paymentStep?.paymentDetails?.amount ?? 1000) * 100,
        payment_currency: paymentStep?.paymentDetails?.currency ?? "INR",
      };

      const { error } = await supabase.from("registrations").insert(registration);

      if (error) {
        throw error;
      }

      setSubmitState({
        type: "success",
        message:
          language === "hi"
            ? "पंजीकरण जमा हो गया है। भुगतान स्क्रीनशॉट admin verification के बाद पुष्टि की जाएगी।"
            : "Registration submitted. Your payment screenshot will be reviewed by the admin for verification.",
      });
      setFormData(initialForm);
      setCurrentStep(0);
      window.sessionStorage.removeItem(draftStorageKey);
    } catch (error) {
      setSubmitState({
        type: "error",
        message: error instanceof Error ? error.message : "Registration could not be submitted.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-[28px] border border-emerald-300/25 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_rgba(5,10,8,0.96)_55%)] p-6 text-white shadow-[0_0_0_1px_rgba(52,211,153,0.08),0_24px_60px_rgba(0,0,0,0.38),0_0_40px_rgba(16,185,129,0.08)] lg:sticky lg:top-8">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
          Step {currentStep + 1} of {registrationSteps.length}
        </p>

        <div className="mt-6 grid gap-4">
          {registrationSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={`rounded-2xl border px-4 py-4 transition ${
                  isActive
                    ? "border-emerald-300 bg-emerald-400/10 shadow-[0_0_0_1px_rgba(110,231,183,0.16),0_0_24px_rgba(16,185,129,0.12)]"
                    : isCompleted
                      ? "border-emerald-900/70 bg-emerald-950/40"
                      : "border-white/8 bg-white/[0.03]"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/55">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {getLocalizedText(step.title, language)}
                </h3>
              </div>
            );
          })}
        </div>
      </aside>

      <form
        className="rounded-[32px] border border-emerald-300/20 bg-[linear-gradient(180deg,rgba(8,20,16,0.98),rgba(5,11,9,0.98))] text-white shadow-[0_0_0_1px_rgba(52,211,153,0.06),0_30px_80px_rgba(0,0,0,0.42),0_0_60px_rgba(16,185,129,0.06)] lg:flex lg:h-[calc(100vh-4rem)] lg:flex-col lg:overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div
          ref={formTopRef}
          className="border-b border-white/8 px-8 pt-8 pb-6 md:px-10"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
            {activeStep.id.replaceAll("_", " ")}
          </p>
          <h2 className="mt-3 text-3xl font-serif font-semibold text-white [text-shadow:0_0_24px_rgba(16,185,129,0.12)]">
            {getLocalizedText(activeStep.title, language)}
          </h2>
        </div>

        <div
          ref={contentScrollRef}
          className="px-8 py-8 md:px-10 lg:min-h-0 lg:flex-1 lg:overflow-y-auto"
        >
          <StepContent
            step={activeStep}
            formData={formData}
            onChange={handleChange}
            language={language}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="border-t border-white/8 px-8 py-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-stone-200 transition hover:border-emerald-300/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {language === "hi" ? "वापस" : "Back"}
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-stone-950 shadow-[0_0_20px_rgba(52,211,153,0.28)] transition hover:bg-emerald-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.38)]"
                >
                  {language === "hi" ? "आगे बढ़ें" : "Continue"}
                </button>
              ) : null}
            </div>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-emerald-400 px-6 py-3 font-medium text-stone-950 shadow-[0_0_24px_rgba(52,211,153,0.28)] transition hover:bg-emerald-300 hover:shadow-[0_0_34px_rgba(52,211,153,0.38)] disabled:cursor-not-allowed disabled:bg-emerald-700"
              >
                {isSubmitting
                  ? language === "hi"
                    ? "जमा किया जा रहा है..."
                    : "Submitting..."
                  : language === "hi"
                    ? "पंजीकरण जमा करें"
                    : "Submit Registration"}
              </button>
            ) : (
              <p className="text-sm text-stone-400">
                {language === "hi"
                  ? "इस चरण को पूरा करें।"
                  : "Complete this step to continue."}
              </p>
            )}
          </div>

          {submitState.message ? (
            <div
              className={`mt-6 rounded-xl px-4 py-3 text-sm ${
                submitState.type === "success"
                  ? "bg-emerald-500/10 text-emerald-200"
                  : "bg-red-500/10 text-red-200"
              }`}
            >
              {submitState.message}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function StepContent({ step, formData, onChange, language, isSubmitting }) {
  if (step.type === "info") {
    return (
      <section className="rounded-3xl border border-emerald-300/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(6,14,11,0.72))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h3 className="text-2xl font-serif font-semibold text-white">
          {getLocalizedText(step.content.heading, language)}
        </h3>
        <p className="mt-4 text-base text-stone-300">
          {getLocalizedText(step.content.description, language)}
        </p>
        <div className="mt-6 rounded-2xl border border-emerald-300/10 bg-emerald-400/10 px-5 py-4 text-emerald-100">
          {getLocalizedText(step.content.feeInfo, language)}
        </div>
      </section>
    );
  }

  if (step.type === "payment") {
    return (
      <section className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-3xl border border-emerald-300/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(6,14,11,0.72))] p-6">
            <h3 className="text-lg font-semibold text-white">
              {language === "hi" ? "भुगतान जानकारी" : "Payment Information"}
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-stone-300 md:grid-cols-2">
              <p>Amount: ₹{step.paymentDetails.amount}</p>
              <p>Currency: {step.paymentDetails.currency}</p>
              <p>Account Name: {step.paymentDetails.accountName}</p>
              <p>Bank Name: {step.paymentDetails.bankName}</p>
              <p>Branch: {step.paymentDetails.branch}</p>
              <p>Account Number: {step.paymentDetails.accountNumber}</p>
              <p>IFSC: {step.paymentDetails.ifsc}</p>
              <p>UPI ID: {step.paymentDetails.upiId}</p>
            </div>
            <p className="mt-5 text-sm text-stone-300">
              {getLocalizedText(step.paymentDetails.description, language)}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-emerald-300">
              {getLocalizedText(step.paymentDetails.supportNote, language)}
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-stone-300">
              {language === "hi"
                ? "भुगतान स्क्रीनशॉट अपलोड करने के बाद आपका status pending रहेगा। Admin verify करने के बाद invoice भेजी जाएगी।"
                : "After you upload the payment screenshot, your status will remain pending until an admin verifies it and sends the invoice."}
            </div>
          </div>

          <PaymentCheckoutCard
            paymentDetails={step.paymentDetails}
            language={language}
            isSubmitting={isSubmitting}
          />
        </div>
        {step.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={onChange}
            language={language}
          />
        ))}
      </section>
    );
  }

  return (
    <div className="grid gap-4">
      {step.fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={onChange}
          language={language}
        />
      ))}
    </div>
  );
}

function PaymentCheckoutCard({ language, isSubmitting }) {
  return (
    <aside className="rounded-3xl border border-emerald-300/12 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.16),_rgba(10,21,17,0.96)_62%)] p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.25),0_0_24px_rgba(16,185,129,0.06)]">
      <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
        {language === "hi" ? "स्कैन करें" : "Scan to Pay"}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">
        {language === "hi" ? "UPI भुगतान QR" : "UPI Payment QR"}
      </h3>
      <div className="mt-5 flex justify-center">
        <img
          src="/qr.jpg"
          alt="UPI payment QR code"
          className="h-[220px] w-[220px] rounded-2xl border border-white/10 bg-white object-cover p-3"
        />
      </div>
      <p className="mt-4 text-sm text-stone-300">
        {language === "hi"
          ? "भुगतान पूरा होने के बाद स्क्रीनशॉट नीचे अपलोड करें।"
          : "After completing the payment, upload the screenshot below."}
      </p>
      <p className="mt-2 text-xs text-stone-400">
        {isSubmitting
          ? language === "hi"
            ? "स्क्रीनशॉट अपलोड किया जा रहा है..."
            : "Uploading payment screenshot..."
          : language === "hi"
            ? "UPI ID या बैंक विवरण का उपयोग करके भुगतान करें।"
            : "Pay using the UPI ID or the bank details shown here."}
      </p>
    </aside>
  );
}

function FieldRenderer({ field, value, onChange, language }) {
  if (field.type === "radio") {
    return (
      <ChoiceField
        field={field}
        value={value}
        onChange={onChange}
        language={language}
        mode="radio"
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <ChoiceField
        field={field}
        value={value}
        onChange={onChange}
        language={language}
        mode="checkbox"
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <TextAreaField
        label={getLocalizedText(field.label, language)}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    );
  }

  if (field.type === "file") {
    return (
      <FileField
        label={getLocalizedText(field.label, language)}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    );
  }

  return (
    <Field
      label={getLocalizedText(field.label, language)}
      name={field.name}
      type={field.type}
      value={value}
      onChange={onChange}
      required={field.required}
    />
  );
}

function FileField({ label, name, value, onChange, required = false }) {
  return (
    <label className="grid gap-3 text-left">
      <span className="text-sm font-medium text-stone-200">{label}</span>
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4">
        <input
          type="file"
          name={name}
          onChange={onChange}
          required={required}
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          className="block w-full text-sm text-stone-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-950"
        />
        <p className="mt-3 text-sm text-stone-300">
          {value ? value.name : "No screenshot selected"}
        </p>
      </div>
    </label>
  );
}

function Field({ label, name, type = "text", value, onChange, required = false }) {
  return (
    <label className="grid gap-2 text-left">
      <span className="text-sm font-medium text-stone-200">{label}</span>
      <input
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-emerald-300 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
      />
    </label>
  );
}

function TextAreaField({ label, name, value, onChange, required = false }) {
  return (
    <label className="grid gap-2 text-left">
      <span className="text-sm font-medium text-stone-200">{label}</span>
      <textarea
        className="min-h-28 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-emerald-300 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
      />
    </label>
  );
}

function ChoiceField({ field, value, onChange, language, mode }) {
  const currentValue = mode === "checkbox" ? value ?? [] : value;

  return (
    <fieldset className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <legend className="px-2 text-sm font-medium text-stone-200">
        {getLocalizedText(field.label, language)}
      </legend>

      <div className="grid gap-3 md:grid-cols-2">
        {field.options.map((option) => {
          const optionValue = option.en;
          const checked =
            mode === "checkbox"
              ? currentValue.includes(optionValue)
              : currentValue === optionValue;

          return (
            <label
              key={option.en}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                checked
                  ? "border-emerald-300 bg-emerald-400/10 shadow-[0_0_18px_rgba(52,211,153,0.08)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <input
                type={mode}
                name={field.name}
                value={optionValue}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-emerald-400"
              />
              <span className="text-sm text-stone-100">
                {getLocalizedText(option, language)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
