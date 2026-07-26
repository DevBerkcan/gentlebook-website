"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/siteConfig";

type TeamMember = (typeof siteConfig.team)[number];
type Step = "choice" | "team" | "confirm";

export default function ContactModal({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contactModal;
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("choice");
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setStep("choice");
    setSelectedEmployee(null);
  };

  const openWhatsapp = () => {
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(t.whatsappPrefill)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  const selectEmployee = (member: TeamMember) => {
    setSelectedEmployee(member);
    setStep("confirm");
  };

  const openCalendar = () => {
    if (!selectedEmployee) return;
    window.open(selectedEmployee.calendarUrl, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.triggerLabel}
        className="fixed bottom-24 right-4 z-[9990] flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted lg:bottom-6 lg:right-6"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[9995] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[9996] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-md rounded-2xl border border-ink/10 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
                  <div className="flex items-center gap-3">
                    {step !== "choice" && (
                      <button
                        type="button"
                        onClick={() => setStep(step === "confirm" ? "team" : "choice")}
                        aria-label={t.backLabel}
                        className="rounded-lg p-2 text-mist transition-colors hover:bg-ink/5 hover:text-violet"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                    )}
                    <h2 className="text-lg font-semibold text-ink">
                      {step === "choice" && t.choice.title}
                      {step === "team" && t.team.title}
                      {step === "confirm" && selectedEmployee?.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.closeLabel}
                    className="text-mist transition-colors hover:text-violet"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-6">
                  {step === "choice" && (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setStep("team")}
                        className="flex w-full items-center gap-4 rounded-2xl border border-ink/10 p-4 text-left transition-colors hover:border-violet/40 hover:bg-violet/5"
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{t.choice.calendarTitle}</span>
                          <span className="block text-sm text-mist">{t.choice.calendarText}</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={openWhatsapp}
                        className="flex w-full items-center gap-4 rounded-2xl border border-ink/10 p-4 text-left transition-colors hover:border-teal/40 hover:bg-teal/5"
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal text-white">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{t.choice.whatsappTitle}</span>
                          <span className="block text-sm text-mist">{t.choice.whatsappText}</span>
                        </span>
                      </button>
                    </div>
                  )}

                  {step === "team" && (
                    <div className="space-y-3">
                      <p className="mb-4 text-sm text-mist">{t.team.subtitle}</p>
                      {siteConfig.team.map((member) => (
                        <button
                          key={member.name}
                          type="button"
                          onClick={() => selectEmployee(member)}
                          className="flex w-full items-center gap-4 rounded-2xl border border-ink/10 p-4 text-left transition-colors hover:border-violet/40 hover:bg-violet/5"
                        >
                          <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                            <Image src={member.image} alt={member.name} fill sizes="56px" className="object-cover" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold text-ink">{member.name}</span>
                            <span className="block truncate text-sm text-mist">
                              {locale === "de" ? member.roleDe : member.roleEn}
                            </span>
                            <span className="mt-1 block text-xs text-violet">{t.team.availability}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === "confirm" && selectedEmployee && (
                    <div className="text-center">
                      <span className="relative mx-auto mb-4 block h-24 w-24 overflow-hidden rounded-full">
                        <Image
                          src={selectedEmployee.image}
                          alt={selectedEmployee.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </span>
                      <p className="mb-1 text-sm text-mist">
                        {locale === "de" ? selectedEmployee.roleDe : selectedEmployee.roleEn}
                      </p>
                      <p className="mb-6 text-sm text-mist">{t.confirm.subtitle}</p>
                      <button
                        type="button"
                        onClick={openCalendar}
                        className="w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
                      >
                        {t.confirm.cta.replace("{name}", selectedEmployee.name)}
                      </button>
                      <p className="mt-4 text-xs text-mist">{t.confirm.hint}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
