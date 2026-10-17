import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";

import { RULES } from "@/domain/data";
import { TOUR_WHY } from "@/domain/demo-guide";
import { activeRuleCount } from "@/domain/engine";
import { fmtDate, iso } from "@/domain/format";
import { isDemoAdmin, signOut } from "@/lib/auth";
import { useStore, VIEW_PATH, type ViewId } from "@/state/store";
import { FeatureGuide } from "./FeatureGuide";
import { HelpHint } from "./HelpHint";
import { Close, More, Swap } from "./icons";

const TABS: [ViewId, string][] = [
	["dashboard", "Dashboard"],
	["agent", "Agent"],
	["inbox", "Inbox"],
	["ledger", "Books"],
];

/** Same app, less chrome: the rest sits one click behind the overflow. */
const MORE: [ViewId, string][] = [
	["overview", "Overview"],
	["trust", "Trust & compliance"],
	["customize", "Customize"],
];

/** Screens whose numbers are planned as of the demo date; the timeline shows only there. */
const TIMELINE_PATHS = ["/agent", "/inbox", "/overview", "/trust"];

/** The milestones the pitch drags between. */
const JUMPS: [number, string][] = [
	[5, "Sep 30"],
	[6, "Oct 1 · Res. 561"],
	[22, "Today"],
	[36, "Oct 31 · Non-filers drop out"],
];

export function Shell({ children }: { children: ReactNode }) {
	const { state, go, user } = useStore();
	const [signingOut, setSigningOut] = useState(false);
	const [signOutError, setSignOutError] = useState("");
	const { pathname } = useLocation();
	const pending = state.actions.filter((a) => a.status === "pending");

	return (
		<div className="min-h-screen text-bone">
			{/* Transparent so the ambient glow on the body reads through the masthead. */}
			<header className="border-b border-edge-soft">
				<div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-3">
					<div className="flex flex-wrap items-center gap-[18px]">
						{/* The lockup is the way back out to the marketing site. */}
						<Link
							to="/"
							className="brand-link flex items-center gap-3 no-underline"
							aria-label="Corredor home"
							title="Back to corredor.com"
						>
							<span className="corredor-mark" aria-hidden="true" />
							<div className="flex flex-col">
								<span
									className="display"
									style={{
										fontSize: 24,
										lineHeight: 1.05,
										letterSpacing: "-.01em",
									}}
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
						</Link>
						<nav
							aria-label="Main"
							className="flex flex-wrap items-center gap-0.5"
						>
							{TABS.map(([id, label]) => {
								const on = pathname === VIEW_PATH[id];
								const text =
									id === "agent" && pending.length
										? `Agent · ${pending.length}`
										: label;
								return (
									<button
										key={id}
										type="button"
										className={`tab${on ? " tab-on" : ""}`}
										aria-pressed={on}
										onClick={() => go(id)}
									>
										{text}
									</button>
								);
							})}
							<details className="more-menu">
								<summary
									className={
										MORE.some(([id]) => pathname === VIEW_PATH[id])
											? "tab tab-on"
											: ""
									}
									aria-label="More views"
									title="More views"
								>
									<More size={18} />
								</summary>
								<div className="more-pop">
									{MORE.map(([id, label]) => (
										<button
											key={id}
											type="button"
											className={`tab${pathname === VIEW_PATH[id] ? " tab-on" : ""}`}
											onClick={(e) => {
												go(id);
												(
													e.currentTarget.closest(
														"details",
													) as HTMLDetailsElement
												).removeAttribute("open");
											}}
										>
											{label}
										</button>
									))}
								</div>
							</details>
							<FeatureGuide key={pathname} pathname={pathname} />
						</nav>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<span
							className="max-w-[180px] truncate text-xs text-ash-dim"
							title={user.workspace.name}
						>
							{user.workspace.name}
						</span>
						<span className="text-ash" style={{ fontSize: 13 }}>
							<Link
								to="/account"
								aria-current={pathname === "/account" ? "page" : undefined}
								className="font-semibold text-bone underline-offset-4 hover:underline"
							>
								{user.name}
							</Link>
							<span className="ml-2 text-ash-dim">{user.role}</span>
						</span>
						<button
							type="button"
							className="btn btn-sm"
							disabled={signingOut}
							onClick={async () => {
								setSigningOut(true);
								setSignOutError("");
								try {
									await signOut();
									window.location.replace("/signin");
								} catch {
									setSignOutError("Could not sign out. Please try again.");
									setSigningOut(false);
								}
							}}
						>
							{signingOut ? "Signing out..." : "Sign out"}
						</button>
						{signOutError && (
							<span role="alert" className="text-sm text-coral">
								{signOutError}
							</span>
						)}
						<span
							className="pill p-muted"
							title={
								"Rules pack v1 · " +
								activeRuleCount(iso(state.day)) +
								" of " +
								RULES.length +
								" active · pending compliance review · rail: simulated"
							}
						>
							Simulated demo
						</span>
					</div>
				</div>

				{isDemoAdmin(user) && TIMELINE_PATHS.includes(pathname) && <AsOfBar />}
			</header>

			<TourBar key={state.tour ?? "off"} />
			{children}
			<Toast />
		</div>
	);
}

/**
 * The as-of date bar. Moving it re-runs the rules engine for every open payout
 * — the demo's single most important control. Shown to the demo admin only.
 */
function AsOfBar() {
	const { state, setDay } = useStore();
	const label = fmtDate(iso(state.day));
	const [open, setOpen] = useState(false);

	return (
		<div className="border-t border-edge-soft bg-panel">
			<div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="flex min-w-[170px] items-center gap-2.5">
						<span className="lab">As-of date</span>
						<span
							className="mono"
							style={{
								fontWeight: 600,
								fontSize: 16,
								lineHeight: 1.1,
								fontVariantNumeric: "tabular-nums",
							}}
						>
							{label}
						</span>
					</div>
					<button
						type="button"
						className="btn btn-sm"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls="asof-controls"
					>
						{open ? "Hide timeline" : "Adjust timeline"}
					</button>
				</div>
				{open && (
					<div
						id="asof-controls"
						className="flex flex-wrap items-center gap-x-5 gap-y-3"
					>
						<div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1">
							<input
								id="asof"
								aria-label="As-of date"
								type="range"
								min={0}
								max={41}
								step={1}
								value={state.day}
								onChange={(e) => setDay(parseInt(e.target.value, 10))}
								className="asof-range"
								aria-valuetext={label}
							/>
							<div
								className="mono flex justify-between text-ash-dim"
								style={{ fontSize: 12 }}
							>
								<span>Sep 25</span>
								<span>Nov 5</span>
							</div>
						</div>
						<div
							role="group"
							aria-label="Jump to date"
							className="flex flex-wrap gap-1.5"
						>
							{JUMPS.map(([d, label2]) => (
								<button
									key={d}
									type="button"
									className={`jump${state.day === d ? " jump-on" : ""}`}
									aria-pressed={state.day === d}
									onClick={() => setDay(d)}
								>
									{label2}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

/** The guided demo runs actions step-by-step without presenter script copy. */
function TourBar() {
	const { state, tourSteps, tourBack, tourDo, tourNext, tourExit, reset } =
		useStore();
	const [advancing, setAdvancing] = useState(false);
	const [performed, setPerformed] = useState(false);
	const [failed, setFailed] = useState(false);
	if (state.tour == null) return null;
	const steps = tourSteps();
	const i = state.tour;
	const step = steps[i];
	const complete = step.ready ?? performed;
	const frozen =
		i < 5 &&
		Object.values(state.mut).some(
			(m) => m.final && ["approved", "paid", "booked"].includes(m.final),
		);

	return (
		<div
			className="bg-raise text-bone border-y border-edge"
			style={{
				scrollMarginTop: 12,
			}}
			aria-label="Interactive guided demo"
			role="region"
		>
			<div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-3">
				<div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[3px]">
					<span
						className="mono"
						style={{
							fontSize: 11,
							letterSpacing: ".06em",
							textTransform: "uppercase",
							color: "var(--color-volt)",
						}}
					>
						{"Guided demo · step " +
							(i + 1) +
							" of " +
							steps.length +
							" · " +
							step.time}
					</span>
					<span className="font-semibold" style={{ fontSize: 16 }}>
						{step.title}
						<HelpHint label="About this demo step">
							<span className="mb-3 block">{step.task}</span>
							<strong className="block font-semibold">Why it matters</strong>
							<span className="text-ash">{TOUR_WHY[step.title]}</span>
						</HelpHint>
					</span>
					<div
						className="mt-2 flex flex-wrap items-center gap-2"
						role="status"
						aria-live="polite"
					>
						<span className={`pill ${complete ? "p-ok" : "p-neutral"}`}>
							{advancing
								? "Working..."
								: complete
									? "Step complete · inspect the result, then continue"
									: "Your turn · use the controls or the action below"}
						</span>
						{failed && (
							<span className="text-sm text-coral">
								The action did not finish. Try again or check the error message.
							</span>
						)}
					</div>
					{frozen && (
						<div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-amber">
							<span>
								Existing approvals freeze routes. Reset before replaying the
								date changes.
							</span>
							<button
								type="button"
								className="btn btn-sm"
								disabled={advancing}
								onClick={reset}
							>
								Reset demo
							</button>
						</div>
					)}
				</div>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						className="btn btn-sm"
						disabled={i === 0 || advancing}
						onClick={tourBack}
					>
						Previous
					</button>
					{!complete && (
						<button
							type="button"
							className="btn btn-primary btn-sm"
							disabled={advancing}
							onClick={async () => {
								setAdvancing(true);
								setFailed(false);
								try {
									const ok = await tourDo();
									setPerformed(ok);
									setFailed(!ok);
								} finally {
									setAdvancing(false);
								}
							}}
						>
							{advancing ? "Working..." : (step.actionLabel ?? "Try this step")}
						</button>
					)}
					<button
						type="button"
						className={`btn ${complete ? "btn-primary" : ""} btn-sm`}
						disabled={advancing || !complete}
						onClick={tourNext}
					>
						{i === steps.length - 1 ? "Finish demo" : "Next step"}
					</button>
					<button type="button" className="btn btn-sm" onClick={tourExit}>
						Exit
					</button>
				</div>
			</div>
		</div>
	);
}

/** Names every reroute a change caused, and the rule that caused it. */
function Toast() {
	const { state, closeToast } = useStore();
	return (
		<div
			aria-live="polite"
			className="fixed right-5 bottom-5 z-20 max-w-[440px]"
		>
			{state.toast && (
				<div
					className="bg-raise text-bone flex items-start gap-3 rounded-[10px] px-4 py-3.5"
					style={{
						border: "1px solid var(--color-edge-strong)",
						boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6)",
					}}
				>
					<Swap
						color="var(--color-volt)"
						style={{ flex: "none", marginTop: 2 }}
					/>
					<div className="flex min-w-0 flex-col gap-1">
						{state.toast.lines.map((l, _n) => (
							<span key={`${l.head}·${l.body}`} style={{ fontSize: 14 }}>
								<strong className="font-semibold">{l.head}</strong> {l.body}
							</span>
						))}
					</div>
					<button
						type="button"
						onClick={closeToast}
						aria-label="Dismiss"
						className="text-ash-dim border-0 bg-transparent p-0.5"
						style={{ minWidth: 28, minHeight: 28 }}
					>
						<Close />
					</button>
				</div>
			)}
		</div>
	);
}
