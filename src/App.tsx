// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KMK Companion — Demo MVP
// Copy ALL of this file into: src/App.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────
type Screen = "dashboard" | "subject" | "video" | "flashcards" | "quiz" | "profile";
type TabId = "home" | "courses" | "flashcards" | "quizzes" | "profile";
type CardType = "text" | "math" | "image";
type QuestionType = "text" | "image";

interface Subject { id: string; name: string; icon: string; lessons: number; color: string; border: string; tag: string; }
interface Lesson { id: number; title: string; type: "Video" | "Flashcard" | "Quiz"; duration?: string; cards?: string; questions?: string; done: boolean; active?: boolean; }
interface TopicGroup { title: string; lessons: Lesson[]; }
interface FlashCard { id: number; subject: string; topic: string; type: CardType; tag: string; question: string; answer: string; explanation: string; formula?: string; variables?: string[]; imageLabel?: string; }
interface QuizQuestion { id: number; subject: string; topic: string; type: QuestionType; multiSelect: boolean; question: string; options: string[]; correct: number[]; explanation: string; imageLabel?: string; reviewImage?: boolean; reviewImageLabel?: string; }

// ── Constants ──────────────────────────────────────────────────
const O = "#FF4200";
const DARK = "#1A1A1A";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const BG = "#FFF8F5";

const subjects: Subject[] = [
    { id: "od", name: "Ocular Disease", icon: "👁", lessons: 124, color: "#FFF0EB", border: "#FFD5C4", tag: "#C23200" },
    { id: "bv", name: "Binocular Vision", icon: "◎", lessons: 88, color: "#FFF0EB", border: "#FFD5C4", tag: "#C23200" },
    { id: "tmod", name: "TMOD", icon: "⚕", lessons: 96, color: "#F0FDF4", border: "#BBF7D0", tag: "#166534" },
    { id: "opt", name: "Optics", icon: "◈", lessons: 72, color: "#FFF7ED", border: "#FED7AA", tag: "#92400E" },
    { id: "vt", name: "Vision Therapy", icon: "✦", lessons: 54, color: "#FAF5FF", border: "#E9D5FF", tag: "#6B21A8" },
    { id: "ped", name: "Pediatric OD", icon: "◇", lessons: 61, color: "#EFF6FF", border: "#BFDBFE", tag: "#1D4ED8" },
];

const topicGroups: TopicGroup[] = [
    {
        title: "Glaucoma", lessons: [
            { id: 1, title: "Introduction to Glaucoma", type: "Video", duration: "12 min", done: true },
            { id: 2, title: "IOP & Aqueous Humor Dynamics", type: "Video", duration: "18 min", done: true },
            { id: 3, title: "Optic Nerve Changes in Glaucoma", type: "Video", duration: "14 min", done: false, active: true },
            { id: 4, title: "Glaucoma Flashcard Deck", type: "Flashcard", cards: "48 cards", done: false },
            { id: 5, title: "Glaucoma Practice Quiz", type: "Quiz", questions: "20 questions", done: false },
        ]
    },
    {
        title: "Retinal Disease", lessons: [
            { id: 6, title: "Diabetic Retinopathy Overview", type: "Video", duration: "16 min", done: true },
            { id: 7, title: "AMD — Dry vs Wet", type: "Video", duration: "11 min", done: false },
            { id: 8, title: "Retinal Disease Flashcard Deck", type: "Flashcard", cards: "62 cards", done: false },
        ]
    },
    {
        title: "Corneal Disease", lessons: [
            { id: 9, title: "Keratoconus & Ectasias", type: "Video", duration: "13 min", done: false },
            { id: 10, title: "Corneal Disease Quiz", type: "Quiz", questions: "15 questions", done: false },
        ]
    },
];

const flashcards: FlashCard[] = [
    {
        id: 1, subject: "Binocular Vision", topic: "Panum's Fusional Area", type: "text", tag: "Concept",
        question: "What is Panum's Fusional Area and why is it clinically significant?",
        answer: "Panum's Fusional Area is the region of space around the horopter within which objects can be seen as single (fused) despite slight retinal disparity. Clinically, a reduced Panum's area indicates vergence dysfunction or binocular instability.",
        explanation: "Think of Panum's area as a 'tolerance zone' around the horopter. This concept appears frequently in NBEO Part I questions about binocular vision. Distinguish it from the horopter itself — the horopter is the line of zero disparity, Panum's area is the zone around it where fusion still occurs."
    },
    {
        id: 2, subject: "Optics & Refraction", topic: "Prism Power — Prentice's Rule", type: "math", tag: "Formula",
        question: "Calculate the prismatic effect at a point 8mm from the optical center of a +4.00D lens.",
        answer: "Using Prentice's Rule:\n\nP = c × F\n\nWhere:\n  P = prism power (Δ)\n  c = decentration in cm\n  F = lens power in diopters\n\nP = 0.8 cm × 4.00 D\nP = 3.2Δ\n\nA point 8mm from the OC of a +4.00D lens produces 3.2 prism diopters.",
        explanation: "Key pitfall: decentration must be in centimetres, not millimetres. 8mm = 0.8cm. Plus lenses create base-in prism when decentred inward. The direction of the prism always follows the base of the lens.",
        formula: "P = c × F", variables: ["P = prism diopters (Δ)", "c = decentration (cm)", "F = lens power (D)"]
    },
    {
        id: 3, subject: "Ocular Disease", topic: "Cup-to-Disc Ratio", type: "image", tag: "Clinical",
        question: "Identify the key pathological features visible in this optic nerve photograph.",
        answer: "Key features to identify:\n• Cup-to-disc ratio >0.7 — suspicious for glaucoma\n• Inferior notching of the neuroretinal rim — earliest sign\n• Flame-shaped hemorrhage at disc margin\n• RNFL defect visible as a dark wedge inferiorly\n\nISNT Rule: Inferior rim should be thickest, then Superior, Nasal, Temporal.",
        explanation: "Always apply the ISNT rule systematically. Inferior notching is the most common early finding. A disc hemorrhage indicates active damage and should prompt immediate IOP re-evaluation.",
        imageLabel: "Optic Disc — Glaucomatous Changes"
    },
];

const quizQuestions: QuizQuestion[] = [
    {
        id: 1, subject: "Ocular Disease", topic: "Glaucoma", type: "text", multiSelect: false,
        question: "Which is the MOST common location for early neuroretinal rim loss in primary open-angle glaucoma?",
        options: ["Superior rim", "Inferior rim", "Nasal rim", "Temporal rim"], correct: [1],
        explanation: "Inferior rim loss (notching) is the earliest and most common sign of glaucomatous optic nerve damage, correlating with the ISNT rule."
    },
    {
        id: 2, subject: "Binocular Vision", topic: "Vergence & Fusion", type: "text", multiSelect: true,
        question: "Which of the following are TRUE regarding Panum's Fusional Area? Select ALL that apply.",
        options: ["Objects within the area are seen as single", "It is located on the horopter itself", "It represents a zone of binocular single vision", "A reduced area may indicate vergence dysfunction"],
        correct: [0, 2, 3],
        explanation: "Panum's area is a zone AROUND the horopter — not on it. Within it, binocular single vision is maintained. A reduced area indicates vergence dysfunction."
    },
    {
        id: 3, subject: "Optics", topic: "Prism", type: "image", multiSelect: false,
        question: "Based on the lens diagram, which direction does the prismatic effect act on a patient looking through the decentred point?",
        imageLabel: "Lens Decentration Diagram",
        options: ["Base-in (nasal)", "Base-out (temporal)", "Base-up", "Base-down"], correct: [0],
        explanation: "For a plus lens, prismatic effect is always base toward the optical centre. Decentred temporally = base-in effect.", reviewImage: true, reviewImageLabel: "Prismatic Effect — Plus Lens"
    },
];

// ── Shared Components ──────────────────────────────────────────
const typeIcon: Record<string, string> = { Video: "▶", Flashcard: "◫", Quiz: "✎" };
const typeBg: Record<string, string> = { Video: "#FFF0EB", Flashcard: "#EFF6FF", Quiz: "#F0FDF4" };
const typeColor: Record<string, string> = { Video: "#C23200", Flashcard: "#1D4ED8", Quiz: "#166534" };
const tagColor: Record<string, { bg: string; text: string }> = {
    Concept: { bg: "#EFF6FF", text: "#1D4ED8" },
    Formula: { bg: "#FFF0EB", text: "#C23200" },
    Clinical: { bg: "#F0FDF4", text: "#166534" },
};

function BottomNav({ active, onTab }: { active: TabId; onTab: (t: TabId) => void }) {
    const tabs: { id: TabId; icon: string; label: string }[] = [
        { id: "home", icon: "⊞", label: "Home" },
        { id: "courses", icon: "▶", label: "Courses" },
        { id: "flashcards", icon: "◫", label: "Flashcards" },
        { id: "quizzes", icon: "✎", label: "Quizzes" },
        { id: "profile", icon: "◎", label: "Profile" },
    ];
    return (
        <div style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, display: "flex", padding: "8px 0 4px", flexShrink: 0 }}>
            {tabs.map(t => (
                <button key={t.id} onClick={() => onTab(t.id)} style={{ flex: 1, background: "none", border: "none", padding: "4px 0", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: 16, color: active === t.id ? O : "#9CA3AF" }}>{t.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? O : "#9CA3AF" }}>{t.label}</span>
                    {active === t.id && <div style={{ width: 4, height: 4, background: O, borderRadius: "50%" }} />}
                </button>
            ))}
        </div>
    );
}

function QBadge({ index, result }: { index?: number; result?: boolean | null }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10, flexShrink: 0 }}>
            <div style={{ background: O, borderRadius: 8, padding: "3px 10px" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>Q</span>
            </div>
            <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>
                {index !== undefined ? `Question ${index + 1}` : "Question"}
            </span>
            {result !== null && result !== undefined && (
                <div style={{ background: result ? "#DCFCE7" : "#FEE2E2", border: `1px solid ${result ? "#86EFAC" : "#FCA5A5"}`, borderRadius: 20, padding: "2px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: result ? "#166534" : "#991B1B" }}>{result ? "✓" : "✕"}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: result ? "#166534" : "#991B1B" }}>{result ? "Correct" : "Wrong"}</span>
                </div>
            )}
        </div>
    );
}

function ExplanationAccordion({ text, isWrong = false }: { text: string; isWrong?: boolean }) {
    const [open, setOpen] = useState(isWrong);
    return (
        <div style={{ flexShrink: 0, marginTop: 8, borderRadius: 12, border: `1.5px solid ${isWrong ? "#FCA5A5" : "#FFD5C4"}`, overflow: "hidden" }}>
            <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: isWrong ? "#FEF2F2" : "#FFF0EB", border: "none", padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isWrong ? "#991B1B" : "#C23200" }}>
                        {isWrong ? "✕  Review Explanation" : "Explanation"}
                    </span>
                    {!open && <span style={{ fontSize: 10, color: isWrong ? "#EF4444" : O, fontWeight: 600 }}>tap to expand</span>}
                </div>
                <span style={{ fontSize: 14, color: isWrong ? "#EF4444" : O, fontWeight: 700, display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
            </button>
            {open && (
                <div style={{ background: "#fff", padding: "10px 12px" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.65 }}>{text}</p>
                </div>
            )}
        </div>
    );
}

// ── Screens ────────────────────────────────────────────────────
function Dashboard({ onNavigate }: { onNavigate: (s: Screen, data?: any) => void }) {
    const continueCards = [
        { subject: "Ocular Disease", topic: "Glaucoma: Optic Nerve Changes", module: "Video", progress: 38 },
        { subject: "TMOD", topic: "Pharmacology — Beta Blockers", module: "Quiz", progress: 55 },
        { subject: "Optics", topic: "Prism & Vergence Power", module: "Flashcards", progress: 20 },
        { subject: "Binocular Vision", topic: "Stereopsis & Depth Perception", module: "Video", progress: 80 },
    ];
    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
            {/* Header */}
            <div style={{ background: "#fff", padding: "14px 16px", borderRadius: 16, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>Good morning</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: DARK }}>Hey, Sarah 👋</div>
                    <div style={{ fontSize: 12, color: O, fontWeight: 600, marginTop: 2 }}>You're on a 6-day streak — keep it up!</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${O}, #FF6B35)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>S</div>
            </div>

            {/* Resume */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 8 }}>Resume</div>
                <div onClick={() => onNavigate("video")} style={{ background: `linear-gradient(135deg, ${O}, #CC3400)`, borderRadius: 20, padding: "18px 20px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 4 }}>Flashcards · Binocular Vision</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Panum's Fusional Area</div>
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                            <span>Progress</span><span style={{ fontFamily: "monospace", fontWeight: 700 }}>14 of 60 cards</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, height: 6, overflow: "hidden" }}>
                            <div style={{ background: "#fff", width: "62%", height: "100%", borderRadius: 6 }} />
                        </div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 10, padding: "8px 16px" }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: O }}>Continue →</span>
                    </div>
                </div>
            </div>

            {/* Keep Going */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 8 }}>Keep Going</div>
                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" as any }}>
                    {continueCards.map((c, i) => (
                        <div key={i} onClick={() => onNavigate(c.module === "Video" ? "video" : c.module === "Flashcards" ? "flashcards" : "quiz")}
                            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "14px", minWidth: 160, flexShrink: 0, cursor: "pointer" }}>
                            <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" as const, marginBottom: 4 }}>{c.subject}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: DARK, lineHeight: 1.35, marginBottom: 10 }}>{c.topic}</div>
                            <div style={{ background: "#F3F4F6", borderRadius: 4, height: 4, overflow: "hidden", marginBottom: 8 }}>
                                <div style={{ background: O, width: `${c.progress}%`, height: "100%", borderRadius: 4 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{c.module}</span>
                                <span style={{ fontSize: 10, fontFamily: "monospace", color: O, fontWeight: 700 }}>{c.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Browse Subjects */}
            <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 8 }}>Browse Subjects</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {subjects.map(s => (
                        <div key={s.id} onClick={() => onNavigate("subject", s)}
                            style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: 14, padding: "12px 14px", cursor: "pointer" }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: DARK, lineHeight: 1.3, marginBottom: 2 }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: s.tag, fontWeight: 600 }}>{s.lessons} lessons</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SubjectDetail({ subject, onBack, onNavigate }: { subject: Subject; onBack: () => void; onNavigate: (s: Screen, data?: any) => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["All", "Videos", "Flashcards", "Quizzes"];
    const pct = 38;
    const filtered = (lessons: Lesson[]) => {
        if (activeTab === 0) return lessons;
        const map = ["All", "Video", "Flashcard", "Quiz"];
        return lessons.filter(l => l.type === map[activeTab]);
    };
    return (
        <>
            <div style={{ background: `linear-gradient(135deg, ${O}, #CC3400)`, padding: "16px 20px 20px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span onClick={onBack} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}>← Subjects</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{subject.icon}</div>
                    <div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{subject.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "monospace", fontWeight: 600 }}>{subject.lessons} lessons total</div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>
                    <span>47 completed</span><span style={{ fontFamily: "monospace", fontWeight: 700, color: "#fff" }}>{pct}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, height: 8, overflow: "hidden" }}>
                    <div style={{ background: "#fff", width: `${pct}%`, height: "100%", borderRadius: 6 }} />
                </div>
            </div>
            <div style={{ background: "#fff", display: "flex", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                {tabs.map((t, i) => (
                    <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, background: "none", border: "none", padding: "12px 4px 10px", fontSize: 13, fontWeight: activeTab === i ? 700 : 500, color: activeTab === i ? O : "#9CA3AF", cursor: "pointer", borderBottom: activeTab === i ? `2px solid ${O}` : "2px solid transparent" }}>{t}</button>
                ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0" }}>
                {topicGroups.map((group, gi) => {
                    const lessons = filtered(group.lessons);
                    if (!lessons.length) return null;
                    const done = group.lessons.filter(l => l.done).length;
                    return (
                        <div key={gi} style={{ marginBottom: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: DARK }}>{group.title}</span>
                                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#9CA3AF", fontWeight: 600 }}>{done}/{group.lessons.length}</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {lessons.map(l => (
                                    <div key={l.id} onClick={() => onNavigate(l.type === "Video" ? "video" : l.type === "Flashcard" ? "flashcards" : "quiz")}
                                        style={{ background: l.active ? "#FFF0EB" : "#fff", border: l.active ? `2px solid ${O}` : `1px solid ${BORDER}`, borderRadius: 14, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: l.done ? "#22C55E" : l.active ? O : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: l.done || l.active ? "#fff" : "#9CA3AF" }}>
                                            {l.done ? "✓" : typeIcon[l.type]}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 13, fontWeight: l.active ? 700 : 600, color: l.active ? "#C23200" : l.done ? "#9CA3AF" : DARK, marginBottom: 3 }}>{l.title}</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <span style={{ background: typeBg[l.type], color: typeColor[l.type], borderRadius: 6, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>{l.type}</span>
                                                <span style={{ fontSize: 11, color: "#9CA3AF" }}>{l.duration || l.cards || l.questions}</span>
                                            </div>
                                        </div>
                                        {l.active && <span style={{ fontSize: 12, color: O, fontWeight: 800, flexShrink: 0 }}>→</span>}
                                        {l.done && <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 700 }}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function VideoPlayer({ onBack }: { onBack: () => void }) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(312);
    const [speed, setSpeed] = useState(1);
    const [activeTab, setActiveTab] = useState(0);
    const duration = 840;
    const pct = (progress / duration) * 100;
    const canComplete = pct >= 80;
    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    const chapters = [
        { label: "Introduction", start: 0 }, { label: "Normal Anatomy", start: 90 },
        { label: "Cup-to-Disc Ratio", start: 240 }, { label: "RNFL Changes", start: 420 },
        { label: "Progressive Cupping", start: 600 }, { label: "Clinical Pearls", start: 720 },
    ];
    const curChapter = chapters.reduce((a, c, i) => progress >= c.start ? i : a, 0);
    const userNotes = [{ time: 94, text: "C/D ratio > 0.6 is suspicious" }, { time: 245, text: "Notching most common inferiorly" }];
    const tabs = ["Notes", "Transcript", "Next Up"];

    return (
        <>
            <div style={{ background: "#111", padding: "8px 16px 6px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                <span onClick={onBack} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>← Glaucoma</span>
                <div style={{ flex: 1 }} />
                <button onClick={() => setSpeed(s => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{speed}x</button>
            </div>
            <div onClick={() => setPlaying(p => !p)} style={{ background: "#000", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #1a1a2e, #0d0d0d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ opacity: 0.3, textAlign: "center" }}><div style={{ fontSize: 40 }}>👁</div></div>
                </div>
                {!playing && <div style={{ position: "absolute", width: 48, height: 48, background: `rgba(255,66,0,0.9)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 18, color: "#fff", marginLeft: 4 }}>▶</span></div>}
                <div style={{ position: "absolute", bottom: 6, left: 10, background: "rgba(0,0,0,0.6)", borderRadius: 5, padding: "2px 7px", fontSize: 10, color: "#fff", fontWeight: 600 }}>{chapters[curChapter].label}</div>
                <div style={{ position: "absolute", bottom: 6, right: 10, background: "rgba(0,0,0,0.6)", borderRadius: 5, padding: "2px 7px", fontSize: 10, color: "#fff", fontFamily: "monospace", fontWeight: 600 }}>{fmt(progress)} / {fmt(duration)}</div>
            </div>
            <div style={{ background: "#1A1A1A", padding: "10px 14px", flexShrink: 0 }}>
                <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 4, cursor: "pointer", marginBottom: 8, position: "relative" }}
                    onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - r.left) / r.width) * duration)); }}>
                    <div style={{ height: "100%", background: O, width: `${pct}%`, borderRadius: 4 }} />
                    {chapters.slice(1).map((c, i) => <div key={i} style={{ position: "absolute", top: -2, left: `${(c.start / duration) * 100}%`, width: 2, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: 1, transform: "translateX(-50%)" }} />)}
                    {userNotes.map((n, i) => <div key={i} style={{ position: "absolute", top: -3, left: `${(n.time / duration) * 100}%`, width: 8, height: 8, background: "#FFB800", borderRadius: "50%", transform: "translateX(-50%)" }} />)}
                    <div style={{ position: "absolute", top: "50%", left: `${pct}%`, width: 14, height: 14, background: O, borderRadius: "50%", transform: "translate(-50%,-50%)", border: "2px solid #fff" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => setProgress(p => Math.max(0, p - 15))} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer" }}>⟲ 15s</button>
                    <button onClick={() => setPlaying(p => !p)} style={{ width: 38, height: 38, background: O, border: "none", borderRadius: "50%", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{playing ? "⏸" : "▶"}</button>
                    <button onClick={() => setProgress(p => Math.min(duration, p + 15))} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer" }}>⟳ 15s</button>
                    <button style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 10, padding: "5px 10px", color: "#FFB800", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>+ Note</button>
                </div>
            </div>
            <div style={{ background: "#FFF8F5", padding: "10px 16px 8px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>Ocular Disease · Glaucoma</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Optic Nerve Changes in Glaucoma</div>
            </div>
            <div style={{ background: "#fff", display: "flex", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                {tabs.map((t, i) => (
                    <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, background: "none", border: "none", padding: "10px 4px 8px", fontSize: 12, fontWeight: activeTab === i ? 700 : 500, color: activeTab === i ? O : "#9CA3AF", cursor: "pointer", borderBottom: activeTab === i ? `2px solid ${O}` : "2px solid transparent" }}>{t}</button>
                ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
                {activeTab === 0 && userNotes.map((n, i) => (
                    <div key={i} onClick={() => setProgress(n.time)} style={{ display: "flex", gap: 8, marginBottom: 8, cursor: "pointer", padding: "7px 10px", background: "#FFF8F5", borderRadius: 10, border: `1px solid #FFE0D6` }}>
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: O, fontWeight: 700 }}>{fmt(n.time)}</span>
                        <span style={{ fontSize: 13, color: "#374151" }}>{n.text}</span>
                    </div>
                ))}
                {activeTab === 1 && [
                    { t: 0, text: "In this lesson, we examine structural changes in the optic nerve head as glaucoma progresses." },
                    { t: 90, text: "The normal optic nerve has a cup-to-disc ratio of approximately 0.2 to 0.4. Any ratio above 0.6 should raise suspicion." },
                    { t: 240, text: "Notching of the neuroretinal rim — particularly inferiorly — is one of the earliest signs of glaucomatous damage." },
                ].map((l, i) => (
                    <div key={i} onClick={() => setProgress(l.t)} style={{ display: "flex", gap: 8, marginBottom: 10, cursor: "pointer", opacity: progress >= l.t ? 1 : 0.4 }}>
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: O, fontWeight: 700, flexShrink: 0 }}>{fmt(l.t)}</span>
                        <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{l.text}</span>
                    </div>
                ))}
                {activeTab === 2 && (
                    <div style={{ background: "#FFF0EB", border: `1px solid #FFD5C4`, borderRadius: 14, padding: "14px" }}>
                        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" as const, marginBottom: 4 }}>Up Next · Flashcards</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 6 }}>Glaucoma Flashcard Deck</div>
                        <div style={{ fontSize: 12, color: MUTED, marginBottom: 10 }}>48 cards · ~20 min</div>
                        <button style={{ background: O, color: "#fff", border: "none", borderRadius: 10, padding: "9px", fontWeight: 700, fontSize: 13, cursor: "pointer", width: "100%" }}>Start Flashcards →</button>
                    </div>
                )}
            </div>
            {canComplete && (
                <div style={{ padding: "8px 14px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
                    <button style={{ width: "100%", background: DARK, color: "#fff", border: "none", borderRadius: 12, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>✓ Mark Complete & Continue</button>
                </div>
            )}
        </>
    );
}

function FlashCards({ onBack }: { onBack: () => void }) {
    const [cardIndex, setCardIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const card = flashcards[cardIndex];
    const goNext = () => { setCardIndex(i => (i + 1) % flashcards.length); setRevealed(false); };
    const goPrev = () => { setCardIndex(i => (i - 1 + flashcards.length) % flashcards.length); setRevealed(false); };
    const tc = tagColor[card.tag];

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Top bar */}
            <div style={{ background: "#fff", padding: "7px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span onClick={onBack} style={{ fontSize: 12, color: "#9CA3AF", cursor: "pointer" }}>← Decks</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: DARK, flex: 1 }}>{card.subject}</span>
                <span style={{ background: tc.bg, color: tc.text, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{card.tag}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button onClick={goPrev} style={{ background: "#F3F4F6", border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontWeight: 700, fontSize: 14, color: MUTED, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: O, fontWeight: 700, minWidth: 32, textAlign: "center" }}>{cardIndex + 1}/{flashcards.length}</span>
                    <button onClick={goNext} style={{ background: "#F3F4F6", border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontWeight: 700, fontSize: 14, color: MUTED, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                </div>
            </div>

            {/* Card body */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                {/* Question panel */}
                <div style={{ flex: revealed ? "0 0 44%" : "0 0 100%", transition: "flex 0.3s", background: "#fff", borderRight: revealed ? `1px solid ${BORDER}` : "none", display: "flex", flexDirection: "column", padding: "14px", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10, flexShrink: 0 }}>
                        <div style={{ background: O, borderRadius: 7, padding: "2px 8px" }}>
                            <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>Q</span>
                        </div>
                        <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Question</span>
                    </div>

                    {card.type === "image" ? (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ background: "#1a1a2e", borderRadius: 10, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <div style={{ opacity: 0.3, fontSize: 40 }}>👁</div>
                                <div style={{ position: "absolute", bottom: 6, right: 6, background: `rgba(255,66,0,0.9)`, borderRadius: 5, padding: "2px 6px", fontSize: 9, color: "#fff", fontWeight: 700 }}>⛶ Tap to zoom</div>
                            </div>
                            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: DARK, lineHeight: 1.5 }}>{card.question}</p>
                        </div>
                    ) : (
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: DARK, lineHeight: 1.6 }}>{card.question}</p>
                            {card.type === "math" && !revealed && card.formula && (
                                <div style={{ marginTop: 12, background: "#F9FAFB", border: "1px dashed #D1D5DB", borderRadius: 8, padding: "7px 10px" }}>
                                    <div style={{ fontSize: 9, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 2 }}>Relevant formula</div>
                                    <div style={{ fontFamily: "monospace", fontSize: 13, color: MUTED }}>{card.formula}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {!revealed && (
                        <button onClick={() => setRevealed(true)} style={{ background: O, color: "#fff", border: "none", borderRadius: 11, padding: "10px", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0, marginTop: 10 }}>Reveal Answer →</button>
                    )}
                </div>

                {/* Answer panel */}
                {revealed && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 14px", overflow: "hidden" }}>
                        {card.type === "math" && card.formula ? (
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minHeight: 0, overflow: "hidden" }}>
                                <div style={{ background: "#FFF0EB", border: `2px solid ${O}`, borderRadius: 10, padding: "7px 10px", flexShrink: 0 }}>
                                    <div style={{ fontSize: 9, color: O, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 2 }}>Formula</div>
                                    <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: DARK }}>{card.formula}</div>
                                </div>
                                <div style={{ flex: 1, overflowY: "auto", fontSize: 12, minHeight: 0 }}>
                                    {card.answer.split("\n").map((line, i) => {
                                        if (!line.trim()) return <div key={i} style={{ height: 3 }} />;
                                        const isFinal = line.includes("≈") || line.includes("prism diopters");
                                        return <div key={i} style={{ fontFamily: (line.startsWith(" ") || line.includes("=")) ? "monospace" : "inherit", fontSize: line.startsWith(" ") ? 11 : 12, fontWeight: isFinal ? 700 : 400, color: isFinal ? O : "#374151", lineHeight: 1.65 }}>{line}</div>;
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                                <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 5 }}>Answer</div>
                                {card.answer.split("\n").map((line, i) => {
                                    if (!line.trim()) return <div key={i} style={{ height: 4 }} />;
                                    if (line.startsWith("ISNT")) return <div key={i} style={{ background: "#FFF0EB", border: `1px solid #FFD5C4`, borderRadius: 7, padding: "5px 8px", fontSize: 11, fontWeight: 700, color: "#C23200", margin: "4px 0" }}>{line}</div>;
                                    return <div key={i} style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{line}</div>;
                                })}
                            </div>
                        )}
                        <ExplanationAccordion text={card.explanation} />
                        <div style={{ display: "flex", gap: 8, marginTop: 8, flexShrink: 0 }}>
                            <button onClick={() => setRevealed(false)} style={{ flex: 1, background: "#FFF0EB", color: "#C23200", border: `1px solid #FFD5C4`, borderRadius: 9, padding: "8px 0", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Review Again</button>
                            <button onClick={goNext} style={{ flex: 1, background: DARK, color: "#fff", border: "none", borderRadius: 9, padding: "8px 0", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Next Card →</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function QuizScreen({ onBack }: { onBack: () => void }) {
    const [qIndex, setQIndex] = useState(0);
    const [selections, setSelections] = useState<Record<number, number[]>>({});
    const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
    const q = quizQuestions[qIndex];
    const sel = selections[q.id] || [];
    const isSubmitted = !!submitted[q.id];
    const hasSelection = sel.length > 0;
    const isCorrect = isSubmitted && q.correct.every(c => sel.includes(c)) && sel.every(s => q.correct.includes(s));
    const progress = Math.round((Object.keys(submitted).length / quizQuestions.length) * 100);
    const goNext = () => setQIndex(i => (i + 1) % quizQuestions.length);
    const goPrev = () => setQIndex(i => (i - 1 + quizQuestions.length) % quizQuestions.length);
    const toggle = (i: number) => {
        if (isSubmitted) return;
        setSelections(prev => {
            const cur = prev[q.id] || [];
            if (q.multiSelect) return { ...prev, [q.id]: cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i] };
            return { ...prev, [q.id]: cur.includes(i) ? [] : [i] };
        });
    };
    const submit = () => { if (hasSelection) setSubmitted(prev => ({ ...prev, [q.id]: true })); };

    return (
        <>
            {/* Top bar */}
            <div style={{ background: "#fff", padding: "8px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span onClick={onBack} style={{ fontSize: 11, color: "#9CA3AF", cursor: "pointer" }}>← Quiz</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: DARK }}>{q.subject}</div>
                    <div style={{ background: "#F3F4F6", borderRadius: 4, height: 4, overflow: "hidden", marginTop: 3 }}>
                        <div style={{ background: O, width: `${Math.max(4, progress)}%`, height: "100%", borderRadius: 4 }} />
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <button onClick={goPrev} style={{ background: "#F3F4F6", border: "none", borderRadius: 6, width: 22, height: 22, cursor: "pointer", fontWeight: 700, fontSize: 13, color: MUTED, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: O, fontWeight: 700, minWidth: 28, textAlign: "center" }}>{qIndex + 1}/{quizQuestions.length}</span>
                    <button onClick={goNext} style={{ background: "#F3F4F6", border: "none", borderRadius: 6, width: 22, height: 22, cursor: "pointer", fontWeight: 700, fontSize: 13, color: MUTED, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px 0" }}>
                <QBadge index={qIndex} result={isSubmitted ? isCorrect : null} />
                {q.multiSelect && (
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 20, padding: "2px 10px", display: "inline-block" }}>
                            <span style={{ fontSize: 10, color: "#1D4ED8", fontWeight: 700 }}>Select all that apply</span>
                        </div>
                    </div>
                )}
                <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: DARK, lineHeight: 1.55 }}>{q.question}</p>
                {q.type === "image" && (
                    <div style={{ background: "#1a1a2e", borderRadius: 10, height: 80, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative", overflow: "hidden" }}>
                        <div style={{ opacity: 0.25, fontSize: 28 }}>◈</div>
                        <div style={{ position: "absolute", bottom: 5, right: 6, background: "rgba(255,66,0,0.9)", borderRadius: 5, padding: "2px 6px", fontSize: 8, color: "#fff", fontWeight: 700 }}>⛶ Tap to zoom</div>
                    </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 12 }}>
                    {q.options.map((opt, i) => {
                        const selected = sel.includes(i);
                        const isCorr = q.correct.includes(i);
                        const wasMissed = isSubmitted && isCorr && !selected;
                        let bg = "#fff", border = `1px solid ${BORDER}`, color = DARK;
                        if (isSubmitted) {
                            if (isCorr && selected) { bg = "#DCFCE7"; border = `2px solid #22C55E`; color = "#166534"; }
                            else if (!isCorr && selected) { bg = "#FEE2E2"; border = `2px solid #EF4444`; color = "#991B1B"; }
                            else if (wasMissed) { bg = "#F0FDF4"; border = `2px dashed #22C55E`; color = "#166534"; }
                        } else if (selected) { bg = "#FFF0EB"; border = `2px solid ${O}`; color = "#C23200"; }
                        return (
                            <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: bg, border, borderRadius: 10, cursor: isSubmitted ? "default" : "pointer" }}>
                                <div style={{ width: 18, height: 18, borderRadius: q.multiSelect ? 4 : "50%", border: isSubmitted ? "none" : selected ? `2px solid ${O}` : `2px solid #D1D5DB`, background: isSubmitted ? "transparent" : selected ? O : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    {!isSubmitted && selected && <div style={{ width: 8, height: 8, borderRadius: q.multiSelect ? 2 : "50%", background: "#fff" }} />}
                                    {isSubmitted && <span style={{ fontSize: 11, fontWeight: 800, color: isCorr && selected ? "#22C55E" : !isCorr && selected ? "#EF4444" : "#22C55E" }}>{isCorr && selected ? "✓" : !isCorr && selected ? "✕" : wasMissed ? "○" : ""}</span>}
                                </div>
                                <span style={{ fontSize: 13, fontWeight: selected || isSubmitted ? 600 : 400, color, lineHeight: 1.4 }}>{opt}</span>
                            </div>
                        );
                    })}
                </div>
                {isSubmitted && <ExplanationAccordion text={q.explanation} isWrong={!isCorrect} />}
            </div>

            {/* Bottom */}
            <div style={{ padding: "10px 14px", background: "#fff", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
                {!isSubmitted ? (
                    <button onClick={submit} disabled={!hasSelection} style={{ width: "100%", background: hasSelection ? O : "#F3F4F6", color: hasSelection ? "#fff" : "#9CA3AF", border: "none", borderRadius: 11, padding: "11px", fontWeight: 700, fontSize: 13, cursor: hasSelection ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                        Submit Answer
                    </button>
                ) : (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={goPrev} style={{ flex: 1, background: "#FFF0EB", color: "#C23200", border: `1px solid #FFD5C4`, borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>← Prev</button>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: isCorrect ? "#DCFCE7" : "#FEE2E2", border: `2px solid ${isCorrect ? "#22C55E" : "#EF4444"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: 16, fontWeight: 900, color: isCorrect ? "#166534" : "#991B1B" }}>{isCorrect ? "✓" : "✕"}</span>
                        </div>
                        <button onClick={goNext} style={{ flex: 1, background: DARK, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Next →</button>
                    </div>
                )}
            </div>
        </>
    );
}

function ProfileScreen() {
    const stats = [{ label: "Videos Watched", value: "47" }, { label: "Cards Reviewed", value: "312" }, { label: "Quiz Score Avg", value: "82%" }, { label: "Day Streak", value: "6" }];
    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            <div style={{ background: `linear-gradient(135deg, ${O}, #CC3400)`, borderRadius: 20, padding: "24px 20px", marginBottom: 20, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 28, fontWeight: 800, color: "#fff" }}>S</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Sarah Johnson</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>4th Year · Pacific University</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "14px" }}>
                        <div style={{ fontSize: 24, fontFamily: "monospace", fontWeight: 800, color: O }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>
            <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                {["Account Settings", "Notification Preferences", "Study Reminders", "Help & Support", "About KMK Companion"].map((item, i, arr) => (
                    <div key={i} style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                        <span style={{ fontSize: 14, color: DARK }}>{item}</span>
                        <span style={{ color: "#9CA3AF" }}>›</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main App ───────────────────────────────────────────────────
export default function App() {
    const [activeTab, setActiveTab] = useState<TabId>("home");
    const [screen, setScreen] = useState<Screen>("dashboard");
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const navigate = useCallback((s: Screen, data?: any) => {
        if (s === "subject" && data) setSelectedSubject(data);
        setScreen(s);
        if (s === "flashcards") setActiveTab("flashcards");
        if (s === "quiz") setActiveTab("quizzes");
        if (s === "video") setActiveTab("courses");
    }, []);

    const handleTab = (tab: TabId) => {
        setActiveTab(tab);
        if (tab === "home") setScreen("dashboard");
        else if (tab === "courses") setScreen("subject");
        else if (tab === "flashcards") setScreen("flashcards");
        else if (tab === "quizzes") setScreen("quiz");
        else if (tab === "profile") setScreen("profile");
    };

    const goBack = () => {
        setScreen("dashboard");
        setActiveTab("home");
    };

    return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#E5E7EB", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            {/* Phone frame */}
            <div>
                <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, marginBottom: 8, textAlign: "center", letterSpacing: 1, textTransform: "uppercase" as const }}>KMK Companion — Interactive Demo</div>
                <div style={{ background: DARK, borderRadius: 44, padding: "12px 12px 0", boxShadow: "0 32px 80px rgba(0,0,0,0.35)", width: 340 }}>
                    {/* Notch */}
                    <div style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                        <div style={{ width: 110, height: 13, background: "#000", borderRadius: 20 }} />
                    </div>
                    {/* Screen */}
                    <div style={{ background: BG, borderRadius: 32, overflow: "hidden", height: 680, display: "flex", flexDirection: "column" }}>

                        {/* Flashcard landscape notice */}
                        {screen === "flashcards" && (
                            <div style={{ background: DARK, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                                <span style={{ fontSize: 10, color: "#9CA3AF" }}>⟺ Flashcards are landscape-only in the live app</span>
                            </div>
                        )}

                        {/* Screen content */}
                        {screen === "dashboard" && (
                            <>
                                {/* Dashboard header */}
                                <div style={{ background: "#fff", padding: "10px 14px 8px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                                    <div>
                                        <div style={{ fontSize: 10, color: "#9CA3AF" }}>Good morning</div>
                                        <div style={{ fontSize: 17, fontWeight: 800, color: DARK }}>Hey, Sarah 👋</div>
                                        <div style={{ fontSize: 11, color: O, fontWeight: 600 }}>6-day streak — keep it up!</div>
                                    </div>
                                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${O}, #FF6B35)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>S</div>
                                </div>
                                <Dashboard onNavigate={navigate} />
                            </>
                        )}

                        {screen === "subject" && (
                            <SubjectDetail subject={selectedSubject || subjects[0]} onBack={goBack} onNavigate={navigate} />
                        )}

                        {screen === "video" && <VideoPlayer onBack={goBack} />}

                        {screen === "flashcards" && (
                            <FlashCards onBack={goBack} />
                        )}

                        {screen === "quiz" && <QuizScreen onBack={goBack} />}

                        {screen === "profile" && (
                            <>
                                <div style={{ background: "#fff", padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: DARK }}>Profile</div>
                                </div>
                                <ProfileScreen />
                            </>
                        )}

                        <BottomNav active={activeTab} onTab={handleTab} />
                    </div>
                </div>
                <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>Tap the bottom nav or any card to navigate</div>
            </div>
        </div>
    );
}