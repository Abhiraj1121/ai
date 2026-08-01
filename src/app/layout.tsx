import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "EKA — Intelligent Agentic AI Assistant & Tool Orchestrator",
  description:
    "EKA is the agentic AI platform that routes itself — chat, AST static verified code, Mermaid diagrams, documents, and avatars from a single conversational core. Built by Cognix Studio.",
  keywords: [
    "Agentic AI",
    "AI Orchestrator",
    "Nemotron",
    "Mermaid Diagrams",
    "AST Verification",
    "DiceBear Avatars",
    "BYOK AI",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/eka-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void text-ink antialiased selection:bg-brand-purple selection:text-void relative">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
