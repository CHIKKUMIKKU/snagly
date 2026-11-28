import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';
import {
  CORE_CAPABILITIES,
  DATA_FLOW_NODES,
  WORKFLOW_STAGES,
} from '../data/snaglyData';
import {
  ToolbarIndicatorShowcase,
  WorkflowStagePreview,
} from './ExtensionMockups';

export function ArchitectureWorkflowSection() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const currentStage = WORKFLOW_STAGES[activeStepIdx] ?? WORKFLOW_STAGES[0];

  return (
    <>
      {/* Section 1: Real-Time Toolbar Feedback + Local Architecture Data Flow */}
      <section id="architecture" className="border-b border-slate-200 bg-[#FAFAFA] py-16 sm:py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              Local Browser Architecture
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)' }}
            >
              A lightweight studio that lives directly inside your browser.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Snagly does not send links to remote converter servers or ask for logins. It works on
              the exact page you are viewing, processes streams on your own machine, and gives you
              complete control over format, framing, and storage.
            </p>
          </div>

          <div className="mt-10">
            <ToolbarIndicatorShowcase />
          </div>

          {/* 4-Stage Local Data-Flow Pipeline */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
                  Nothing Leaves Your Device
                </p>
                <h3 className="font-display mt-1.5 text-xl font-bold tracking-tight text-slate-950">
                  End-to-End Local Data Path
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>Zero external conversion servers · Zero browsing telemetry</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              {DATA_FLOW_NODES.map((node, index) => (
                <div
                  key={node.num}
                  className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700 tabular-nums">
                        {node.num}
                      </span>
                      {index < DATA_FLOW_NODES.length - 1 && (
                        <ArrowRight className="hidden h-4 w-4 text-slate-400 md:block" />
                      )}
                    </div>
                    <h4 className="font-display mt-2.5 text-base font-bold text-slate-950">
                      {node.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{node.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive 6-Step Total Workflow Explorer (Dark Obsidian Band) */}
      <section id="workflow" className="bg-[#0B1120] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Complete Step-by-Step Workflow
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-white text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)' }}
            >
              Every step from stream detection to finished MP4 or phone transfer.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Select any stage below to inspect the user action, internal browser engine processing,
              and live screen preview.
            </p>
          </div>

          {/* Interactive Step Selector */}
          <div
            role="tablist"
            aria-label="Snagly workflow steps"
            className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
          >
            {WORKFLOW_STAGES.map((stage, idx) => {
              const active = idx === activeStepIdx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`flex cursor-pointer flex-col items-start rounded-xl border p-3.5 text-left transition-colors ${
                    active
                      ? 'border-blue-500 bg-blue-600/20 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold tabular-nums ${
                      active ? 'text-blue-400' : 'text-slate-500'
                    }`}
                  >
                    {stage.step}
                  </span>
                  <span className="mt-1 text-xs font-bold whitespace-nowrap">
                    {stage.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details + Visual Screen Preview */}
          <div className="mt-8 grid grid-cols-1 items-start gap-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {currentStage.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {currentStage.lead}
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-5 text-sm">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
                    What You Do
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {currentStage.userAction}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
                    What Snagly Does Locally
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {currentStage.engineAction}
                  </p>
                </div>

                <div className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-xs leading-relaxed text-slate-200">
                    <strong className="text-white">Result:</strong> {currentStage.outcome}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-800 pt-4 text-xs text-slate-400">
                {currentStage.specs.map((spec) => (
                  <span key={spec} className="font-mono">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <WorkflowStagePreview stageId={currentStage.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Asymmetric Deep Capability Grid */}
      <section id="features" className="border-b border-slate-200 bg-white py-16 sm:py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              Built-In Toolkit
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)' }}
            >
              Every editing, caption, privacy, and export tool inside one Side Panel.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {CORE_CAPABILITIES.map((item) => (
              <article
                key={item.num}
                className={`flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 sm:p-7 ${item.span}`}
              >
                <div>
                  <span className="font-mono text-xs font-bold text-orange-600 tabular-nums">
                    {item.num}
                  </span>
                  <h3 className="font-display mt-2.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
                  {item.specs.map((spec) => (
                    <span key={spec} className="font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
