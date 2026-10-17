import { Link } from "@tanstack/react-router";
import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { Check, CheckCircle, ShieldCheck } from "@/components/icons";
import { CoverageGlobe } from "@/components/landing/CoverageGlobe";
import { HeroCoinStage } from "@/components/landing/HeroCoinStage";
import { LandingDualCarousel } from "@/components/landing/LandingDualCarousel";
import { payoutById } from "@/domain/data";
import { type EngineState, plan, rname } from "@/domain/engine";
import { iso, mins, usd } from "@/domain/format";

/**
 * Marketing front door. Everything on the right-hand side of the coverage
 * section is computed by the same rules engine the product runs on, so the
 * page can't drift from what Corredor actually does today.
 */

const TODAY = 22;

const ENGINE: EngineState = {
	day: TODAY,
	sus: false,
	mut: {},
	registry: {},
	settings: {
		threshold: 50000,
		cap: 150000,
		objective: "cheapest",
		disabled: {},
		autonomy: "prepare",
		requireAck: true,
	},
};

const CORRIDORS = [
	{ id: "br", flag: "🇧🇷", name: "Brazil" },
	{ id: "mx", flag: "🇲🇽", name: "Mexico" },
	{ id: "ar", flag: "🇦🇷", name: "Argentina" },
];

export function LandingPage() {
	// Brand feel: long marketing scroll glides (Lenis). Only here — the app is a
	// working surface, not a story. Native for anyone who prefers reduced motion.
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const lenis = new Lenis({
			autoRaf: true,
			anchors: true, // the "#how-it-works" CTA glides to its section too
		});
		return () => lenis.destroy();
	}, []);
	return (
		<div className="lp-page min-h-screen text-bone">
			<div className="lp-hero-band relative">
				<div className="lp-glow" aria-hidden="true" />

				{/* masthead ----------------------------------------------------- */}
				<header className="lp-shell relative flex flex-wrap items-center justify-between gap-4 py-6">
					<div className="flex items-center gap-3">
						<span className="corredor-mark" role="img" aria-label="Corredor" />
						<div className="flex flex-col">
							<span
								className="display"
								style={{ fontSize: 24, lineHeight: 1.05 }}
							>
								Corredor
							</span>
							<span
								className="mono text-ash-dim"
								style={{ fontSize: 9.5, letterSpacing: ".22em" }}
							>
								BY TOKEICO
							</span>
						</div>
					</div>

					<nav
						aria-label="Marketing"
						className="hidden flex-wrap items-center gap-7 md:flex"
					>
						<Link
							to="/signin"
							className="text-ash no-underline hover:text-bone"
							style={{ fontSize: 14.5 }}
						>
							Sign in
						</Link>
						{["How it works", "Coverage", "Security"].map((l) => (
							<a
								key={l}
								href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
								className="text-ash no-underline hover:text-bone"
								style={{ fontSize: 14.5 }}
							>
								{l}
							</a>
						))}
					</nav>

					<Link
						to="/dashboard"
						className="btn btn-primary lp-pill-cta no-underline"
					>
						Get Started →
					</Link>
				</header>

				{/* hero --------------------------------------------------------- */}
				<section className="lp-shell relative flex flex-col items-center gap-10 pt-8 pb-20">
					<div className="lp-hero-copy flex flex-col items-center gap-6 text-center">
						<span className="lab" style={{ color: "var(--color-volt)" }}>
							Cross-border payments
						</span>
						<h1
							className="display-hero m-0"
							style={{ fontSize: "clamp(38px, 4.5vw, 60px)", lineHeight: 1.04 }}
						>
							Pay Latin America
							<br />
							like it’s{" "}
							<span style={{ color: "var(--color-volt)" }}>next door.</span>
						</h1>
						<p
							className="m-0 mx-auto max-w-[54ch] text-ash"
							style={{ fontSize: "clamp(0.9375rem, 0.85rem + 0.35vw, 1.0625rem)" }}
						>
							Corredor helps US businesses pay suppliers in Latin America with
							stablecoins. It checks each country’s rules, finds a compliant
							route, explains every step, and waits for your approval.
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Link
								to="/dashboard"
								className="btn btn-primary lp-pill-cta no-underline"
							>
								Get Started →
							</Link>
							<a href="#how-it-works" className="btn lp-pill-cta no-underline">
								See how it works
							</a>
						</div>

						<ul className="m-0 flex list-none flex-wrap justify-center gap-x-9 gap-y-4 p-0 pt-2">
							{[
								[ShieldCheck, "Compliant", "by design"],
								[Check, "Faster", "payments"],
								[CheckCircle, "Built for", "businesses"],
							].map(([Icon, a, b]) => {
								const I = Icon as typeof Check;
								return (
									<li
										key={a as string}
										className="flex flex-col items-center gap-2 text-center"
									>
										<span
											className="grid shrink-0 place-items-center rounded-full"
											style={{
												width: 44,
												height: 44,
												border: "1px solid var(--color-edge-strong)",
												color: "var(--color-volt)",
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
								);
							})}
						</ul>
					</div>

					<HeroCoinStage />
				</section>
			</div>

			{/* coverage — second beat after the hero -------------------------- */}
			<section id="coverage" className="lp-section">
				<div className="lp-shell grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<div className="flex flex-col gap-4">
						<span className="lab" style={{ color: "var(--color-volt)" }}>
							Coverage
						</span>
						<h2
							className="display m-0"
							style={{ fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1 }}
						>
							One region. Multiple routes.
						</h2>
						<p
							className="m-0 text-ash"
							style={{ fontSize: 16, maxWidth: "52ch" }}
						>
							We support key markets across Latin America and automatically find
							the best compliant route for your payment.
						</p>
						<div className="flex flex-wrap gap-2 pt-1">
							{[
								["🇧🇷", "Brazil"],
								["🇲🇽", "Mexico"],
								["🇨🇴", "Colombia"],
								["🇨🇱", "Chile"],
								["🇵🇪", "Peru"],
								["🇦🇷", "Argentina"],
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
								[
									"57%",
									"of US merchandise exports go to Latin America and the Caribbean.",
								],
								[
									"$872.8B",
									"in total trade between the US and Latin America (2023).",
								],
								[
									"Minutes",
									"typical settlement on a stablecoin rail, against 1–5 days by wire.",
								],
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

					<CoverageGlobe />
				</div>

				<div className="lp-shell pb-16">
					<LiveCorridors />
				</div>
			</section>

			<LandingDualCarousel />

			{/* closing band — last beat before the footer ------------------- */}
			<section className="lp-section">
				<div className="lp-shell py-16">
					<div
						className="flex flex-wrap items-center justify-between gap-6 rounded-2xl px-[clamp(1.25rem,4vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)]"
						style={{
							border: "1px solid var(--color-edge)",
							background:
								"linear-gradient(110deg, color-mix(in oklab, var(--color-volt) 12%, transparent) 0%, var(--color-panel) 55%)",
						}}
					>
						<div className="flex flex-col gap-2">
							<span className="lab">Get started</span>
							<h2
								className="display m-0"
								style={{ fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.1 }}
							>
								Ready to move faster
								<br />
								in Latin America?
							</h2>
						</div>
						<div className="flex flex-col items-start gap-3">
							<span
								className="text-ash"
								style={{ fontSize: 15, maxWidth: "36ch" }}
							>
								Walk the whole flow on demo invoices — nothing here moves real
								money.
							</span>
							<Link
								to="/dashboard"
								className="btn btn-primary lp-pill-cta no-underline"
							>
								Get Started →
							</Link>
						</div>
					</div>
				</div>
			</section>

			<footer className="lp-section">
				<div className="lp-shell flex flex-wrap items-center justify-between gap-4 py-8">
					<div className="flex items-center gap-3">
						<span
							className="corredor-mark"
							role="img"
							aria-label="Corredor"
							style={{ width: 30, height: 18 }}
						/>
						<span className="display" style={{ fontSize: 17 }}>
							Corredor
						</span>
						<span
							className="mono text-ash-dim"
							style={{ fontSize: 9.5, letterSpacing: ".22em" }}
						>
							BY TOKEICO
						</span>
					</div>
					<span className="text-ash-dim" style={{ fontSize: 13 }}>
						Demo built for the eMerge AI Hackathon 2026 · rules pack v1, pending
						compliance review · simulated rail
					</span>
				</div>
			</footer>
		</div>
	);
}

/**
 * Not a decorative map: the cheapest compliant route for each corridor today,
 * straight from the rules engine.
 */
function LiveCorridors() {
	const today = iso(TODAY);
	const rows = CORRIDORS.map((c) => {
		const p = payoutById(c.id);
		const pl = plan(p, today, ENGINE);
		const rec = pl.rec;
		const wire = pl.evals.find((e) => e.route.kind === "wire")!;
		return {
			...c,
			provider: rname(rec),
			asset: rec?.route.off
				? `${rec.route.off.asset} · ${rec.route.off.net}`
				: "SWIFT",
			rail: rec?.route.off?.rail ?? "Correspondent bank",
			fee: rec ? `${rec.route.fee.toFixed(2)}%` : "—",
			time: rec ? mins(rec.route.min) : "—",
			saved: rec ? usd((p.usd * (wire.route.fee - rec.route.fee)) / 100) : "—",
			warns: rec?.warns ?? 0,
		};
	});

	return (
		<div
			className="flex flex-col gap-3 rounded-2xl p-6"
			style={{
				border: "1px solid var(--color-edge)",
				background: "var(--color-panel)",
			}}
		>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<span className="font-semibold" style={{ fontSize: 15.5 }}>
					Today’s compliant route, by corridor
				</span>
				<span className="pill p-muted">Live from rules pack v1</span>
			</div>

			{rows.map((r) => (
				<div
					key={r.id}
					className="lp-corridor-row border-t border-edge-soft pt-3"
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
					<div className="lp-corridor-metrics">
						<span
							className="mono"
							style={{ fontSize: 14, color: "var(--color-volt)" }}
						>
							{r.fee}
						</span>
						<span className="mono text-ash" style={{ fontSize: 13 }}>
							{r.time}
						</span>
						<span className="mono text-ash-dim" style={{ fontSize: 13 }}>
							saves {r.saved}
						</span>
					</div>
				</div>
			))}

			<span className="text-ash-dim" style={{ fontSize: 12.5 }}>
				Computed by the same engine the product runs on, against the demo
				invoices and fictional provider fees. Move the date in the app and these
				change.
			</span>
		</div>
	);
}
