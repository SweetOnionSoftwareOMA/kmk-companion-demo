// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KMK Companion — Root Entry
// src/App.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import Demo from "./Demo";
import Documentation from "./Documentation";

type View = "landing" | "demo" | "docs";

const O = "#FF4200";
const DARK = "#1A1A1A";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

export default function App() {
    const [view, setView] = useState < View > ("landing");

    if (view === "demo") return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#E5E7EB" }}>
            <TopBar label="Interactive Demo" onBack={() => setView("landing")} />
            <Demo />
        </div>
    );

    if (view === "docs") return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#F5F5F5" }}>
            <TopBar label="Design Specification" onBack={() => setView("landing")} />
            <Documentation />
        </div>
    );

    return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 560 }}>

                {/* Header */}
                <div style={{ background: `linear-gradient(135deg, ${O} 0%, #CC3400 100%)`, borderRadius: 24, padding: "36px 40px", marginBottom: 24, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>KMK Optometry</div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: -1, marginBottom: 6 }}>KMK Companion</div>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>NBEO Board Exam Preparation Platform<br />Mobile App — UI/UX Showcase</div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
                        {[["Audience", "3rd/4th Year OD Students"], ["Platform", "iOS & Android"], ["Version", "1.0"]].map(([k, v]) => (
                            <div key={k} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "6px 14px" }}>
                                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selection cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>

                    {/* Demo card */}
                    <div onClick={() => setView("demo")} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 24px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column", gap: 12 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(255,66,0,0.15)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                        <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${O}, #FF6B35)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📱</div>
                        <div>
                            <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 4 }}>Interactive Demo</div>
                            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>Tap through the full app — dashboard, video player, flashcards, and quizzes.</div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {["Dashboard", "Video", "Flashcards", "Quiz"].map(t => (
                                <span key={t} style={{ background: "#FFF0EB", color: "#C23200", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{t}</span>
                            ))}
                        </div>
                        <div style={{ marginTop: "auto", background: O, color: "#fff", borderRadius: 12, padding: "10px", fontWeight: 700, fontSize: 14, textAlign: "center" }}>Launch Demo →</div>
                    </div>

                    {/* Docs card */}
                    <div onClick={() => setView("docs")} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 24px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column", gap: 12 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(26,26,26,0.12)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                        <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${DARK}, #374151)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📋</div>
                        <div>
                            <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 4 }}>Design Specification</div>
                            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>Full UI/UX documentation — colors, typography, components, and developer handoff.</div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {["Colors", "Typography", "Components", "Dev Notes"].map(t => (
                                <span key={t} style={{ background: "#F3F4F6", color: MUTED, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{t}</span>
                            ))}
                        </div>
                        <div style={{ marginTop: "auto", background: DARK, color: "#fff", borderRadius: 12, padding: "10px", fontWeight: 700, fontSize: 14, textAlign: "center" }}>View Docs →</div>
                    </div>

                </div>

                {/* Footer */}
                <div style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
                    Built by KMK Optometry · <a href="https://kmkoptometry.com" target="_blank" rel="noreferrer" style={{ color: O, fontWeight: 600, textDecoration: "none" }}>kmkoptometry.com</a>
                </div>

            </div>
        </div>
    );
}

function TopBar({ label, onBack }: { label: string; onBack: () => void }) {
    return (
        <div style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 50 }}>
            <button onClick={onBack} style={{ background: "#F3F4F6", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: MUTED, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                ← Back
            </button>
            <div style={{ width: 1, height: 20, background: BORDER }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${O}, #FF6B35)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>K</div>
                <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>KMK Companion</span>
                    <span style={{ fontSize: 12, color: MUTED, marginLeft: 8 }}>— {label}</span>
                </div>
            </div>
        </div>
    );
}