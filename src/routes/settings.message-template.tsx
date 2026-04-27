import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, Save, Check, MessageCircle, Copy } from "lucide-react";
import {
  DEFAULT_TEMPLATE,
  PLACEHOLDERS,
  buildSampleVars,
  loadTemplate,
  renderTemplate,
  resetTemplate,
  saveTemplate,
} from "@/lib/whatsapp-template";
import { formatPrice } from "@/lib/menu-data";

export const Route = createFileRoute("/settings/message-template")({
  head: () => ({
    meta: [
      { title: "WhatsApp Message Template — Delicious Bites" },
      { name: "description", content: "Customize the WhatsApp message sent when customers place an order." },
      { property: "og:title", content: "WhatsApp Message Template" },
      { property: "og:description", content: "Customize how new orders are sent to WhatsApp." },
    ],
  }),
  component: TemplateEditorPage,
});

function TemplateEditorPage() {
  const [value, setValue] = useState<string>(DEFAULT_TEMPLATE);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(loadTemplate());
    setHydrated(true);
  }, []);

  const sampleVars = useMemo(() => buildSampleVars(formatPrice), []);
  const preview = useMemo(() => renderTemplate(value, sampleVars), [value, sampleVars]);

  const onSave = () => {
    saveTemplate(value);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const onReset = () => {
    resetTemplate();
    setValue(DEFAULT_TEMPLATE);
    setSaved(false);
  };

  const insertPlaceholder = (key: string) => {
    const ta = textareaRef.current;
    const token = `{${key}}`;
    if (!ta) {
      setValue((v) => v + token);
      return;
    }
    const start = ta.selectionStart ?? value.length;
    const end = ta.selectionEnd ?? value.length;
    const next = value.slice(0, start) + token + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + token.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const copyPreview = async () => {
    try {
      await navigator.clipboard.writeText(preview);
    } catch {
      // ignore
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">WhatsApp Message Template</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Customize the message sent to <span className="font-semibold">0303 083 83 89</span> when a
            customer places an order. Use placeholders like <code className="px-1 rounded bg-muted">{"{name}"}</code> and they'll be filled in automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary/40 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!hydrated}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Editor + placeholders */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <label htmlFor="tpl" className="text-sm font-semibold">
              Template
            </label>
            <textarea
              id="tpl"
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={18}
              spellCheck={false}
              className="mt-2 w-full rounded-lg border border-input bg-background p-3 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              WhatsApp formatting: <code>*bold*</code>, <code>_italic_</code>, <code>~strike~</code>,
              <code className="ml-1">```code```</code>. New lines are preserved.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-sm font-semibold">Available placeholders</h2>
            <p className="mt-1 text-xs text-muted-foreground">Click to insert at the cursor.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {PLACEHOLDERS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => insertPlaceholder(p.key)}
                  className="text-left rounded-lg border border-border bg-background p-2.5 hover:border-primary/60 hover:bg-secondary/30 transition-colors"
                >
                  <code className="text-xs font-bold text-primary">{`{${p.key}}`}</code>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-2xl bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> Live preview
                </h2>
                <button
                  type="button"
                  onClick={copyPreview}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  aria-label="Copy preview"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
              <div className="mt-3 rounded-xl bg-[#dcf8c6] p-4 text-[13px] leading-relaxed text-charcoal whitespace-pre-wrap font-sans break-words">
                {preview || <span className="text-muted-foreground italic">Empty template</span>}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Sample data is used here. Real orders will fill in actual customer details.
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/40 p-4 text-xs text-muted-foreground">
              <p>
                Tip: lines whose only content is an empty placeholder (like{" "}
                <code>{"{notesLine}"}</code> when there are no notes) are automatically
                collapsed so you don't end up with blank gaps.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
