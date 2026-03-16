// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KMK Companion — Design Specification
// src/Documentation.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import type { ReactNode, CSSProperties } from "react";

const O = "#FF4200";
const DARK = "#1A1A1A";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

const Section = ({ num, title, children }: { num: string; title: string; children: ReactNode }) => (
    <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${O}` }}>
            <div style={{ background: O, color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>{num}</div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: DARK }}>{title}</h2>
        </div>
        {children}
    </div>
);

const SubSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: "0 0 12px", paddingLeft: 12, borderLeft: `3px solid ${O}` }}>{title}</h3>
        {children}
    </div>
);

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
    <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 20px", ...style }}>{children}</div>
);

const Pill = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
    <span style={{ background: bg, color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginRight: 6, display: "inline-block" }}>{label}</span>
);

const CalloutRow = ({ id, text }: { id: string; text: string }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ background: O, color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{id}</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{text}</div>
    </div>
);

const DecisionRow = ({ text }: { text: string }) => (
    <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 5 }}>→ {text}</div>
);

const colors = [
    { name: "KMK Orange", hex: "#FF4200", role: "Primary brand, CTAs, active states, progress fills" },
    { name: "Deep Charcoal", hex: "#1A1A1A", role: "Headers, primary text, dark buttons, nav bar" },
    { name: "Warm White", hex: "#FFF8F5", role: "App background — warm tint, orange-compatible" },
    { name: "Ember Orange", hex: "#FF6B35", role: "Gradient partner, hover states" },
    { name: "Solar Yellow", hex: "#FFB800", role: "Achievement moments, streaks, badges only" },
    { name: "Vital Green", hex: "#22C55E", role: "Correct answers, completions, success states" },
    { name: "Alert Red", hex: "#EF4444", role: "Wrong answers, warnings, errors" },
    { name: "Card White", hex: "#FFFFFF", role: "Card surfaces, modals, panels" },
    { name: "Cool Gray", hex: "#6B7280", role: "Secondary text, inactive icons" },
    { name: "Border Gray", hex: "#E5E7EB", role: "Dividers, card outlines" },
];

const typeScale = [
    { role: "Display", font: "Barlow Condensed", weight: "800", size: "32px", usage: "Hero headers, exam countdown" },
    { role: "Heading 1", font: "Inter", weight: "700", size: "24px", usage: "Screen titles" },
    { role: "Heading 2", font: "Inter", weight: "600", size: "18px", usage: "Section headers, card titles" },
    { role: "Body", font: "Inter", weight: "400", size: "15px", usage: "Question text, descriptions" },
    { role: "Label", font: "Inter", weight: "500", size: "13px", usage: "Badges, tags, nav labels" },
    { role: "Mono / Data", font: "JetBrains Mono", weight: "600", size: "13px", usage: "Scores, counters, stats, formulas" },
];

const components = [
    { name: "Primary Button", spec: "bg #FF4200 · white text · radius 12 · padding 12×24 · weight 700" },
    { name: "Dark Button", spec: "bg #1A1A1A · white text · radius 12 · padding 12×24 · weight 700" },
    { name: "Outline Button", spec: "transparent · #FF4200 border 2px · #FF4200 text · radius 12" },
    { name: "Correct State", spec: "bg #DCFCE7 · border 2px #22C55E · text #166534 · ✓ icon" },
    { name: "Wrong State", spec: "bg #FEE2E2 · border 2px #EF4444 · text #991B1B · ✕ icon" },
    { name: "Missed Correct", spec: "bg #F0FDF4 · border 2px dashed #22C55E · text #166534 · ○ icon" },
    { name: "Progress Bar", spec: "track #E5E7EB h:10px · fill gradient #FF4200→#FF6B35 · radius 8" },
    { name: "Subject Tag", spec: "discipline-colored pill · radius 20 · 11px weight 700" },
    { name: "Q Badge", spec: "bg #FF4200 · white 'Q' · weight 900 · radius 8 · 2px 8px padding" },
    { name: "Explanation Accordion", spec: "wrong=red auto-open · correct=orange collapsed · border 1.5px radius 12" },
];

const screens = [
    {
        id: "S1", name: "Home Dashboard",
        desc: "The first screen students see. Focused on momentum — no pressure, no countdown. Three zones: resume, continue, browse.",
        callouts: [
            { id: "A", text: "Personalized greeting with first name and low-pressure motivational nudge. Never shows exam countdown." },
            { id: "B", text: "Resume Hero Card — full-width orange gradient, one tap to jump back into the last active module." },
            { id: "C", text: "Keep Going strip — horizontally scrollable, shows next topic from each in-progress module only." },
            { id: "D", text: "Browse Subjects — 2-column grid of all NBEO subject areas. Entry point for new content." },
            { id: "E", text: "Bottom Tab Nav — persistent across all screens. 5 tabs: Home, Courses, Flashcards, Quizzes, Profile." },
        ],
        decisions: [
            "No exam countdown — pressure was explicitly removed per stakeholder direction.",
            "Keep Going only surfaces in-progress modules, never cold content.",
            "Resume Hero always reflects the single last-touched module, not a list.",
            "Subject grid uses discipline-specific color coding for fast visual recognition.",
        ],
    },
    {
        id: "S2", name: "Subject Detail",
        desc: "Launched from a subject card on the dashboard. Shows all content for one NBEO subject area organized by topic grouping.",
        callouts: [
            { id: "A", text: "Orange hero header visually connects back to the subject card — same color, intentional continuity." },
            { id: "B", text: "Progress bar in the header — percentage complete always visible without scrolling." },
            { id: "C", text: "Filter tabs — All / Videos / Flashcards / Quizzes. Power users can isolate content type." },
            { id: "D", text: "Topic groupings break the full lesson list into digestible chapters with their own done/total counters." },
            { id: "E", text: "Active lesson — orange border, orange arrow. The single clearest call-to-action on the screen." },
            { id: "F", text: "Completed lessons are muted. Future lessons neutral. Linear visual progression." },
            { id: "G", text: "Content type pill (Video / Flashcard / Quiz) with distinct color per type for fast scanning." },
        ],
        decisions: [
            "Active lesson is always the brightest element on screen — no ambiguity about next step.",
            "Filter tabs are power-user feature — default is All, but students drilling quizzes can isolate them.",
            "Linear progression: done = muted, active = orange, future = neutral.",
            "Topic groups prevent the 124-lesson list from feeling overwhelming.",
        ],
    },
    {
        id: "S3", name: "Video Player",
        desc: "Three orientation states: Portrait (primary), Landscape (rotated), and Fullscreen. Dark UI for video, light for the panel.",
        callouts: [
            { id: "A", text: "Video area — 16:9, tap to play/pause. Dark background for clinical image accuracy." },
            { id: "B", text: "Scrub bar with chapter markers (white ticks) and note pins (gold dots). Tap anywhere to seek." },
            { id: "C", text: "Chapter markers allow direct in-video navigation to sub-topics." },
            { id: "D", text: "+ Note button — drops a timestamped note pin on the scrub bar at current position." },
            { id: "E", text: "Bottom panel tabs: Notes, Transcript, Next Up. Collapsed by default, expandable." },
            { id: "F", text: "Next Up tab previews the following lesson with a one-tap launch button." },
            { id: "G", text: "Mark Complete — appears only after 80% watched. Prevents content skipping." },
        ],
        decisions: [
            "Speed control (1x / 1.5x / 2x) critical for board prep — students reviewing known material move fast.",
            "Note pins are gold dots on the scrub bar — students can retrace exactly where a concept appeared.",
            "Transcript text dims for unseen sections — reinforces forward progress.",
            "Landscape: 55/45 split — video dominant, panel supporting. Never 50/50.",
            "Fullscreen: all chrome hidden by default, tap to reveal, auto-hides after 3s.",
            "Exit fullscreen returns to landscape, not portrait — preserves wide context.",
        ],
    },
    {
        id: "S4", name: "Flashcard Session",
        desc: "Landscape-only. Three card types: Text, Math (with worked solutions), and Image (with fullscreen zoom). Button navigation only — no swipe.",
        callouts: [
            { id: "A", text: "Bold Q badge — signals the question. No bounding box, clean open text below." },
            { id: "B", text: "Answer panel slides in from the right on reveal. Question panel stays visible at 44% width." },
            { id: "C", text: "Explanation accordion — collapsed by default. Tap to expand. Contains NBEO exam tips." },
            { id: "D", text: "Two action buttons: Review Again (orange) and Next Card → (dark). Side by side, equal width." },
            { id: "E", text: "‹ counter › nav buttons in top bar — jump cards without revealing the answer first." },
        ],
        decisions: [
            "Button navigation only — swipe removed to prevent accidental card advances while reading.",
            "Math cards: formula isolated at top of answer panel — always the first thing seen on reveal.",
            "Image cards: 50/50 split, image always visible on left regardless of question/answer state.",
            "Explanation is NBEO-specific exam tips, not a restatement of the answer.",
            "Review Again sends card back into deck. Next Card advances. No spaced-repetition scoring.",
        ],
    },
    {
        id: "S5", name: "Quiz / Assessment",
        desc: "Portrait. Single and multi-select questions. Image questions supported. Submit-gated — students must select before submitting.",
        callouts: [
            { id: "A", text: "Q badge + 'Question N' + result badge (after submit only). Badge is inline here — never in the nav bar." },
            { id: "B", text: "Multi-select indicator — blue 'Select all that apply' pill appears for multi-answer questions." },
            { id: "C", text: "Answer options — circle for single select, square for multi-select. Orange on selection." },
            { id: "D", text: "Submit button — disabled/grayed until at least one option is selected." },
            { id: "E", text: "Result states: ✓ green (correct selected), ✕ red (wrong selected), ○ dashed green (missed correct)." },
            { id: "F", text: "Explanation auto-expands if wrong (red header). Collapsed if correct (orange, tap to expand)." },
            { id: "G", text: "‹ › nav in top bar — counter only. No result state in the nav bar." },
        ],
        decisions: [
            "Wrong = any incorrect selection OR any missed correct answer — both shown simultaneously.",
            "Missed correct answers shown with dashed green outline — students see what they should have picked.",
            "Explanation only appears post-submit — never visible before student commits to an answer.",
            "Auto-expand on wrong forces review — students can't skip past their mistakes.",
            "Result badge lives only next to the Q label — consistent with the card's content zone.",
            "Bottom nav: ← Prev · ✓/✕ circle · Next → after submit. Circle provides visual confirmation.",
        ],
    },
];

const interactions = [
    { pattern: "Bottom Tab Navigation", desc: "5 tabs persistent across all screens. Active tab: #FF4200 icon + label + 4px dot indicator. Inactive: #9CA3AF." },
    { pattern: "Orange Hero Headers", desc: "Subject detail and key feature screens use a gradient #FF4200→#CC3400 header to create visual continuity from the dashboard card that launched them." },
    { pattern: "Q Badge", desc: "Consistent across flashcards and quizzes. Bold orange square badge + 'Question' label. Establishes a shared visual language for all question-type content." },
    { pattern: "Explanation Accordion", desc: "Shared across flashcards and quizzes. Wrong answer = auto-open red header. Correct = collapsed orange header with 'tap to expand' hint." },
    { pattern: "‹ counter ›", desc: "Card/question navigation in both flashcards and quizzes. Appears in the top bar. Counter only — no result state ever shown here." },
    { pattern: "Reveal → Review", desc: "Both flashcards and quizzes use a staged reveal pattern. Content is never shown before the student has committed to a recall attempt." },
    { pattern: "Progress Fills", desc: "All progress bars use #FF4200→#FF6B35 gradient fill on #E5E7EB track. Height 6–10px depending on context. Always paired with a monospace percentage." },
    { pattern: "Image Fullscreen Viewer", desc: "Used in video player, flashcards, and quiz. Dark background, + / − zoom, drag to pan, Reset to center. Clinical image accuracy requires dark surround." },
    { pattern: "Monospace Data", desc: "All scores, percentages, counters, and formulas use JetBrains Mono weight 600. Signals precision and clinical accuracy." },
];

const devNotes = [
    { area: "Fonts", note: "Inter (UI), Barlow Condensed (display), JetBrains Mono (data). Load via Google Fonts. Inter is the system fallback." },
    { area: "Color tokens", note: "Primary: #FF4200. Dark: #1A1A1A. Background: #FFF8F5. All semantic colors (success/danger) use Tailwind-equivalent values." },
    { area: "Border radius", note: "Cards: 16px. Buttons: 12px. Pills/badges: 20px. Input fields: 10px. Consistent radius ladder." },
    { area: "Spacing grid", note: "8pt base grid. Internal component gaps: 8/12px. Section spacing: 16/24/32px. Never arbitrary values." },
    { area: "Navigation", note: "Bottom tab nav is 5-tab fixed. Active state: icon + label + 4px orange dot. Tab height: ~56px. Safe area insets required for iPhone home indicator." },
    { area: "Flashcards", note: "Landscape-only. Force landscape orientation on entry to this module. ‹ › buttons are the only navigation — swipe disabled." },
    { area: "Video player", note: "Portrait default. Landscape on device rotation. Fullscreen on ⛶ tap. Auto-hide controls at 3s. Mark Complete gate: 80% watch time." },
    { area: "Quiz scoring", note: "Wrong = any incorrect selection selected OR any correct option missed. Both conditions must pass for Correct. Show all three result states simultaneously on submit." },
    { area: "Explanation accordion", note: "isWrong prop drives auto-open state. Mount with open=true when isWrong. Separate component instance per card/question — state does not persist across navigation." },
    { area: "Image viewer", note: "Position fixed, z-index 100. Scale range 1–4 in 0.5 steps. Drag delta tracking via mousedown/mousemove. Reset returns to scale=1, pos={x:0,y:0}." },
    { area: "LMS integration", note: "Progress data, course completion, and user identity should be pulled from the existing LMS API. All progress bars and counters are data-driven, not static." },
];

export default function Documentation() {
    const [activeSection, setActiveSection] = useState("overview");
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "foundation", label: "Design Foundation" },
        { id: "screens", label: "Feature Screens" },
        { id: "interactions", label: "Interaction Patterns" },
        { id: "dev", label: "Developer Handoff" },
    ];

    return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#F5F5F5", minHeight: "100vh" }}>

            {/* Doc Header */}
            <div style={{ background: `linear-gradient(135deg, ${O} 0%, #CC3400 100%)`, padding: "32px 40px 28px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>UI / UX Design Specification</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -0.5, marginBottom: 4 }}>KMK Companion</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Mobile App — Optometry Board Exam Preparation Platform</div>
                <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
                    {[["Audience", "3rd/4th Year Optometry Students"], ["Platform", "iOS & Android (React Native)"], ["Version", "1.0 — Initial Release"], ["Status", "Design Complete"]].map(([k, v]) => (
                        <div key={k} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "6px 12px" }}>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{v}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Nav */}
            <div style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "0 40px", display: "flex", gap: 0, overflowX: "auto" }}>
                {sections.map(s => (
                    <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ background: "none", border: "none", padding: "14px 16px 12px", fontSize: 13, fontWeight: activeSection === s.id ? 700 : 500, color: activeSection === s.id ? O : MUTED, cursor: "pointer", borderBottom: activeSection === s.id ? `2px solid ${O}` : "2px solid transparent", whiteSpace: "nowrap" }}>
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

                {/* OVERVIEW */}
                {activeSection === "overview" && (
                    <Section num="00" title="Project Overview">
                        <SubSection title="Purpose">
                            <Card>
                                <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.7 }}>
                                    KMK Companion is a mobile learning app designed for 3rd and 4th year optometry students preparing for the NBEO examinations. The app integrates with KMK's existing LMS content library and provides a high-energy, performance-focused study experience across four core modules: video lessons, flashcards, quizzes, and course browsing.
                                </p>
                            </Card>
                        </SubSection>
                        <SubSection title="Design Philosophy">
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                                {[
                                    { title: "Train to Win", desc: "Every interaction feels like prep for a championship — not casual studying.", icon: "⚡" },
                                    { title: "Clinical Precision", desc: "Monospace data elements signal accuracy. Scores and stats are never fuzzy.", icon: "◎" },
                                    { title: "Momentum First", desc: "Progress is always visible. No dead ends — always a clear next action.", icon: "▶" },
                                    { title: "Low Pressure", desc: "No exam countdown. The app motivates through progress, not anxiety.", icon: "◇" },
                                    { title: "Bold & Owned", desc: "#FF4200 is unmistakable. Used for moments that matter — actions, wins, urgency.", icon: "✦" },
                                    { title: "Consistent Language", desc: "Q badge, ‹ › nav, and accordion patterns repeat across flashcards and quizzes.", icon: "≡" },
                                ].map((p, i) => (
                                    <Card key={i}>
                                        <div style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 4 }}>{p.title}</div>
                                        <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{p.desc}</div>
                                    </Card>
                                ))}
                            </div>
                        </SubSection>
                        <SubSection title="Screen Inventory">
                            <Card>
                                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                                            {["Screen", "Orientation", "Module", "Status"].map(h => (
                                                <th key={h} style={{ textAlign: "left", padding: "6px 12px 10px", fontSize: 11, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["Home Dashboard", "Portrait", "Navigation", "✅ Complete"],
                                            ["Subject Detail", "Portrait", "Courses", "✅ Complete"],
                                            ["Video Player", "Portrait + Landscape + Fullscreen", "Video", "✅ Complete"],
                                            ["Flashcard Session", "Landscape only", "Flashcards", "✅ Complete"],
                                            ["Quiz / Assessment", "Portrait", "Quizzes", "✅ Complete"],
                                        ].map((row, i) => (
                                            <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                                                {row.map((cell, j) => (
                                                    <td key={j} style={{ padding: "10px 12px", color: j === 3 ? "#166534" : j === 0 ? DARK : MUTED, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </SubSection>
                    </Section>
                )}

                {/* FOUNDATION */}
                {activeSection === "foundation" && (
                    <Section num="01" title="Design Foundation">
                        <SubSection title="Color Palette">
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: 16 }}>
                                {colors.map((c, i) => (
                                    <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
                                        <div style={{ background: c.hex, height: 48, position: "relative" }}>
                                            {c.hex === O && <span style={{ position: "absolute", top: 5, right: 5, background: "rgba(255,255,255,0.9)", borderRadius: 5, padding: "1px 6px", fontSize: 9, fontWeight: 800, color: O }}>PRIMARY</span>}
                                        </div>
                                        <div style={{ padding: "8px 10px" }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: DARK }}>{c.name}</div>
                                            <div style={{ fontFamily: "monospace", fontSize: 10, color: MUTED, margin: "2px 0" }}>{c.hex}</div>
                                            <div style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1.4 }}>{c.role}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Card style={{ background: "#FFF0EB", border: `1px solid #FFD5C4` }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#C23200", marginBottom: 4 }}>Color Usage Rules</div>
                                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
                                    #FF4200 is used exclusively for primary actions, active states, and progress. Solar Yellow (#FFB800) is reserved only for achievement/badge moments. Success green and danger red are strictly for correct/wrong answer states — never decorative.
                                </div>
                            </Card>
                        </SubSection>

                        <SubSection title="Typography">
                            <Card>
                                {typeScale.map((t, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < typeScale.length - 1 ? `1px solid ${BORDER}` : "none", gap: 16 }}>
                                        <div style={{ minWidth: 100 }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: DARK }}>{t.role}</div>
                                            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>{t.font}</div>
                                        </div>
                                        <div style={{ minWidth: 90, fontFamily: "monospace", fontSize: 11, color: MUTED }}>{t.size} / w{t.weight}</div>
                                        <div style={{ flex: 1, fontSize: t.size, fontWeight: t.weight, fontFamily: t.font.includes("Mono") ? "monospace" : "Inter, sans-serif", color: DARK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {t.role === "Display" ? "NBEO Board Prep" : t.role === "Heading 1" ? "Ocular Disease" : t.role === "Heading 2" ? "Glaucoma Essentials" : t.role === "Body" ? "The optic nerve contains approximately 1.2 million axons." : t.role === "Label" ? "TMOD · 18 Questions" : "Score: 87.4%"}
                                        </div>
                                        <div style={{ minWidth: 80, fontSize: 10, color: "#9CA3AF", textAlign: "right" }}>{t.usage}</div>
                                    </div>
                                ))}
                            </Card>
                        </SubSection>

                        <SubSection title="Spacing System">
                            <Card>
                                <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>8pt base grid. All spacing values are multiples of 4 or 8.</div>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                                    {[4, 8, 12, 16, 24, 32, 48, 64].map(s => (
                                        <div key={s} style={{ textAlign: "center" }}>
                                            <div style={{ width: s, height: s, background: O, borderRadius: 3, margin: "0 auto 6px", opacity: 0.5 + s / 128 }} />
                                            <div style={{ fontFamily: "monospace", fontSize: 10, color: MUTED }}>{s}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </SubSection>

                        <SubSection title="Component Library">
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {components.map((c, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
                                        <div style={{ minWidth: 160, fontSize: 12, fontWeight: 700, color: DARK }}>{c.name}</div>
                                        <div style={{ fontSize: 12, color: MUTED, fontFamily: "monospace" }}>{c.spec}</div>
                                    </div>
                                ))}
                            </div>
                        </SubSection>

                        <SubSection title="Bottom Tab Navigation">
                            <Card>
                                <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>5 tabs, persistent across all screens. Active state uses #FF4200.</div>
                                <div style={{ display: "flex", background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", maxWidth: 360 }}>
                                    {["⊞ Home", "▶ Courses", "◫ Flashcards", "✎ Quizzes", "◎ Profile"].map((t, i) => (
                                        <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 4px 8px", borderBottom: i === 0 ? `2px solid ${O}` : "2px solid transparent" }}>
                                            <div style={{ fontSize: 14, color: i === 0 ? O : "#9CA3AF" }}>{t.split(" ")[0]}</div>
                                            <div style={{ fontSize: 9, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? O : "#9CA3AF", marginTop: 2 }}>{t.split(" ")[1]}</div>
                                            {i === 0 && <div style={{ width: 4, height: 4, background: O, borderRadius: "50%", margin: "3px auto 0" }} />}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </SubSection>
                    </Section>
                )}

                {/* SCREENS */}
                {activeSection === "screens" && (
                    <Section num="02" title="Feature Screens">
                        {screens.map((s, si) => (
                            <SubSection key={si} title={`${s.id} — ${s.name}`}>
                                <Card style={{ marginBottom: 10 }}>
                                    <p style={{ margin: "0 0 16px", fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{s.desc}</p>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                        <div>
                                            <div style={{ fontSize: 11, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Design Callouts</div>
                                            {s.callouts.map((c, i) => <CalloutRow key={i} id={c.id} text={c.text} />)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>UX Decisions</div>
                                            {s.decisions.map((d, i) => <DecisionRow key={i} text={d} />)}
                                        </div>
                                    </div>
                                </Card>
                            </SubSection>
                        ))}
                    </Section>
                )}

                {/* INTERACTIONS */}
                {activeSection === "interactions" && (
                    <Section num="03" title="Interaction Patterns">
                        <SubSection title="Shared Patterns Reference">
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {interactions.map((p, i) => (
                                    <Card key={i}>
                                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                            <div style={{ minWidth: 200 }}>
                                                <Pill label={p.pattern} bg="#FFF0EB" color="#C23200" />
                                            </div>
                                            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{p.desc}</div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </SubSection>

                        <SubSection title="State Transitions">
                            <Card>
                                <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>Key state flows across the app:</div>
                                {[
                                    { from: "Dashboard", to: "Subject Detail", trigger: "Tap subject card" },
                                    { from: "Subject Detail", to: "Video Player", trigger: "Tap active lesson (Video type)" },
                                    { from: "Subject Detail", to: "Flashcard Session", trigger: "Tap active lesson (Flashcard type)" },
                                    { from: "Subject Detail", to: "Quiz", trigger: "Tap active lesson (Quiz type)" },
                                    { from: "Video Player", to: "Landscape", trigger: "Device rotation" },
                                    { from: "Video / Landscape", to: "Fullscreen", trigger: "Tap ⛶ button" },
                                    { from: "Fullscreen", to: "Landscape", trigger: "Tap Exit button" },
                                    { from: "Flashcard (Question)", to: "Flashcard (Answer)", trigger: "Tap 'Reveal Answer'" },
                                    { from: "Flashcard (Answer)", to: "Next Card", trigger: "Tap 'Next Card →'" },
                                    { from: "Quiz (Unsubmitted)", to: "Quiz (Result)", trigger: "Select answer + Tap 'Submit'" },
                                    { from: "Quiz (Result)", to: "Next Question", trigger: "Tap 'Next →'" },
                                ].map((t, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${BORDER}` }}>
                                        <span style={{ fontSize: 12, color: DARK, fontWeight: 600, minWidth: 140 }}>{t.from}</span>
                                        <span style={{ color: O, fontWeight: 700 }}>→</span>
                                        <span style={{ fontSize: 12, color: DARK, fontWeight: 600, minWidth: 140 }}>{t.to}</span>
                                        <span style={{ fontSize: 12, color: MUTED }}>via: {t.trigger}</span>
                                    </div>
                                ))}
                            </Card>
                        </SubSection>
                    </Section>
                )}

                {/* DEVELOPER HANDOFF */}
                {activeSection === "dev" && (
                    <Section num="04" title="Developer Handoff">
                        <SubSection title="Implementation Notes">
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {devNotes.map((n, i) => (
                                    <Card key={i}>
                                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                            <Pill label={n.area} bg="#FFF0EB" color="#C23200" />
                                            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{n.note}</div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </SubSection>

                        <SubSection title="Asset Requirements">
                            <Card>
                                {[
                                    ["App Icon", "1024×1024 PNG, #FF4200 background with white KMK logomark"],
                                    ["Splash Screen", "Full bleed #FF4200, centered white logo, supports dark/light"],
                                    ["Course Thumbnails", "16:9 ratio, minimum 320×180px, served from LMS CDN"],
                                    ["Clinical Images (Flashcards)", "Minimum 800×600px for zoom quality, JPEG or WebP"],
                                    ["Clinical Images (Quiz)", "Same spec as flashcards"],
                                    ["Video Content", "HLS streaming preferred, 720p minimum, from LMS video host"],
                                ].map(([asset, spec], i) => (
                                    <div key={i} style={{ display: "flex", gap: 16, padding: "8px 0", borderBottom: `1px solid ${BORDER}`, alignItems: "flex-start" }}>
                                        <div style={{ minWidth: 160, fontSize: 12, fontWeight: 700, color: DARK }}>{asset}</div>
                                        <div style={{ fontSize: 12, color: MUTED }}>{spec}</div>
                                    </div>
                                ))}
                            </Card>
                        </SubSection>

                        <SubSection title="Accessibility Notes">
                            <Card style={{ background: "#FFF0EB", border: `1px solid #FFD5C4` }}>
                                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.8 }}>
                                    <div>→ All interactive elements minimum 44×44pt touch target (Apple HIG / Material guidelines)</div>
                                    <div>→ Color is never the sole differentiator — icons and labels accompany all color states</div>
                                    <div>→ Correct/wrong states use both color AND icon (✓ ✕ ○) for color-blind accessibility</div>
                                    <div>→ All text passes WCAG AA contrast ratio (4.5:1 minimum)</div>
                                    <div>→ VoiceOver / TalkBack labels required on all icon-only buttons (‹ ›, ⛶, + Note)</div>
                                    <div>→ Video player supports closed captions via LMS caption track</div>
                                </div>
                            </Card>
                        </SubSection>
                    </Section>
                )}

            </div>
        </div>
    );
}