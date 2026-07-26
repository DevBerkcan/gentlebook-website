"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Accessibility } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  increasedSpacing: boolean;
  cursorHighlight: boolean;
  blueFilter: boolean;
  nightMode: boolean;
  hideImages: boolean;
  colorBlindMode: ColorBlindMode;
  largePointer: boolean;
  muteSound: boolean;
  saturationMode: boolean;
  focusIndicators: boolean;
  textSpacing: boolean;
  stopAnimations: boolean;
  readingGuide: boolean;
}

type ColorBlindMode = "none" | "protanopia" | "protanomaly" | "deuteranopia" | "deuteranomaly" | "tritanopia" | "tritanomaly" | "achromatopsia";
type SettingKey = keyof Omit<AccessibilitySettings, "colorBlindMode">;
type QuickPreset = "elderly" | "lowVision" | "colorBlind";
type Language = "de" | "en";

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  increasedSpacing: false,
  cursorHighlight: false,
  blueFilter: false,
  nightMode: false,
  hideImages: false,
  colorBlindMode: "none",
  largePointer: false,
  muteSound: false,
  saturationMode: false,
  focusIndicators: false,
  textSpacing: false,
  stopAnimations: false,
  readingGuide: false,
};

const translations = {
  de: {
    title: "Barrierefreiheit",
    close: "Schließen",
    reset: "Zurücksetzen",
    quickView: "Schnellansicht",
    elderly: "👴 Seniorenansicht",
    lowVision: "👁️ Sehschwäche",
    colorBlind: "🎨 Farbschwäche",
    fontSize: "🔤 Schriftgröße",
    displayOptions: "🎨 Anzeigeoptionen",
    contrastMode: "Kontrastmodus",
    nightMode: "Nachtmodus",
    blueFilter: "Blaufilter aktivieren",
    grayscale: "Graustufen",
    underlineLinks: "Links unterstreichen",
    readableFont: "Lesbare Schriftart",
    increasedSpacing: "Erhöhter Zeilenabstand",
    cursorHighlight: "Cursor hervorheben",
    hideImages: "Bilder ausblenden",
    colorBlindModeLabel: "Farbsehschwäche-Modus",
    normal: "Normal",
    protanopia: "Rotschwäche",
    protanomaly: "Rotschwäche (leicht)",
    deuteranopia: "Grünschwäche",
    deuteranomaly: "Grünschwäche (leicht)",
    tritanopia: "Blauschwäche",
    tritanomaly: "Blauschwäche (leicht)",
    achromatopsia: "Farbenblindheit",
    saturationMode: "Sättigungsmodus",
    largePointer: "Großer Mauszeiger",
    muteSound: "Ton ausschalten",
    focusIndicators: "Starke Fokus-Anzeige",
    textSpacing: "Optimierter Textabstand",
    stopAnimations: "Animationen stoppen",
    readingGuide: "Lesehilfe anzeigen",
    moreFeatures: "Weitere Funktionen",
    languageToggle: "Sprache",
  },
  en: {
    title: "Accessibility",
    close: "Close",
    reset: "Reset",
    quickView: "Quick view",
    elderly: "👴 Elderly mode",
    lowVision: "👁️ Low vision",
    colorBlind: "🎨 Color blindness",
    fontSize: "🔤 Font size",
    displayOptions: "🎨 Display options",
    contrastMode: "High contrast",
    nightMode: "Night mode",
    blueFilter: "Enable blue filter",
    grayscale: "Grayscale",
    underlineLinks: "Underline links",
    readableFont: "Readable font",
    increasedSpacing: "Increased spacing",
    cursorHighlight: "Highlight cursor",
    hideImages: "Hide images",
    colorBlindModeLabel: "Color blind mode",
    normal: "Normal",
    protanopia: "Protanopia",
    protanomaly: "Protanomaly",
    deuteranopia: "Deuteranopia",
    deuteranomaly: "Deuteranomaly",
    tritanopia: "Tritanopia",
    tritanomaly: "Tritanomaly",
    achromatopsia: "Achromatopsia",
    saturationMode: "Saturation mode",
    largePointer: "Large pointer",
    muteSound: "Mute sound",
    focusIndicators: "Enhanced focus indicators",
    textSpacing: "Optimized text spacing",
    stopAnimations: "Stop animations",
    readingGuide: "Show reading guide",
    moreFeatures: "More features",
    languageToggle: "Language",
  },
};

export default function AccessibilityTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [language, setLanguage] = useState<Language>("de");
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [fontSize, setFontSize] = useState(100);
  const [announcement, setAnnouncement] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem("accessibility-settings");
      if (!saved) return;

      const parsed = JSON.parse(saved) as { settings?: AccessibilitySettings; fontSize?: number; language?: Language };
      if (parsed.settings) setSettings(parsed.settings);
      if (typeof parsed.fontSize === "number") setFontSize(parsed.fontSize);
      if (parsed.language) setLanguage(parsed.language);
    } catch {
      window.localStorage.removeItem("accessibility-settings");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("accessibility-settings", JSON.stringify({ settings, fontSize, language }));
    applySettings();
  }, [settings, fontSize, language]);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        triggerRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();
    setAnnouncement(language === "de" ? "Bedienfeld geöffnet. Mit Escape schließen." : "Panel opened. Press Escape to close.");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        setAnnouncement(language === "de" ? "Bedienfeld geschlossen." : "Panel closed.");
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])")
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, language]);

  const applySettings = () => {
    const root = document.documentElement;
    const body = document.body;
    const pageRoot = document.getElementById("page-root") ?? body;

    root.style.fontSize = `${fontSize}%`;

    body.classList.toggle("high-contrast", settings.highContrast);
    body.classList.toggle("underline-links", settings.underlineLinks);
    body.classList.toggle("readable-font", settings.readableFont);
    body.classList.toggle("increased-spacing", settings.increasedSpacing);
    body.classList.toggle("cursor-highlight", settings.cursorHighlight);
    body.classList.toggle("night-mode", settings.nightMode);
    body.classList.toggle("hide-images", settings.hideImages);
    body.classList.toggle("large-pointer", settings.largePointer);
    body.classList.toggle("mute-sound", settings.muteSound);
    body.classList.toggle("focus-indicators", settings.focusIndicators);
    body.classList.toggle("text-spacing", settings.textSpacing);
    body.classList.toggle("stop-animations", settings.stopAnimations);
    body.classList.toggle("reading-guide", settings.readingGuide);

    pageRoot.classList.remove("protanopia", "protanomaly", "deuteranopia", "deuteranomaly", "tritanopia", "tritanomaly", "achromatopsia");
    if (settings.colorBlindMode !== "none") {
      pageRoot.classList.add(settings.colorBlindMode);
    }

    const filters: string[] = [];
    if (settings.grayscale) filters.push("grayscale(100%)");
    if (settings.blueFilter) filters.push("sepia(20%) saturate(70%)");
    if (settings.saturationMode) filters.push("saturate(150%)");
    pageRoot.style.filter = filters.join(" ");
  };

  const toggleSetting = (setting: SettingKey) => {
    setSettings((prev) => {
      const nextValue = !prev[setting];
      setAnnouncement(language === "de" ? "Einstellung aktualisiert." : "Setting updated.");
      return { ...prev, [setting]: nextValue };
    });
  };

  const setColorBlindMode = (mode: ColorBlindMode) => {
    setSettings((prev) => ({ ...prev, colorBlindMode: mode }));
    setAnnouncement(language === "de" ? "Farbmodus geändert." : "Color mode updated.");
  };

  const increaseFontSize = () => {
    setFontSize((prev) => {
      const next = Math.min(prev + 10, 200);
      setAnnouncement(language === "de" ? `Schriftgröße auf ${next}% geändert.` : `Font size changed to ${next}%.`);
      return next;
    });
  };
  const decreaseFontSize = () => {
    setFontSize((prev) => {
      const next = Math.max(prev - 10, 80);
      setAnnouncement(language === "de" ? `Schriftgröße auf ${next}% geändert.` : `Font size changed to ${next}%.`);
      return next;
    });
  };

  const applyPreset = (preset: QuickPreset) => {
    if (preset === "elderly") {
      setFontSize(140);
      setSettings((prev) => ({ ...prev, readableFont: true, increasedSpacing: true, underlineLinks: true, textSpacing: true, focusIndicators: true }));
      setAnnouncement(language === "de" ? "Seniorenansicht aktiviert." : "Elderly preset applied.");
    }
    if (preset === "lowVision") {
      setFontSize(160);
      setSettings((prev) => ({ ...prev, highContrast: true, underlineLinks: true, cursorHighlight: true, focusIndicators: true, largePointer: true }));
      setAnnouncement(language === "de" ? "Ansicht für Sehschwäche aktiviert." : "Low vision preset applied.");
    }
    if (preset === "colorBlind") {
      setSettings((prev) => ({ ...prev, colorBlindMode: "deuteranomaly", underlineLinks: true }));
      setAnnouncement(language === "de" ? "Farbschwäche-Voreinstellung aktiviert." : "Color blindness preset applied.");
    }
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
    setFontSize(100);
    setLanguage("de");
    setAnnouncement(language === "de" ? "Einstellungen zurückgesetzt." : "Settings reset.");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("accessibility-settings");
    }
  };

  const t = translations[language];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="accessibility-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.title}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        title={t.title}
      >
        <Accessibility aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="accessibility-panel"
            id="accessibility-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-panel-title"
            aria-describedby="accessibility-panel-help"
            tabIndex={-1}
          >
            <div className="accessibility-panel__header">
              <div>
                <p className="accessibility-panel__eyebrow">{t.title}</p>
                <h2 id="accessibility-panel-title" className="accessibility-panel__title">{t.title}</h2>
              </div>
              <div className="accessibility-panel__actions">
                <button type="button" onClick={resetAll} className="accessibility-panel__icon" aria-label={t.reset}>
                  ↺
                </button>
                <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="accessibility-panel__icon" aria-label={t.close}>
                  ×
                </button>
              </div>
            </div>

            <div className="accessibility-panel__content">
              <p id="accessibility-panel-help" className="sr-only">
                {language === "de"
                  ? "Verwenden Sie Tab und Shift+Tab, um durch die Optionen zu navigieren. Mit Escape schließen Sie das Fenster."
                  : "Use Tab and Shift+Tab to navigate the options. Press Escape to close the panel."}
              </p>
              <p aria-live="polite" className="sr-only">
                {announcement}
              </p>
              <div className="accessibility-panel__group">
                <label className="accessibility-panel__select-label" htmlFor="accessibility-language">
                  {t.languageToggle}
                </label>
                <select
                  id="accessibility-language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as Language)}
                  className="accessibility-panel__select"
                >
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="accessibility-panel__group">
                <h3>{t.quickView}</h3>
                <div className="accessibility-panel__row">
                  <button type="button" onClick={() => applyPreset("elderly")} className="accessibility-panel__chip">
                    {t.elderly}
                  </button>
                  <button type="button" onClick={() => applyPreset("lowVision")} className="accessibility-panel__chip">
                    {t.lowVision}
                  </button>
                  <button type="button" onClick={() => applyPreset("colorBlind")} className="accessibility-panel__chip">
                    {t.colorBlind}
                  </button>
                </div>
              </div>

              <div className="accessibility-panel__group">
                <h3>{t.fontSize}</h3>
                <div className="accessibility-panel__font-controls">
                  <button type="button" onClick={decreaseFontSize} className="accessibility-panel__button">
                    A-
                  </button>
                  <span>{fontSize}%</span>
                  <button type="button" onClick={increaseFontSize} className="accessibility-panel__button">
                    A+
                  </button>
                </div>
              </div>

              <div className="accessibility-panel__group">
                <h3>{t.displayOptions}</h3>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.highContrast} onChange={() => toggleSetting("highContrast")} />
                  <span>{t.contrastMode}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.nightMode} onChange={() => toggleSetting("nightMode")} />
                  <span>{t.nightMode}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.blueFilter} onChange={() => toggleSetting("blueFilter")} />
                  <span>{t.blueFilter}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.grayscale} onChange={() => toggleSetting("grayscale")} />
                  <span>{t.grayscale}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.underlineLinks} onChange={() => toggleSetting("underlineLinks")} />
                  <span>{t.underlineLinks}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.readableFont} onChange={() => toggleSetting("readableFont")} />
                  <span>{t.readableFont}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.increasedSpacing} onChange={() => toggleSetting("increasedSpacing")} />
                  <span>{t.increasedSpacing}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.cursorHighlight} onChange={() => toggleSetting("cursorHighlight")} />
                  <span>{t.cursorHighlight}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.hideImages} onChange={() => toggleSetting("hideImages")} />
                  <span>{t.hideImages}</span>
                </label>
                <label className="accessibility-panel__option">
                  <input type="checkbox" checked={settings.saturationMode} onChange={() => toggleSetting("saturationMode")} />
                  <span>{t.saturationMode}</span>
                </label>
                <div className="accessibility-panel__select-wrap">
                  <label className="accessibility-panel__select-label" htmlFor="color-blind-mode">
                    {t.colorBlindModeLabel}
                  </label>
                  <select
                    id="color-blind-mode"
                    value={settings.colorBlindMode}
                    onChange={(event) => setColorBlindMode(event.target.value as ColorBlindMode)}
                    className="accessibility-panel__select"
                  >
                    <option value="none">{t.normal}</option>
                    <option value="protanopia">{t.protanopia}</option>
                    <option value="protanomaly">{t.protanomaly}</option>
                    <option value="deuteranopia">{t.deuteranopia}</option>
                    <option value="deuteranomaly">{t.deuteranomaly}</option>
                    <option value="tritanopia">{t.tritanopia}</option>
                    <option value="tritanomaly">{t.tritanomaly}</option>
                    <option value="achromatopsia">{t.achromatopsia}</option>
                  </select>
                </div>
              </div>

              <div className="accessibility-panel__group">
                <button type="button" className="accessibility-panel__expand" onClick={() => setShowMoreFeatures((prev) => !prev)}>
                  {t.moreFeatures} {showMoreFeatures ? "▲" : "▼"}
                </button>
                {showMoreFeatures && (
                  <div className="accessibility-panel__more">
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.largePointer} onChange={() => toggleSetting("largePointer")} />
                      <span>{t.largePointer}</span>
                    </label>
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.muteSound} onChange={() => toggleSetting("muteSound")} />
                      <span>{t.muteSound}</span>
                    </label>
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.focusIndicators} onChange={() => toggleSetting("focusIndicators")} />
                      <span>{t.focusIndicators}</span>
                    </label>
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.textSpacing} onChange={() => toggleSetting("textSpacing")} />
                      <span>{t.textSpacing}</span>
                    </label>
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.stopAnimations} onChange={() => toggleSetting("stopAnimations")} />
                      <span>{t.stopAnimations}</span>
                    </label>
                    <label className="accessibility-panel__option">
                      <input type="checkbox" checked={settings.readingGuide} onChange={() => toggleSetting("readingGuide")} />
                      <span>{t.readingGuide}</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
