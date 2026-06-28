import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { NV } from '@/constants/testIds';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const INTENTS = [
  { value: 'platform-evaluation', label: 'Platform evaluation' },
  { value: 'architecture-review', label: 'Architecture review' },
  { value: 'pilot-program', label: 'Pilot program' },
  { value: 'partnership', label: 'Strategic partnership' },
  { value: 'general-inquiry', label: 'General inquiry' },
];

const initial = {
  name: '',
  work_email: '',
  company: '',
  role: '',
  intent: 'platform-evaluation',
  message: '',
};

export default function BriefingDialog({ open, onOpenChange }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const reset = () => {
    setForm(initial);
    setSuccess(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/briefings`, form);
      setSuccess(true);
      toast.success('Briefing request received', {
        description: 'A member of our team will reach out within one business day.',
      });
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        'Something went wrong. Please try again.';
      toast.error('Unable to submit', {
        description: typeof detail === 'string' ? detail : 'Please verify your details and retry.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogContent
        data-testid={NV.briefingDialog}
        className="bg-[var(--nv-surface-1)] border-[var(--nv-border-subtle)] text-[var(--nv-text-primary)] max-w-xl p-0 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-none"
      >
        {/* hairline frame */}
        <div className="p-8 sm:p-10">
          <DialogHeader className="text-left mb-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[var(--nv-border-strong)]" />
              <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
                Briefing · Confidential
              </span>
            </div>
            <DialogTitle className="nv-display text-white text-2xl sm:text-3xl tracking-tight">
              Request a Briefing
            </DialogTitle>
            <DialogDescription className="text-[var(--nv-text-secondary)] mt-2 text-[14px] leading-relaxed">
              Tell us where you are headed. A member of our team will respond
              within one business day.
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div
              data-testid={NV.briefingSuccess}
              className="mt-8 border border-[var(--nv-border-subtle)] p-6 bg-[var(--nv-surface-2)]"
            >
              <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
                Received · 200 OK
              </span>
              <h4 className="nv-display text-white text-lg mt-3">
                Thank you. Your request is logged.
              </h4>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
                We treat every briefing request with the same discipline we
                apply to our platform. You will hear from us shortly at{' '}
                <span className="text-white">{form.work_email}</span>.
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-6 nv-btn-ghost"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full name" required>
                  <input
                    data-testid={NV.briefingFieldName}
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={inputCls}
                    placeholder="Ada Lovelace"
                  />
                </Field>
                <Field label="Work email" required>
                  <input
                    data-testid={NV.briefingFieldEmail}
                    type="email"
                    required
                    value={form.work_email}
                    onChange={(e) => set('work_email', e.target.value)}
                    className={inputCls}
                    placeholder="ada@institution.com"
                  />
                </Field>
                <Field label="Company" required>
                  <input
                    data-testid={NV.briefingFieldCompany}
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    className={inputCls}
                    placeholder="Institution Group"
                  />
                </Field>
                <Field label="Role" required>
                  <input
                    data-testid={NV.briefingFieldRole}
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => set('role', e.target.value)}
                    className={inputCls}
                    placeholder="Chief Architect"
                  />
                </Field>
              </div>

              <Field label="Intent" required>
                <select
                  data-testid={NV.briefingFieldIntent}
                  required
                  value={form.intent}
                  onChange={(e) => set('intent', e.target.value)}
                  className={`${inputCls} appearance-none cursor-pointer pr-10`}
                >
                  {INTENTS.map((i) => (
                    <option key={i.value} value={i.value} className="bg-[var(--nv-surface-1)] text-white">
                      {i.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Context (optional)">
                <textarea
                  data-testid={NV.briefingFieldMessage}
                  rows={3}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className={`${inputCls} resize-none`}
                  placeholder="A few sentences on what you are stewarding."
                />
              </Field>

              <div className="flex items-center justify-between gap-3 pt-3">
                <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
                  Encrypted · Stored under residency
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-testid={NV.briefingCancel}
                    onClick={() => onOpenChange(false)}
                    className="nv-btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-testid={NV.briefingSubmit}
                    disabled={submitting}
                    className="nv-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting…' : 'Submit Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  'w-full bg-[var(--nv-bg)] border border-[var(--nv-border-subtle)] rounded-none px-3.5 py-3 text-[14px] text-white placeholder:text-[var(--nv-text-muted)] focus:outline-none focus:border-[var(--nv-accent-azure)] focus:ring-1 focus:ring-[var(--nv-accent-azure)]/40 transition-colors';

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
        {label}
        {required && <span className="text-[var(--nv-accent-azure)] ml-1">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
