import React, {useEffect, useState, useMemo, useRef} from "react";
import {createRoot} from "react-dom/client";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BrainCircuit, Code2, Github, Linkedin,
  Mail, ExternalLink, Trophy, Terminal, Sparkles, Flame, Medal, BarChart3,
  BookOpen, Award, MapPin, GraduationCap, CalendarDays, CircleCheckBig,
  Eye, Cpu, MousePointer2
} from "lucide-react";
import "./styles.css";

/* ─── Typewriter hook ─────────────────────────────────────────────────── */
// segments: array of { text, em } — em=true wraps in <em>
// Returns { nodes, done } where nodes is renderable JSX children
function useTypewriter(segments, { speed = 45, startDelay = 350 } = {}) {
  const flat = segments.map(s => ({ ...s, chars: [...s.text] }));
  const totalChars = flat.reduce((n, s) => n + s.chars.length, 0);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || count >= totalChars) return;
    const t = setTimeout(() => setCount(c => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, count, totalChars, speed]);

  const done = count >= totalChars;

  // Build display nodes
  let remaining = count;
  const nodes = flat.map((seg, i) => {
    const visible = seg.chars.slice(0, remaining).join("");
    remaining = Math.max(0, remaining - seg.chars.length);
    return seg.em
      ? <em key={i}>{visible}</em>
      : <React.Fragment key={i}>{visible}</React.Fragment>;
  });

  return { nodes, done };
}

const PROFILE = {
  name: "Syeda Anika Jerin",
  short: "ANIKA JERIN",
  title: "Software Engineer · AI Engineer · Researcher",
  email: "s.anikajerin@gmail.com",
  github: "https://github.com/AnikaJerin",
  linkedin: "https://www.linkedin.com/in/anika-jerin/",
  medium: "https://medium.com/@anikajerin2",
  leetcode: "https://leetcode.com/AnikaJerin",
  codeforces: "https://codeforces.com/profile/AnikaJerin",
};

const projects = [
  {title:"GSP-RenderX", type:"AI / 3D / Systems", desc:"A web-based 3D engine that replaces heavy STL assets with a compressed format and uses Edge-Aware Gaussian Splatting for real-time reconstruction.", tags:["Three.js","Gaussian Splatting","3D Engine"], link:"https://github.com/AnikaJerin/GSP-RenderX"},
  {title:"Cross-Modal Alzheimer's Classification", type:"Research / Multimodal AI", desc:"A deep-learning framework that fuses MRI imaging with clinical tabular features for Alzheimer's disease classification.", tags:["PyTorch","Multimodal DL","Medical AI"], link:"https://github.com/AnikaJerin/Cross-Modal-DL-Framework-for-Alzheimer-s-Disease-Classification-Using-MRI-Data-and-Tabular-Features"},
  {title:"Quantum-Enhanced Graph Learning", type:"Research / Quantum ML", desc:"A hybrid classical-quantum pipeline with a GNN molecular encoder and variational quantum head for bandgap and toxicity prediction.", tags:["GNN","Quantum ML","Molecular AI"], link:"https://github.com/AnikaJerin/Quantum-Enhanced-Graph-Learning-for-Molecular-Design-in-Biomaterials"},
  {title:"vizreco", type:"AI / Visualization", desc:"A visualization recommendation engine that explores the connection between data, context, and appropriate visual communication.", tags:["AI","Visualization","Data"], link:"https://github.com/AnikaJerin/vizreco"},
  {title:"YouTube AI Q&A", type:"AI Application", desc:"An intelligent Chrome extension that lets viewers ask natural-language questions about a YouTube video in real time.", tags:["LLM","Chrome Extension","Python"], link:"https://github.com/AnikaJerin/ChaGPT-Extension-for-Youtube"},
  {title:"GeoMap3D", type:"Open Source / Python", desc:"A declarative Python library for creating and exporting rich, interactive 3D geographic maps without frontend or GIS tooling.", tags:["Python","3D","Visualization"], link:"https://github.com/AnikaJerin/geomap3D"},
  {title:"Face Recognition + Odoo", type:"Computer Vision / ERP", desc:"Real-time face recognition with Python, OpenCV and Flask, designed to automate attendance workflows in Odoo.", tags:["OpenCV","Flask","Odoo"], link:"https://github.com/AnikaJerin/Face-Recognition-OpenCV"},
  {title:"WebSocket Chat Room", type:"Full Stack / Real-time", desc:"A real-time chat application combining Flask, React, Socket.IO and WebSockets - a concise example of event-driven product engineering.", tags:["React","Flask","WebSocket"], link:"https://github.com/AnikaJerin/WebSocket-Chat-Room-Application"},
];

const experience = [
  {period:"2020 — 2025", role:"Software Engineer", company:"Smart Technologies BD. Ltd.", points:[
    "AI-driven traffic monitoring and auto-fining system for Bangladesh Highway Police.",
    "Computer vision pipelines for speeding, wrong-way driving and automatic number plate recognition.",
    "Meteorological forecasting and archiving platform handling SYNOP, METAR, TAF, BUFR and related data.",
    "AI quality monitoring integrated with enterprise ERP workflows.",
    "RESTful backend APIs and ML inference services."
  ]},
  {period:"2020", role:"Software Engineer", company:"Smarter Stock — Ecosoftbd", points:[
    "Data preparation and LSTM-based stock prediction experimentation."
  ]}
];

const skills = [
  ["AI / ML", "PyTorch · TensorFlow · Keras · Scikit-learn · OpenCV · YOLO · CNN · LSTM · Vision Transformers · GNN"],
  ["Programming", "Python · C++ · C · Go · MATLAB · SQL · JavaScript"],
  ["Backend", "FastAPI · Flask · Django · Odoo · REST APIs · PostgreSQL"],
  ["Frontend / Data", "React · HTML · CSS · Plotly · Folium · Leaflet"],
  ["Engineering", "Git · GitHub · Linux · Postman · Jupyter · NumPy · Pandas"],
];

const SKILL_ITEMS = [
  { name: "PyTorch", category: "AI / ML", color: "#EE4C2C", icon: "pytorch" },
  { name: "TensorFlow", category: "AI / ML", color: "#FF6F00", icon: "tensorflow" },
  { name: "Keras", category: "AI / ML", color: "#D00000", icon: "keras" },
  { name: "Scikit-learn", category: "AI / ML", color: "#F7931E", icon: "scikitlearn" },
  { name: "OpenCV", category: "AI / ML", color: "#5C3EE8", icon: "opencv" },
  { name: "YOLO", category: "AI / ML", color: "#00F0FF", icon: "yolo" },
  { name: "CNN", category: "AI / ML", color: "#A855F7", icon: "cnn" },
  { name: "LSTM", category: "AI / ML", color: "#EC4899", icon: "lstm" },
  { name: "Vision Transformers", category: "AI / ML", color: "#3B82F6", icon: "vit" },
  { name: "GNN", category: "AI / ML", color: "#10B981", icon: "gnn" },
  { name: "Python", category: "Programming", color: "#3776AB", icon: "python" },
  { name: "C++", category: "Programming", color: "#00599C", icon: "cpp" },
  { name: "C", category: "Programming", color: "#A8B9CC", icon: "c" },
  { name: "Go", category: "Programming", color: "#00ADD8", icon: "go" },
  { name: "MATLAB", category: "Programming", color: "#E11D48", icon: "matlab" },
  { name: "SQL", category: "Programming", color: "#336791", icon: "sql" },
  { name: "JavaScript", category: "Programming", color: "#F7DF1E", icon: "javascript" },
  { name: "FastAPI", category: "Backend", color: "#059669", icon: "fastapi" },
  { name: "Flask", category: "Backend", color: "#E2E8F0", icon: "flask" },
  { name: "Django", category: "Backend", color: "#10B981", icon: "django" },
  { name: "Odoo", category: "Backend", color: "#714B67", icon: "odoo" },
  { name: "REST APIs", category: "Backend", color: "#06B6D4", icon: "rest" },
  { name: "PostgreSQL", category: "Backend", color: "#4169E1", icon: "postgresql" },
  { name: "React", category: "Frontend / Data", color: "#61DAFB", icon: "react" },
  { name: "Three.js", category: "Frontend / Data", color: "#FFFFFF", icon: "threejs" },
  { name: "Next.js", category: "Frontend / Data", color: "#E2E8F0", icon: "nextjs" },
  { name: "HTML", category: "Frontend / Data", color: "#E34F26", icon: "html" },
  { name: "CSS", category: "Frontend / Data", color: "#1572B6", icon: "css" },
  { name: "Plotly", category: "Frontend / Data", color: "#818CF8", icon: "plotly" },
  { name: "Folium", category: "Frontend / Data", color: "#41B883", icon: "folium" },
  { name: "Leaflet", category: "Frontend / Data", color: "#199900", icon: "leaflet" },
  { name: "Git", category: "Engineering", color: "#F05032", icon: "git" },
  { name: "GitHub", category: "Engineering", color: "#FFFFFF", icon: "github" },
  { name: "Linux", category: "Engineering", color: "#FCC624", icon: "linux" },
  { name: "Postman", category: "Engineering", color: "#FF6C37", icon: "postman" },
  { name: "Jupyter", category: "Engineering", color: "#F37626", icon: "jupyter" },
  { name: "NumPy", category: "Engineering", color: "#4DABCF", icon: "numpy" },
  { name: "Pandas", category: "Engineering", color: "#A855F7", icon: "pandas" },
];

function SkillIcon({ type, color }) {
  switch (type) {
    case "python":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/></svg>;
    case "pytorch":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.936 2.036a.48.48 0 0 0-.672.048l-4.992 5.616a.48.48 0 0 0 .048.672.48.48 0 0 0 .672-.048l4.992-5.616a.48.48 0 0 0-.048-.672zM12 0a12 12 0 1 0 12 12A12.014 12.014 0 0 0 12 0zm.048 4.32a.48.48 0 0 1 .336.144l4.992 4.992a.48.48 0 0 1-.672.672l-4.992-4.992a.48.48 0 0 1 .336-.816zm-3.6 4.32a3.84 3.84 0 1 1-3.84 3.84 3.84 3.84 0 0 1 3.84-3.84zm0 1.44a2.4 2.4 0 1 0 2.4 2.4 2.4 2.4 0 0 0-2.4-2.4z"/></svg>;
    case "tensorflow":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.292 5.856L11.54 0v24l-4.095-2.38V14.18l-3.07 1.78v-4.73l3.07-1.78V7.64l-6.153 3.57V5.856zm21.416 0L12.46 0v24l4.095-2.38V14.18l3.07 1.78v-4.73l-3.07-1.78V7.64l6.153 3.57V5.856z"/></svg>;
    case "keras":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 0H0v24h24V0zM12.92 18.59l-4.14-5.26v5.26H6.11V5.41h2.67v5.82l4.01-5.82h3.19l-4.52 6.16 4.71 7.02h-3.25z"/></svg>;
    case "scikitlearn":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 0 1 7.45 5.09A7.95 7.95 0 0 0 12 7a7.95 7.95 0 0 0-7.45 2.09A8 8 0 0 1 12 4zm0 16a8 8 0 0 1-7.45-5.09A7.95 7.95 0 0 0 12 17a7.95 7.95 0 0 0 7.45-2.09A8 8 0 0 1 12 20z"/></svg>;
    case "opencv":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0a6 6 0 0 0-6 6 6 6 0 0 0 1.258 3.659L3.5 16.5A6 6 0 0 0 0 21a6 6 0 0 0 6 6 6 6 0 0 0 4.341-1.859l1.659-3.75a6 6 0 0 0 3.659 1.258 6 6 0 0 0 6-6 6 6 0 0 0-1.859-4.341l-3.75-1.659A6 6 0 0 0 18 6a6 6 0 0 0-6-6zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 18a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm12 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>;
    case "yolo":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3"/></svg>;
    case "cnn":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="8" y="14" width="8" height="8" rx="1"/><path d="M6 10v2a2 2 0 0 0 2 2h4m6-4v2a2 2 0 0 1-2 2h-4"/></svg>;
    case "lstm":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6m-3-3l3 3-3 3"/><path d="M18 9a6 6 0 0 0-12 0"/></svg>;
    case "vit":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "gnn":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8.5" y1="7.5" x2="10" y2="15.5"/><line x1="15.5" y1="7.5" x2="14" y2="15.5"/><line x1="9" y1="6" x2="15" y2="6"/></svg>;
    case "cpp":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.38 5.75L12.5.04a1 1 0 0 0-1 0L1.62 5.75A1 1 0 0 0 1 6.62v10.76a1 1 0 0 0 .62.87l9.88 5.71a1 1 0 0 0 1 0l9.88-5.71a1 1 0 0 0 .62-.87V6.62a1 1 0 0 0-.62-.87zM9.25 14.5a3.25 3.25 0 1 1 0-6.5c1.2 0 2.15.6 2.7 1.5l-1.35.8c-.3-.5-.7-.8-1.35-.8a1.75 1.75 0 1 0 0 3.5c.65 0 1.05-.3 1.35-.8l1.35.8c-.55.9-1.5 1.5-2.7 1.5zm6.75-2h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm4 0h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1z"/></svg>;
    case "c":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.38 5.75L12.5.04a1 1 0 0 0-1 0L1.62 5.75A1 1 0 0 0 1 6.62v10.76a1 1 0 0 0 .62.87l9.88 5.71a1 1 0 0 0 1 0l9.88-5.71a1 1 0 0 0 .62-.87V6.62a1 1 0 0 0-.62-.87zM12 16a4 4 0 1 1 0-8c1.6 0 2.8.8 3.5 2l-1.8 1c-.4-.7-1-.1-1.7-.1a2 2 0 1 0 0 4c.7 0 1.3-.3 1.7-1l1.8 1c-.7 1.2-1.9 2.1-3.5 2.1z"/></svg>;
    case "go":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.81 10.07h4.88c-.1.52-.22 1.07-.36 1.62H1.81c.15-.55.26-1.1.36-1.62zm-.83 3.32h5.12c-.22.68-.48 1.35-.78 1.99H1.42a17.6 17.6 0 0 1-.44-1.99zm14.3-3.32c1.78 0 3.01.76 3.65 2.17h-2.18c-.37-.53-.94-.85-1.57-.85-1.12 0-1.89.89-1.89 2.15 0 1.25.75 2.13 1.87 2.13.82 0 1.45-.48 1.67-1.2h-1.85v-1.62h4.08v3.94h-1.68v-.79c-.58.62-1.4 1.01-2.39 1.01-2.22 0-3.88-1.55-3.88-3.62 0-2.07 1.68-3.32 4.17-3.32zm8.72 3.32c0 2.06-1.6 3.32-3.8 3.32-2.2 0-3.8-1.26-3.8-3.32 0-2.06 1.6-3.32 3.8-3.32 2.2 0 3.8 1.26 3.8 3.32zm-2.05 0c0-1.25-.74-2.13-1.75-2.13-1.01 0-1.75.88-1.75 2.13 0 1.25.74 2.13 1.75 2.13 1.01 0 1.75-.88 1.75-2.13z"/></svg>;
    case "matlab":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18s4-12 7-12 4 14 7 14 6-8 6-8"/><path d="M2 18h20"/></svg>;
    case "sql":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 6c4.42 0 8-1.34 8-2v3c0 .66-3.58 2-8 2s-8-1.34-8-2V8c0 .66 3.58 2 8 2zm0 6c4.42 0 8-1.34 8-2v3c0 .66-3.58 2-8 2s-8-1.34-8-2v-3c0 .66 3.58 2 8 2z"/></svg>;
    case "javascript":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.465.735-.63 1.29-.495.315.075.69.3.885.63.795-.54.795-.54 1.335-.9-.33-.525-.66-.84-1.05-1.05-.72-.39-1.74-.48-2.505-.21-1.05.345-1.74 1.23-1.635 2.37.12 1.35 1.2 1.95 2.505 2.475.99.39 1.485.645 1.62 1.155.255.84-.33 1.41-1.47 1.41-.855 0-1.425-.375-1.875-1.08-.6.39-.6.39-1.35.87.27.465.615.84 1.05 1.14 1.02.72 2.52.84 3.66.39 1.455-.57 2.145-1.77 1.965-3.345z"/></svg>;
    case "fastapi":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.853 4.5l-1.037 6.223h3.582L10.293 19.5l1.037-6.223H7.748L12.853 4.5z"/></svg>;
    case "flask":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3h6m-3 0v6.5L19 20A1 1 0 0 1 18.15 21H5.85A1 1 0 0 1 5 20l7-10.5V3z"/><circle cx="10" cy="16" r="1" fill="currentColor"/><circle cx="14" cy="18" r="1" fill="currentColor"/></svg>;
    case "django":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.146 0h3.125v16.71c-1.385.297-2.61.41-3.754.41-3.415 0-4.994-1.56-4.994-4.502 0-3.05 1.83-4.662 4.708-4.662.338 0 .614.02.915.082V0zm0 10.457a2.53 2.53 0 0 0-.675-.082c-1.42 0-2.228.777-2.228 2.27 0 1.41.777 2.128 2.188 2.128.246 0 .47-.02.715-.062v-4.254zM16.142 5.035h3.124v11.838h-3.124V5.035zM16.142 0h3.124v3.15h-3.124V0z"/></svg>;
    case "odoo":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/></svg>;
    case "rest":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8m-4-4v8"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/></svg>;
    case "postgresql":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.968 0C5.782 0 .762 4.674.762 10.988c0 3.738 1.95 7.027 4.945 8.995l-.66 3.09 3.518-1.78c1.077.34 2.226.53 3.403.53 6.186 0 11.206-4.674 11.206-10.988S18.154 0 11.968 0zm-2.43 14.51a2.15 2.15 0 1 1 0-4.3 2.15 2.15 0 0 1 0 4.3zm5.86 0a2.15 2.15 0 1 1 0-4.3 2.15 2.15 0 0 1 0 4.3z"/></svg>;
    case "react":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>;
    case "html":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.236-2.656H5.414l.691 8.031h8.809l-.363 3.938-2.551.688-2.547-.688-.164-1.875H6.609l.328 4.078 5.035 1.391 5.039-1.391.688-7.797H8.531z"/></svg>;
    case "css":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.236-2.656H5.414l.691 8.031h8.809l-.363 3.938-2.551.688-2.547-.688-.164-1.875H6.609l.328 4.078 5.035 1.391 5.039-1.391.688-7.797H8.531z"/></svg>;
    case "plotly":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 3h3v18H3V3zm6 6h3v12H9V9zm6-4h3v16h-3V5zm6 8h3v8h-3v-8z"/></svg>;
    case "folium":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>;
    case "leaflet":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm-1 14.5l-3.5-3.5 1.41-1.41L11 13.67l5.09-5.09L17.5 10 11 16.5z"/></svg>;
    case "git":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>;
    case "threejs":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.17 2L2 21.83 12 24l10-2.17L20.83 2H3.17zM17.5 19.5l-5.5 1.2-5.5-1.2-.91-10.67h12.82L17.5 19.5zM7.66 13l.25 3.03L12 17.1l4.09-.9.41-4.85H7.25L7.02 9.7h9.96l.25-2.34H6.77L6.5 4.5h11l.25 2.5H6.75L7 9.7h9.95l-.5 5.52L12 16.4l-4.45-.97L7.3 13h.36z"/></svg>;
    case "nextjs":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>;
    case "github":
      return <Github size={20} color={color}/>;
    case "linux":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.186 2.002c-2.482 0-4.004 1.69-4.004 4.027 0 1.258.468 2.47 1.053 3.328-.585 1.547-2.316 2.508-3.978 2.508-1.52 0-2.808-.877-2.808-2.34 0-1.848 1.989-2.574 3.744-2.574.678 0 1.345.117 1.93.351.293-.76.41-1.579.41-2.4 0-3.626-2.748-6.198-6.257-6.198C.877-1.294-1.286 1.923-1.286 5.84c0 4.797 3.451 8.892 8.307 8.892 2.632 0 4.797-1.229 6.023-3.158 1.111 1.93 3.333 3.158 5.965 3.158 4.856 0 8.307-4.095 8.307-8.892 0-3.917-2.163-7.134-3.567-7.134-3.509 0-6.257 2.572-6.257 6.198 0 .82.117 1.64.41 2.4.585-.234 1.252-.351 1.93-.351 1.755 0 3.744.726 3.744 2.574 0 1.463-1.288 2.34-2.808 2.34-1.662 0-3.393-.961-3.978-2.508.585-.858 1.053-2.07 1.053-3.328 0-2.337-1.522-4.027-4.004-4.027z"/></svg>;
    case "postman":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.545 0C6.674 0 0 5.487 0 12.358c0 4.605 2.656 8.59 6.55 10.518l3.18-5.507a6.233 6.233 0 0 1-.84-3.111c0-3.447 2.795-6.242 6.242-6.242 1.341 0 2.578.423 3.59 1.144L21.84 3.74A13.432 13.432 0 0 0 13.545 0z"/></svg>;
    case "jupyter":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.18 3.42a8.55 8.55 0 0 0-4.9 7.62c0 4.3 3.19 7.9 7.42 8.48.5-.7 1.03-1.42 1.58-2.15-3.08-.4-5.46-3.04-5.46-6.33 0-2.45 1.32-4.57 3.28-5.69l-1.92-1.93zm9.64 0l-1.92 1.93c1.96 1.12 3.28 3.24 3.28 5.69 0 3.29-2.38 5.93-5.46 6.33.55.73 1.08 1.45 1.58 2.15 4.23-.58 7.42-4.18 7.42-8.48 0-3.16-1.84-5.91-4.9-7.62z"/></svg>;
    case "numpy":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.25 4.5v15h4.5v-7.5l6 7.5h4.5v-15h-4.5v7.5l-6-7.5h-4.5z"/></svg>;
    case "pandas":
      return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 3h4v18H3V3zm7 0h4v18h-4V3zm7 0h4v18h-4V3z"/></svg>;
    default:
      return <Code2 size={20} color={color}/>;
  }
}

function ZebraWord({ text, className = "", style = {}, isYellow = false, stripeColor = null }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // animState = null | { targets: { [charIdx]: { inDir, outDir } }, phase: 'in'|'hold'|'out', active: boolean }
  const [animState, setAnimState] = useState(null);

  const validIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < text.length; i++) {
      if (/[a-zA-Z0-9]/.test(text[i])) indices.push(i);
    }
    return indices;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const DIRS = useMemo(() => ["Up", "Down", "Left", "Right"], []);

  useEffect(() => {
    if (!inView || validIndices.length === 0) return;
    let t1, t2, t3, t4, frameId;

    const runCycle = () => {
      // Pick 2 to 4 TRULY RANDOM non-contiguous letter indices across the text
      const maxPick = Math.min(validIndices.length, 4);
      const minPick = Math.min(validIndices.length, 2);
      const countToPick = Math.floor(Math.random() * (maxPick - minPick + 1)) + minPick;

      // Random non-sequential index sampler
      const copy = [...validIndices];
      const pickedIndices = [];
      for (let i = 0; i < countToPick; i++) {
        const randPos = Math.floor(Math.random() * copy.length);
        pickedIndices.push(copy[randPos]);
        copy.splice(randPos, 1);
      }

      const targets = {};
      pickedIndices.forEach(idx => {
        targets[idx] = {
          inDir: DIRS[Math.floor(Math.random() * DIRS.length)],
          outDir: DIRS[Math.floor(Math.random() * DIRS.length)],
        };
      });

      // Step 1: Initialize 'in' phase at offscreen starting position
      setAnimState({ targets, phase: "in", active: false });

      // Step 2: Activate slide IN in next tick
      frameId = requestAnimationFrame(() => {
        setAnimState(prev => prev ? { ...prev, active: true } : null);
      });

      // Step 3: Hold phase after slide IN finishes (420ms)
      t1 = setTimeout(() => {
        setAnimState(prev => prev ? { ...prev, phase: "hold" } : null);
      }, 420);

      // Step 4: Prepare slide OUT (1620ms total hold)
      t2 = setTimeout(() => {
        setAnimState(prev => prev ? { ...prev, phase: "out", active: false } : null);
        frameId = requestAnimationFrame(() => {
          setAnimState(prev => prev ? { ...prev, active: true } : null);
        });
      }, 1620);

      // Step 5: Complete cycle and reset to idle (2050ms)
      t3 = setTimeout(() => {
        setAnimState(null);
        t4 = setTimeout(runCycle, Math.random() * 900 + 1300);
      }, 2050);
    };

    t4 = setTimeout(runCycle, 600);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [inView, validIndices, DIRS]);

  const triggerNow = () => {
    if (validIndices.length === 0 || animState !== null) return;
    const copy = [...validIndices];
    const pickedIndices = [];
    const countToPick = Math.min(validIndices.length, 4);
    for (let i = 0; i < countToPick; i++) {
      const randPos = Math.floor(Math.random() * copy.length);
      pickedIndices.push(copy[randPos]);
      copy.splice(randPos, 1);
    }

    const targets = {};
    pickedIndices.forEach(idx => {
      targets[idx] = {
        inDir: DIRS[Math.floor(Math.random() * DIRS.length)],
        outDir: DIRS[Math.floor(Math.random() * DIRS.length)],
      };
    });

    setAnimState({ targets, phase: "in", active: false });
    requestAnimationFrame(() => {
      setAnimState(prev => prev ? { ...prev, active: true } : null);
    });
    setTimeout(() => setAnimState(prev => prev ? { ...prev, phase: "hold" } : null), 420);
    setTimeout(() => {
      setAnimState(prev => prev ? { ...prev, phase: "out", active: false } : null);
      requestAnimationFrame(() => setAnimState(prev => prev ? { ...prev, active: true } : null));
    }, 1400);
    setTimeout(() => setAnimState(null), 1820);
  };

  // Direction transform helpers
  const getOffscreenTransform = (dir) => {
    switch (dir) {
      case "Up": return "translate3d(0, -108%, 0)";
      case "Down": return "translate3d(0, 108%, 0)";
      case "Left": return "translate3d(-108%, 0, 0)";
      case "Right": return "translate3d(108%, 0, 0)";
      default: return "translate3d(0, -108%, 0)";
    }
  };

  const getOppositeOffscreenTransform = (dir) => {
    switch (dir) {
      case "Up": return "translate3d(0, 108%, 0)";
      case "Down": return "translate3d(0, -108%, 0)";
      case "Left": return "translate3d(108%, 0, 0)";
      case "Right": return "translate3d(-108%, 0, 0)";
      default: return "translate3d(0, 108%, 0)";
    }
  };

  // Tokenize text into words and spaces
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  let globalCharCounter = 0;

  return (
    <span
      ref={ref}
      className={`zebra-word-container ${className}`}
      style={{ display: "inline", whiteSpace: "normal", ...style }}
      onMouseEnter={triggerNow}
    >
      {tokens.map((token, tokenIdx) => {
        // Natural whitespace for space runs to ensure responsive word-wrapping across all viewports
        if (/\s+/.test(token)) {
          globalCharCounter += token.length;
          return <React.Fragment key={tokenIdx}>{token}</React.Fragment>;
        }

        const wordCharStartIndex = globalCharCounter;
        globalCharCounter += token.length;

        return (
          <span
            key={tokenIdx}
            className="zebra-word-unit"
            style={{ display: "inline", whiteSpace: "nowrap" }}
          >
            {token.split("").map((char, charInWordIdx) => {
              const charIdx = wordCharStartIndex + charInWordIdx;
              const targetInfo = animState?.targets?.[charIdx];
              const isTarget = !!targetInfo;
              const phase = isTarget ? animState.phase : "idle";
              const inDir = isTarget ? targetInfo.inDir : "Up";
              const outDir = isTarget ? targetInfo.outDir : "Up";
              const isActive = isTarget ? animState.active : false;

              let solidTransform = "translate3d(0, 0, 0)";
              let solidOpacity = 1;
              let stripedTransform = getOppositeOffscreenTransform(inDir);
              let stripedOpacity = 0;
              let transition = "none";

              const smoothTransition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";

              if (isTarget) {
                if (phase === "in") {
                  if (!isActive) {
                    solidTransform = "translate3d(0, 0, 0)";
                    solidOpacity = 1;
                    stripedTransform = getOppositeOffscreenTransform(inDir);
                    stripedOpacity = 0;
                    transition = "none";
                  } else {
                    solidTransform = getOffscreenTransform(inDir);
                    solidOpacity = 0;
                    stripedTransform = "translate3d(0, 0, 0)";
                    stripedOpacity = 1;
                    transition = smoothTransition;
                  }
                } else if (phase === "hold") {
                  solidTransform = getOffscreenTransform(inDir);
                  solidOpacity = 0;
                  stripedTransform = "translate3d(0, 0, 0)";
                  stripedOpacity = 1;
                  transition = "none";
                } else if (phase === "out") {
                  if (!isActive) {
                    stripedTransform = "translate3d(0, 0, 0)";
                    stripedOpacity = 1;
                    solidTransform = getOppositeOffscreenTransform(outDir);
                    solidOpacity = 0;
                    transition = "none";
                  } else {
                    stripedTransform = getOffscreenTransform(outDir);
                    stripedOpacity = 0;
                    solidTransform = "translate3d(0, 0, 0)";
                    solidOpacity = 1;
                    transition = smoothTransition;
                  }
                }
              }

              const customStripeStyle = stripeColor
                ? {
                    backgroundImage: `repeating-linear-gradient(${
                      inDir === "Left" || inDir === "Right" ? "-55deg" : "35deg"
                    }, ${stripeColor} 0px, ${stripeColor} 3px, transparent 3px, transparent 7px)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }
                : {};

              return (
                <span key={charIdx} className="zebra-char-box">
                  {/* Layer 1: Solid base letter */}
                  <span
                    className="zebra-layer"
                    style={{
                      transform: solidTransform,
                      opacity: solidOpacity,
                      transition,
                    }}
                  >
                    {char}
                  </span>

                  {/* Layer 2: Striped letter overlay with solid edge contours */}
                  <span
                    className={`zebra-layer zebra-striped-layer ${
                      !stripeColor ? (isYellow ? "zebra-striped-bold-yellow" : "zebra-striped-bold-white") : ""
                    }`}
                    aria-hidden="true"
                    style={{
                      transform: stripedTransform,
                      opacity: stripedOpacity,
                      transition,
                      ...customStripeStyle,
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function HeroHeading() {
  // line 1: "Building software\n" — typed first
  // line 2: "that " (plain) + "thinks." (em)
  const SEGMENTS = [
    { text: "Building software\nthat ", em: false },
    { text: "thinks.",               em: true  },
  ];
  const { nodes, done } = useTypewriter(SEGMENTS, { speed: 42, startDelay: 400 });

  // Split first segment at the newline for the <br/> to work
  const line1End = nodes[0]?.props?.children?.indexOf("\n") ?? -1;
  const rawLine1 = nodes[0]?.props?.children ?? "";
  const beforeBreak = line1End >= 0 ? rawLine1.slice(0, line1End) : rawLine1;
  const afterBreak  = line1End >= 0 ? rawLine1.slice(line1End + 1) : "";

  return (
    <h1 className="hero-title" aria-label="Building software that thinks.">
      {beforeBreak}
      {line1End >= 0 && <br/>}
      {afterBreak}
      {done ? <em><ZebraWord text="thinks." isYellow={true} /></em> : nodes[1]}
      <span className={`tw-cursor${done ? " tw-cursor--done" : ""}`}>|</span>
    </h1>
  );
}

function SkillGlobe() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [rotation, setRotation] = useState({ rx: 0.2, ry: 0 });
  const [stageSize, setStageSize] = useState(520);
  const isHoveredRef = useRef(false);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const categories = ["All", "AI / ML", "Programming", "Backend", "Frontend / Data", "Engineering"];
  const numItems = SKILL_ITEMS.length;

  // Responsive radius: scales with the container size
  const radius = Math.min(stageSize * 0.37, 190);

  const points = useMemo(() => {
    return SKILL_ITEMS.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numItems);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return {
        ...skill,
        x0: radius * Math.sin(phi) * Math.cos(theta),
        y0: radius * Math.sin(phi) * Math.sin(theta),
        z0: radius * Math.cos(phi),
      };
    });
  }, [numItems, radius]);

  // Watch container size
  useEffect(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setStageSize(width);
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = width;
      }
    });
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const renderLoop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isHoveredRef.current && !isDraggingRef.current) {
        setRotation((prev) => ({
          rx: prev.rx + 0.04 * delta,
          ry: prev.ry + 0.32 * delta,
        }));
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
        ctx.lineWidth = 1;

        const numRings = 7;
        for (let i = 1; i < numRings; i++) {
          const latPhi = (Math.PI * i) / numRings;
          const ringR = radius * Math.sin(latPhi);
          const ringY0 = radius * Math.cos(latPhi);

          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.2) {
            const rx0 = ringR * Math.cos(a);
            const ry0 = ringY0;
            const rz0 = ringR * Math.sin(a);

            const cosY = Math.cos(rotation.ry);
            const sinY = Math.sin(rotation.ry);
            const cosX = Math.cos(rotation.rx);
            const sinX = Math.sin(rotation.rx);

            const x1 = rx0 * cosY + rz0 * sinY;
            const z1 = -rx0 * sinY + rz0 * cosY;
            const y2 = ry0 * cosX - z1 * sinX;
            const z2 = ry0 * sinX + z1 * cosX;

            const scale = 500 / (500 - z2);
            const px = cx + x1 * scale;
            const py = cy + y2 * scale;

            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [rotation, radius]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setRotation((prev) => ({ rx: prev.rx - dy * 0.005, ry: prev.ry + dx * 0.005 }));
  };
  const handleMouseUp = () => { isDraggingRef.current = false; };

  // Touch drag support
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    isDraggingRef.current = true;
    isHoveredRef.current = true;
    dragStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - dragStartRef.current.x;
    const dy = t.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: t.clientX, y: t.clientY };
    setRotation((prev) => ({ rx: prev.rx - dy * 0.005, ry: prev.ry + dx * 0.005 }));
  };
  const handleTouchEnd = () => { isDraggingRef.current = false; isHoveredRef.current = false; };

  const cosY = Math.cos(rotation.ry);
  const sinY = Math.sin(rotation.ry);
  const cosX = Math.cos(rotation.rx);
  const sinX = Math.sin(rotation.rx);

  const projectedNodes = points.map((pt) => {
    const x1 = pt.x0 * cosY + pt.z0 * sinY;
    const z1 = -pt.x0 * sinY + pt.z0 * cosY;
    const y2 = pt.y0 * cosX - z1 * sinX;
    const z2 = pt.y0 * sinX + z1 * cosX;

    const perspective = 500;
    const scale = perspective / (perspective - z2);
    const alpha = Math.max(0.2, Math.min(1, (z2 + radius) / (2 * radius)));
    const isMatch = activeCategory === "All" || pt.category === activeCategory;

    return {
      ...pt,
      px: x1 * scale,
      py: y2 * scale,
      z2,
      scale,
      alpha: isMatch ? alpha : alpha * 0.22,
      zIndex: Math.round(z2 + radius),
      isMatch,
    };
  });

  // Scale icon size with globe
  const iconScale = Math.min(1, stageSize / 520);
  const nodeSize = Math.round(44 * iconScale);

  return (
    <div className="skills-globe-wrapper">
      <div className="skills-category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        ref={stageRef}
        className="globe-stage"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; setHoveredSkill(null); isDraggingRef.current = false; }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} width={stageSize} height={stageSize} className="globe-canvas" />

        <div className="nodes-container">
          {projectedNodes.map((node) => {
            const isHovered = hoveredSkill?.name === node.name;
            return (
              <div
                key={node.name}
                className={`globe-node ${isHovered ? "hovered" : ""} ${!node.isMatch ? "dimmed" : ""}`}
                style={{
                  transform: `translate3d(${node.px}px, ${node.py}px, 0px) scale(${isHovered ? 1.35 : node.scale * 0.9})`,
                  opacity: isHovered ? 1 : node.alpha,
                  zIndex: isHovered ? 9999 : node.zIndex,
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  isHoveredRef.current = true;
                  setHoveredSkill(node);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setHoveredSkill(node);
                }}
              >
                <div
                  className="node-icon-wrapper"
                  style={{
                    width: nodeSize, height: nodeSize,
                    color: node.color,
                    borderColor: isHovered ? node.color : "rgba(255,255,255,0.14)",
                    boxShadow: isHovered ? `0 0 24px ${node.color}aa, inset 0 0 12px ${node.color}55` : "0 4px 12px rgba(0,0,0,0.4)"
                  }}
                >
                  <SkillIcon type={node.icon} color={node.color} />
                </div>

                {isHovered && (
                  <div className="node-tooltip">
                    <span className="tooltip-name">{node.name.toUpperCase()}</span>
                    <span className="tooltip-cat">{node.category}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Icon Rain ───────────────────────────── */
const RAIN_ICONS = [
  // python
  "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05",
  // react (use a circle + lines approximation drawn separately)
  null, // placeholder — we'll draw react differently
  // git
  "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
  // html5
  "M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.236-2.656H5.414l.691 8.031h8.809l-.363 3.938-2.551.688-2.547-.688-.164-1.875H6.609l.328 4.078 5.035 1.391 5.039-1.391.688-7.797H8.531",
  // fastapi lightning
  "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.853 4.5l-1.037 6.223h3.582L10.293 19.5l1.037-6.223H7.748L12.853 4.5z",
];

const RAIN_COLORS = [
  "#EE4C2C", "#61DAFB", "#F05032", "#3776AB", "#F7DF1E",
  "#059669", "#00ADD8", "#A855F7", "#FF6C37", "#FCC624",
  "#4DABCF", "#10B981", "#d9ff62", "#818CF8", "#00F0FF",
];

function drawRainIcon(ctx, iconIndex, x, y, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.translate(x - size / 2, y - size / 2);
  ctx.scale(size / 24, size / 24);

  if (iconIndex === 1) {
    // React: ellipses + center dot
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(12, 12, 10, 4.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(12, 12, 10, 4.5, Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(12, 12, 10, 4.5, -Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(12, 12, 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const p = new Path2D(RAIN_ICONS[iconIndex]);
    ctx.fill(p);
  }
  ctx.restore();
}

function IconRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let started = Date.now();
    const DURATION = 4200; // ms total
    const FADE_START = 3200;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate drops
    const drops = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight * 0.9 - 30,
      vy: 1.8 + Math.random() * 3.2,
      size: 18 + Math.random() * 22,
      icon: Math.floor(Math.random() * RAIN_ICONS.length),
      color: RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)],
      rotation: (Math.random() - 0.5) * 0.6,
      spin: (Math.random() - 0.5) * 0.025,
      landed: false,
      landY: window.innerHeight * (0.55 + Math.random() * 0.35),
      alpha: 0.7 + Math.random() * 0.3,
      delay: Math.random() * 1200,
    }));

    function animate() {
      const now = Date.now();
      const elapsed = now - started;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const globalFade = elapsed > FADE_START
        ? 1 - Math.min(1, (elapsed - FADE_START) / (DURATION - FADE_START))
        : 1;

      if (globalFade <= 0) {
        canvas.style.display = "none";
        return;
      }

      drops.forEach(drop => {
        if (elapsed < drop.delay) return;
        if (!drop.landed) {
          drop.y += drop.vy;
          drop.rotation += drop.spin;
          if (drop.y >= drop.landY) {
            drop.landed = true;
            drop.y = drop.landY;
          }
        }
        const a = drop.landed
          ? drop.alpha * globalFade * 0.55
          : drop.alpha * globalFade;

        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.rotate(drop.rotation);
        ctx.translate(-drop.x, -drop.y);
        drawRainIcon(ctx, drop.icon, drop.x, drop.y, drop.size, drop.color, a);
        ctx.restore();
      });

      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

/* ─────────────────────── Cursor Glitch Follower ──────────────────────── */
const CURSOR_COLORS = [
  "#d9ff62",  // site accent green
  "#00F0FF",  // cyan
  "#A855F7",  // purple
  "#FF6C37",  // orange
  "#61DAFB",  // react blue
  "#EC4899",  // pink
  "#FCC624",  // yellow
];

const CURSOR_SYMBOLS = [
  // neuron node — filled center with glowing spikes
  ({ style, color }) => (
    <svg viewBox="0 0 32 32" style={style} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="16" cy="16" r="4.5" fill={color} fillOpacity="0.25"/>
      <line x1="16" y1="1" x2="16" y2="9"/>
      <line x1="16" y1="23" x2="16" y2="31"/>
      <line x1="1" y1="16" x2="9" y2="16"/>
      <line x1="23" y1="16" x2="31" y2="16"/>
      <line x1="5" y1="5" x2="10.5" y2="10.5"/>
      <line x1="21.5" y1="21.5" x2="27" y2="27"/>
      <line x1="27" y1="5" x2="21.5" y2="10.5"/>
      <line x1="5" y1="27" x2="10.5" y2="21.5"/>
    </svg>
  ),
  // brain — bold filled-stroke with folds
  ({ style, color }) => (
    <svg viewBox="0 0 32 32" style={style} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 22c-2.5-1.2-4-3.5-4-6.5a6.5 6.5 0 0 1 4-6A5.5 5.5 0 0 1 17.5 7a5.5 5.5 0 0 1 5.5 3.5 5.5 5.5 0 0 1 4 5c0 3.2-2 5.5-4.5 6.5v2.5H7V22z" fill={color} fillOpacity="0.12"/>
      <path d="M13 14c0-1.5 1.5-2.5 3-2m5.5 6.5c0 1-1 2-2.5 2m-3.5-7v5m4.5-5v5"/>
    </svg>
  ),
  // robot head — bolder, filled eyes
  ({ style, color }) => (
    <svg viewBox="0 0 32 32" style={style} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="9" width="20" height="15" rx="3.5" fill={color} fillOpacity="0.12"/>
      <rect x="10" y="13" width="5" height="4" rx="1.5" fill={color} fillOpacity="0.5"/>
      <rect x="17" y="13" width="5" height="4" rx="1.5" fill={color} fillOpacity="0.5"/>
      <line x1="13" y1="21" x2="19" y2="21"/>
      <line x1="16" y1="6" x2="16" y2="9"/>
      <circle cx="16" cy="5" r="2" fill={color}/>
      <line x1="6" y1="17" x2="3" y2="17"/>
      <line x1="26" y1="17" x2="29" y2="17"/>
    </svg>
  ),
  // circuit crosshair — corner pads + center
  ({ style, color }) => (
    <svg viewBox="0 0 32 32" style={style} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="16" cy="16" r="3.5" fill={color} fillOpacity="0.3"/>
      <path d="M16 3v9M16 20v9M3 16h9M20 16h9"/>
      <rect x="4" y="4" width="5" height="5" rx="1" fill={color} fillOpacity="0.4"/>
      <rect x="23" y="4" width="5" height="5" rx="1" fill={color} fillOpacity="0.4"/>
      <rect x="4" y="23" width="5" height="5" rx="1" fill={color} fillOpacity="0.4"/>
      <rect x="23" y="23" width="5" height="5" rx="1" fill={color} fillOpacity="0.4"/>
    </svg>
  ),
  // DNA / double helix node
  ({ style, color }) => (
    <svg viewBox="0 0 32 32" style={style} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M10 4c0 6 12 6 12 12S10 22 10 28"/>
      <path d="M22 4c0 6-12 6-12 12s12 6 12 12"/>
      <line x1="10" y1="10" x2="22" y2="10"/>
      <line x1="10" y1="16" x2="22" y2="16"/>
      <line x1="10" y1="22" x2="22" y2="22"/>
    </svg>
  ),
];

function CursorGlitch() {
  const trailRef = useRef([]);
  const posRef = useRef({ x: -999, y: -999 });
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const tickRef = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      const cy = e.clientY ?? e.touches?.[0]?.clientY;
      if (cx === undefined) return;
      posRef.current = { x: cx, y: cy };
      tickRef.current += 1;

      // Spawn a new particle every ~3 ticks
      if (tickRef.current % 3 === 0) {
        const id = Date.now() + Math.random();
        const iconIdx = Math.floor(Math.random() * CURSOR_SYMBOLS.length);
        const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
        const offset = {
          x: (Math.random() - 0.5) * 36,
          y: (Math.random() - 0.5) * 36,
        };
        const size = 20 + Math.random() * 16;
        const rotation = (Math.random() - 0.5) * 50;
        setParticles(prev => [
          ...prev.slice(-10),
          { id, x: cx + offset.x, y: cy + offset.y, iconIdx, color, size, rotation, born: Date.now() },
        ]);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    // GC old particles
    const gc = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.born < 950));
    }, 200);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      clearInterval(gc);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        overflow: "hidden",
      }}
    >
      {particles.map(p => {
        const Symbol = CURSOR_SYMBOLS[p.iconIdx];
        const age = Date.now() - p.born;
        const lifeRatio = Math.min(1, age / 950);
        // fresh: 0.75 opacity, fades to 0
        const alpha = Math.pow(1 - lifeRatio, 1.4) * 0.75;
        const scale = 0.55 + lifeRatio * 0.6;
        // glitch drift: subtle horizontal jitter in last 40% of life
        const glitchX = lifeRatio > 0.6 ? (Math.random() - 0.5) * 6 : 0;
        const glitchY = lifeRatio > 0.75 ? (Math.random() - 0.5) * 3 : 0;
        const color = p.color || "#d9ff62";
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              width: p.size,
              height: p.size,
              opacity: alpha,
              transform: `rotate(${p.rotation}deg) scale(${scale}) translate(${glitchX}px, ${glitchY}px)`,
              color,
              filter: `drop-shadow(0 0 4px ${color}88)`,
              willChange: "transform, opacity",
            }}
          >
            <Symbol style={{ width: "100%", height: "100%" }} color={color} />
          </div>
        );
      })}
    </div>
  );
}

function StatCard({icon:Icon, label, value, sub}) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={17}/></div><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div>{sub&&<div className="stat-sub">{sub}</div>}</div></div>
}

function Section({id, eyebrow, title, children}) {
  return <section id={id} className="section"><div className="section-head"><span>{eyebrow}</span><h2>{title}</h2></div>{children}</section>
}

function recentActivity(calendar = {}) {
  const today = new Date();
  return Array.from({length: 91}, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (90 - index));
    const key = Math.floor(date.setHours(0, 0, 0, 0) / 1000);
    return calendar[key] || 0;
  });
}

function App(){
  const [active, setActive] = useState("home");
  const [expanded, setExpanded] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cf, setCf] = useState({
    rating: 1200,
    rank: "newbie",
    maxRating: 1200,
    maxRank: "newbie"
  });
  const [gh, setGh] = useState({
    public_repos: 35,
    followers: 12,
    following: 15
  });
  const [lc, setLc] = useState({
    totalSolved: 58,
    easySolved: 43,
    mediumSolved: 13,
    hardSolved: 2,
    ranking: 2434622,
    badges: [{ displayName: "LeetCode Badge", icon: null }],
    contest: null,
  });
  const [syncedAt, setSyncedAt] = useState(null);
  const [lcCalendar, setLcCalendar] = useState({});
  const [cfContests, setCfContests] = useState([]);
  const [cfCalendar, setCfCalendar] = useState({});
  const [cfSolved, setCfSolved] = useState(8);

  useEffect(()=>{
    const obs = new IntersectionObserver(es=>{
      const visible = es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible) setActive(visible.target.id);
    }, {rootMargin:"-30% 0px -55% 0px", threshold:[.05,.2,.5]});
    document.querySelectorAll("section[id]").forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    const cards = document.querySelectorAll(".project");
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
    }), {threshold:.16});
    cards.forEach(card=>observer.observe(card));
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    // Fetch cached live-data.json with fallback paths
    const fetchLiveData = async () => {
      try {
        let r = await fetch("./live-data.json");
        if (!r.ok) r = await fetch(`${import.meta.env.BASE_URL}live-data.json`);
        if (r.ok) {
          const data = await r.json();
          if (data.codeforces) setCf(data.codeforces);
          if (data.github) setGh(data.github);
          if (data.leetcode && data.leetcode.totalSolved) setLc(data.leetcode);
          if (data.updatedAt) setSyncedAt(data.updatedAt);
        }
      } catch (_) {}
    };
    fetchLiveData();


    fetch("https://codeforces.com/api/user.info?handles=AnikaJerin")
      .then(r=>r.ok?r.json():null).then(x=>x?.result?.[0]&&setCf(x.result[0])).catch(()=>{});
    fetch("https://codeforces.com/api/user.rating?handle=AnikaJerin")
      .then(r=>r.ok?r.json():null).then(x=>Array.isArray(x?.result)&&setCfContests(x.result)).catch(()=>{});
    fetch("https://codeforces.com/api/user.status?handle=AnikaJerin&from=1&count=10000")
      .then(r=>r.ok?r.json():null).then(x=>{
        if (!Array.isArray(x?.result)) return;
        const calendar = x.result.reduce((all, submission)=>{
          const day = Math.floor(submission.creationTimeSeconds / 86400) * 86400;
          all[day] = (all[day] || 0) + 1;
          return all;
        }, {});
        setCfCalendar(calendar);
        // Count unique accepted problems
        const accepted = new Set(
          x.result
            .filter(s => s.verdict === "OK")
            .map(s => `${s.problem.contestId}-${s.problem.index}`)
        );
        setCfSolved(accepted.size || 8);
      }).catch(()=>{});
    
    // Real-time LeetCode fetch via fast CORS proxy
    const lcUser = "AnikaJerin";
    const tryLCApis = async () => {
      // API 1: Vercel Proxy (Fast, returns totalSolved, easy/med/hard, ranking, calendar)
      try {
        const r = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${lcUser}`);
        if (r.ok) {
          const d = await r.json();
          if (d && (d.totalSolved !== undefined || d.easySolved !== undefined)) {
            setLc(prev => ({
              totalSolved: d.totalSolved ?? prev.totalSolved ?? 58,
              easySolved: d.easySolved ?? prev.easySolved ?? 43,
              mediumSolved: d.mediumSolved ?? prev.mediumSolved ?? 13,
              hardSolved: d.hardSolved ?? prev.hardSolved ?? 2,
              ranking: d.ranking ?? prev.ranking ?? 2434622,
              badges: (d.badges && d.badges.length) ? d.badges : (prev.badges && prev.badges.length ? prev.badges : [{ displayName: "LeetCode Badge", icon: null }]),
              contest: prev.contest,
            }));
            if (d.submissionCalendar) {
              setLcCalendar(typeof d.submissionCalendar === "string"
                ? JSON.parse(d.submissionCalendar)
                : d.submissionCalendar);
            }
            return;
          }
        }
      } catch (_) {}

      // API 2: alfa-leetcode-api (Fallback)
      try {
        const r = await fetch(`https://alfa-leetcode-api.onrender.com/${lcUser}/solved`);
        if (r.ok) {
          const d = await r.json();
          if (d?.solvedProblem !== undefined) {
            setLc(prev => ({
              ...prev,
              totalSolved: d.solvedProblem || 58,
              easySolved: d.easySolved || 43,
              mediumSolved: d.mediumSolved || 13,
              hardSolved: d.hardSolved || 2,
            }));
          }
        }
      } catch (_) {}
    };
    tryLCApis();

    fetch("https://api.github.com/users/AnikaJerin")
      .then(r=>r.ok?r.json():null).then(x=>x&&setGh(x)).catch(()=>{});
  },[]);

  const nav = ["home","work","projects","research","problem-solving","github","skills","about"];
  const activity = recentActivity(lcCalendar);
  const cfActivity = recentActivity(cfCalendar);
  const maxActivity = Math.max(...activity, 1);
  const maxCfActivity = Math.max(...cfActivity, 1);
  const solved = lc?.totalSolved || 0;
  const ring = {background:`conic-gradient(#d9ff62 0deg ${Math.min(300, solved * 5)}deg, #2c3324 ${Math.min(300, solved * 5)}deg 360deg)`};
  const achievements = [
    ...(lc?.badges || []).map(b=>({kind:"LC BADGE", title:b.displayName, icon:b.icon})),
    ...(cf?.maxRating ? [{kind:"CODEFORCES", title:`Peak ${cf.maxRating} · ${cf.maxRank || "rank"}`}]:[]),
    ...(cfContests.length ? [{kind:"CONTESTS", title:`${cfContests.length} rated contest${cfContests.length === 1 ? "" : "s"}`}]:[]),
    ...(lc?.contest?.attendedContestsCount ? [{kind:"LEETCODE", title:`${lc.contest.attendedContestsCount} contest${lc.contest.attendedContestsCount === 1 ? "" : "s"} attended`}]:[])
  ];
  return <div>
    <IconRain />
    <CursorGlitch />
    <div className="grain"/>
    <header className="nav">
      <a href="#home" className="brand">AJ<span>.</span></a>
      <nav>{nav.map(x=><a key={x} className={active===x?"active":""} href={"#"+x} onClick={()=>setMenuOpen(false)}>{x.replace("-", " ")}</a>)}</nav>
      <a className="contact-pill" href={`mailto:${PROFILE.email}`}>Let's talk <ArrowUpRight size={14}/></a>
      <button className="hamburger" aria-label="Menu" onClick={()=>setMenuOpen(o=>!o)}>
        <span/><span/><span/>
      </button>
    </header>
    {menuOpen && <div className="mobile-nav" onClick={()=>setMenuOpen(false)}>
      {nav.map(x=><a key={x} href={"#"+x} className={active===x?"active":""}>{x.replace("-", " ")}</a>)}
      <a href={`mailto:${PROFILE.email}`} className="mobile-nav-cta">Let's talk</a>
    </div>}

    <main>
      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> SOFTWARE ENGINEER · AI ENGINEER · RESEARCHER</div>
          <HeroHeading />
          <p className="hero-text">I'm {PROFILE.name}, a software engineer with 5+ years shipping AI-driven systems - from computer vision and data platforms to research-grade machine learning.</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore my work <ArrowDown size={16}/></a>
            <a className="button ghost" href={PROFILE.github} target="_blank">GitHub <ArrowUpRight size={16}/></a>
            <a className="button ghost" href={`${import.meta.env.BASE_URL}Anika-Jerin-Resume.pdf`} target="_blank" rel="noreferrer">Resume <ArrowDown size={16}/></a>
          </div>
          <div className="hero-mini">
            <span>PYTHON</span><i/> <span>PYTORCH</span><i/> <span>COMPUTER VISION</span><i/> <span>ALGORITHMS</span>
          </div>
        </div>

        <div className="orb-wrap colorful-orbit">
          <div className="orb">
            <div className="orb-core"><BrainCircuit size={42}/><b>AI</b><small>ENGINEERING</small></div>
            <div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>
            <div className="orbit-skills" aria-label="Technical focus areas">
              <div className="skill-orbit so-cv"><span className="orbit-satellite"><Eye/><b>CV</b></span></div>
              <div className="skill-orbit so-ml"><span className="orbit-satellite"><BrainCircuit/><b>ML</b></span></div>
              <div className="skill-orbit so-swe"><span className="orbit-satellite"><Code2/><b>SWE</b></span></div>
              <div className="skill-orbit so-ai"><span className="orbit-satellite"><Cpu/><b>AI</b></span></div>
              <div className="skill-orbit so-dsa"><span className="orbit-satellite"><Terminal/><b>DSA</b></span></div>
              <div className="skill-orbit so-hci"><span className="orbit-satellite"><MousePointer2/><b>HCI</b></span></div>
              <div className="skill-orbit so-geo"><span className="orbit-satellite"><MapPin/><b>GEO</b></span></div>
            </div>
          </div>
          <div className="orb-caption">RESEARCH × ENGINEERING × PROBLEM SOLVING</div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          <div className="ticker-group">
            <span>SOFTWARE ENGINEERING <b>✦</b></span>
            <span>AI & MACHINE LEARNING <b>✦</b></span>
            <span>COMPUTER VISION PIPELINES <b>✦</b></span>
            <span>METEOROLOGICAL DATA PLATFORMS <b>✦</b></span>
            <span>MULTIMODAL DEEP LEARNING <b>✦</b></span>
            <span>RESTFUL BACKEND APIS <b>✦</b></span>
            <span>ALGORITHMIC PROBLEM SOLVING <b>✦</b></span>
          </div>
          <div className="ticker-group" aria-hidden="true">
            <span>SOFTWARE ENGINEERING <b>✦</b></span>
            <span>AI & MACHINE LEARNING <b>✦</b></span>
            <span>COMPUTER VISION PIPELINES <b>✦</b></span>
            <span>METEOROLOGICAL DATA PLATFORMS <b>✦</b></span>
            <span>MULTIMODAL DEEP LEARNING <b>✦</b></span>
            <span>RESTFUL BACKEND APIS <b>✦</b></span>
            <span>ALGORITHMIC PROBLEM SOLVING <b>✦</b></span>
          </div>
        </div>
      </div>

      <section className="stats">
        <StatCard icon={Code2} label="Engineering" value="5+ years" sub="Production software & AI"/>
        <StatCard icon={BrainCircuit} label="Focus" value="AI + SWE" sub="Production & research"/>
        <StatCard icon={Github} label="GitHub" value={gh?.public_repos ?? "35+"} sub="Public repositories"/>
        <StatCard icon={Trophy} label="Problem Solving" value={cf?.rating ?? lc?.totalSolved ?? "Live"} sub={cf?.rating ? "Codeforces rating" : "LeetCode + Codeforces"}/>
      </section>

      <Section id="work" eyebrow="01 — EXPERIENCE" title={<><ZebraWord text="Production engineering" />, not just prototypes.</>}>
        <div className="experience-grid">{experience.map((e,i)=><article className="exp" key={i}><div className="exp-period">{e.period}</div><div><h3>{e.role}</h3><h4>{e.company}</h4><ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul></div></article>)}</div>
      </Section>

      <Section id="projects" eyebrow="02 — SELECTED PROJECTS" title={<>Work I want engineers to <ZebraWord text="ask" /> me about.</>}>
        <div className="project-grid">{projects.map((p,i)=><article className="project" key={p.title} onClick={()=>setExpanded(expanded===i?null:i)}>
          <div className="project-top"><span className="number">0{i+1}</span><ArrowUpRight size={18}/></div>
          <div className="project-type">{p.type}</div><h3>{p.title}</h3><p>{p.desc}</p>
          <div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
          {expanded===i&&<a className="project-link" href={p.link} target="_blank" onClick={e=>e.stopPropagation()}>Open repository <ExternalLink size={14}/></a>}
        </article>)}</div>
      </Section>

      <Section id="research" eyebrow="03 — RESEARCH" title={<>Where <ZebraWord text="experimentation" /> becomes <ZebraWord text="understanding." /></>}>
        <div className="research-list">
          <div><span>01</span><h3>Cross-Modal Deep Learning for Alzheimer's Disease</h3><p>MRI imaging + clinical/tabular features → multimodal representation → classification.</p></div>
          <div><span>02</span><h3>Quantum-Enhanced Graph Learning for Molecular Design</h3><p>GNN molecular representations + variational quantum head for bandgap and toxicity prediction.</p></div>
          <div><span>03</span><h3>Cross-Modal Explanations of Alzheimer's Disease Progression</h3><p>Exploring interpretability across multimodal biomedical information.</p></div>
        </div>
      </Section>

      <Section id="problem-solving" eyebrow="04 — PROBLEM SOLVING" title={<>I train the same muscle I use to <ZebraWord text="build systems." /></>}>
        <div className="cp-compact">
          <article className="account-card leetcode-card"><div className="account-top"><span><CircleCheckBig size={16}/> LEETCODE</span><a href={PROFILE.leetcode} target="_blank" rel="noreferrer"><ArrowUpRight size={17}/></a></div><div className="account-stats"><div className="account-main"><strong>{solved || "—"}</strong><small>PROBLEMS SOLVED</small></div><div className="mini-splits"><span>E <b>{lc?.easySolved ?? "—"}</b></span><span>M <b>{lc?.mediumSolved ?? "—"}</b></span><span>H <b>{lc?.hardSolved ?? "—"}</b></span></div></div><div className="mini-graph leet-graph">{activity.slice(-49).map((count,i)=><i key={i} style={{height:`${Math.max(10, (count / maxActivity) * 100)}%`}} title={`${count} LeetCode submission${count === 1 ? "" : "s"}`}/>)}</div><div className="account-foot"><span>Rank {lc?.ranking?.toLocaleString?.() ?? "—"}</span><span>{lc?.badges?.length ?? 0} badges</span></div></article>
          <article className="account-card codeforces-card"><div className="account-top"><span><BarChart3 size={16}/> CODEFORCES</span><a href={PROFILE.codeforces} target="_blank" rel="noreferrer"><ArrowUpRight size={17}/></a></div><div className="account-stats"><div className="account-main"><strong>{cfSolved ?? 8}</strong><small>PROBLEMS SOLVED</small></div><div className="mini-splits"><span>RATING <b>{cf?.rating ?? "—"}</b></span><span>CONTESTS <b>{cfContests.length || "—"}</b></span></div></div><div className="mini-graph cf-graph">{cfActivity.slice(-49).map((count,i)=><i key={i} style={{height:`${Math.max(10, (count / maxCfActivity) * 100)}%`}} title={`${count} Codeforces submission${count === 1 ? "" : "s"}`}/>)}</div><div className="account-foot"><span>{cf?.rank || "newbie"}</span><span>peak {cf?.maxRank || "—"}</span></div></article>
        </div>
        <div className="achievements-strip"><div className="strip-title"><Medal size={16}/><span>LIVE ACHIEVEMENTS</span></div><div className="achievements-scroll">{achievements.length ? achievements.map((item,i)=><div className="achievement-pill" key={`${item.title}-${i}`}>{item.icon ? <img src={item.icon} alt=""/> : <Trophy size={15}/>}<span>{item.kind}</span><b>{item.title}</b></div>) : <p className="empty-state">New badges and contest milestones appear here automatically.</p>}</div></div>
        <div className="solve-focus"><span><Terminal size={16}/> DSA</span><span>Arrays</span><span>Binary Search</span><span>Graphs</span><span>DP</span><span>Trees</span><span>Greedy</span><span>Math</span><span>Recursion</span></div>
      </Section>

      <Section id="github" eyebrow="05 — OPEN SOURCE" title={<><ZebraWord text="A living engineering archive." /></>}>
        <div className="github-panel"><div><Github size={38}/><h3>GitHub / AnikaJerin</h3><p>AI experiments, research implementations, libraries, full-stack systems, algorithms and ongoing learning.</p><a className="text-link" href={PROFILE.github} target="_blank">Explore repositories <ArrowUpRight size={15}/></a></div><div className="gh-numbers"><strong>{gh?.public_repos ?? "35+"}</strong><span>public repos</span><strong>{gh?.followers ?? "—"}</strong><span>followers</span></div></div>
      </Section>

      <section id="skills" className="section skills-section-wrap">
        <div className="section-head">
          <span>06 — TECH STACK</span>
          <h2 className="skills-main-title">My <span className="skills-gradient-title">Skills</span></h2>
        </div>
        <SkillGlobe />
        <div className="skills skills-text-breakdown">
          {skills.map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}
        </div>
      </section>

      <Section id="credentials" eyebrow="07 — EDUCATION & RECOGNITION" title={<>Grounded in <ZebraWord text="delivery," /> driven by <ZebraWord text="learning." /></>}>
        <div className="credentials-grid">
          <article><GraduationCap size={21}/><span>EDUCATION</span><h3>B.Sc. in Information Technology</h3><p>Jahangirnagar University · CGPA 3.48 / 4.00</p></article>
          <article><Award size={21}/><span>RECOGNITION</span><h3>Best Impact Award</h3><p>Co-authored “COVID-Hero,” a machine-learning based awareness mobile game for children.</p></article>
          <article><MapPin size={21}/><span>GLOBAL CAREER</span><h3>Open to global SWE & AI roles</h3><p>Focused on meaningful engineering work across applied AI, backend systems, and research.</p></article>
        </div>
      </Section>

      <Section id="about" eyebrow="08 — ABOUT" title="A hybrid profile by design.">
        <div className="about-grid"><p className="about-lead">My work sits at the intersection of <em><ZebraWord text="software engineering, AI/ML, research, and algorithmic problem solving." isYellow={true} /></em></p><div className="about-copy"><p>I enjoy taking a problem from data and model experimentation through backend services, integration, visualization, and a usable product.</p><p>My professional work includes government and enterprise systems, computer vision, meteorological data platforms, ERP integration, ML experimentation, and REST APIs.</p><div className="about-links"><a href={PROFILE.linkedin} target="_blank"><Linkedin/> LinkedIn</a><a href={PROFILE.medium} target="_blank"><BookOpen/> Medium</a><a href={`mailto:${PROFILE.email}`}><Mail/> Email</a></div></div></div>
      </Section>

      <section className="cta"><Sparkles size={24}/><h2>Let's build something<br/><em><ZebraWord text="worth remembering." isYellow={true} /></em></h2><a className="button primary" href={`mailto:${PROFILE.email}`}>Get in touch <ArrowUpRight size={16}/></a></section>
    </main>
    <footer><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>BUILT WITH REACT · HOSTED ON GITHUB</span><a href="#home"><ArrowUp size={15}/></a></footer>
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);
