# India ESG Summit SPA

This app now includes a Supabase-backed registration flow with manual QR/bank payment, admin verification, and invoice email sending.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your Supabase project values.

3. In the Supabase SQL Editor, run `supabase/schema.sql`.

4. Deploy the Supabase Edge Functions in `supabase/functions` and set these secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `INVOICE_FROM_EMAIL`
- `INVOICE_COMPANY_NAME` (optional)
- `INVOICE_COMPANY_ADDRESS` (optional)
- `INVOICE_COMPANY_GSTIN` (optional)

5. Create at least one admin user:

- Create the user in Supabase Authentication using email/password.
- Insert the same user into `public.admin_users` with the auth user id.

Example:

```sql
insert into public.admin_users (user_id, email)
values ('YOUR_AUTH_USER_UUID', 'admin@example.com');
```

6. Run the app:

```bash
npm run dev
```

## Routes

- `/` public landing page with visitor registration form
- `/admin` admin sign-in and response dashboard

## Notes

- The registration form uploads a payment screenshot to Supabase Storage and inserts a pending registration row.
- Admins can review the screenshot, mark the payment as verified, and then send the invoice by email.
- Invoice emailing is handled by the `send-registration-invoice` Supabase Edge Function.
- Dashboard reads are protected by Supabase Auth plus Row Level Security.
