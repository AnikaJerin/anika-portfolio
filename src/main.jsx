import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BrainCircuit, Code2, Github, Linkedin,
  Mail, ExternalLink, Trophy, Terminal, Sparkles, Flame, Medal, BarChart3,
  BookOpen, Award, MapPin, GraduationCap, CalendarDays, CircleCheckBig
} from "lucide-react";
import "./styles.css";

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
  const [cf, setCf] = useState(null);
  const [gh, setGh] = useState(null);
  const [lc, setLc] = useState(null);
  const [syncedAt, setSyncedAt] = useState(null);
  const [lcCalendar, setLcCalendar] = useState({});
  const [cfContests, setCfContests] = useState([]);
  const [cfCalendar, setCfCalendar] = useState({});

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
    // GitHub Actions refreshes this cache daily. Direct calls below keep local previews live.
    fetch(`${import.meta.env.BASE_URL}live-data.json`)
      .then(r=>r.ok?r.json():Promise.reject())
      .then(data=>{ setCf(data.codeforces); setGh(data.github); setLc(data.leetcode); setSyncedAt(data.updatedAt); })
      .catch(()=>{});
    fetch("https://codeforces.com/api/user.info?handles=AnikaJerin")
      .then(r=>r.ok?r.json():null).then(x=>x?.result?.[0]&&setCf(x.result[0])).catch(()=>{});
    fetch("https://codeforces.com/api/user.rating?handle=AnikaJerin")
      .then(r=>r.ok?r.json():null).then(x=>Array.isArray(x?.result)&&setCfContests(x.result)).catch(()=>{});
    fetch("https://codeforces.com/api/user.status?handle=AnikaJerin&from=1&count=1000")
      .then(r=>r.ok?r.json():null).then(x=>{
        if (!Array.isArray(x?.result)) return;
        const calendar = x.result.reduce((all, submission)=>{
          const day = Math.floor(submission.creationTimeSeconds / 86400) * 86400;
          all[day] = (all[day] || 0) + 1;
          return all;
        }, {});
        setCfCalendar(calendar);
      }).catch(()=>{});
    fetch("https://leetcode.com/graphql/", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({query:"query portfolio($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } profile { ranking } badges { id displayName icon } } userProfileCalendar(username: $username) { submissionCalendar totalActiveDays streak } userContestRanking(username: $username) { attendedContestsCount rating globalRanking topPercentage badge { name } }}", variables:{username:"AnikaJerin"}})})
      .then(r=>r.ok?r.json():null).then(data=>{
        const matched = data?.data?.matchedUser;
        if (matched) {
          const stats = Object.fromEntries((matched.submitStatsGlobal?.acSubmissionNum || []).map(x=>[x.difficulty, x.count]));
          setLc({totalSolved:stats.All || 0, easySolved:stats.Easy || 0, mediumSolved:stats.Medium || 0, hardSolved:stats.Hard || 0, ranking:matched.profile?.ranking, badges:matched.badges || [], contest:data.data.userContestRanking});
        }
        const raw = data?.data?.userProfileCalendar?.submissionCalendar;
        if (raw) setLcCalendar(JSON.parse(raw));
      }).catch(()=>{});
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
    <div className="grain"/>
    <header className="nav">
      <a href="#home" className="brand">AJ<span>.</span></a>
      <nav>{nav.map(x=><a key={x} className={active===x?"active":""} href={"#"+x}>{x.replace("-", " ")}</a>)}</nav>
      <a className="contact-pill" href={`mailto:${PROFILE.email}`}>Let's talk <ArrowUpRight size={14}/></a>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> SOFTWARE ENGINEER · AI ENGINEER · RESEARCHER</div>
          <h1>Building software<br/>that <em>thinks.</em></h1>
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
            <div className="orbit o1"><span>ML</span></div><div className="orbit o2"><span>DSA</span></div><div className="orbit o3"><span>CV</span></div>
          </div>
          <div className="orb-caption">RESEARCH × ENGINEERING × PROBLEM SOLVING</div>
        </div>
      </section>

      <div className="ticker"><div>AI SYSTEMS <b>✦</b> SOFTWARE ENGINEERING <b>✦</b> MACHINE LEARNING <b>✦</b> COMPUTER VISION <b>✦</b> ALGORITHMS <b>✦</b> RESEARCH <b>✦</b> AI SYSTEMS <b>✦</b></div></div>

      <section className="stats">
        <StatCard icon={Code2} label="Engineering" value="5+ years" sub="Production software & AI"/>
        <StatCard icon={BrainCircuit} label="Focus" value="AI + SWE" sub="Production & research"/>
        <StatCard icon={Github} label="GitHub" value={gh?.public_repos ?? "35+"} sub="Public repositories"/>
        <StatCard icon={Trophy} label="Problem Solving" value={cf?.rating ?? lc?.totalSolved ?? "Live"} sub={cf?.rating ? "Codeforces rating" : "LeetCode + Codeforces"}/>
      </section>

      <Section id="work" eyebrow="01 — EXPERIENCE" title="Production engineering, not just prototypes.">
        <div className="experience-grid">{experience.map((e,i)=><article className="exp" key={i}><div className="exp-period">{e.period}</div><div><h3>{e.role}</h3><h4>{e.company}</h4><ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul></div></article>)}</div>
      </Section>

      <Section id="projects" eyebrow="02 — SELECTED PROJECTS" title="Work I want engineers to ask me about.">
        <div className="project-grid">{projects.map((p,i)=><article className="project" key={p.title} onClick={()=>setExpanded(expanded===i?null:i)}>
          <div className="project-top"><span className="number">0{i+1}</span><ArrowUpRight size={18}/></div>
          <div className="project-type">{p.type}</div><h3>{p.title}</h3><p>{p.desc}</p>
          <div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
          {expanded===i&&<a className="project-link" href={p.link} target="_blank" onClick={e=>e.stopPropagation()}>Open repository <ExternalLink size={14}/></a>}
        </article>)}</div>
      </Section>

      <Section id="research" eyebrow="03 — RESEARCH" title="Where experimentation becomes understanding.">
        <div className="research-list">
          <div><span>01</span><h3>Cross-Modal Deep Learning for Alzheimer's Disease</h3><p>MRI imaging + clinical/tabular features → multimodal representation → classification.</p></div>
          <div><span>02</span><h3>Quantum-Enhanced Graph Learning for Molecular Design</h3><p>GNN molecular representations + variational quantum head for bandgap and toxicity prediction.</p></div>
          <div><span>03</span><h3>Cross-Modal Explanations of Alzheimer's Disease Progression</h3><p>Exploring interpretability across multimodal biomedical information.</p></div>
        </div>
      </Section>

      <Section id="problem-solving" eyebrow="04 — PROBLEM SOLVING" title="I train the same muscle I use to build systems.">
        <div className="cp-compact">
          <article className="account-card leetcode-card"><div className="account-top"><span><CircleCheckBig size={16}/> LEETCODE</span><a href={PROFILE.leetcode} target="_blank" rel="noreferrer"><ArrowUpRight size={17}/></a></div><div className="account-stats"><div className="account-main"><strong>{solved || "—"}</strong><small>PROBLEMS SOLVED</small></div><div className="mini-splits"><span>E <b>{lc?.easySolved ?? "—"}</b></span><span>M <b>{lc?.mediumSolved ?? "—"}</b></span><span>H <b>{lc?.hardSolved ?? "—"}</b></span></div></div><div className="mini-graph leet-graph">{activity.slice(-49).map((count,i)=><i key={i} style={{height:`${Math.max(10, (count / maxActivity) * 100)}%`}} title={`${count} LeetCode submission${count === 1 ? "" : "s"}`}/>)}</div><div className="account-foot"><span>Rank {lc?.ranking?.toLocaleString?.() ?? "—"}</span><span>{lc?.badges?.length ?? 0} badges</span></div></article>
          <article className="account-card codeforces-card"><div className="account-top"><span><BarChart3 size={16}/> CODEFORCES</span><a href={PROFILE.codeforces} target="_blank" rel="noreferrer"><ArrowUpRight size={17}/></a></div><div className="account-stats"><div className="account-main"><strong>{cf?.rating ?? "—"}</strong><small>CURRENT RATING</small></div><div className="mini-splits"><span>MAX <b>{cf?.maxRating ?? "—"}</b></span><span>CONTESTS <b>{cfContests.length || "—"}</b></span></div></div><div className="mini-graph cf-graph">{cfActivity.slice(-49).map((count,i)=><i key={i} style={{height:`${Math.max(10, (count / maxCfActivity) * 100)}%`}} title={`${count} Codeforces submission${count === 1 ? "" : "s"}`}/>)}</div><div className="account-foot"><span>{cf?.rank || "rank updating"}</span><span>peak {cf?.maxRank || "—"}</span></div></article>
        </div>
        <div className="achievements-strip"><div className="strip-title"><Medal size={16}/><span>LIVE ACHIEVEMENTS</span></div><div className="achievements-scroll">{achievements.length ? achievements.map((item,i)=><div className="achievement-pill" key={`${item.title}-${i}`}>{item.icon ? <img src={item.icon} alt=""/> : <Trophy size={15}/>}<span>{item.kind}</span><b>{item.title}</b></div>) : <p className="empty-state">New badges and contest milestones appear here automatically.</p>}</div></div>
        <div className="solve-focus"><span><Terminal size={16}/> DSA</span><span>Arrays</span><span>Binary Search</span><span>Graphs</span><span>DP</span><span>Trees</span><span>Greedy</span><span>Math</span><span>Recursion</span></div>
      </Section>

      <Section id="github" eyebrow="05 — OPEN SOURCE" title="A living engineering archive.">
        <div className="github-panel"><div><Github size={38}/><h3>GitHub / AnikaJerin</h3><p>AI experiments, research implementations, libraries, full-stack systems, algorithms and ongoing learning.</p><a className="text-link" href={PROFILE.github} target="_blank">Explore repositories <ArrowUpRight size={15}/></a></div><div className="gh-numbers"><strong>{gh?.public_repos ?? "35+"}</strong><span>public repos</span><strong>{gh?.followers ?? "—"}</strong><span>followers</span></div></div>
      </Section>

      <Section id="skills" eyebrow="06 — TECHNICAL ARSENAL" title="Tools I use to turn ideas into systems.">
        <div className="skills">{skills.map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}</div>
      </Section>

      <Section id="credentials" eyebrow="07 — EDUCATION & RECOGNITION" title="Grounded in delivery, driven by learning.">
        <div className="credentials-grid">
          <article><GraduationCap size={21}/><span>EDUCATION</span><h3>B.Sc. in Information Technology</h3><p>Jahangirnagar University · CGPA 3.48 / 4.00</p></article>
          <article><Award size={21}/><span>RECOGNITION</span><h3>Best Impact Award</h3><p>Co-authored “COVID-Hero,” a machine-learning based awareness mobile game for children.</p></article>
          <article><MapPin size={21}/><span>GLOBAL CAREER</span><h3>Open to global SWE & AI roles</h3><p>Focused on meaningful engineering work across applied AI, backend systems, and research.</p></article>
        </div>
      </Section>

      <Section id="about" eyebrow="08 — ABOUT" title="A hybrid profile by design.">
        <div className="about-grid"><p className="about-lead">My work sits at the intersection of <em>software engineering, AI/ML, research, and algorithmic problem solving.</em></p><div className="about-copy"><p>I enjoy taking a problem from data and model experimentation through backend services, integration, visualization, and a usable product.</p><p>My professional work includes government and enterprise systems, computer vision, meteorological data platforms, ERP integration, ML experimentation, and REST APIs.</p><div className="about-links"><a href={PROFILE.linkedin} target="_blank"><Linkedin/> LinkedIn</a><a href={PROFILE.medium} target="_blank"><BookOpen/> Medium</a><a href={`mailto:${PROFILE.email}`}><Mail/> Email</a></div></div></div>
      </Section>

      <section className="cta"><Sparkles size={24}/><h2>Let's build something<br/><em>worth remembering.</em></h2><a className="button primary" href={`mailto:${PROFILE.email}`}>Get in touch <ArrowUpRight size={16}/></a></section>
    </main>
    <footer><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>BUILT WITH REACT · HOSTED ON GITHUB</span><a href="#home"><ArrowUp size={15}/></a></footer>
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);
