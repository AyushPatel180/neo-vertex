/**
 * Neo Vertex — Architecture diagrams (v2 · clearer labels, no overlaps).
 * Each diagram visually communicates the real architecture of its module.
 * Helper rules:
 *  - All boxes are wide enough for their inline label, OR the label sits
 *    above/below the box.
 *  - No two elements overlap. Pipeline stages share a single horizontal lane.
 *  - Subtle animation only (dashed-line stream, tick blink, ping).
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

const Mono = ({ x, y, t, fill = C.text, size = 9, anchor = 'start' }) => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontSize={size}
    fontFamily="IBM Plex Mono, ui-monospace, monospace"
    letterSpacing="0.08em"
    textAnchor={anchor}
  >
    {t}
  </text>
);

/* A labelled stage: label above the box, optional sub-text inside. */
const Stage = ({ x, y, w, h, label, sub, active = false, accent = C.steel }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={active ? 'rgba(107,138,245,0.08)' : 'transparent'}
      stroke={active ? accent : C.border}
      strokeWidth="1"
    />
    <Mono x={x + w / 2} y={y - 6} t={label} fill={active ? C.textBright : C.text} anchor="middle" />
    {sub && <Mono x={x + w / 2} y={y + h / 2 + 4} t={sub} fill={C.textMuted} size={8} anchor="middle" />}
  </g>
);

/* Arrow head and animated dashed line between two points */
const Flow = ({ x1, y1, x2, y2, color = C.steel, animated = true }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // arrow head slightly before x2
  const headX = x2;
  const headY = y2;
  const px = -uy * 3;
  const py = ux * 3;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" opacity="0.7" />
      {animated && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="1.2"
          className="nv-stream"
        />
      )}
      <polygon
        points={`${headX},${headY} ${headX - ux * 6 + px},${headY - uy * 6 + py} ${headX - ux * 6 - px},${headY - uy * 6 - py}`}
        fill={color}
      />
    </g>
  );
};

/* ============================================================
 * 01 · Foundation Models
 *  Pipeline: data → tokenise → base model → fine-tune → eval → serve
 * ============================================================ */
export function DFoundation() {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />
      <Mono x={20} y={20} t="§ PRIVATE LLM TRAINING & SERVING" fill={C.textMuted} />

      {/* Row 1 — pipeline */}
      <Stage x={20}  y={52} w={92}  h={34} label="ENTERPRISE DATA" sub="logs · docs · DB" />
      <Stage x={132} y={52} w={88}  h={34} label="TOKENISER" sub="vocab · 128k" />
      <Stage x={240} y={52} w={108} h={34} label="BASE MODEL · 70B" sub="transformer · MoE" active />
      <Stage x={368} y={52} w={92}  h={34} label="FINE-TUNE · LoRA" sub="domain · 12 epoch" />

      <Flow x1={112} y1={69} x2={132} y2={69} />
      <Flow x1={220} y1={69} x2={240} y2={69} />
      <Flow x1={348} y1={69} x2={368} y2={69} />

      {/* Param grid (visual representation of weights) */}
      <g transform="translate(170, 118)">
        <Mono x={70} y={-8} t="70B PARAMS · 4× A100 · PRIVATE" anchor="middle" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => {
            const active = (r * 7 + c * 3) % 11 < 3;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 12}
                y={r * 12}
                width="8"
                height="8"
                fill={active ? C.steel : C.borderStrong}
                opacity={active ? 0.9 : 0.4}
                className={active ? 'nv-tick' : ''}
                style={{ animationDelay: `${(r + c) * 0.15}s` }}
              />
            );
          })
        )}
      </g>

      {/* Row 3 — eval & serve */}
      <Stage x={132} y={222} w={108} h={34} label="EVAL · BENCHMARKS" sub="92.4% recall" />
      <Stage x={260} y={222} w={88}  h={34} label="POLICY · GATE" sub="redaction · safety" />
      <Stage x={368} y={222} w={92}  h={34} label="SECURE INFERENCE" sub="38 ms · p95" active accent={C.azure} />

      {/* Feedback loop from FT → Eval */}
      <path
        d="M414 86 Q 460 150 414 220"
        fill="none"
        stroke={C.steel}
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M414 86 Q 460 150 414 220"
        fill="none"
        stroke={C.steel}
        strokeWidth="1.2"
        className="nv-stream-slow"
      />
      <polygon points="414,220 410,214 418,214" fill={C.steel} />
      <Mono x={462} y={156} t="EVAL ↻" fill={C.textMuted} anchor="end" />

      <Flow x1={240} y1={239} x2={260} y2={239} />
      <Flow x1={348} y1={239} x2={368} y2={239} color={C.azure} />

      {/* Lock icon on inference */}
      <g transform="translate(440, 229)">
        <rect x="0" y="3" width="10" height="8" fill="none" stroke={C.azure} strokeWidth="1" />
        <path d="M2 3 V1 a3 3 0 0 1 6 0 V3" fill="none" stroke={C.azure} strokeWidth="1" />
      </g>

      {/* Side meta */}
      <Mono x={20}  y={130} t="TRAIN" />
      <Mono x={20}  y={145} t="18 h · 12 epoch" fill={C.textMuted} size={8} />
      <Mono x={20}  y={168} t="EVAL" />
      <Mono x={20}  y={183} t="92.4 % recall" fill={C.textMuted} size={8} />
      <Mono x={20}  y={206} t="INFER" />
      <Mono x={20}  y={221} t="38 ms · p95" fill={C.textMuted} size={8} />
    </svg>
  );
}

/* ============================================================
 * 02 · Intelligence Platform
 *  Docs → chunk → embed → vector index → KG → query/answer
 * ============================================================ */
export function DIntelligence() {
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />
      <Mono x={20} y={20} t="§ KNOWLEDGE-GRAPH + RAG PIPELINE" fill={C.textMuted} />

      {/* Source documents stack */}
      <g transform="translate(20, 58)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 4} y={i * 4} width="46" height="58" fill={C.surface} stroke={C.border} />
        ))}
        <g transform="translate(8, 14)">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={i * 8} x2="34" y2={i * 8} stroke={C.borderStrong} />
          ))}
        </g>
        <Mono x={25} y={-8} t="DOCUMENTS" anchor="middle" />
      </g>

      {/* Chunker */}
      <Stage x={104} y={82} w={84} h={36} label="CHUNK" sub="512 tok" />

      {/* Embeddings */}
      <Stage x={204} y={82} w={84} h={36} label="EMBED · v3" sub="1536 dims" active />

      {/* Vector index (histogram) */}
      <g transform="translate(308, 72)">
        <rect x="0" y="0" width="84" height="56" fill="transparent" stroke={C.border} />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={5 + i * 6}
            y={48 - (8 + (i * 5) % 38)}
            width="3.5"
            height={8 + (i * 5) % 38}
            fill={i % 3 === 0 ? C.steel : C.borderStrong}
          />
        ))}
        <Mono x={42} y={-8} t="VECTOR INDEX" anchor="middle" />
        <Mono x={42} y={70} t="2.3M vectors" anchor="middle" fill={C.textMuted} size={8} />
      </g>

      {/* Knowledge graph (bottom-left cluster) */}
      <g transform="translate(50, 200)">
        <Mono x={0} y={-12} t="KNOWLEDGE GRAPH · entities + relations" />
        {[
          [0, 30], [55, 0], [110, 28], [165, 0], [220, 32], [275, 0], [55, 60], [165, 60], [275, 60],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={i % 3 === 0 ? C.azure : C.textBright} className={i % 3 === 0 ? 'nv-tick' : ''} style={{ animationDelay: `${i * 0.22}s` }} />
        ))}
        {[
          [0, 30, 55, 0], [55, 0, 110, 28], [110, 28, 165, 0], [165, 0, 220, 32], [220, 32, 275, 0],
          [55, 0, 55, 60], [110, 28, 165, 60], [220, 32, 165, 60], [165, 60, 275, 60], [0, 30, 55, 60],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.borderStrong} strokeWidth="1" />
        ))}
      </g>

      {/* Query / Answer (right column) */}
      <Stage x={400} y={82} w={68} h={36} label="QUERY" sub="natural lang" />
      <Stage x={400} y={210} w={68} h={36} label="ANSWER" sub="cited · auditable" active accent={C.azure} />

      {/* arrows top row */}
      <Flow x1={94} y1={100} x2={104} y2={100} />
      <Flow x1={188} y1={100} x2={204} y2={100} />
      <Flow x1={288} y1={100} x2={308} y2={100} />
      <Flow x1={392} y1={100} x2={400} y2={100} />

      {/* Query → router → KG/Vector → Answer */}
      <path
        d="M434 118 Q 470 165 434 210"
        fill="none"
        stroke={C.azure}
        strokeWidth="1.2"
        className="nv-stream"
      />
      <polygon points="434,210 430,204 438,204" fill={C.azure} />
    </svg>
  );
}

/* ============================================================
 * 03 · AI Operating System  →  Kernel-style block diagram
 * ============================================================ */
export function DOS() {
  const lanes = [
    { y: 50,  name: 'PROC',  call: 'agent.exec()',       val: '0xA21F' },
    { y: 86,  name: 'MEM',   call: 'shared.context',     val: '12.4 MB' },
    { y: 122, name: 'SCHED', call: 'planner.tick',       val: '47 Hz' },
    { y: 158, name: 'BUS',   call: 'ipc.dispatch',       val: '2.1k/s' },
    { y: 194, name: 'AUDIT', call: 'journal.commit',     val: 'OK' },
    { y: 230, name: 'STATE', call: 'persist.flush',      val: 'OK' },
  ];
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />

      {/* Top status bar */}
      <Mono x={20} y={20} t="AI·OS  v0.9.4   ─   UPTIME 17d 04:22   ─   AGENTS: 12 RUNNING" fill={C.text} />
      <line x1="20" y1="32" x2="460" y2="32" stroke={C.border} />

      {/* Sidebar */}
      <Mono x={20} y={48} t="CORE" />

      {/* Lanes */}
      {lanes.map((l, i) => (
        <g key={l.name}>
          <rect x="60" y={l.y} width="380" height="28" fill={C.surface} stroke={C.border} />
          <Mono x={72} y={l.y + 18} t={l.name} fill={C.textBright} />
          <Mono x={132} y={l.y + 18} t={`· ${l.call}`} fill={C.text} />
          <Mono x={350} y={l.y + 18} t={l.val} fill={C.steel} />
          <circle
            cx={428}
            cy={l.y + 14}
            r="3"
            fill={i < 4 ? C.azure : C.steel}
            className="nv-tick"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        </g>
      ))}

      <Mono x={20} y={282} t="messages / s   ─   peak 412   ─   avg 187" fill={C.textMuted} />
    </svg>
  );
}

/* ============================================================
 * 04 · Autonomous Agents  →  Agent collaboration graph
 * ============================================================ */
export function DAgents() {
  const agents = [
    { name: 'FINANCE',  a: -Math.PI / 2 },
    { name: 'LEGAL',    a: -Math.PI / 6 },
    { name: 'SALES',    a:  Math.PI / 6 },
    { name: 'OPS',      a:  Math.PI / 2 },
    { name: 'ENG',      a: (5 * Math.PI) / 6 },
    { name: 'RESEARCH', a: (7 * Math.PI) / 6 },
  ];
  const cx = 240;
  const cy = 150;
  const r = 100;
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />
      <Mono x={20} y={20} t="§ 6 AGENTS · 1 INSTITUTIONAL BRAIN" fill={C.textMuted} />

      {/* Outer orbit */}
      <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke={C.border} strokeDasharray="2 4" />

      {/* Connections */}
      {agents.map((g, i) => {
        const x = cx + Math.cos(g.a) * r;
        const y = cy + Math.sin(g.a) * r;
        return (
          <g key={g.name}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={C.borderStrong} strokeWidth="1" />
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
      <rect x={cx - 64} y={cy - 24} width="128" height="48" fill={C.surface} stroke={C.steel} />
      <Mono x={cx} y={cy - 6} t="SHARED MEMORY" fill={C.textBright} anchor="middle" />
      <Mono x={cx} y={cy + 12} t="context · lineage" anchor="middle" />
      <circle cx={cx} cy={cy} r="6" fill={C.azure} opacity="0.15" className="nv-ping" />

      {/* Agents */}
      {agents.map((g, i) => {
        const x = cx + Math.cos(g.a) * r;
        const y = cy + Math.sin(g.a) * r;
        return (
          <g key={g.name}>
            <rect x={x - 38} y={y - 15} width="76" height="30" fill={C.bg} stroke={C.border} />
            <Mono x={x} y={y + 4} t={g.name} fill={C.textBright} anchor="middle" />
            <circle cx={x + 30} cy={y - 7} r="2.2" fill={C.steel} className="nv-tick" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        );
      })}

      <Mono x={20} y={282} t="messages / s   ─   peak 412   ─   avg 187" fill={C.textMuted} />
    </svg>
  );
}

/* ============================================================
 * 05 · Research Platform  →  Multi-model router
 * ============================================================ */
export function DResearch() {
  const lanes = [
    { name: 'SLM · FAST',    lat: '8 ms',   cost: '$0.0001', selected: false },
    { name: 'LLM · DEEP',    lat: '420 ms', cost: '$0.012',  selected: true  },
    { name: 'RAG · DOCS',    lat: '120 ms', cost: '$0.003',  selected: false },
    { name: 'OWN · PRIVATE', lat: '95 ms',  cost: '$0.001',  selected: false },
  ];
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />
      <Mono x={20} y={20} t="§ MULTI-MODEL ROUTER · LIVE SELECTION" fill={C.textMuted} />

      {/* Incoming query */}
      <Stage x={20} y={140} w={92} h={32} label="QUERY" sub="research task" />
      <Flow x1={112} y1={156} x2={142} y2={156} />

      {/* Router */}
      <rect x={142} y={106} width="104" height="96" fill={C.surface} stroke={C.steel} />
      <Mono x={194} y={126} t="ROUTER" fill={C.textBright} anchor="middle" />
      <Mono x={194} y={146} t="context · cost" anchor="middle" />
      <Mono x={194} y={162} t="latency · policy" anchor="middle" />
      <Mono x={194} y={178} t="sovereignty" anchor="middle" />
      <circle cx={236} cy={114} r="3" fill={C.azure} className="nv-tick" />

      {/* 4 lane outputs */}
      {lanes.map((l, i) => {
        const ly = 64 + i * 50;
        const color = l.selected ? C.azure : C.borderStrong;
        return (
          <g key={l.name}>
            <path
              d={`M246 154 Q 286 ${154 + (ly - 154) * 0.4} 304 ${ly + 14}`}
              fill="none"
              stroke={color}
              strokeWidth={l.selected ? 1.4 : 1}
              opacity={l.selected ? 1 : 0.55}
              className={l.selected ? 'nv-stream' : ''}
            />
            <rect
              x="304"
              y={ly}
              width="120"
              height="28"
              fill={l.selected ? 'rgba(14,165,233,0.08)' : C.surface}
              stroke={l.selected ? C.azure : C.border}
            />
            <Mono x={314} y={ly + 18} t={l.name} fill={l.selected ? C.textBright : C.text} />
            <Mono x={432} y={ly + 12} t={l.lat} fill={C.steel} size={8} />
            <Mono x={432} y={ly + 24} t={l.cost} fill={C.textMuted} size={8} />
            {l.selected && (
              <path
                d={`M432 ${ly + 4} L436 ${ly + 8} L442 ${ly}`}
                stroke={C.azure}
                strokeWidth="1.2"
                fill="none"
              />
            )}
          </g>
        );
      })}

      <Mono x={20} y={282} t="SELECTED ROUTE  ─  LLM·DEEP  ─  policy: max-reasoning" fill={C.textMuted} />
    </svg>
  );
}

/* ============================================================
 * 06 · Voice Intelligence  →  ASR → NLU → Policy → TTS pipeline
 *  Layout: input waveform (top-left), pipeline (centered, single row),
 *  output waveform (top-right), transcript (bottom).  No overlap.
 * ============================================================ */
export function DVoice() {
  // Deterministic waveform path
  const wf = (offset, amp, freq, points = 60, span = 100) => {
    let d = `M 0 28`;
    for (let i = 1; i <= points; i++) {
      const x = (i / points) * span;
      const y = 28 + Math.sin(i * freq + offset) * amp * (0.5 + 0.5 * Math.sin(i * 0.05));
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="320" fill={C.bg} />
      <Mono x={20} y={20} t="§ VOICE PIPELINE · REAL-TIME · MULTILINGUAL" fill={C.textMuted} />

      {/* Input waveform — top-left */}
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="100" height="56" fill="transparent" stroke={C.border} />
        <path d={wf(0, 16, 0.55, 60, 100)} fill="none" stroke={C.steel} strokeWidth="1.2" />
        <Mono x={50} y={-6} t="INPUT · 16 kHz" anchor="middle" />
      </g>

      {/* Output waveform — top-right (well clear of pipeline) */}
      <g transform="translate(360, 50)">
        <rect x="0" y="0" width="100" height="56" fill="transparent" stroke={C.azure} />
        <path d={wf(1.7, 18, 0.42, 60, 100)} fill="none" stroke={C.azure} strokeWidth="1.3" />
        <Mono x={50} y={-6} t="OUTPUT · 22 kHz" anchor="middle" />
      </g>

      {/* Bridge arrows from waveforms into pipeline */}
      <Flow x1={120} y1={78} x2={148} y2={78} />
      <Flow x1={336} y1={78} x2={360} y2={78} color={C.azure} />

      {/* Pipeline — single horizontal row, centered between waveforms */}
      <g transform="translate(148, 60)">
        {[
          { k: 'ASR',    sub: 'transcribe' },
          { k: 'NLU',    sub: 'parse · intent' },
          { k: 'POLICY', sub: 'safety · guard', active: true },
          { k: 'TTS',    sub: 'synthesise' },
        ].map((s, i) => (
          <g key={s.k}>
            <rect
              x={i * 50}
              y={4}
              width="42"
              height="36"
              fill={s.active ? 'rgba(107,138,245,0.08)' : C.surface}
              stroke={s.active ? C.steel : C.border}
            />
            <Mono x={i * 50 + 21} y={20} t={s.k} fill={s.active ? C.textBright : C.text} anchor="middle" />
            <Mono x={i * 50 + 21} y={32} t={s.sub} anchor="middle" size={7} fill={C.textMuted} />
            {i < 3 && (
              <line
                x1={i * 50 + 42}
                y1={22}
                x2={i * 50 + 50}
                y2={22}
                stroke={C.steel}
                className="nv-stream-fast"
              />
            )}
          </g>
        ))}
      </g>

      {/* Latency budget bar */}
      <g transform="translate(148, 116)">
        <Mono x={0}   y={0}  t="38 ms" size={8} />
        <Mono x={50}  y={0}  t="52 ms" size={8} />
        <Mono x={100} y={0}  t="14 ms" size={8} />
        <Mono x={150} y={0}  t="62 ms" size={8} />
        <Mono x={0}   y={14} t="BUDGET TOTAL · 220 ms p95" fill={C.textMuted} size={8} />
      </g>

      {/* Transcript panel — bottom, well below pipeline */}
      <g transform="translate(20, 168)">
        <rect x="0" y="0" width="440" height="132" fill="transparent" stroke={C.border} />
        <Mono x={10} y={22} t="USER  ▸  “Reschedule the Hyderabad shipment to next Tuesday.”" fill={C.text} />
        <Mono x={10} y={50} t="INTENT ▸  reschedule_shipment(loc=HYD, date=2026-07-07)" fill={C.steel} />
        <Mono x={10} y={78} t="POLICY ▸  ok · carrier=BlueDart · sla=24h · contract=NV-117" fill={C.textMuted} />
        <Mono x={10} y={106} t="AGENT ▸  “Done. Carrier acknowledged. Confirmation NV-44721.”" fill={C.textBright} />
        <circle cx={428} cy={20} r="2.5" fill={C.azure} className="nv-tick" />
        <Mono x={420} y={128} t="LIVE" fill={C.azure} size={8} anchor="end" />
      </g>
    </svg>
  );
}

/* ============================================================
 * 07 · Multilingual AI  →  Cross-script semantic space
 * ============================================================ */
export function DMultilingual() {
  const samples = [
    { x: 60,  y: 80,  script: 'नमस्ते',  meta: 'HI · Devanagari' },
    { x: 410, y: 80,  script: 'வணக்கம்', meta: 'TA · Tamil' },
    { x: 60,  y: 230, script: 'নমস্কার',  meta: 'BN · Bengali' },
    { x: 410, y: 230, script: 'హలో',      meta: 'TE · Telugu' },
    { x: 240, y: 60,  script: 'Hello',    meta: 'EN · Latin' },
    { x: 240, y: 254, script: 'नमस्ते',   meta: 'MR · Devanagari' },
  ];
  const cx = 240;
  const cy = 160;
  return (
    <svg viewBox="0 0 480 300" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="480" height="300" fill={C.bg} />
      <Mono x={20} y={20} t="§ CROSS-SCRIPT SEMANTIC SPACE · 22 INDIAN LANGUAGES" fill={C.textMuted} />

      {/* Shared embedding cluster */}
      <circle cx={cx} cy={cy} r="46" fill="none" stroke={C.border} strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r="22" fill="none" stroke={C.borderStrong} />
      <circle cx={cx} cy={cy} r="8" fill={C.azure} opacity="0.15" className="nv-ping" />
      <circle cx={cx} cy={cy} r="3" fill={C.azure} />
      <Mono x={cx} y={cy + 70} t="SHARED SEMANTIC SPACE" anchor="middle" fill={C.text} />

      {/* Source words */}
      {samples.map((s, i) => {
        const dx = cx - s.x;
        const dy = cy - s.y;
        const len = Math.hypot(dx, dy);
        const tx = s.x + (dx / len) * (len - 46);
        const ty = s.y + (dy / len) * (len - 46);
        return (
          <g key={`${s.meta}-${i}`}>
            <line x1={s.x + 14} y1={s.y + 4} x2={tx} y2={ty} stroke={C.borderStrong} />
            <line
              x1={s.x + 14}
              y1={s.y + 4}
              x2={tx}
              y2={ty}
              stroke={C.azure}
              strokeOpacity="0.75"
              strokeDasharray="2 60"
              className="nv-stream-fast"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <text
              x={s.x}
              y={s.y}
              fill={C.textBright}
              fontSize="15"
              fontFamily="'IBM Plex Sans', sans-serif"
            >
              {s.script}
            </text>
            <Mono x={s.x} y={s.y + 14} t={s.meta} size={8} />
          </g>
        );
      })}
    </svg>
  );
}
