import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  Search,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckSquare,
  Square,
  MinusSquare,
  LogOut,
  ArrowLeft,
  LayoutDashboard,
  Users,
  Building2,
  Rocket,
  Filter,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

/* ─────────────────────────── Constants ─────────────────────────── */

const PAGE_SIZES = [10, 25, 50, 100];

const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "Corporate", label: "Corporate" },
  { key: "MSME", label: "MSME" },
  { key: "Startup", label: "Startup" },
];

const PAYMENT_FILTERS = [
  { key: "all", label: "All Payments" },
  { key: "verified", label: "Verified" },
  { key: "pending", label: "Pending" },
  { key: "rejected", label: "Rejected" },
];

const COLUMNS = [
  { key: "full_name", label: "Name", sortable: true, sticky: true },
  { key: "participant_type", label: "Category", sortable: true },
  { key: "organization", label: "Organization", sortable: true },
  { key: "designation", label: "Designation", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone", sortable: false },
  { key: "city", label: "City", sortable: true },
  { key: "created_at", label: "Submitted", sortable: true },
  { key: "payment_proof", label: "Screenshot", sortable: false },
  { key: "payment_status", label: "Payment", sortable: true },
];

/* ─────────────────────────── Utilities ─────────────────────────── */

function getCellValue(row, key) {
  if (key === "created_at") return new Date(row.created_at).getTime();
  if (key === "payment_status") return row.payment_status || "pending";
  return (row[key] || "").toString().toLowerCase();
}

function matchesSearch(row, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    (row.full_name || "").toLowerCase().includes(q) ||
    (row.email || "").toLowerCase().includes(q) ||
    (row.organization || "").toLowerCase().includes(q) ||
    (row.city || "").toLowerCase().includes(q) ||
    (row.phone || "").toLowerCase().includes(q) ||
    (row.designation || "").toLowerCase().includes(q)
  );
}

function normalizeProofPath(proofPath) {
  if (!proofPath) return "";

  let normalizedPath = String(proofPath).trim();

  try {
    if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
      const url = new URL(normalizedPath);
      const marker = "/registration-files/";
      const markerIndex = url.pathname.indexOf(marker);

      if (markerIndex >= 0) {
        normalizedPath = url.pathname.slice(markerIndex + marker.length);
      }
    }
  } catch {
    // Keep the original path if it is not a valid URL.
  }

  normalizedPath = normalizedPath.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^registration-files\/+/, "");

  try {
    normalizedPath = decodeURIComponent(normalizedPath);
  } catch {
    // Ignore malformed URI sequences and use the raw path.
  }

  return normalizedPath;
}

function getProofPathCandidates(proofPath) {
  const normalizedPath = normalizeProofPath(proofPath);
  if (!normalizedPath) return [];

  const candidates = new Set([normalizedPath]);
  const baseName = normalizedPath.split("/").pop();

  if (baseName && baseName !== normalizedPath) {
    candidates.add(baseName);
  }

  if (baseName) {
    candidates.add(`proofs/${baseName}`);
  }

  return Array.from(candidates);
}

function downloadCSV(data, filename) {
  if (!data.length) return;
  const headers = [
    "Name", "Category", "Organization", "Designation", "Email", "Phone",
    "City", "Submitted", "Gender", "Sector", "Experience", "Export Experience",
    "Interests", "Participants", "Exhibition", "Accessibility", "Reference",
    "Payment Status", "Amount", "Verified At", "Invoice Number", "Invoice Sent At",
  ];
  const rows = data.map((r) => {
    const q = r.questionnaire ?? {};
    return [
      r.full_name, r.participant_type, r.organization, r.designation,
      r.email, r.phone, r.city,
      new Date(r.created_at).toLocaleString(),
      q.gender, q.sector, q.experience ?? "", q.exportExperience,
      Array.isArray(q.interests) ? q.interests.join("; ") : "",
      q.participantsCount, q.exhibitionInterest, q.accessibilitySupport,
      q.reference || "",
      r.payment_status || "pending",
      r.payment_amount ? `${(r.payment_currency || "INR").toUpperCase()} ${r.payment_amount / 100}` : "",
      r.payment_verified_at ? new Date(r.payment_verified_at).toLocaleString() : "",
      r.invoice_number || "",
      r.invoice_sent_at ? new Date(r.invoice_sent_at).toLocaleString() : "",
    ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",");
  });
  const blob = new Blob([headers.join(",") + "\n" + rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function AdminDashboard({ onBackToSite }) {
  /* ── Auth state ── */
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ── Data state ── */
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [errorMessage, setErrorMessage] = useState("");

  /* ── Table controls ── */
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [proofUrls, setProofUrls] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [activeActionId, setActiveActionId] = useState("");
  const [proofErrorPaths, setProofErrorPaths] = useState({});

  const searchRef = useRef(null);

  /* ── Data fetching ── */
  const fetchRegistrations = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);
    setIsRefreshing(true);
    setErrorMessage("");
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErrorMessage(error.message);
      setRegistrations([]);
    } else {
      setRegistrations(data ?? []);
    }
    setIsLoading(false);
    setTimeout(() => setIsRefreshing(false), 600);
  }, []);

  /* ── Auth lifecycle ── */
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setErrorMessage(error.message);
      const s = data.session ?? null;
      setSession(s);
      setIsLoading(false);
      if (s) void fetchRegistrations();
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s ?? null);
      if (s) void fetchRegistrations();
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [fetchRegistrations]);

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials((c) => ({ ...c, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setIsAuthenticating(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password,
    });
    if (error) setErrorMessage(error.message);
    setIsAuthenticating(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    Object.values(proofUrls).forEach((url) => URL.revokeObjectURL(url));
    await supabase.auth.signOut();
    setRegistrations([]);
    setProofUrls({});
    setProofErrorPaths({});
    setPreviewImage(null);
  };

  const getProofUrl = useCallback(async (proofPath) => {
    const candidates = getProofPathCandidates(proofPath);

    if (!supabase || candidates.length === 0) return "";

    for (const candidate of candidates) {
      if (proofUrls[candidate]) {
        return proofUrls[candidate];
      }

      const { data: publicData } = supabase.storage
        .from("registration-files")
        .getPublicUrl(candidate);

      if (publicData?.publicUrl) {
        setProofUrls((current) => ({
          ...current,
          [candidate]: publicData.publicUrl,
        }));

        return publicData.publicUrl;
      }

      const {
        data: fileData,
        error: downloadError,
      } = await supabase.storage
        .from("registration-files")
        .download(candidate);

      if (!downloadError && fileData) {
        const objectUrl = URL.createObjectURL(fileData);

        setProofUrls((current) => ({
          ...current,
          [candidate]: objectUrl,
        }));
        setProofErrorPaths((current) => {
          if (!current[normalizeProofPath(proofPath)]) return current;
          const next = { ...current };
          delete next[normalizeProofPath(proofPath)];
          return next;
        });

        return objectUrl;
      }

      const {
        data: signedData,
        error: signedError,
      } = await supabase.storage
        .from("registration-files")
        .createSignedUrl(candidate, 60 * 10);

      if (!signedError && signedData?.signedUrl) {
        setProofUrls((current) => ({
          ...current,
          [candidate]: signedData.signedUrl,
        }));
        return signedData.signedUrl;
      }

      const {
        data: functionData,
        error: functionError,
      } = await supabase.functions.invoke("get-registration-proof-url", {
        body: { proofPath: candidate },
      });

      if (!functionError && functionData?.signedUrl) {
        setProofUrls((current) => ({
          ...current,
          [candidate]: functionData.signedUrl,
        }));
        return functionData.signedUrl;
      }
    }

    const lastCandidate = candidates[candidates.length - 1];
    setProofErrorPaths((current) => ({
      ...current,
      [normalizeProofPath(proofPath)]: `Object not found for any candidate path: ${candidates.join(", ")}`,
    }));

    return proofUrls[lastCandidate] || "";
  }, [proofUrls]);

  const openProofPreview = useCallback(async (registration) => {
    const proofPath = normalizeProofPath(registration.questionnaire?.paymentProofPath);
    if (!proofPath) return;

    const signedUrl = await getProofUrl(proofPath);
    if (!signedUrl) return;

    setPreviewImage({
      path: proofPath,
      url: signedUrl,
      name: registration.full_name,
      isPdf: /\.pdf$/i.test(proofPath),
    });
  }, [getProofUrl]);

  const handleVerifyPayment = useCallback(async (registrationId) => {
    if (!supabase) return;
    setActiveActionId(`verify:${registrationId}`);
    setErrorMessage("");

    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "verified",
        payment_verified_at: new Date().toISOString(),
        payment_completed_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    if (error) {
      setErrorMessage(error.message);
    } else {
      await fetchRegistrations();
    }

    setActiveActionId("");
  }, [fetchRegistrations]);

  const handleSendInvoice = useCallback(async (registrationId) => {
    if (!supabase) return;
    setActiveActionId(`invoice:${registrationId}`);
    setErrorMessage("");

    const { error } = await supabase.functions.invoke("send-registration-invoice", {
      body: { registrationId },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      await fetchRegistrations();
    }

    setActiveActionId("");
  }, [fetchRegistrations]);

  /* ── Filtering / sorting / pagination ── */
  const filteredData = useMemo(() => {
    let result = registrations;
    if (search) result = result.filter((r) => matchesSearch(r, search));
    if (categoryFilter !== "all") result = result.filter((r) => r.participant_type === categoryFilter);
    if (paymentFilter !== "all") result = result.filter((r) => (r.payment_status || "pending") === paymentFilter);
    result = [...result].sort((a, b) => {
      const aVal = getCellValue(a, sortKey);
      const bVal = getCellValue(b, sortKey);
      const cmp = typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [registrations, search, categoryFilter, paymentFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedData = filteredData.slice((safePage - 1) * pageSize, safePage * pageSize);

  /* ── Selection ── */
  const allPageSelected = pagedData.length > 0 && pagedData.every((r) => selectedIds.has(r.id));
  const somePageSelected = pagedData.some((r) => selectedIds.has(r.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) { pagedData.forEach((r) => next.delete(r.id)); }
      else { pagedData.forEach((r) => next.add(r.id)); }
      return next;
    });
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Sort handler ── */
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  /* ── Stats ── */
  const participantBreakdown = registrations.reduce((s, r) => {
    const k = r.participant_type || "Other";
    s[k] = (s[k] ?? 0) + 1;
    return s;
  }, {});

  const paidCount = registrations.filter((r) => r.payment_status === "verified").length;

  /* ═══════════════════ RENDER ═══════════════════ */

  return (
    <main className="admin-dashboard">
      <style>{adminStyles}</style>

      {/* ── Full-page video background (login only) ── */}
      {isSupabaseConfigured && !session && (
        <>
          <video
            className="admin-login-video"
            src="/ad.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="admin-login-overlay" />
        </>
      )}

      <div className="admin-container">
        {/* ── Header ── */}
        <header className="admin-header">
          <div className="admin-header__left">
            <div className="admin-header__icon-wrap">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <p className="admin-header__label">Admin Console</p>
              <h1 className="admin-header__title">Registration Dashboard</h1>
            </div>
          </div>
          <div className="admin-header__actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onBackToSite}>
              <ArrowLeft size={16} /> Back to site
            </button>
            {session && (
              <button type="button" className="admin-btn admin-btn--ghost admin-btn--danger" onClick={handleSignOut}>
                <LogOut size={16} /> Sign out
              </button>
            )}
          </div>
        </header>

        {/* ── Not Configured ── */}
        {!isSupabaseConfigured && (
          <Panel>
            <p className="admin-text--muted">
              Supabase is not configured. Add values to <code>.env</code> from <code>.env.example</code>, create the tables in <code>supabase/schema.sql</code>, and reload the app.
            </p>
          </Panel>
        )}

        {/* ── Login ── */}
        {isSupabaseConfigured && !session && (
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="admin-login-card__glow" />
              <div className="admin-login-card__inner">
                {/* Decorative accent bar */}
                <div className="admin-login-card__accent" />

                {/* Floating orbs */}
                <div className="admin-login-orb admin-login-orb--1" />
                <div className="admin-login-orb admin-login-orb--2" />

                <div className="admin-login-card__header">
                  <div className="admin-login-card__icon">
                    <LayoutDashboard size={26} />
                  </div>
                  <p className="admin-login-card__badge">India ESG Summit 2026</p>
                  <h2 className="admin-login-card__title">Welcome Back</h2>
                  <p className="admin-login-card__subtitle">
                    Sign in to access the admin dashboard and manage registrations.
                  </p>
                </div>

                <div className="admin-login-divider">
                  <span className="admin-login-divider__line" />
                  <span className="admin-login-divider__text">Admin Access</span>
                  <span className="admin-login-divider__line" />
                </div>

                <form className="admin-login-form" onSubmit={handleSignIn}>
                  <label className="admin-field">
                    <span className="admin-field__label">Email Address</span>
                    <div className="admin-field__input-wrap">
                      <input
                        className="admin-field__input admin-field__input--has-left-icon"
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={handleCredentialChange}
                        placeholder="admin@example.com"
                        required
                      />
                      <span className="admin-field__left-icon">
                        <Users size={16} />
                      </span>
                    </div>
                  </label>

                  <label className="admin-field">
                    <span className="admin-field__label">Password</span>
                    <div className="admin-field__input-wrap">
                      <input
                        className="admin-field__input admin-field__input--has-left-icon admin-field__input--has-icon"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={handleCredentialChange}
                        placeholder="••••••••"
                        required
                      />
                      <span className="admin-field__left-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </span>
                      <button
                        type="button"
                        className="admin-field__eye"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </label>

                  {errorMessage && (
                    <div className="admin-alert admin-alert--error">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="admin-btn admin-btn--primary admin-btn--full admin-btn--login"
                  >
                    {isAuthenticating ? (
                      <><span className="admin-spinner" /> Signing in...</>
                    ) : (
                      <>
                        <LogOut size={16} style={{ transform: 'rotate(180deg)' }} />
                        Sign in to Dashboard
                      </>
                    )}
                  </button>
                </form>

                <p className="admin-login-card__footer">
                  Protected area · Authorized personnel only
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Dashboard Content ── */}
        {isSupabaseConfigured && session && (
          <section className="admin-content">
            {errorMessage && (
              <div className="admin-alert admin-alert--error">{errorMessage}</div>
            )}

            {/* ── Stat Cards ── */}
            <div className="admin-stats-grid">
              <StatCard icon={<Users size={20} />} label="Total Registrations" value={registrations.length} accent="emerald" />
              <StatCard icon={<Building2 size={20} />} label="Corporate" value={participantBreakdown.Corporate ?? 0} accent="blue" />
              <StatCard icon={<Rocket size={20} />} label="MSME" value={participantBreakdown.MSME ?? 0} accent="violet" />
              <StatCard icon={<CheckSquare size={20} />} label="Verified" value={paidCount} accent="amber" />
            </div>

            {/* ── Table Panel ── */}
            <Panel>
              {/* Toolbar */}
              <div className="admin-toolbar">
                <div className="admin-toolbar__left">
                  <div className="admin-search">
                    <Search size={16} className="admin-search__icon" />
                    <input
                      ref={searchRef}
                      className="admin-search__input"
                      type="text"
                      placeholder="Search by name, email, org, city..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                    {search && (
                      <button type="button" className="admin-search__clear" onClick={() => { setSearch(""); setCurrentPage(1); searchRef.current?.focus(); }}>
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Category pills */}
                  <div className="admin-filter-pills">
                    <Filter size={14} className="admin-filter-pills__icon" />
                    {CATEGORY_FILTERS.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        className={`admin-pill ${categoryFilter === f.key ? "admin-pill--active" : ""}`}
                        onClick={() => {
                          setCategoryFilter(f.key);
                          setCurrentPage(1);
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment filter */}
                  <div className="admin-filter-pills">
                    {PAYMENT_FILTERS.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        className={`admin-pill admin-pill--payment ${paymentFilter === f.key ? "admin-pill--active" : ""}`}
                        onClick={() => {
                          setPaymentFilter(f.key);
                          setCurrentPage(1);
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="admin-toolbar__right">
                  <span className="admin-toolbar__count">
                    {filteredData.length} of {registrations.length} results
                  </span>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={fetchRegistrations}
                    title="Refresh data"
                  >
                    <RefreshCw size={15} className={isRefreshing ? "admin-spin" : ""} />
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={() => downloadCSV(filteredData, `registrations-${Date.now()}.csv`)}
                    title="Export as CSV"
                  >
                    <Download size={15} /> Export
                  </button>
                </div>
              </div>

              {/* Bulk actions bar */}
              {selectedIds.size > 0 && (
                <div className="admin-bulk-bar">
                  <span className="admin-bulk-bar__text">
                    {selectedIds.size} row{selectedIds.size > 1 ? "s" : ""} selected
                  </span>
                  <button
                    type="button"
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={() => {
                      const selected = registrations.filter((r) => selectedIds.has(r.id));
                      downloadCSV(selected, `selected-registrations-${Date.now()}.csv`);
                    }}
                  >
                    <Download size={14} /> Export Selected
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => setSelectedIds(new Set())}
                  >
                    Deselect All
                  </button>
                </div>
              )}

              {/* Table */}
              {isLoading ? (
                <SkeletonTable />
              ) : filteredData.length === 0 ? (
                <div className="admin-empty">
                  <div className="admin-empty__icon">
                    <Users size={40} strokeWidth={1} />
                  </div>
                  <p className="admin-empty__title">No registrations found</p>
                  <p className="admin-empty__subtitle">
                    {search || categoryFilter !== "all" || paymentFilter !== "all"
                      ? "Try adjusting your search or filters."
                      : "Registrations will appear here once submitted."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="admin-table-scroll">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th className="admin-th admin-th--check">
                            <button type="button" className="admin-check-btn" onClick={toggleSelectAll}>
                              {allPageSelected ? <CheckSquare size={16} /> : somePageSelected ? <MinusSquare size={16} /> : <Square size={16} />}
                            </button>
                          </th>
                          {COLUMNS.map((col) => (
                            <th
                              key={col.key}
                              className={`admin-th ${col.sortable ? "admin-th--sortable" : ""} ${col.sticky ? "admin-th--sticky" : ""}`}
                              onClick={() => col.sortable && handleSort(col.key)}
                            >
                              <span className="admin-th__inner">
                                {col.label}
                                {col.sortable && (
                                  <span className="admin-th__sort-icon">
                                    {sortKey === col.key ? (
                                      sortDir === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />
                                    ) : (
                                      <ArrowUpDown size={13} />
                                    )}
                                  </span>
                                )}
                              </span>
                            </th>
                          ))}
                          <th className="admin-th">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedData.map((reg, idx) => {
                          const isExpanded = expandedRow === reg.id;
                          const isSelected = selectedIds.has(reg.id);
                          return (
                            <TableRow
                              key={reg.id}
                              reg={reg}
                              idx={idx}
                              isExpanded={isExpanded}
                              isSelected={isSelected}
                              activeActionId={activeActionId}
                              onPreviewProof={() => openProofPreview(reg)}
                              getProofUrl={getProofUrl}
                              proofError={proofErrorPaths[normalizeProofPath(reg.questionnaire?.paymentProofPath)] || ""}
                              onVerifyPayment={() => handleVerifyPayment(reg.id)}
                              onSendInvoice={() => handleSendInvoice(reg.id)}
                              onExpand={() => setExpandedRow(isExpanded ? null : reg.id)}
                              onSelect={() => toggleSelect(reg.id)}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="admin-pagination">
                    <div className="admin-pagination__left">
                      <span className="admin-pagination__label">Rows per page</span>
                      <select
                        className="admin-pagination__select"
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                      >
                        {PAGE_SIZES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-pagination__center">
                      <span className="admin-pagination__info">
                        Page {safePage} of {totalPages}
                      </span>
                    </div>
                    <div className="admin-pagination__right">
                      <button className="admin-page-btn" disabled={safePage <= 1} onClick={() => setCurrentPage(1)}><ChevronsLeft size={16} /></button>
                      <button className="admin-page-btn" disabled={safePage <= 1} onClick={() => setCurrentPage((p) => p - 1)}><ChevronLeft size={16} /></button>
                      <button className="admin-page-btn" disabled={safePage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}><ChevronRight size={16} /></button>
                      <button className="admin-page-btn" disabled={safePage >= totalPages} onClick={() => setCurrentPage(totalPages)}><ChevronsRight size={16} /></button>
                    </div>
                  </div>
                </>
              )}
            </Panel>
          </section>
        )}
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
          <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                  Payment Proof
                </p>
                <p className="mt-1 text-sm text-stone-400">{previewImage.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="admin-btn admin-btn--ghost admin-btn--sm"
              >
                Close
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              {previewImage.isPdf ? (
                <iframe
                  src={previewImage.url}
                  title="Payment proof preview"
                  className="h-[75vh] w-full"
                />
              ) : (
                <img
                  src={previewImage.url}
                  alt="Payment proof preview"
                  className="max-h-[75vh] w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ── Panel ── */
function Panel({ children, className = "" }) {
  return <section className={`admin-panel ${className}`}>{children}</section>;
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`admin-stat admin-stat--${accent}`}>
      <div className="admin-stat__icon">{icon}</div>
      <div>
        <p className="admin-stat__value">{value}</p>
        <p className="admin-stat__label">{label}</p>
      </div>
    </div>
  );
}

/* ── Table Row ── */
function TableRow({
  reg,
  idx,
  isExpanded,
  isSelected,
  onExpand,
  onSelect,
  onPreviewProof,
  getProofUrl,
  proofError,
  onVerifyPayment,
  onSendInvoice,
  activeActionId,
}) {
  const q = reg.questionnaire ?? {};
  const isVerifying = activeActionId === `verify:${reg.id}`;
  const isSendingInvoice = activeActionId === `invoice:${reg.id}`;
  const canSendInvoice = reg.payment_status === "verified";
  const hasProof = Boolean(q.paymentProofPath);
  return (
    <>
      <tr className={`admin-row ${idx % 2 === 0 ? "admin-row--even" : ""} ${isSelected ? "admin-row--selected" : ""} ${isExpanded ? "admin-row--expanded" : ""}`}>
        <td className="admin-td admin-td--check">
          <button type="button" className="admin-check-btn" onClick={onSelect}>
            {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
          </button>
        </td>
        <td className="admin-td admin-td--sticky admin-td--name">
          <p className="admin-td__primary">{reg.full_name || "—"}</p>
          <p className="admin-td__secondary">ID: {reg.id?.slice(0, 8)}</p>
        </td>
        <td className="admin-td">
          <CategoryBadge type={reg.participant_type} />
        </td>
        <td className="admin-td">{reg.organization || "—"}</td>
        <td className="admin-td">{reg.designation || "—"}</td>
        <td className="admin-td">
          <span className="admin-td__email">{reg.email || "—"}</span>
        </td>
        <td className="admin-td">{reg.phone || "—"}</td>
        <td className="admin-td">{reg.city || "—"}</td>
        <td className="admin-td">
          <p className="admin-td__primary">{new Date(reg.created_at).toLocaleDateString()}</p>
          <p className="admin-td__secondary">{new Date(reg.created_at).toLocaleTimeString()}</p>
        </td>
        <td className="admin-td">
          <ProofThumbnail
            proofPath={q.paymentProofPath}
            getProofUrl={getProofUrl}
            proofError={proofError}
            onClick={onPreviewProof}
          />
        </td>
        <td className="admin-td">
          <PaymentBadge status={reg.payment_status} amount={reg.payment_amount} currency={reg.payment_currency} />
        </td>
        <td className="admin-td">
          <button type="button" className={`admin-expand-btn ${isExpanded ? "admin-expand-btn--active" : ""}`} onClick={onExpand} title="View details">
            <ChevronRightIcon size={16} />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="admin-detail-row">
          <td colSpan={COLUMNS.length + 2}>
            <div className="admin-detail">
              <div className="admin-detail__grid">
                <DetailItem label="Gender" value={q.gender} />
                <DetailItem label="Sector" value={q.sector} />
                <DetailItem label="Experience" value={q.experience != null ? `${q.experience} years` : null} />
                <DetailItem label="Export Experience" value={q.exportExperience} />
                <DetailItem label="Interests" value={Array.isArray(q.interests) ? q.interests.join(", ") : null} span />
                <DetailItem label="Participants" value={q.participantsCount} />
                <DetailItem label="Exhibition Interest" value={q.exhibitionInterest} />
                <DetailItem label="Accessibility Support" value={q.accessibilitySupport} />
                <DetailItem label="Reference" value={q.reference} />
                <DetailItem label="Payment Proof" value={q.paymentProofPath ? "Uploaded" : "Not uploaded"} />
                <DetailItem label="Proof Path" value={q.paymentProofPath} span />
                <DetailItem label="Verified At" value={reg.payment_verified_at ? new Date(reg.payment_verified_at).toLocaleString() : null} />
                <DetailItem label="Invoice Number" value={reg.invoice_number} />
                <DetailItem
                  label="Paid At"
                  value={reg.payment_completed_at ? new Date(reg.payment_completed_at).toLocaleString() : null}
                />
              </div>

              <div className="admin-detail__actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--outline admin-btn--sm"
                  onClick={onPreviewProof}
                  disabled={!hasProof}
                >
                  View Screenshot
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--primary admin-btn--sm"
                  onClick={onVerifyPayment}
                  disabled={!hasProof || reg.payment_status === "verified" || isVerifying}
                >
                  {isVerifying ? "Verifying..." : reg.payment_status === "verified" ? "Payment Verified" : "Mark Verified"}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--outline admin-btn--sm"
                  onClick={onSendInvoice}
                  disabled={!canSendInvoice || isSendingInvoice}
                >
                  {isSendingInvoice ? "Sending..." : reg.invoice_sent_at ? "Resend Invoice" : "Send Invoice"}
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ── Detail Item ── */
function DetailItem({ label, value, span }) {
  return (
    <div className={`admin-detail__item ${span ? "admin-detail__item--span" : ""}`}>
      <p className="admin-detail__label">{label}</p>
      <p className="admin-detail__value">{value || "Not provided"}</p>
    </div>
  );
}

/* ── Category Badge ── */
function CategoryBadge({ type }) {
  const t = type || "Other";
  const colorMap = {
    Corporate: "blue", MSME: "violet", Startup: "amber",
  };
  const color = colorMap[t] || "stone";
  return <span className={`admin-badge admin-badge--${color}`}>{t}</span>;
}

/* ── Payment Badge ── */
function PaymentBadge({ status, amount, currency }) {
  const s = status || "pending";
  const colorMap = { verified: "emerald", paid: "emerald", pending: "amber", failed: "red", rejected: "red" };
  const color = colorMap[s] || "stone";
  return (
    <div>
      <span className={`admin-badge admin-badge--${color}`}>
        <span className={`admin-badge__dot admin-badge__dot--${color}`} />
        {s}
      </span>
      {amount ? (
        <p className="admin-td__secondary" style={{ marginTop: 4 }}>
          {(currency || "INR").toUpperCase()} {amount / 100}
        </p>
      ) : null}
    </div>
  );
}

function ProofThumbnail({ proofPath, getProofUrl, proofError, onClick }) {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [hasRenderError, setHasRenderError] = useState(false);
  const normalizedPath = normalizeProofPath(proofPath);

  useEffect(() => {
    let cancelled = false;

    if (!normalizedPath) return undefined;

    getProofUrl(normalizedPath).then((url) => {
      if (!cancelled && url) {
        setThumbnailUrl(url);
        setHasRenderError(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [getProofUrl, normalizedPath]);

  if (!normalizedPath) {
    return <span className="admin-td__secondary">Not uploaded</span>;
  }

  const isPdf = /\.pdf$/i.test(normalizedPath);
  const shouldShowFallback = Boolean(proofError) || hasRenderError;

  return (
    <button
      type="button"
      className="admin-proof-thumb"
      onClick={onClick}
      title="Open payment screenshot"
    >
      {isPdf ? (
        <div className="admin-proof-thumb__pdf">PDF</div>
      ) : shouldShowFallback ? (
        <div className="admin-proof-thumb__loading">NA</div>
      ) : thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="Payment screenshot thumbnail"
          className="admin-proof-thumb__image"
          onError={() => setHasRenderError(true)}
        />
      ) : (
        <div className="admin-proof-thumb__loading">...</div>
      )}
    </button>
  );
}

/* ── Skeleton Table ── */
function SkeletonTable() {
  return (
    <div className="admin-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="admin-skeleton__row" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="admin-skeleton__cell admin-skeleton__cell--sm" />
          <div className="admin-skeleton__cell admin-skeleton__cell--lg" />
          <div className="admin-skeleton__cell admin-skeleton__cell--md" />
          <div className="admin-skeleton__cell admin-skeleton__cell--md" />
          <div className="admin-skeleton__cell admin-skeleton__cell--lg" />
          <div className="admin-skeleton__cell admin-skeleton__cell--sm" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STYLES (scoped to .admin-dashboard)
   ═══════════════════════════════════════════════════════════════════ */

const adminStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.admin-dashboard {
  min-height: 100vh;
  background: #0c0a09;
  color: #e7e5e4;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.admin-container {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  overflow: hidden;
  box-sizing: border-box;
}
@media (min-width: 640px) {
  .admin-container { padding: 32px 24px 60px; }
}

/* ── Header ── */
.admin-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}
.admin-header__left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.admin-header__icon-wrap {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  border-radius: 12px;
  color: #0c0a09;
  flex-shrink: 0;
}
.admin-header__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #67e8f9;
}
.admin-header__title {
  font-size: 22px;
  font-weight: 700;
  color: #fafaf9;
  line-height: 1.2;
}
.admin-header__actions {
  display: flex;
  gap: 8px;
}

/* ── Buttons ── */
.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.admin-btn--ghost {
  background: transparent;
  color: #a8a29e;
  border: 1px solid rgba(255,255,255,0.08);
}
.admin-btn--ghost:hover { background: rgba(255,255,255,0.05); color: #e7e5e4; border-color: rgba(255,255,255,0.15); }
.admin-btn--danger:hover { color: #fca5a5; border-color: rgba(252,165,165,0.25); }
.admin-btn--outline {
  background: transparent;
  color: #67e8f9;
  border: 1px solid rgba(103,232,249,0.25);
}
.admin-btn--outline:hover { background: rgba(103,232,249,0.08); border-color: rgba(103,232,249,0.4); }
.admin-btn--primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: #0c0a09;
  font-weight: 600;
  border: none;
  box-shadow: 0 0 20px rgba(6,182,212,0.2);
}
.admin-btn--primary:hover { box-shadow: 0 0 30px rgba(6,182,212,0.35); transform: translateY(-1px); }
.admin-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
.admin-btn--full { width: 100%; justify-content: center; padding: 12px; }
.admin-btn--sm { padding: 6px 10px; font-size: 12px; border-radius: 8px; }

/* ── Panel ── */
.admin-panel {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  min-width: 0;
  overflow: hidden;
}
@media (min-width: 640px) { .admin-panel { padding: 24px; } }

/* ── Text helpers ── */
.admin-text--muted { font-size: 14px; color: #78716c; }
.admin-text--muted code { background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-size: 12px; }

/* ─────── Login ─────── */
.admin-login-wrapper {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  min-height: 70vh;
}
.admin-login-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.admin-login-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.14) 0%, rgba(12,10,9,0.55) 50%, rgba(12,10,9,0.7) 100%);
}
.admin-login-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 440px;
}
.admin-login-card__glow {
  position: absolute;
  inset: -1.5px;
  border-radius: 24px;
  background: conic-gradient(from 180deg, rgba(6,182,212,0.4), rgba(14,116,144,0.08), rgba(34,211,238,0.25), rgba(103,232,249,0.12), rgba(6,182,212,0.35));
  z-index: 0;
  filter: blur(0.5px);
  animation: admin-glow-rotate 8s linear infinite;
}
@keyframes admin-glow-rotate {
  from { filter: blur(0.5px) hue-rotate(0deg); }
  to { filter: blur(0.5px) hue-rotate(360deg); }
}
.admin-login-card__inner {
  position: relative;
  z-index: 1;
  background: rgba(20,17,15,0.88);
  border-radius: 24px;
  padding: 0 36px 36px;
  backdrop-filter: blur(24px);
  overflow: hidden;
}

/* Accent bar at top */
.admin-login-card__accent {
  height: 3px;
  margin: 0 -36px 32px;
  background: linear-gradient(90deg, transparent, #06b6d4 30%, #22d3ee 50%, #06b6d4 70%, transparent);
  opacity: 0.8;
}

/* Floating orbs */
.admin-login-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}
.admin-login-orb--1 {
  width: 120px; height: 120px;
  top: -30px; right: -20px;
  background: rgba(6,182,212,0.12);
  animation: admin-orb-float 6s ease-in-out infinite;
}
.admin-login-orb--2 {
  width: 80px; height: 80px;
  bottom: 20px; left: -10px;
  background: rgba(34,211,238,0.08);
  animation: admin-orb-float 8s ease-in-out infinite reverse;
}
@keyframes admin-orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(8px, -12px) scale(1.1); }
}

.admin-login-card__header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}
.admin-login-card__icon {
  width: 52px; height: 52px;
  margin: 0 auto 14px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  border-radius: 16px;
  color: #0c0a09;
  box-shadow: 0 4px 20px rgba(6,182,212,0.3);
}
.admin-login-card__badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #67e8f9;
  background: rgba(6,182,212,0.1);
  border: 1px solid rgba(6,182,212,0.2);
  border-radius: 20px;
  padding: 4px 14px;
  margin-bottom: 14px;
}
.admin-login-card__title {
  font-size: 26px;
  font-weight: 700;
  color: #fafaf9;
  letter-spacing: -0.02em;
}
.admin-login-card__subtitle {
  font-size: 13px;
  color: #78716c;
  margin-top: 8px;
  line-height: 1.5;
}

/* Divider */
.admin-login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}
.admin-login-divider__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
.admin-login-divider__text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #57534e;
  white-space: nowrap;
}

.admin-login-form {
  display: grid;
  gap: 18px;
  position: relative;
  z-index: 1;
}

/* Footer */
.admin-login-card__footer {
  text-align: center;
  margin-top: 24px;
  font-size: 11px;
  color: #44403c;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 1;
}

/* Login button extra */
.admin-btn--login {
  padding: 13px;
  font-size: 14px;
  border-radius: 12px;
  margin-top: 4px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  box-shadow: 0 0 20px rgba(6,182,212,0.25);
}
.admin-btn--login:hover {
  box-shadow: 0 0 30px rgba(6,182,212,0.4);
}

/* ── Field ── */
.admin-field { display: grid; gap: 6px; }
.admin-field__label {
  font-size: 12px;
  font-weight: 600;
  color: #a8a29e;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.admin-field__input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 11px 14px;
  color: #fafaf9;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.admin-field__input::placeholder { color: #57534e; }
.admin-field__input:focus {
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
}
.admin-field__input-wrap { position: relative; }
.admin-field__input--has-icon { padding-right: 40px; }
.admin-field__input--has-left-icon { padding-left: 40px; }
.admin-field__left-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #57534e;
  display: grid;
  place-items: center;
  pointer-events: none;
  transition: color 0.2s;
}
.admin-field__input:focus ~ .admin-field__left-icon,
.admin-field__input--has-left-icon:focus + .admin-field__left-icon { color: #06b6d4; }
.admin-field__eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #78716c;
  cursor: pointer;
  padding: 4px;
  display: grid; place-items: center;
  transition: color 0.15s;
}
.admin-field__eye:hover { color: #a8a29e; }

/* ── Alert ── */
.admin-alert {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.4;
}
.admin-alert--error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
  color: #fca5a5;
}

/* ── Spinner ── */
.admin-spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(0,0,0,0.2);
  border-top-color: #0c0a09;
  border-radius: 50%;
  animation: admin-spin-anim 0.6s linear infinite;
}
@keyframes admin-spin-anim { to { transform: rotate(360deg); } }
.admin-spin { animation: admin-spin-anim 0.8s linear infinite; }

/* ─────── Stats Grid ─────── */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  min-width: 0;
}
@media (min-width: 768px) { .admin-stats-grid { grid-template-columns: repeat(4, 1fr); } }

.admin-stat {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, transform 0.25s;
}
.admin-stat:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
.admin-stat__icon {
  width: 42px; height: 42px;
  display: grid; place-items: center;
  border-radius: 12px;
  flex-shrink: 0;
}
.admin-stat--emerald .admin-stat__icon { background: rgba(6,182,212,0.12); color: #67e8f9; }
.admin-stat--blue .admin-stat__icon { background: rgba(59,130,246,0.12); color: #93c5fd; }
.admin-stat--violet .admin-stat__icon { background: rgba(139,92,246,0.12); color: #c4b5fd; }
.admin-stat--amber .admin-stat__icon { background: rgba(245,158,11,0.12); color: #fcd34d; }
.admin-stat__value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: #fafaf9;
}
.admin-stat__label {
  font-size: 12px;
  color: #78716c;
  margin-top: 4px;
  font-weight: 500;
}

/* ─────── Toolbar ─────── */
.admin-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.admin-toolbar__left {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
}
.admin-toolbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.admin-toolbar__count {
  font-size: 12px;
  color: #78716c;
  white-space: nowrap;
}

/* Search */
.admin-search {
  position: relative;
  width: 100%;
  max-width: 300px;
}
.admin-search__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #57534e;
  pointer-events: none;
}
.admin-search__input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 8px 34px 8px 36px;
  color: #fafaf9;
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}
.admin-search__input:focus {
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6,182,212,0.1);
}
.admin-search__input::placeholder { color: #57534e; }
.admin-search__clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.08);
  border: none;
  color: #a8a29e;
  cursor: pointer;
  width: 20px; height: 20px;
  display: grid; place-items: center;
  border-radius: 50%;
  transition: background 0.15s;
}
.admin-search__clear:hover { background: rgba(255,255,255,0.15); }

/* Filter pills */
.admin-filter-pills {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
.admin-filter-pills__icon { color: #57534e; flex-shrink: 0; }
.admin-pill {
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.06);
  background: transparent;
  color: #78716c;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.admin-pill:hover { border-color: rgba(255,255,255,0.15); color: #a8a29e; }
.admin-pill--active {
  background: rgba(6,182,212,0.1);
  border-color: rgba(6,182,212,0.3);
  color: #67e8f9;
}

/* ── Bulk bar ── */
.admin-bulk-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  background: rgba(6,182,212,0.06);
  border: 1px solid rgba(6,182,212,0.15);
}
.admin-bulk-bar__text { font-size: 13px; color: #67e8f9; font-weight: 500; }

/* ─────── Table ─────── */
.admin-table-scroll {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
  margin: 0 -20px;
  padding: 0 20px;
}
.admin-table-scroll::-webkit-scrollbar { height: 6px; }
.admin-table-scroll::-webkit-scrollbar-track { background: transparent; }
.admin-table-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
.admin-table-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

.admin-table {
  width: 100%;
  min-width: 1100px;
  border-collapse: collapse;
  border-spacing: 0;
}

/* Thead */
.admin-th {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(28,25,23,0.92);
  backdrop-filter: blur(12px);
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #57534e;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  white-space: nowrap;
  user-select: none;
}
.admin-th--check { width: 40px; }
.admin-th--sortable { cursor: pointer; transition: color 0.15s; }
.admin-th--sortable:hover { color: #a8a29e; }
.admin-th__inner {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.admin-th__sort-icon { opacity: 0.4; transition: opacity 0.15s; }
.admin-th--sortable:hover .admin-th__sort-icon { opacity: 0.8; }

/* Tbody */
.admin-td {
  padding: 12px 14px;
  font-size: 13px;
  color: #d6d3d1;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  vertical-align: top;
  white-space: nowrap;
}
.admin-td--check { width: 40px; }
.admin-td--name { min-width: 160px; }
.admin-td__primary { font-weight: 500; color: #e7e5e4; }
.admin-td__secondary { font-size: 11px; color: #57534e; margin-top: 2px; }
.admin-td__email { color: #a8a29e; }

/* Row states */
.admin-row { transition: background 0.15s; }
.admin-row--even { background: rgba(255,255,255,0.015); }
.admin-row:hover { background: rgba(6,182,212,0.04); }
.admin-row--selected { background: rgba(6,182,212,0.06) !important; }
.admin-row--expanded { background: rgba(6,182,212,0.04) !important; }
.admin-row:hover .admin-td:first-child {
  box-shadow: inset 3px 0 0 #06b6d4;
}

/* Checkbox btn */
.admin-check-btn {
  background: none;
  border: none;
  color: #57534e;
  cursor: pointer;
  padding: 2px;
  display: grid; place-items: center;
  transition: color 0.15s;
}
.admin-check-btn:hover { color: #67e8f9; }
.admin-row--selected .admin-check-btn { color: #67e8f9; }

/* Expand btn */
.admin-expand-btn {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: #78716c;
  width: 28px; height: 28px;
  border-radius: 8px;
  cursor: pointer;
  display: grid; place-items: center;
  transition: all 0.2s;
}
.admin-expand-btn:hover { background: rgba(255,255,255,0.08); color: #e7e5e4; }
.admin-expand-btn--active {
  background: rgba(6,182,212,0.1);
  border-color: rgba(6,182,212,0.3);
  color: #67e8f9;
  transform: rotate(90deg);
}

/* ── Detail row ── */
.admin-detail-row td {
  padding: 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.admin-detail {
  padding: 16px 20px 20px;
  background: rgba(6,182,212,0.02);
  border-top: 1px solid rgba(6,182,212,0.08);
  animation: admin-slide-down 0.25s ease;
}
@keyframes admin-slide-down {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.admin-detail__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.admin-detail__actions {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.admin-detail__item {}
.admin-detail__item--span { grid-column: 1 / -1; }
.admin-detail__label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #57534e;
  margin-bottom: 3px;
}
.admin-detail__value {
  font-size: 13px;
  color: #d6d3d1;
  word-break: break-all;
}

/* ── Badge ── */
.admin-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.admin-badge__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.admin-badge--emerald { background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.25); color: #67e8f9; }
.admin-badge__dot--emerald { background: #06b6d4; box-shadow: 0 0 6px rgba(6,182,212,0.6); }
.admin-badge--amber { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
.admin-badge__dot--amber { background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,0.6); }
.admin-badge--red { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #fca5a5; }
.admin-badge__dot--red { background: #ef4444; box-shadow: 0 0 6px rgba(239,68,68,0.6); }
.admin-badge--blue { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25); color: #93c5fd; }
.admin-badge--violet { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.25); color: #c4b5fd; }
.admin-badge--stone { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #a8a29e; }

.admin-proof-thumb {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
}
.admin-proof-thumb:hover {
  border-color: rgba(6,182,212,0.45);
  transform: translateY(-1px);
}
.admin-proof-thumb__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.admin-proof-thumb__pdf,
.admin-proof-thumb__loading {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #d6d3d1;
}

/* ─────── Pagination ─────── */
.admin-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.admin-pagination__left,
.admin-pagination__right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.admin-pagination__center { flex: 1; text-align: center; }
.admin-pagination__label { font-size: 12px; color: #78716c; }
.admin-pagination__info { font-size: 13px; color: #a8a29e; font-weight: 500; }
.admin-pagination__select {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 4px 8px;
  color: #d6d3d1;
  font-size: 12px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.admin-pagination__select:focus { border-color: #06b6d4; }
.admin-pagination__select option { background: #1c1917; }

.admin-page-btn {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: #a8a29e;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.admin-page-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.08);
  color: #e7e5e4;
  border-color: rgba(255,255,255,0.15);
}
.admin-page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ─────── Skeleton ─────── */
.admin-skeleton { padding: 8px 0; }
.admin-skeleton__row {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  animation: admin-shimmer 1.4s ease-in-out infinite;
}
@keyframes admin-shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
.admin-skeleton__cell {
  height: 14px;
  background: rgba(255,255,255,0.06);
  border-radius: 6px;
}
.admin-skeleton__cell--sm { width: 50px; }
.admin-skeleton__cell--md { width: 100px; }
.admin-skeleton__cell--lg { width: 160px; flex-shrink: 1; }

/* ─────── Empty ─────── */
.admin-empty {
  text-align: center;
  padding: 48px 16px;
}
.admin-empty__icon {
  width: 72px; height: 72px;
  margin: 0 auto 16px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  color: #57534e;
}
.admin-empty__title {
  font-size: 16px;
  font-weight: 600;
  color: #a8a29e;
  margin-bottom: 4px;
}
.admin-empty__subtitle {
  font-size: 13px;
  color: #57534e;
}

/* ─────── Content spacing ─────── */
.admin-content { display: grid; gap: 20px; min-width: 0; }
`;
