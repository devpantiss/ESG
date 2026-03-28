import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function formatCurrency(amount = 0, currency = "INR") {
  const normalizedCurrency = String(currency || "INR").toUpperCase();
  return `${normalizedCurrency} ${(amount / 100).toFixed(2)}`;
}

async function buildInvoicePdf({
  invoiceNumber,
  companyName,
  companyAddress,
  companyGstin,
  registration,
}: {
  invoiceNumber: string;
  companyName: string;
  companyAddress: string;
  companyGstin: string;
  registration: Record<string, unknown>;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({
    x: 0,
    y: height - 120,
    width,
    height: 120,
    color: rgb(0.06, 0.18, 0.14),
  });

  page.drawText(companyName, {
    x: 40,
    y: height - 60,
    size: 22,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Tax Invoice", {
    x: width - 170,
    y: height - 58,
    size: 22,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const lines = [
    `Invoice No: ${invoiceNumber}`,
    `Invoice Date: ${new Date().toLocaleDateString("en-IN")}`,
    `Payment Status: VERIFIED`,
    companyGstin ? `GSTIN: ${companyGstin}` : "",
  ].filter(Boolean);

  lines.forEach((line, index) => {
    page.drawText(line, {
      x: width - 170,
      y: height - 92 - index * 18,
      size: 10,
      font,
      color: rgb(0.95, 0.95, 0.95),
    });
  });

  page.drawText("Bill From", {
    x: 40,
    y: height - 165,
    size: 12,
    font: fontBold,
  });

  companyAddress.split("\n").forEach((line, index) => {
    page.drawText(line, {
      x: 40,
      y: height - 185 - index * 16,
      size: 10,
      font,
    });
  });

  page.drawText("Bill To", {
    x: 330,
    y: height - 165,
    size: 12,
    font: fontBold,
  });

  const customerLines = [
    String(registration.full_name ?? ""),
    String(registration.organization ?? ""),
    String(registration.email ?? ""),
    String(registration.phone ?? ""),
    String(registration.city ?? ""),
  ].filter(Boolean);

  customerLines.forEach((line, index) => {
    page.drawText(line, {
      x: 330,
      y: height - 185 - index * 16,
      size: 10,
      font,
    });
  });

  const tableTop = height - 320;
  page.drawRectangle({
    x: 40,
    y: tableTop,
    width: width - 80,
    height: 28,
    color: rgb(0.93, 0.95, 0.94),
  });

  page.drawText("Description", { x: 50, y: tableTop + 9, size: 11, font: fontBold });
  page.drawText("Qty", { x: 340, y: tableTop + 9, size: 11, font: fontBold });
  page.drawText("Rate", { x: 405, y: tableTop + 9, size: 11, font: fontBold });
  page.drawText("Amount", { x: 485, y: tableTop + 9, size: 11, font: fontBold });

  const amount = Number(registration.payment_amount ?? 0);
  const currency = String(registration.payment_currency ?? "INR");

  page.drawRectangle({
    x: 40,
    y: tableTop - 38,
    width: width - 80,
    height: 38,
    borderColor: rgb(0.84, 0.87, 0.85),
    borderWidth: 1,
  });

  page.drawText("India ESG Summit 2026 Registration Fee", {
    x: 50,
    y: tableTop - 23,
    size: 10,
    font,
  });
  page.drawText("1", { x: 345, y: tableTop - 23, size: 10, font });
  page.drawText(formatCurrency(amount, currency), { x: 390, y: tableTop - 23, size: 10, font });
  page.drawText(formatCurrency(amount, currency), { x: 470, y: tableTop - 23, size: 10, font });

  page.drawText("Total", {
    x: 420,
    y: tableTop - 100,
    size: 12,
    font: fontBold,
  });
  page.drawText(formatCurrency(amount, currency), {
    x: 480,
    y: tableTop - 100,
    size: 12,
    font: fontBold,
  });

  page.drawText("This invoice confirms that your uploaded payment has been reviewed and verified by the event administration team.", {
    x: 40,
    y: 110,
    size: 10,
    font,
    maxWidth: width - 80,
    lineHeight: 15,
  });

  page.drawText("Authorized Signatory", {
    x: width - 180,
    y: 70,
    size: 10,
    font: fontBold,
  });

  return await pdfDoc.save();
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const invoiceFromEmail = Deno.env.get("INVOICE_FROM_EMAIL");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const companyName = Deno.env.get("INVOICE_COMPANY_NAME") ?? "India ESG Summit 2026";
    const companyAddress = Deno.env.get("INVOICE_COMPANY_ADDRESS") ?? "India ESG Summit 2026\nOfficial Billing Address";
    const companyGstin = Deno.env.get("INVOICE_COMPANY_GSTIN") ?? "";

    if (!resendApiKey || !invoiceFromEmail || !supabaseUrl || !supabaseServiceRoleKey) {
      return json({ error: "Missing invoice email or Supabase function secrets." }, 500);
    }

    const { registrationId } = await request.json();
    if (!registrationId) {
      return json({ error: "registrationId is required." }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: registration, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (fetchError || !registration) {
      return json({ error: fetchError?.message || "Registration not found." }, 404);
    }

    if (registration.payment_status !== "verified") {
      return json({ error: "Payment must be verified before sending the invoice." }, 400);
    }

    const invoiceNumber =
      registration.invoice_number ||
      `IESG-${new Date().getFullYear()}-${String(registration.id).replaceAll("-", "").slice(0, 8).toUpperCase()}`;

    const pdfBytes = await buildInvoicePdf({
      invoiceNumber,
      companyName,
      companyAddress,
      companyGstin,
      registration,
    });

    const attachment = btoa(String.fromCharCode(...pdfBytes));

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: invoiceFromEmail,
        to: [registration.email],
        subject: `Invoice ${invoiceNumber} - India ESG Summit 2026`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
            <h2 style="margin-bottom:8px">India ESG Summit 2026</h2>
            <p>Your payment has been verified. Please find your invoice attached.</p>
            <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
            <p><strong>Participant:</strong> ${registration.full_name}</p>
            <p><strong>Organization:</strong> ${registration.organization}</p>
          </div>
        `,
        attachments: [
          {
            filename: `${invoiceNumber}.pdf`,
            content: attachment,
          },
        ],
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      return json({ error: emailData?.message || "Invoice email could not be sent." }, 500);
    }

    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        invoice_number: invoiceNumber,
        invoice_sent_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    if (updateError) {
      return json({ error: updateError.message }, 500);
    }

    return json({ sent: true, invoiceNumber });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invoice sending failed.";
    return json({ error: message }, 500);
  }
});
