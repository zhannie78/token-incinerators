import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import { payoutById } from '@/domain/data'
import { plan, rname, type EngineState } from '@/domain/engine'
import { iso, mins, usd } from '@/domain/format'
import {
  Check,
  Chat,
  CheckCircle,
  Clock,
  ShieldCheck,
  WarnTriangle,
} from '@/components/icons'
import { AnimatedCard } from '@/components/AnimatedCard'
import { ScrollRevealText } from '@/components/ScrollRevealText'

const TODAY = 22

const ENGINE: EngineState = {
  day: TODAY,
  sus: false,
  mut: {},
  registry: {},
  settings: {
    threshold: 50000,
    cap: 150000,
    objective: 'cheapest',
    disabled: {},
    autonomy: 'prepare',
    requireAck: true,
  },
}

const CORRIDORS = [
  { id: 'br', flag: '🇧🇷', name: 'Brazil' },
  { id: 'mx', flag: '🇲🇽', name: 'Mexico' },
  { id: 'ar', flag: '🇦🇷', name: 'Argentina' },
]

const STEPS = [
  {
    n: '01',
    icon: Chat,
    title: 'Drop in your invoice',
    body: 'Tell us who you are paying and in which country.',
  },
  {
    n: '02',
    icon: Clock,
    title: 'We analyze the rules',
    body: 'Corredor checks local regulations and available payment routes, as of today date.',
  },
  {
    n: '03',
    icon: WarnTriangle,
    title: 'We create a customized plan',
    body: 'See the recommended route and the reasoning, with every rule cited and linked.',
  },
  {
    n: '04',
    icon: CheckCircle,
    title: 'You review and approve',
    body: 'Once you approve, it settles in stablecoins through the right local rail.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen text-bone" style={{ backgroundColor: '#000000' }}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-6 w-full z-50">
        <div className="flex items-center gap-3">
          <span className="corredor-mark" role="img" aria-label="Corredor" />
          <div className="flex flex-col">
            <span className="display" style={{ fontSize: 24, lineHeight: 1.05 }}>
              Corredor
            </span>
            <span className="mono text-ash-dim" style={{ fontSize: 9.5, letterSpacing: '.22em' }}>
              BY TOKEICO
            </span>
          </div>
        </div>

        <nav aria-label="Marketing" className="hidden flex-wrap items-center gap-7 md:flex">
          <Link to="/app" className="text-ash no-underline hover:text-bone" style={{ fontSize: 14.5 }}>
            Product
          </Link>
          {['How it works', 'Coverage', 'Security'].map((l) => (
            <a
              key={l}
              href={'#' + l.toLowerCase().replace(/\s/g, '-')}
              className="text-ash no-underline hover:text-bone"
              style={{ fontSize: 14.5 }}
            >
              {l}
            </a>
          ))}
        </nav>

        <Link to="/app" className="btn btn-primary lp-pill-cta no-underline">
          Open the live demo →
        </Link>
      </header>

      {/* Hero section */}
      <div className="relative h-screen flex flex-col items-center justify-center">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center flex flex-col items-center gap-8 px-6 max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lab"
            style={{ color: 'var(--color-volt)' }}
          >
            Cross-border payments
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="display-hero m-0"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.04 }}
          >
            Pay Latin America
            <br />
            like it&apos;s <span style={{ color: 'var(--color-volt)' }}>next door.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="m-0 text-ash"
            style={{ fontSize: 17, maxWidth: '54ch' }}
          >
            Corredor helps US businesses pay suppliers in Latin America with stablecoins. It checks each country rules, finds a compliant route, explains every step, and waits for your approval.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link to="/app" className="btn btn-primary lp-pill-cta no-underline">
              Open the live demo →
            </Link>
            <a href="#how-it-works" className="btn lp-pill-cta no-underline">
              See how it works
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="m-0 flex list-none flex-wrap gap-x-9 gap-y-4 p-0 pt-2 justify-center"
          >
            {[
              [ShieldCheck, 'Compliant', 'by design'],
              [Check, 'Faster', 'payments'],
              [CheckCircle, 'Built for', 'businesses'],
            ].map(([Icon, a, b]) => {
              const I = Icon as typeof Check
              return (
                <li key={a as string} className="flex items-center gap-3">
                  <span
                    className="grid place-items-center rounded-full"
                    style={{
                      width: 44,
                      height: 44,
                      border: '1px solid var(--color-edge-strong)',
                      color: 'var(--color-volt)',
                    }}
                  >
                    <I size={18} />
                  </span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.25 }}>
                    {a as string}
                    <br />
                    {b as string}
                  </span>
                </li>
              )
            })}
          </motion.ul>
        </motion.div>
      </div>

      {/* Coverage */}
      <section id="coverage" className="lp-section">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-4">
            <ScrollRevealText>
              <span className="lab" style={{ color: 'var(--color-volt)' }}>
                Coverage
              </span>
              <h2 className="display m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', lineHeight: 1.1 }}>
                One region. Multiple routes.
              </h2>
              <p className="m-0 text-ash" style={{ fontSize: 16, maxWidth: '52ch' }}>
                We support key markets across Latin America and automatically find the best compliant
                route for your payment.
              </p>
            </ScrollRevealText>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                ['🇧🇷', 'Brazil'],
                ['🇲🇽', 'Mexico'],
                ['🇨🇴', 'Colombia'],
                ['🇨🇱', 'Chile'],
                ['🇵🇪', 'Peru'],
                ['🇦🇷', 'Argentina'],
              ].map(([flag, name]) => (
                <span key={name} className="lp-chip">
                  <span className="lp-flag" aria-hidden="true">
                    {flag}
                  </span>
                  {name}
                </span>
              ))}
              <span className="lp-chip text-ash-dim">+ more</span>
            </div>
            <div className="grid gap-5 pt-4 sm:grid-cols-3">
              {[
                ['57%', 'of US merchandise exports go to Latin America and the Caribbean.'],
                ['$872.8B', 'in total trade between the US and Latin America (2023).'],
                ['Minutes', 'typical settlement on a stablecoin rail, against 1-5 days by wire.'],
              ].map(([v, l]) => (
                <div key={v} className="lp-stat">
                  <span className="display" style={{ fontSize: 26 }}>
                    {v}
                  </span>
                  <span className="text-ash-dim" style={{ fontSize: 13 }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <img
            className="coverage-map"
            src="/coverage-map.png"
            width={356}
            height={318}
            alt="Dotted map of the Americas with payment corridors arcing from the United States to Mexico, Colombia, Brazil and Argentina."
          />
        </div>

        <div className="mx-auto max-w-[1320px] px-6 pb-16">
          <LiveCorridors />
        </div>
      </section>

      {/* How it works & Security combined - Side by side 2x2 grids */}
      <section id="how-it-works" className="lp-section">
        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* How it works */}
            <div className="flex flex-col gap-8">
              <ScrollRevealText className="flex flex-col gap-3">
                <span className="lab" style={{ color: 'var(--color-volt)' }}>
                  How it works
                </span>
                <h2
                  className="display m-0"
                  style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', lineHeight: 1.1, maxWidth: '20ch' }}
                >
                  A safer, smarter way to move money across borders.
                </h2>
                <p className="m-0 text-ash" style={{ fontSize: 15, maxWidth: '52ch' }}>
                  Every country has different regulations, banks and payment rails. Corredor applies
                  the rules in force on the day you pay, picks the best compliant route, and shows the
                  logic behind every decision — so you stay in control.
                </p>
              </ScrollRevealText>

              <ol className="m-0 grid grid-cols-2 gap-4 list-none p-0">
                {STEPS.map((s, idx) => (
                  <AnimatedCard key={s.n} delay={idx * 0.1}>
                    <li className="lp-step">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="mono"
                          style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-volt)' }}
                        >
                          {s.n}
                        </span>
                        <span className="text-ash-dim">
                          <s.icon size={16} />
                        </span>
                      </div>
                      <span className="font-semibold" style={{ fontSize: 14 }}>
                        {s.title}
                      </span>
                      <span className="text-ash-dim" style={{ fontSize: 12.5 }}>
                        {s.body}
                      </span>
                    </li>
                  </AnimatedCard>
                ))}
              </ol>
            </div>

            {/* Security */}
            <div className="flex flex-col gap-8" id="security">
              <ScrollRevealText className="flex flex-col gap-3">
                <span className="lab" style={{ color: 'var(--color-volt)' }}>
                  Security
                </span>
                <h2 className="display m-0" style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', lineHeight: 1.1 }}>
                  AI reads and explains.
                  <br />
                  Code decides. A person approves.
                </h2>
                <p className="m-0 text-ash" style={{ fontSize: 15, maxWidth: '52ch' }}>
                  Every step in your payment is logged, chained, and auditable. No money moves without
                  human approval.
                </p>
              </ScrollRevealText>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Deterministic engine', 'The same invoice and date always produce the same plan — replayable, with a fingerprint.'],
                  ['Every claim cited', 'Each decision names the rule, its effective date, and links the source.'],
                  ['No money-moving AI', 'The agent can read and propose. Approving and paying exist only for people.'],
                  ['Hash-chained audit', 'Every AI step, engine step and human decision is chained; editing one breaks the chain.'],
                ].map(([t, b], idx) => (
                  <AnimatedCard key={t} delay={idx * 0.1}>
                    <div className="lp-step">
                      <span style={{ color: 'var(--color-volt)', marginBottom: 8, display: 'block' }}>
                        <ShieldCheck size={16} />
                      </span>
                      <span className="font-semibold" style={{ fontSize: 14 }}>
                        {t}
                      </span>
                      <span className="text-ash-dim" style={{ fontSize: 12.5 }}>
                        {b}
                      </span>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="lp-section">
        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div
            className="flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-10"
            style={{
              border: '1px solid var(--color-edge)',
              background:
                'linear-gradient(110deg, color-mix(in oklab, var(--color-volt) 12%, transparent) 0%, var(--color-panel) 55%)',
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="lab">Get started</span>
              <h2 className="display m-0" style={{ fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.1 }}>
                Ready to move faster
                <br />
                in Latin America?
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3">
              <span className="text-ash" style={{ fontSize: 15, maxWidth: '36ch' }}>
                Walk the whole flow on demo invoices — nothing here moves real money.
              </span>
              <Link to="/app" className="btn btn-primary lp-pill-cta no-underline">
                Open the live demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-section">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div className="flex items-center gap-3">
            <span className="corredor-mark" role="img" aria-label="Corredor" style={{ width: 30, height: 18 }} />
            <span className="display" style={{ fontSize: 17 }}>
              Corredor
            </span>
            <span className="mono text-ash-dim" style={{ fontSize: 9.5, letterSpacing: '.22em' }}>
              BY TOKEICO
            </span>
          </div>
          <span className="text-ash-dim" style={{ fontSize: 13 }}>
            Demo built for the eMerge AI Hackathon 2026 · rules pack v1, pending compliance review ·
            simulated rail
          </span>
        </div>
      </footer>
    </div>
  )
}

/**
 * Not a decorative map: the cheapest compliant route for each corridor today,
 * straight from the rules engine.
 */
function LiveCorridors() {
  const today = iso(TODAY)
  const rows = CORRIDORS.map((c) => {
    const p = payoutById(c.id)
    const pl = plan(p, today, ENGINE)
    const rec = pl.rec
    const wire = pl.evals.find((e) => e.route.kind === 'wire')!
    return {
      ...c,
      provider: rname(rec),
      asset: rec?.route.off ? rec.route.off.asset + ' · ' + rec.route.off.net : 'SWIFT',
      rail: rec?.route.off?.rail ?? 'Correspondent bank',
      fee: rec ? rec.route.fee.toFixed(2) + '%' : '—',
      time: rec ? mins(rec.route.min) : '—',
      saved: rec ? usd((p.usd * (wire.route.fee - rec.route.fee)) / 100) : '—',
      warns: rec?.warns ?? 0,
    }
  })

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-6"
      style={{ border: '1px solid var(--color-edge)', background: 'var(--color-panel)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold" style={{ fontSize: 15.5 }}>
          Today&apos;s compliant route, by corridor
        </span>
        <span className="pill p-muted">Live from rules pack v1</span>
      </div>

      {rows.map((r) => (
        <div
          key={r.id}
          className="grid items-center gap-3 border-t border-edge-soft pt-3"
          style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}
        >
          <div className="flex min-w-0 flex-col gap-1">
            <span className="flex items-center gap-2" style={{ fontSize: 15 }}>
              <span aria-hidden="true">{r.flag}</span>
              {r.name}
              <span className="text-ash-dim" style={{ fontSize: 13 }}>
                · {r.provider}
              </span>
            </span>
            <span className="mono text-ash-dim" style={{ fontSize: 12 }}>
              {r.asset} · {r.rail}
            </span>
          </div>
          <div className="flex items-center gap-4 text-right">
            <span className="mono" style={{ fontSize: 14, color: 'var(--color-volt)' }}>
              {r.fee}
            </span>
            <span className="mono text-ash" style={{ fontSize: 13, minWidth: 56 }}>
              {r.time}
            </span>
            <span className="mono text-ash-dim" style={{ fontSize: 13, minWidth: 92 }}>
              saves {r.saved}
            </span>
          </div>
        </div>
      ))}

      <span className="text-ash-dim" style={{ fontSize: 12.5 }}>
        Computed by the same engine the product runs on, against the demo invoices and fictional
        provider fees. Move the date in the app and these change.
      </span>
    </div>
  )
}
