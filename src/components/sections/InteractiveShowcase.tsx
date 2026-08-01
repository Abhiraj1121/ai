"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { Monitor3DShowcase } from "../3d/Monitor3DShowcase";
import { EkaClassicLogo } from "../ui/EkaClassicLogo";
import { DEMO_PRESETS } from "@/lib/constants";
import { Code, Network, FileText, Sparkles, Copy, Check, Download, Image as ImageIcon } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  code: Code,
  diagram: Network,
  doc: FileText,
  avatar: Sparkles,
};

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(DEMO_PRESETS[0].id);
  const [copied, setCopied] = useState(false);
  const [showScreenshot, setShowScreenshot] = useState(false);

  const currentPreset = DEMO_PRESETS.find((p) => p.id === activeTab) || DEMO_PRESETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPreset.aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Interactive Showcase"
          title="Watch EKA Think & Route."
          highlight="Live Output."
          description="Switch between specialist dispatch modes or toggle the live app screenshot preview to see how EKA operates."
        />

        {/* Tab Selection & Screenshot Toggle Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {DEMO_PRESETS.map((preset) => {
            const Icon = ICON_MAP[preset.id] || Code;
            const isActive = !showScreenshot && activeTab === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setShowScreenshot(false);
                  setActiveTab(preset.id);
                }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-mono text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-void font-bold shadow-[0_0_20px_rgba(244,114,182,0.4)]"
                    : "bg-void-card/60 text-ink-dim border border-white/10 hover:border-brand-purpleBright/40 hover:text-ink"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{preset.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setShowScreenshot(!showScreenshot)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-mono text-xs transition-all duration-300 ${
              showScreenshot
                ? "bg-gradient-to-r from-brand-blue to-brand-purpleBright text-void font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                : "bg-void-card/60 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue/10"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>App Screenshot</span>
          </button>
        </div>

        {/* 3D Monitor Frame Container */}
        <Monitor3DShowcase>
          <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {showScreenshot ? (
                <motion.div
                  key="screenshot"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden border border-brand-purple/30 shadow-2xl"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_REPO_NAME ? '/' + process.env.NEXT_PUBLIC_REPO_NAME : ''}/eka-app.jpg`}
                    alt="EKA Application UI Screenshot"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 right-4 bg-void/80 backdrop-blur-md border border-brand-purple/40 px-3 py-1.5 rounded-lg font-mono text-xs text-brand-purpleBright">
                    EKA Desktop UI Screenshot
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentPreset.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* User Prompt Message Bubble */}
                  <div className="flex items-start space-x-3 max-w-xl">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs text-ink-dim shrink-0">
                      YOU
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm font-body text-ink">
                      <span className="font-mono text-xs text-brand-pink block mb-1">
                        {currentPreset.command}
                      </span>
                      {currentPreset.userPrompt}
                    </div>
                  </div>

                  {/* EKA Agent AI Response Bubble */}
                  <div className="flex items-start space-x-3 max-w-2xl ml-auto flex-row-reverse space-x-reverse">
                    <div className="w-8 h-8 shrink-0 overflow-hidden rounded-full border border-[#E2BA5B]/40 shadow-md">
                      <EkaClassicLogo size={32} />
                    </div>
                    <div className="bg-brand-purple/10 border border-brand-purpleBright/30 rounded-2xl rounded-tr-none p-5 text-sm font-body text-ink w-full">
                      <div className="flex items-center justify-between mb-3 border-b border-brand-purple/20 pb-2">
                        <span className="font-mono text-xs text-brand-purpleBright font-semibold flex items-center space-x-2">
                          <span>{currentPreset.toolName}</span>
                        </span>
                        <span className="font-mono text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                          {currentPreset.badge}
                        </span>
                      </div>

                      {/* Code / Visual Render Content */}
                      {currentPreset.id === "code" && (
                        <pre className="font-mono text-xs text-brand-blue bg-void/80 p-4 rounded-xl border border-brand-blue/20 overflow-x-auto">
                          <code>{currentPreset.aiResponse}</code>
                        </pre>
                      )}

                      {currentPreset.id === "diagram" && (
                        <div className="bg-void/80 p-6 rounded-xl border border-brand-purple/20 flex items-center justify-center">
                          <div className="flex items-center space-x-2 font-mono text-xs text-brand-pink overflow-x-auto">
                            <span className="px-3 py-1.5 rounded bg-brand-purple/20 border border-brand-purple/40 text-ink">
                              User Credentials
                            </span>
                            <span>→</span>
                            <span className="px-3 py-1.5 rounded bg-brand-pink/20 border border-brand-pink/40 text-ink">
                              Nemotron Router
                            </span>
                            <span>→</span>
                            <span className="px-3 py-1.5 rounded bg-brand-blue/20 border border-brand-blue/40 text-ink">
                              PBKDF2 Check
                            </span>
                            <span>→</span>
                            <span className="px-3 py-1.5 rounded bg-green-500/20 border border-green-500/40 text-green-300">
                              Dashboard
                            </span>
                          </div>
                        </div>
                      )}

                      {currentPreset.id === "doc" && (
                        <div className="bg-void/80 p-5 rounded-xl border border-brand-pink/20 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-8 h-8 text-brand-pink" />
                            <div>
                              <p className="font-mono text-xs font-bold text-ink">
                                renewable-energy-report.pdf
                              </p>
                              <span className="font-mono text-[10px] text-ink-mute">
                                ReportLab PDF Engine · 248 KB
                              </span>
                            </div>
                          </div>
                          <button className="flex items-center space-x-1 font-mono text-xs text-brand-pink bg-brand-pink/10 border border-brand-pink/30 px-3 py-1.5 rounded-lg hover:bg-brand-pink/20 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      )}

                      {currentPreset.id === "avatar" && (
                        <div className="bg-void/80 p-5 rounded-xl border border-brand-purple/20 flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center font-display font-extrabold text-2xl text-void shadow-lg">
                            N
                          </div>
                          <div>
                            <p className="font-mono text-xs font-bold text-ink">
                              Nova · Bottts Style
                            </p>
                            <span className="font-mono text-[10px] text-ink-mute">
                              DiceBear Free Vector SVG Engine
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action bar inside monitor bottom */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-xs text-ink-mute">
                EKA Agentic Pipeline Status: <span className="text-green-400">ACTIVE</span>
              </span>

              {!showScreenshot && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 font-mono text-xs text-ink-dim hover:text-ink transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy Payload"}</span>
                </button>
              )}
            </div>
          </div>
        </Monitor3DShowcase>
      </div>
    </section>
  );
};
