/**
 * Neo Vertex — Architecture diagrams.
 * Each diagram is a self-contained SVG component that visually communicates
 * the real architecture of the corresponding stack module.
 * - Labels read like an actual architecture diagram.
 * - Animations are subtle: pulses, dashed-line streams, micro-pings.
 * - No "abstract dots" filler. Every primitive maps to something real.
 */

import React from 'react';

/* ============================================================
 * Shared SVG primitives
 * ============================================================ */
const C = {
  bg: '#0C0D13',
  surface: '#12141A',
  border: '#262a37',
  borderStrong: '#3a4156',
  text: '#9BA1B0',
  textBright: '#E2E4EB',
  textMuted: '#6A7080',
  azure: '#0EA5E9',
  steel: '#6B8AF5',
  indigo: '#4F46E5',
};

const monoLabel = (x, y, t, opts = {}) => (
  <text
    x={x}
    y={y}
    fill={opts.fill || C.textMuted}
    fontSize={opts.size || 9}
    fontFamily="IBM Plex Mono"
    letterSpacing="0.08em"
    {...opts.attrs}
  >
    {t}
  </text>
);

const Box = ({ x, y, w, h, label, active = false, accent }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={active ? 'rgba(107,138,245,0.08)' : 'transparent'}
      stroke={active ? accent || C.steel : C.border}
      strokeWidth="1"
    />
    {label && monoLabel(x + 8, y + 14, label, { fill: active ? C.textBright : C.text })}
  </g>
);

/* ============================================================
 * 01 · Foundation Models  →  Private LLM training & serving loop
 *  Visualises: data → tokenizer → base model (params grid)
 *  → fine-tuning loop → eval → secure inference endpoint.
 * ============================================================ */
export function DFoundation() {
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      {/* Frame */}
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Pipeline boxes (top row) */}
      <Box x="20" y="40" w="80" h="36" label="ENTERPRISE DATA" />
      <Box x="120" y="40" w="80" h="36" label="TOKENISER" />
      <Box x="220" y="40" w="120" h="36" label="BASE MODEL · 70B" active />
      <Box x="360" y="40" w="100" h="36" label="FINE-TUNE LoRA" />

      {/* Flow arrows top row */}
      {[100, 200, 340].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1="58"
            x2={x + 20}
            y2="58"
            stroke={C.steel}
            strokeWidth="1.2"
            className="nv-stream"
          />
          <polygon
            points={`${x + 20},58 ${x + 16},55 ${x + 16},61`}
            fill={C.steel}
          />
        </g>
      ))}

      {/* Parameter grid (visual representation of model weights) */}
      <g transform="translate(220, 100)">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => {
            const active = (r * 7 + c * 3) % 11 < 3;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 12}
                y={r * 12}
                width="8"
                height="8"
                fill={active ? C.steel : C.borderStrong}
                opacity={active ? 0.85 : 0.45}
                className={active ? 'nv-tick' : ''}
                style={{ animationDelay: `${(r + c) * 0.18}s` }}
              />
            );
          })
        )}
      </g>
      {monoLabel(220, 188, '70B PARAMS · 4×A100 PRIVATE')}

      {/* Eval loop arrow */}
      <path
        d="M410 76 Q 430 130 410 184 L 350 184"
        fill="none"
        stroke={C.azure}
        strokeWidth="1.2"
        className="nv-stream-slow"
      />
      <polygon points="350,184 354,181 354,187" fill={C.azure} />

      {/* Bottom row: Eval + Secure Inference */}
      <Box x="220" y="200" w="120" h="36" label="EVAL · BENCHMARKS" />
      <Box x="360" y="200" w="100" h="36" label="SECURE INFERENCE" accent={C.azure} active />
      <line x1="340" y1="218" x2="360" y2="218" stroke={C.azure} strokeWidth="1.2" className="nv-stream" />
      <polygon points="360,218 356,215 356,221" fill={C.azure} />

      {/* Sidebar metrics */}
      {monoLabel(20, 220, 'TRAIN ─ 18h · 12 EPOCH')}
      {monoLabel(20, 240, 'EVAL  ─ 92.4% RECALL')}
      {monoLabel(20, 260, 'INFER ─ 38 ms · p95')}

      {/* Lock icon on inference */}
      <g transform="translate(440, 207)">
        <rect x="0" y="3" width="10" height="8" fill="none" stroke={C.azure} strokeWidth="1" />
        <path d="M2 3 V1 a3 3 0 0 1 6 0 V3" fill="none" stroke={C.azure} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ============================================================
 * 02 · Intelligence Platform  →  Document → KG → RAG → Answer
 * ============================================================ */
export function DIntelligence() {
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Source documents stack (top-left) */}
      <g transform="translate(20, 40)">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={i * 4}
            y={i * 4}
            width="46"
            height="58"
            fill={C.surface}
            stroke={C.border}
          />
        ))}
        <g transform="translate(8, 14)">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={i * 8} x2="34" y2={i * 8} stroke={C.borderStrong} />
          ))}
        </g>
        {monoLabel(0, 118, 'DOCUMENTS · PDF/DB')}
      </g>

      {/* Chunker */}
      <Box x="110" y="60" w="80" h="36" label="CHUNK · 512" />

      {/* Embeddings */}
      <Box x="210" y="60" w="80" h="36" label="EMBED · v3" active />

      {/* Vector index (grid of bars) */}
      <g transform="translate(310, 50)">
        <rect x="0" y="0" width="80" height="56" fill="transparent" stroke={C.border} />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={i}
            x={6 + i * 7}
            y={48 - (8 + (i * 5) % 38)}
            width="4"
            height={8 + (i * 5) % 38}
            fill={i % 3 === 0 ? C.steel : C.borderStrong}
          />
        ))}
        {monoLabel(0, 70, 'VECTOR INDEX')}
      </g>

      {/* Knowledge graph (bottom) */}
      <g transform="translate(80, 160)">
        {[
          [0, 30], [60, 0], [120, 28], [180, 0], [240, 32], [300, 0], [60, 60], [180, 60], [300, 60],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={i % 3 === 0 ? C.azure : C.textBright} className={i % 3 === 0 ? 'nv-tick' : ''} style={{ animationDelay: `${i * 0.22}s` }} />
        ))}
        {[
          [0, 30, 60, 0], [60, 0, 120, 28], [120, 28, 180, 0], [180, 0, 240, 32], [240, 32, 300, 0],
          [60, 0, 60, 60], [120, 28, 180, 60], [240, 32, 180, 60], [180, 60, 300, 60],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.borderStrong} strokeWidth="1" />
        ))}
        {monoLabel(0, 90, 'KNOWLEDGE GRAPH · ENTITIES + RELATIONS')}
      </g>

      {/* Query → Answer */}
      <Box x="410" y="60" w="60" h="36" label="QUERY" />
      <Box x="410" y="180" w="60" h="36" label="ANSWER" accent={C.azure} active />
      <path
        d="M440 96 Q 470 138 440 180"
        fill="none"
        stroke={C.azure}
        strokeWidth="1.2"
        className="nv-stream"
      />
      <polygon points="440,180 436,176 444,176" fill={C.azure} />

      {/* arrows between top boxes */}
      {[100, 190, 290].map((x, i) => (
        <line
          key={i}
          x1={x - 4}
          y1="78"
          x2={x + 14}
          y2="78"
          stroke={C.steel}
          strokeWidth="1"
          className="nv-stream"
        />
      ))}
    </svg>
  );
}

/* ============================================================
 * 03 · AI Operating System  →  Kernel-style block diagram
 * ============================================================ */
export function DOS() {
  const lanes = [
    { y: 40, name: 'PROC  · agent.exec()', tick: '0xA21F' },
    { y: 76, name: 'MEM   · shared.context', tick: '12.4 MB' },
    { y: 112, name: 'SCHED · planner.tick', tick: '47 Hz' },
    { y: 148, name: 'BUS   · ipc.dispatch', tick: '2.1k/s' },
    { y: 184, name: 'AUDIT · journal.commit', tick: 'OK' },
    { y: 220, name: 'STATE · persist.flush', tick: 'OK' },
  ];
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Vertical sidebar showing call stack */}
      <rect x="0" y="20" width="40" height="240" fill="transparent" stroke={C.border} />
      {monoLabel(6, 34, 'CORE')}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="0" y1={40 + i * 36} x2="40" y2={40 + i * 36} stroke={C.border} />
      ))}

      {/* Lanes */}
      {lanes.map((l, i) => (
        <g key={l.name}>
          <rect x="48" y={l.y} width="380" height="28" fill={C.surface} stroke={C.border} />
          {monoLabel(60, l.y + 18, l.name, { fill: i === 0 ? C.textBright : C.text })}
          {monoLabel(330, l.y + 18, l.tick, { fill: C.steel })}
          {/* live indicator */}
          <circle
            cx={440}
            cy={l.y + 14}
            r="2.6"
            fill={i < 4 ? C.azure : C.steel}
            className="nv-tick"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <rect x={446} y={l.y + 10} width="20" height="8" fill="transparent" stroke={C.border} />
        </g>
      ))}

      {/* Top status bar */}
      {monoLabel(48, 14, 'AI·OS  v0.9.4   ─   UPTIME 17d 04:22   ─   AGENTS: 12 RUNNING')}
    </svg>
  );
}

/* ============================================================
 * 04 · Autonomous Agents  →  Agent collaboration graph
 *  Hub of SHARED MEMORY + 6 named agents pulsing messages.
 * ============================================================ */
export function DAgents() {
  const agents = [
    { name: 'FINANCE', a: -Math.PI / 2 },
    { name: 'LEGAL', a: -Math.PI / 6 },
    { name: 'SALES', a: Math.PI / 6 },
    { name: 'OPS', a: Math.PI / 2 },
    { name: 'ENG', a: (5 * Math.PI) / 6 },
    { name: 'RSRCH', a: (7 * Math.PI) / 6 },
  ];
  const cx = 240;
  const cy = 140;
  const r = 95;
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Outer orbit */}
      <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke={C.border} />

      {/* Connections to hub */}
      {agents.map((g, i) => {
        const x = cx + Math.cos(g.a) * r;
        const y = cy + Math.sin(g.a) * r;
        return (
          <g key={g.name}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={C.borderStrong}
              strokeWidth="1"
            />
            {/* Animated pulse on the line */}
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={C.azure}
              strokeWidth="1.2"
              strokeDasharray="3 90"
              className="nv-stream-fast"
              style={{ animationDelay: `${i * 0.45}s`, opacity: 0.85 }}
            />
          </g>
        );
      })}

      {/* Hub */}
      <rect x={cx - 56} y={cy - 22} width="112" height="44" fill={C.surface} stroke={C.steel} />
      {monoLabel(cx - 48, cy - 6, 'SHARED MEMORY', { fill: C.textBright })}
      {monoLabel(cx - 48, cy + 12, 'context · lineage')}
      <circle cx={cx} cy={cy} r="6" fill={C.azure} opacity="0.15" className="nv-ping" />

      {/* Agent nodes */}
      {agents.map((g, i) => {
        const x = cx + Math.cos(g.a) * r;
        const y = cy + Math.sin(g.a) * r;
        return (
          <g key={g.name}>
            <rect x={x - 30} y={y - 14} width="60" height="28" fill={C.bg} stroke={C.border} />
            {monoLabel(x - 24, y + 4, g.name, { fill: C.textBright })}
            <circle cx={x + 24} cy={y - 6} r="2.2" fill={C.steel} className="nv-tick" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        );
      })}

      {monoLabel(20, 24, '6 AGENTS · 1 BRAIN')}
      {monoLabel(20, 264, 'MESSAGES / s    ─    PEAK 412   ─    AVG 187')}
    </svg>
  );
}

/* ============================================================
 * 05 · Research Platform  →  Multi-model router with cost/latency
 *  Replaces the previous dots-line vignette.
 * ============================================================ */
export function DResearch() {
  const lanes = [
    { name: 'SLM · FAST',   lat: '8 ms',   cost: '$0.0001', selected: false, color: C.borderStrong },
    { name: 'LLM · DEEP',   lat: '420 ms', cost: '$0.012',  selected: true,  color: C.azure },
    { name: 'RAG · DOCS',   lat: '120 ms', cost: '$0.003',  selected: false, color: C.borderStrong },
    { name: 'OWN · PRIVATE',lat: '95 ms',  cost: '$0.001',  selected: false, color: C.borderStrong },
  ];
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Incoming query */}
      <Box x="20" y="124" w="80" h="32" label="QUERY" />
      <line x1="100" y1="140" x2="140" y2="140" stroke={C.steel} className="nv-stream" />
      <polygon points="140,140 136,137 136,143" fill={C.steel} />

      {/* Router */}
      <rect x="140" y="100" width="100" height="80" fill={C.surface} stroke={C.steel} />
      {monoLabel(150, 118, 'ROUTER', { fill: C.textBright })}
      {monoLabel(150, 134, 'context-aware')}
      {monoLabel(150, 150, 'cost · latency')}
      {monoLabel(150, 166, 'sovereignty')}
      <circle cx={232} cy={108} r="3" fill={C.azure} className="nv-tick" />

      {/* 4 lane outputs */}
      {lanes.map((l, i) => {
        const ly = 50 + i * 50;
        return (
          <g key={l.name}>
            {/* connection from router */}
            <path
              d={`M240 140 Q 280 ${140 + (ly - 140) * 0.35} 300 ${ly + 14}`}
              fill="none"
              stroke={l.color}
              strokeWidth={l.selected ? 1.4 : 1}
              opacity={l.selected ? 1 : 0.55}
              className={l.selected ? 'nv-stream' : ''}
            />
            {/* lane box */}
            <rect
              x="300"
              y={ly}
              width="120"
              height="28"
              fill={l.selected ? 'rgba(14,165,233,0.08)' : C.surface}
              stroke={l.selected ? C.azure : C.border}
            />
            {monoLabel(308, ly + 18, l.name, { fill: l.selected ? C.textBright : C.text })}
            {/* metrics */}
            {monoLabel(428, ly + 12, l.lat, { fill: C.steel, size: 8 })}
            {monoLabel(428, ly + 24, l.cost, { fill: C.textMuted, size: 8 })}
            {l.selected && (
              <g>
                <path d="M422 56 L426 60 L432 52" stroke={C.azure} strokeWidth="1.2" fill="none" transform={`translate(0 ${ly - 52})`} />
              </g>
            )}
          </g>
        );
      })}

      {monoLabel(20, 24, '§ MULTI-MODEL ROUTER · LIVE SELECTION')}
      {monoLabel(20, 264, 'SELECTED ROUTE  ─  LLM·DEEP   ─   policy: max-reasoning')}
    </svg>
  );
}

/* ============================================================
 * 06 · Voice Intelligence  →  Real ASR → NLU → Policy → TTS pipeline
 * ============================================================ */
export function DVoice() {
  // Build a deterministic waveform path
  const wf = (offset, amp, freq) => {
    let d = `M 0 28`;
    for (let i = 1; i <= 80; i++) {
      const y = 28 + Math.sin(i * freq + offset) * amp * (0.5 + 0.5 * Math.sin(i * 0.05));
      d += ` L ${i * 1.5} ${y}`;
    }
    return d;
  };
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Input waveform */}
      <g transform="translate(20, 60)">
        <rect x="-4" y="0" width="128" height="56" fill="transparent" stroke={C.border} />
        <path d={wf(0, 16, 0.55)} fill="none" stroke={C.steel} strokeWidth="1.2" />
        {monoLabel(-4, 74, 'INPUT · 16kHz')}
      </g>

      {/* Pipeline */}
      <g transform="translate(160, 60)">
        {['ASR', 'NLU', 'POLICY', 'TTS'].map((stage, i) => (
          <g key={stage}>
            <rect x={i * 60} y="14" width="50" height="28" fill={C.surface} stroke={i === 2 ? C.steel : C.border} />
            {monoLabel(i * 60 + 8, 32, stage, { fill: i === 2 ? C.textBright : C.text })}
            {i < 3 && (
              <line
                x1={i * 60 + 50}
                y1="28"
                x2={i * 60 + 60}
                y2="28"
                stroke={C.steel}
                className="nv-stream-fast"
              />
            )}
          </g>
        ))}
        {monoLabel(0, 64, '38 ms      52 ms      14 ms      62 ms')}
        {monoLabel(0, 78, 'BUDGET TOTAL · 220 ms p95')}
      </g>

      {/* Output waveform */}
      <g transform="translate(340, 60)">
        <rect x="-4" y="0" width="128" height="56" fill="transparent" stroke={C.azure} />
        <path d={wf(1.7, 18, 0.42)} fill="none" stroke={C.azure} strokeWidth="1.3" />
        {monoLabel(-4, 74, 'OUTPUT · 22kHz · NATURAL')}
      </g>

      {/* Bottom: transcripts */}
      <g transform="translate(20, 180)">
        <rect x="0" y="0" width="440" height="68" fill="transparent" stroke={C.border} />
        {monoLabel(10, 18, 'USER ▸  "Reschedule the Hyderabad shipment to next Tuesday."', { fill: C.text })}
        {monoLabel(10, 36, 'INTENT ▸  reschedule_shipment(loc=HYD, date=2026-07-07)', { fill: C.steel })}
        {monoLabel(10, 54, 'AGENT ▸  "Done. Carrier acknowledged. Confirmation NV-44721."', { fill: C.textBright })}
      </g>

      {monoLabel(20, 24, '§ VOICE PIPELINE · REAL-TIME · MULTILINGUAL')}
    </svg>
  );
}

/* ============================================================
 * 07 · Multilingual AI  →  Cross-script semantic space
 *  Real scripts converging to a shared embedding cluster.
 * ============================================================ */
export function DMultilingual() {
  const samples = [
    { x: 60,  y: 80,  script: 'नमस्ते', meta: 'HI · Devanagari' },
    { x: 410, y: 80,  script: 'வணக்கம்', meta: 'TA · Tamil' },
    { x: 60,  y: 220, script: 'নমস্কার', meta: 'BN · Bengali' },
    { x: 410, y: 220, script: 'హలో',    meta: 'TE · Telugu' },
    { x: 240, y: 56,  script: 'Hello',  meta: 'EN · Latin' },
    { x: 240, y: 248, script: 'নমস্তে', meta: 'AS · Assamese' },
  ];
  const cx = 240;
  const cy = 152;
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="280" fill={C.bg} />

      {/* Shared embedding cluster */}
      <g>
        <circle cx={cx} cy={cy} r="46" fill="none" stroke={C.border} strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r="22" fill="none" stroke={C.borderStrong} />
        <circle cx={cx} cy={cy} r="6" fill={C.azure} opacity="0.15" className="nv-ping" />
        <circle cx={cx} cy={cy} r="3" fill={C.azure} />
        {monoLabel(cx - 56, cy + 64, 'SHARED SEMANTIC SPACE')}
      </g>

      {/* Source words & connection lines into the cluster */}
      {samples.map((s, i) => {
        // line endpoint at cluster edge
        const dx = cx - s.x;
        const dy = cy - s.y;
        const len = Math.hypot(dx, dy);
        const tx = s.x + (dx / len) * (len - 46);
        const ty = s.y + (dy / len) * (len - 46);
        return (
          <g key={s.script}>
            <line
              x1={s.x + 12}
              y1={s.y + 4}
              x2={tx}
              y2={ty}
              stroke={C.borderStrong}
            />
            <line
              x1={s.x + 12}
              y1={s.y + 4}
              x2={tx}
              y2={ty}
              stroke={C.azure}
              strokeOpacity="0.7"
              strokeDasharray="2 60"
              className="nv-stream-fast"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <text
              x={s.x}
              y={s.y}
              fill={C.textBright}
              fontSize="16"
              fontFamily="'IBM Plex Sans', sans-serif"
            >
              {s.script}
            </text>
            {monoLabel(s.x, s.y + 14, s.meta, { size: 8 })}
          </g>
        );
      })}

      {monoLabel(20, 24, '§ CROSS-SCRIPT EMBEDDING · 22 INDIAN LANGUAGES')}
    </svg>
  );
}
