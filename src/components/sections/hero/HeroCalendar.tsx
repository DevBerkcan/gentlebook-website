import { BellRing, CalendarCheck, Search } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

/**
 * Wochenkalender des Admin-Dashboards als reines HTML/CSS-Mockup.
 * Die Termine ([data-appt]) werden im Hero scroll-gesteuert eingeblendet —
 * der Kalender „füllt sich von selbst", genau wie die Headline verspricht.
 */

const copy = {
  de: {
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    week: "KW 42",
    today: "Heute",
    utilization: "Auslastung",
    bookings: "Neue Buchungen",
    noShows: "No-Shows",
    team: "Team",
    available: "verfügbar",
    search: "Kund:in suchen …",
    services: ["Balayage", "Herrenschnitt", "Waschen & Föhnen", "Color Refresh", "Bartpflege", "Styling", "Pflege-Ritual", "Strähnen"],
  },
  en: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    week: "Week 42",
    today: "Today",
    utilization: "Utilisation",
    bookings: "New bookings",
    noShows: "No-shows",
    team: "Team",
    available: "available",
    search: "Search clients …",
    services: ["Balayage", "Men's cut", "Wash & blow-dry", "Color refresh", "Beard care", "Styling", "Care ritual", "Highlights"],
  },
};

const START_HOUR = 9;
const HOURS = 9;

// [Tag, Beginn, Dauer (h), Leistung, Mitarbeiter:in, Farbton]
type Appt = [number, number, number, number, number, number];
const appointments: Appt[] = [
  [0, 9, 2, 0, 0, 0],
  [0, 11.5, 0.75, 1, 1, 2],
  [0, 13, 1, 3, 2, 1],
  [0, 15.5, 1.5, 5, 1, 3],
  [1, 9.5, 1, 2, 2, 2],
  [1, 11, 2, 7, 0, 0],
  [1, 14, 0.75, 4, 1, 1],
  [1, 16, 1.25, 6, 2, 2],
  [2, 9, 0.75, 1, 1, 3],
  [2, 10, 2.5, 0, 0, 0],
  [2, 15, 1, 2, 2, 1],
  [3, 9.5, 1.5, 3, 2, 2],
  [3, 12, 1, 5, 1, 0],
  [3, 14.5, 2, 7, 0, 3],
  [4, 10, 1, 4, 1, 1],
  [4, 12, 2, 0, 0, 2],
  [5, 9, 1.25, 6, 2, 1],
  [5, 10.5, 2, 0, 0, 0],
];
// Der Samstag-Termin 10:30 ist die „Neue Buchung" aus dem Toast
const HIGHLIGHT = appointments.length - 1;

const tones = [
  "bg-violet text-white",
  "bg-teal text-white",
  "bg-lavender text-ink border border-violet/15",
  "bg-ink text-white",
];
const empColors = ["bg-violet", "bg-teal", "bg-ink"];

function fmt(hour: number) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function HeroCalendar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = copy[locale];
  const employees = dict.productDemo.employees;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[1.6rem] bg-white text-ink shadow-stage ring-1 ring-white/10">
        {/* Fensterleiste */}
        <div className="flex items-center gap-3 border-b border-ink/[0.06] bg-porcelain/80 px-4 py-3 sm:px-5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-mist ring-1 ring-ink/[0.06]">
            studio-mila.gentlebook.app/admin
          </span>
          <span className="hidden items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] text-mist ring-1 ring-ink/[0.06] md:flex">
            <Search className="h-3 w-3" aria-hidden="true" />
            {t.search}
          </span>
          <span className="text-[11px] font-semibold text-ink/70">{t.week}</span>
        </div>

        <div className="flex">
          {/* Seitenleiste mit Kennzahlen */}
          <aside className="hidden w-52 shrink-0 flex-col gap-3 border-r border-ink/[0.06] p-4 md:flex">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">{t.today}</p>
            <div className="rounded-2xl bg-porcelain p-3.5">
              <p className="text-[11px] text-mist">{t.utilization}</p>
              <p className="mt-1 font-display text-3xl font-medium tabular-nums">
                <span data-count-util>92</span>
                <span className="text-lg text-ink/40"> %</span>
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.06]">
                <div data-count-bar className="h-full w-[92%] origin-left rounded-full bg-brand-gradient" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-porcelain p-3">
                <p className="text-[10px] leading-tight text-mist">{t.bookings}</p>
                <p className="mt-1 font-display text-2xl font-medium tabular-nums">
                  <span data-count-book>18</span>
                </p>
              </div>
              <div className="rounded-2xl bg-teal/10 p-3">
                <p className="text-[10px] leading-tight text-mist">{t.noShows}</p>
                <p className="mt-1 font-display text-2xl font-medium text-teal">0</p>
              </div>
            </div>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">{t.team}</p>
            <ul className="space-y-2">
              {employees.map((e, i) => (
                <li key={e.name} className="flex items-center gap-2.5">
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white", empColors[i % empColors.length])}>
                    {e.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold leading-tight">{e.name}</span>
                    <span className="block text-[10px] leading-tight text-mist">{e.role}</span>
                  </span>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal" title={t.available} />
                </li>
              ))}
            </ul>
          </aside>

          {/* Wochenraster */}
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-[2.6rem_repeat(3,1fr)] border-b border-ink/[0.06] sm:grid-cols-[2.6rem_repeat(6,1fr)]">
              <span />
              {t.days.map((d, i) => (
                <span
                  key={d}
                  className={cn(
                    "py-2.5 text-center text-[11px] font-semibold",
                    i > 2 && "hidden sm:block",
                    i === 2 ? "text-violet" : "text-ink/60"
                  )}
                >
                  {d} <span className="font-normal text-mist">{10 + i}</span>
                </span>
              ))}
            </div>

            <div className="cal-body relative grid h-[22rem] grid-cols-[2.6rem_repeat(3,1fr)] sm:h-[26rem] sm:grid-cols-[2.6rem_repeat(6,1fr)]">
              {/* Stundenlinien */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {Array.from({ length: HOURS }, (_, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-0 border-t border-dashed border-ink/[0.06]"
                    style={{ top: `${(i / HOURS) * 100}%` }}
                  >
                    <span className="absolute left-1.5 top-1 text-[9px] tabular-nums text-mist">{fmt(START_HOUR + i)}</span>
                  </div>
                ))}
              </div>
              <span />
              {t.days.map((d, day) => (
                <div
                  key={d}
                  className={cn(
                    "relative border-l border-ink/[0.05]",
                    day > 2 && "hidden sm:block",
                    day === 2 && "bg-violet/[0.03]"
                  )}
                >
                  {day === 2 && (
                    <div className="absolute inset-x-0 z-10" style={{ top: `${((14.4 - START_HOUR) / HOURS) * 100}%` }} aria-hidden="true">
                      <div className="relative h-px bg-teal">
                        <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-teal" />
                      </div>
                    </div>
                  )}
                  {appointments.map(([aDay, start, dur, svc, emp, tone], i) =>
                    aDay !== day ? null : (
                      <div
                        key={i}
                        data-appt
                        data-highlight={i === HIGHLIGHT ? "" : undefined}
                        className={cn(
                          "absolute inset-x-[3px] overflow-hidden rounded-lg px-2 py-1.5 shadow-sm",
                          tones[tone],
                          i === HIGHLIGHT && "ring-2 ring-teal ring-offset-2 ring-offset-white"
                        )}
                        style={{
                          top: `calc(${((start - START_HOUR) / HOURS) * 100}% + 2px)`,
                          height: `calc(${(dur / HOURS) * 100}% - 4px)`,
                        }}
                      >
                        <p className="text-[9px] font-medium tabular-nums opacity-70">{fmt(start)}</p>
                        <p className="truncate text-[11px] font-semibold leading-tight">{t.services[svc]}</p>
                        {dur >= 1 && <p className="truncate text-[10px] opacity-70">{employees[emp]?.name}</p>}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schwebende Benachrichtigungen */}
      <div
        data-toast
        className="absolute -right-3 top-[44%] z-20 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-ink shadow-lifted backdrop-blur-md sm:flex lg:-right-14"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
          <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold">{dict.hero.cardBooking}</span>
          <span className="block text-xs text-mist">{dict.hero.cardBookingDetail}</span>
        </span>
      </div>
      <div
        data-toast
        className="absolute -left-3 bottom-[8%] z-20 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-ink shadow-lifted backdrop-blur-md sm:flex lg:-left-12"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-white">
          <BellRing className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold">{dict.hero.cardReminder}</span>
          <span className="block text-xs text-mist">{dict.hero.cardReminderDetail}</span>
        </span>
      </div>
    </div>
  );
}
