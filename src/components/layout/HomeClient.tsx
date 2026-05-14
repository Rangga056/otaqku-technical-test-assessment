"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Zap } from "lucide-react";
import { HeroCard } from "@/components/layout/HeroCard";
import { LegalModal } from "@/components/layout/LegalModal";
import { Session } from "next-auth";

export function HomeClient({ session }: { session: Session | null }) {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null,
  );

  const legalContent = {
    privacy: `Privacy Policy for otaQku Intelligence
    
    1. Data Collection: We collect minimal data necessary for assessment tracking, including email and quiz performance metrics.
    2. Data Use: Your data is used exclusively to provide personalized analytical reports and tracking your learning progress.
    3. Data Security: We use industry-standard encryption and Supabase Row Level Security (RLS) to ensure your data remains private.
    4. Third Parties: We do not sell or share your personal data with third-party advertisers.
    5. Consent: By using otaQku, you agree to the collection and use of information in accordance with this policy.`,

    terms: `Terms of Service for otaQku Intelligence

    1. Acceptance: By accessing otaQku, you agree to be bound by these Terms of Service and all applicable laws.
    2. Use License: Permission is granted to use the platform for personal, non-commercial educational purposes.
    3. Assessment Integrity: You agree to use the platform fairly and not to manipulate results through automated means.
    4. Intellectual Property: The design, logo, and intellectual property of otaQku are owned by otaQku Intelligence.
    5. Limitation of Liability: otaQku shall not be liable for any damages arising out of the use or inability to use the services.`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <LegalModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        content={legalContent.privacy}
      />
      <LegalModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
        content={legalContent.terms}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-left space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#202124] leading-[0.95]">
                Precision in <br />
                Knowledge. <br />
                <span className="text-[#4285F4]">Minimalist by Design.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#5F6368] leading-relaxed max-w-xl">
                A rigorous platform for interactive assessments and analytics.
                Engineered with Swiss principles to reduce cognitive load and
                prioritize absolute clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button
                  asChild
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-xl shadow-lg bg-[#4285F4] hover:bg-[#1A73E8] transition-all transform hover:scale-[1.02]"
                >
                  <Link href={session ? "/dashboard" : "/auth/signup"}>
                    {session ? "Enter Workspace" : "Start Assessment"}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-xl bg-white/50 backdrop-blur border-[#DADCE0]"
                >
                  <Link href="/quiz">View Documentation</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual (Interactive 3D Card) */}
            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000 delay-200">
              <HeroCard />

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-[#4285F4]/10 to-transparent rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-medium tracking-tight text-[#202124] mb-6">
              Designed for intelligence.
            </h2>
            <p className="text-lg text-[#5F6368]">
              Everything you need to master your domain with structured feedback
              and analytics.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Zap className="text-[#4285F4]" size={28} />}
              title="Instant Feedback"
              description="Score calculations and performance categorizations occur in real-time as you complete assessments."
            />
            <FeatureCard
              icon={<BarChart3 className="text-[#34A853]" size={28} />}
              title="Deep Analytics"
              description="Visualize patterns in your performance through a clean, distraction-free analytical dashboard."
            />
            <FeatureCard
              icon={<FileText className="text-[#FBBC05]" size={28} />}
              title="Structured Reports"
              description="Export your evaluation history as highly-refined PDF reports for professional documentation."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#DADCE0] bg-[#F8F9FA]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[#5F6368] text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center text-white font-bold text-xs">
              Q
            </div>
            <span className="font-medium">otaQku Intelligence</span>
          </div>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-[#202124] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-[#202124] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="stitch-card p-8 sm:p-10 hover:border-[#4285F4] transition-all duration-300">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#F8F9FA] flex items-center justify-center mb-6 sm:mb-8">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-[#202124]">{title}</h3>
      <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">{description}</p>
    </div>
  );
}
