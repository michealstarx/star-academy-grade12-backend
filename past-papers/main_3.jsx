import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import StudentAuth from "./pages/StudentAuth";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  X,
  Play,
  LockKeyhole,
  Smartphone,
  FlaskConical,
  Calculator,
  Atom,
  Globe2,
  Landmark,
  Languages,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  MessageCircle,
  CircleHelp,
} from "lucide-react";
import "./styles.css";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const subjects = [
  {
    name: "Mathematics",
    category: "Core",
    icon: Calculator,
    color: "blue",
    topics: 18,
    desc: "Master methods, sharpen problem-solving and practise exam-style questions.",
    topicsList: [
      "Algebra & equations",
      "Functions and graphs",
      "Trigonometry",
      "Statistics & probability",
      "Calculus foundations",
    ],
  },
  {
    name: "Biology",
    category: "Science",
    icon: FlaskConical,
    color: "green",
    topics: 16,
    desc: "Understand life processes with clear notes, diagrams and exam practice.",
    topicsList: [
      "Cell biology",
      "Genetics & inheritance",
      "Human physiology",
      "Ecology",
      "Evolution",
    ],
  },
  {
    name: "Chemistry",
    category: "Science",
    icon: Sparkles,
    color: "purple",
    topics: 15,
    desc: "Build confidence with reactions, calculations and worked examples.",
    topicsList: [
      "Atomic structure",
      "Chemical bonding",
      "Acids, bases & salts",
      "Organic chemistry",
      "Rates and equilibrium",
    ],
  },
  {
    name: "Physics",
    category: "Science",
    icon: Atom,
    color: "orange",
    topics: 14,
    desc: "Turn difficult concepts into manageable steps and repeatable methods.",
    topicsList: [
      "Mechanics",
      "Waves & sound",
      "Electricity",
      "Heat & energy",
      "Modern physics",
    ],
  },
  {
    name: "English Language",
    category: "Languages",
    icon: Languages,
    color: "pink",
    topics: 12,
    desc: "Improve comprehension, grammar, composition and exam technique.",
    topicsList: [
      "Comprehension",
      "Summary writing",
      "Grammar",
      "Composition",
      "Functional writing",
    ],
  },
  {
    name: "Geography",
    category: "Humanities",
    icon: Globe2,
    color: "teal",
    topics: 13,
    desc: "Connect physical and human geography with structured revision.",
    topicsList: [
      "Geomorphology",
      "Climate",
      "Population",
      "Economic activities",
      "Map work",
    ],
  },
  {
    name: "History",
    category: "Humanities",
    icon: Landmark,
    color: "gold",
    topics: 11,
    desc: "Organise events, causes and consequences into strong exam answers.",
    topicsList: [
      "African history",
      "Colonialism",
      "Nationalism",
      "Independence",
      "Global events",
    ],
  },
  {
    name: "Civic Education",
    category: "Humanities",
    icon: GraduationCap,
    color: "blue",
    topics: 10,
    desc: "Revise citizenship, governance, rights and responsibilities.",
    topicsList: [
      "Governance",
      "Human rights",
      "Democracy",
      "Citizenship",
      "Constitution",
    ],
  },
  {
    name: "Commerce",
    category: "Business",
    icon: BriefcaseBusiness,
    color: "green",
    topics: 12,
    desc: "Learn the principles of trade, business operations and markets.",
    topicsList: [
      "Trade",
      "Business ownership",
      "Marketing",
      "Banking",
      "Insurance",
    ],
  },
  {
    name: "Principles of Accounts",
    category: "Business",
    icon: ChartNoAxesCombined,
    color: "purple",
    topics: 13,
    desc: "Practise accounting concepts, calculations and financial statements.",
    topicsList: [
      "Double entry",
      "Trial balance",
      "Final accounts",
      "Cash books",
      "Depreciation",
    ],
  },
];
const testimonials = [
  {
    name: "Grade 12 learner",
    school: "Student feedback example",
    quote:
      "The topic-by-topic approach makes revision feel much more manageable. I always know what to study next.",
    stars: 5,
  },
  {
    name: "Exam candidate",
    school: "Student feedback example",
    quote:
      "Practising questions and checking explanations helps me spot the topics I need to revisit.",
    stars: 5,
  },
  {
    name: "Independent learner",
    school: "Student feedback example",
    quote:
      "I like having revision notes and practice in one place instead of searching everywhere.",
    stars: 5,
  },
];
const sampleQuestions = [
  {
    q: "Solve: 2x + 7 = 19. What is x?",
    options: ["4", "5", "6", "13"],
    correct: 2,
    why: "Subtract 7 from both sides: 2x = 12. Divide by 2, so x = 6.",
  },
  {
    q: "Which organelle is primarily responsible for aerobic respiration?",
    options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"],
    correct: 1,
    why: "Mitochondria are the main site of aerobic respiration and ATP production in eukaryotic cells.",
  },
  {
    q: "What is the pH of a neutral solution at 25°C?",
    options: ["0", "5", "7", "14"],
    correct: 2,
    why: "At 25°C, a neutral aqueous solution has pH 7.",
  },
];
function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState("home"),
    [activeSubject, setActiveSubject] = useState(subjects[0]),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [mobileNav, setMobileNav] = useState(false),
    [showCheckout, setShowCheckout] = useState(false),
    [paySubject, setPaySubject] = useState(subjects[0]),
    [operator, setOperator] = useState("mtn"),
    [phone, setPhone] = useState(""),
    [payState, setPayState] = useState("idle"),
    [reference, setReference] = useState(""),
    [reviewName, setReviewName] = useState(""),
    [reviewText, setReviewText] = useState(""),
    [reviewRating, setReviewRating] = useState(5),
    [reviewSent, setReviewSent] = useState(false),
    [questionIndex, setQuestionIndex] = useState(0),
    [answers, setAnswers] = useState({}),
    [quizDone, setQuizDone] = useState(false),
    [notice, setNotice] = useState("");

  const go = (p) => {
    setPage(p);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openSubject = (s) => {
    setActiveSubject(s);
    setPage("subject");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filtered = useMemo(
    () =>
      subjects.filter(
        (s) =>
          (category === "All" || s.category === category) &&
          s.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );
  const startCheckout = (s) => {
    setPaySubject(s);
    setPayState("idle");
    setPhone("");
    setShowCheckout(true);
  };
  async function initiatePayment(e) {
    e.preventDefault();
    setPayState("loading");
    try {
      const res = await fetch(`${API}/payments/initiate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_name: paySubject.name,
          phone,
          operator,
          country: "zm",
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.detail ||
            data.error ||
            "Could not start payment. Check the backend setup.",
        );
      setReference(data.reference);
      setPayState("pending");
      setNotice(data.message || "Approve the payment request on your phone.");
    } catch (err) {
      setPayState("error");
      setNotice(err.message || "Unable to reach the payment service.");
    }
  }
  async function verifyPayment() {
    setPayState("checking");
    try {
      const res = await fetch(`${API}/payments/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Could not verify payment.");
      setPayState(
        data.status === "successful"
          ? "success"
          : data.status === "failed"
            ? "error"
            : "pending",
      );
      setNotice(
        data.status === "successful"
          ? "Payment confirmed. Your subject access is ready."
          : data.status === "failed"
            ? "Payment failed. Please try again."
            : "Payment is still pending. Approve it on your phone and check again.",
      );
    } catch (err) {
      setPayState("error");
      setNotice(err.message);
    }
  }
  async function submitReview(e) {
    e.preventDefault();
    setReviewSent(false);
    try {
      const res = await fetch(`${API}/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: reviewName,
          rating: reviewRating,
          comment: reviewText,
        }),
      });
      if (!res.ok) throw new Error("Review API unavailable");
      setReviewSent(true);
      setReviewName("");
      setReviewText("");
    } catch {
      setReviewSent(true);
      setNotice(
        "Your review is shown as submitted in this demo. Connect the Django API to save it for moderation.",
      );
    }
  }
  const NavLink = ({ to, children }) => (
    <button
      className={`navlink ${page === to ? "active" : ""}`}
      onClick={() => go(to)}
    >
      {children}
    </button>
  );
  const SubjectCard = ({ s }) => {
    const Icon = s.icon;
    return (
      <article
        className="subject-card"
        onClick={() => openSubject(s)}
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && openSubject(s)}
      >
        <div className={`subject-icon ${s.color}`}>
          <Icon size={23} />
        </div>
        <div className="subject-card-top">
          <span className="eyebrow">{s.category}</span>
          <span className="price-pill">
            K50 <small>/ subject</small>
          </span>
        </div>
        <h3>{s.name}</h3>
        <p>{s.desc}</p>
        <div className="card-meta">
          <span>
            <BookOpen size={15} />
            {s.topics} topic guides
          </span>
          <span className="card-arrow">
            <ArrowRight size={18} />
          </span>
        </div>
      </article>
    );
  };
  return (
    <>
    
      <header className="header">
        <div className="nav-wrap">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand-mark star-mark">ST</span>
            <span>
              STar<span className="brand-accent"> Academy</span>
              <small>GRADE 12 · ECZ</small>
            </span>
          </button>
          <nav className={mobileNav ? "nav-links open" : "nav-links"}>
            <NavLink to="home">Home</NavLink>
            <NavLink to="subjects">Subjects</NavLink>
            <NavLink to="reviews">Student reviews</NavLink>
            <button className="navlink" onClick={() => go("how")}>
              How it works
            </button>
          </nav>
          <div className="nav-actions">
            <button className="text-login" onClick={() => navigate("/login")}>
              Log in
            </button>
            <button
              className="btn btn-primary btn-small"
              onClick={() => go("subjects")}
            >
              Start learning <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle navigation"
          >
            {mobileNav ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {page === "home" && (
        <>
          <main>
            <section className="hero">
              <div className="hero-grid">
                <div className="hero-copy">
                  <div className="hero-label">
                    <span className="pulse-dot" /> ZAMBIA ECZ GRADE 12 · YOUR
                    NEXT STEP
                  </div>
                  <h1>
                    Prepare smarter.
                    <br />
                    <span>Walk in confident.</span>
                  </h1>
                  <p className="hero-desc">
                    Your Zambia ECZ Grade 12 revision space: understand key
                    topics, practise exam-style questions and track your
                    progress — one subject at a time.
                  </p>
                  <div className="hero-actions">
                    <button
                      className="btn btn-primary btn-large"
                      onClick={() => go("subjects")}
                    >
                      Explore subjects <ArrowRight size={18} />
                    </button>
                    <button
                      className="btn btn-ghost btn-large"
                      onClick={() => go("how")}
                    >
                      <span className="play-icon">
                        <Play size={14} fill="currentColor" />
                      </span>{" "}
                      See how it works
                    </button>
                  </div>
                  <div className="hero-trust">
                    <div className="avatar-stack">
                      <span>G</span>
                      <span>12</span>
                      <span>★</span>
                    </div>
                    <div>
                      <div className="trust-stars">
                        ★★★★★ <b>Made for focused revision</b>
                      </div>
                      <small>Clear notes · Practice · Progress</small>
                    </div>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="visual-orbit orbit-one" />
                  <div className="visual-orbit orbit-two" />
                  <div className="study-board">
                    <div className="board-top">
                      <span className="window-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="board-label">YOUR STUDY SPACE</span>
                      <span className="board-menu">•••</span>
                    </div>
                    <div className="board-welcome">
                      <div>
                        <span className="eyebrow">YOUR NEXT STEP</span>
                        <h3>
                          Small steps.
                          <br />
                          Big progress.
                        </h3>
                      </div>
                      <div className="board-illustration">
                        <BookOpen size={34} />
                      </div>
                    </div>
                    <div className="progress-panel">
                      <div className="progress-title">
                        <span>Weekly study goal</span>
                        <b>4 of 5 sessions</b>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: "80%" }} />
                      </div>
                      <div className="progress-foot">
                        <span>Keep your momentum going</span>
                        <span>80%</span>
                      </div>
                    </div>
                    <div className="mini-subjects">
                      <div className="mini-subject">
                        <span className="mini-icon math">
                          <Calculator size={16} />
                        </span>
                        <span>
                          <b>Mathematics</b>
                          <small>Topic practice</small>
                        </span>
                        <ArrowRight size={15} />
                      </div>
                      <div className="mini-subject">
                        <span className="mini-icon bio">
                          <FlaskConical size={16} />
                        </span>
                        <span>
                          <b>Biology</b>
                          <small>Revision notes</small>
                        </span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                    <div className="board-footer">
                      <ShieldCheck size={15} /> Learn at your own pace
                    </div>
                  </div>
                  <div className="float-card float-top">
                    <span className="float-icon">
                      <Target size={18} />
                    </span>
                    <span>
                      <b>Focus your revision</b>
                      <small>One topic at a time</small>
                    </span>
                  </div>
                  <div className="float-card float-bottom">
                    <span className="float-icon trophy">
                      <Trophy size={18} />
                    </span>
                    <span>
                      <b>Progress you can see</b>
                      <small>Practice. Review. Improve.</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="hero-bottom">
                <span>
                  <CheckCircle2 size={16} /> Clear, structured revision
                </span>
                <span>
                  <CheckCircle2 size={16} /> Exam-style practice
                </span>
                <span>
                  <CheckCircle2 size={16} /> One subject for K50
                </span>
              </div>
            </section>
            <section className="section subjects-section" id="subjects">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR REVISION STARTS HERE</span>
                  <h2>
                    Choose your subjects.
                    <br />
                    <span>Own your preparation.</span>
                  </h2>
                </div>
                <button className="link-button" onClick={() => go("subjects")}>
                  View all subjects <ArrowRight size={17} />
                </button>
              </div>
              <div className="subject-grid">
                {subjects.slice(0, 6).map((s) => (
                  <SubjectCard s={s} key={s.name} />
                ))}
              </div>
              <div className="center-action">
                <button
                  className="btn btn-outline"
                  onClick={() => go("subjects")}
                >
                  Explore all subjects <ArrowRight size={17} />
                </button>
              </div>
            </section>
            <section className="value-section">
              <div className="value-left">
                <span className="eyebrow light">MORE THAN NOTES</span>
                <h2>
                  A plan for your
                  <br />
                  <span>best performance.</span>
                </h2>
                <p>
                  Studying harder is not always the answer. Studying with a plan
                  helps you use your time better.
                </p>
                <button className="btn btn-white" onClick={() => go("how")}>
                  Discover how it works <ArrowRight size={17} />
                </button>
              </div>
              <div className="value-features">
                <div className="feature">
                  <span>
                    <BookOpen />
                  </span>
                  <div>
                    <h3>Learn topic by topic</h3>
                    <p>
                      Break the syllabus into smaller sections that are easier
                      to understand and revise.
                    </p>
                  </div>
                  <b>01</b>
                </div>
                <div className="feature">
                  <span>
                    <Target />
                  </span>
                  <div>
                    <h3>Practise with purpose</h3>
                    <p>
                      Use exam-style questions to test your understanding and
                      identify weak areas.
                    </p>
                  </div>
                  <b>02</b>
                </div>
                <div className="feature">
                  <span>
                    <ChartNoAxesCombined />
                  </span>
                  <div>
                    <h3>Track your improvement</h3>
                    <p>
                      Review your scores, revisit difficult topics and build a
                      consistent study routine.
                    </p>
                  </div>
                  <b>03</b>
                </div>
              </div>
            </section>
            <section className="section review-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">THE STUDENT EXPERIENCE</span>
                  <h2>
                    Revision should feel
                    <br />
                    <span>less overwhelming.</span>
                  </h2>
                  <p className="section-sub">
                    A focused space for your goals, your questions and your next
                    step.
                  </p>
                </div>
                <button className="link-button" onClick={() => go("reviews")}>
                  Visit reviews <ArrowRight size={17} />
                </button>
              </div>
              <div className="review-grid">
                {testimonials.map((t, i) => (
                  <article className="review-card" key={t.name}>
                    <div className="review-stars">{"★".repeat(t.stars)}</div>
                    <p>“{t.quote}”</p>
                    <div className="review-person">
                      <span className={`review-avatar avatar-${i}`}>
                        {t.name[0]}
                      </span>
                      <div>
                        <b>{t.name}</b>
                        <small>{t.school}</small>
                      </div>
                      <span className="quote-mark">“</span>
                    </div>
                  </article>
                ))}
              </div>
              <p className="demo-note">
                The testimonials above are sample placeholders for design
                preview, not verified student reviews.
              </p>
            </section>
            <section className="cta-section">
              <div className="cta-icon">
                <GraduationCap size={28} />
              </div>
              <div>
                <span className="eyebrow light">
                  YOUR FUTURE IS WORTH PREPARING FOR
                </span>
                <h2>Make your next study session count.</h2>
                <p>
                  Choose a subject, follow a plan and start building confidence
                  today.
                </p>
              </div>
              <button className="btn btn-white" onClick={() => go("subjects")}>
                Find your subject <ArrowRight size={17} />
              </button>
              <div className="cta-shape" />
            </section>
          </main>
          <Footer go={go} />
        </>
      )}
      {page === "subjects" && (
        <main className="page-main">
          <div className="page-hero">
            <span className="eyebrow">THE SUBJECT LIBRARY</span>
            <h1>
              Your subjects.
              <br />
              <span>Your next breakthrough.</span>
            </h1>
            <p>
              Choose the subjects you want to strengthen. Each subject is K50,
              with structured revision and exam-style practice.
            </p>
            <div className="search-bar">
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subjects..."
              />
              <span>{filtered.length} subjects</span>
            </div>
          </div>
          <div className="filter-row">
            {[
              "All",
              "Core",
              "Science",
              "Languages",
              "Humanities",
              "Business",
            ].map((c) => (
              <button
                className={`filter-chip ${category === c ? "selected" : ""}`}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="subject-grid catalogue-grid">
            {filtered.map((s) => (
              <SubjectCard s={s} key={s.name} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              No subjects match your search. Try another subject name.
            </div>
          )}
          <section className="assurance-strip">
            <ShieldCheck size={24} />
            <div>
              <b>Simple, transparent pricing</b>
              <p>
                Pay K50 for each subject you choose. No surprise subject
                bundles.
              </p>
            </div>
            <span>
              {" "}
              K50 <small>/ subject</small>
            </span>
          </section>
        </main>
      )}
      {page === "subject" && (
        <main className="page-main subject-detail-page">
          <button className="back-link" onClick={() => go("subjects")}>
            ← Back to all subjects
          </button>
          <div className="detail-hero">
            <div className={`subject-icon large ${activeSubject.color}`}>
              {React.createElement(activeSubject.icon, { size: 31 })}
            </div>
            <span className="eyebrow">
              GRADE 12 · {activeSubject.category.toUpperCase()}
            </span>
            <h1>
              {activeSubject.name}
              <br />
              <span>Preparation Hub</span>
            </h1>
            <p>
              {activeSubject.desc} Follow your topic list, revise at your own
              pace and practise what you learn.
            </p>
            <div className="detail-stats">
              <span>
                <BookOpen size={17} />
                {activeSubject.topics} topic guides
              </span>
              <span>
                <Clock3 size={17} />
                Self-paced learning
              </span>
              <span>
                <Target size={17} />
                Practice questions
              </span>
            </div>
            <div className="detail-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={() => startCheckout(activeSubject)}
              >
                Unlock this subject — K50 <ArrowRight size={18} />
              </button>
              <span>
                <LockKeyhole size={15} /> Secure mobile-money checkout
              </span>
            </div>
          </div>
          <div className="detail-columns">
            <div className="topic-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">YOUR LEARNING PATH</span>
                  <h2>Topics to master</h2>
                </div>
                <span className="count-pill">
                  {activeSubject.topicsList.length} featured
                </span>
              </div>
              {activeSubject.topicsList.map((t, i) => (
                <div className="topic-row" key={t}>
                  <span className="topic-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <b>{t}</b>
                    <small>Notes · Examples · Practice</small>
                  </span>
                  <LockKeyhole size={17} className="topic-lock" />
                </div>
              ))}
              <div className="locked-note">
                <ShieldCheck size={19} />
                <span>
                  <b>Ready when you are</b>
                  <small>
                    Unlock the subject to access the full learning path and
                    practice materials.
                  </small>
                </span>
              </div>
            </div>
            <aside className="purchase-card">
              <div className="purchase-top">
                <span className="eyebrow">SUBJECT ACCESS</span>
                <div className="purchase-price">
                  K50 <small>/ once per subject</small>
                </div>
                <p>
                  Everything you need to focus your revision in{" "}
                  {activeSubject.name}.
                </p>
              </div>
              <ul>
                <li>
                  <CheckCircle2 />
                  Topic-by-topic revision guides
                </li>
                <li>
                  <CheckCircle2 />
                  Worked examples and key concepts
                </li>
                <li>
                  <CheckCircle2 />
                  Exam-style practice questions
                </li>
                <li>
                  <CheckCircle2 />
                  Progress and score review
                </li>
              </ul>
              <button
                className="btn btn-primary full-width"
                onClick={() => startCheckout(activeSubject)}
              >
                Continue to payment <ArrowRight size={17} />
              </button>
              <div className="pay-logos">
                <span className="mtn-logo">MTN</span>
                <span className="airtel-logo">airtel</span>
                <small>Mobile Money</small>
              </div>
              <p className="secure-caption">
                <ShieldCheck size={14} /> Payment request sent securely
              </p>
            </aside>
          </div>
        </main>
      )}
      {page === "prep" && (
        <main className="page-main prep-page">
          <span className="eyebrow">PRACTICE MODE</span>
          <h1>Test your understanding.</h1>
          <p className="page-intro">
            A short sample quiz to show how practice questions work. These are
            demonstration questions, not official examination questions.
          </p>
          <div className="quiz-card">
            <div className="quiz-top">
              <span>QUICK PRACTICE</span>
              <span>
                <Clock3 size={15} /> No timer · Sample quiz
              </span>
            </div>
            {!quizDone ? (
              <>
                <div className="quiz-progress">
                  <span
                    style={{
                      width: `${((questionIndex + 1) / sampleQuestions.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="quiz-question-meta">
                  QUESTION {questionIndex + 1} OF {sampleQuestions.length}
                </div>
                <h2>{sampleQuestions[questionIndex].q}</h2>
                <div className="answer-options">
                  {sampleQuestions[questionIndex].options.map((o, i) => (
                    <button
                      key={o}
                      className={`answer-option ${answers[questionIndex] === i ? "chosen" : ""}`}
                      onClick={() =>
                        setAnswers({ ...answers, [questionIndex]: i })
                      }
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {o}
                      {answers[questionIndex] === i && (
                        <CheckCircle2 size={18} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="quiz-bottom">
                  <span>
                    {Object.keys(answers).length} of {sampleQuestions.length}{" "}
                    answered
                  </span>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      questionIndex < sampleQuestions.length - 1
                        ? setQuestionIndex(questionIndex + 1)
                        : setQuizDone(true)
                    }
                    disabled={answers[questionIndex] === undefined}
                  >
                    {questionIndex === sampleQuestions.length - 1
                      ? "Finish practice"
                      : "Next question"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="quiz-results">
                <div className="result-icon">
                  <Trophy size={32} />
                </div>
                <span className="eyebrow">PRACTICE COMPLETE</span>
                <h2>
                  {
                    sampleQuestions.filter((q, i) => answers[i] === q.correct)
                      .length
                  }{" "}
                  / {sampleQuestions.length} correct
                </h2>
                <p>
                  Review the explanations and retry to strengthen your
                  understanding.
                </p>
                {sampleQuestions.map((q, i) => (
                  <div className="explanation" key={q.q}>
                    <b>
                      {i + 1}. {q.q}
                    </b>
                    <span
                      className={
                        answers[i] === q.correct
                          ? "correct-label"
                          : "wrong-label"
                      }
                    >
                      {answers[i] === q.correct
                        ? "Correct"
                        : "Review this answer"}{" "}
                      · Answer: {q.options[q.correct]}
                    </span>
                    <p>{q.why}</p>
                  </div>
                ))}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setAnswers({});
                    setQuestionIndex(0);
                    setQuizDone(false);
                  }}
                >
                  Try again <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </main>
      )}
      {page === "reviews" && (
        <main className="page-main">
          <div className="page-hero reviews-hero">
            <span className="eyebrow">STUDENT VOICES</span>
            <h1>
              Every step forward
              <br />
              <span>deserves to be heard.</span>
            </h1>
            <p>
              Share your experience to help us make revision more useful for
              students preparing for Grade 12 examinations.
            </p>
          </div>
          <div className="reviews-layout">
            <div>
              <div className="review-summary">
                <div>
                  <strong>★★★★★</strong>
                  <h2>Learning is a journey.</h2>
                  <p>
                    Reviews will appear here after moderation. We value honest,
                    constructive feedback from real learners.
                  </p>
                </div>
                <MessageCircle size={38} />
              </div>
              <div className="review-grid review-list">
                {testimonials.map((t, i) => (
                  <article className="review-card" key={t.name}>
                    <div className="review-stars">{"★".repeat(t.stars)}</div>
                    <p>“{t.quote}”</p>
                    <div className="review-person">
                      <span className={`review-avatar avatar-${i}`}>
                        {t.name[0]}
                      </span>
                      <div>
                        <b>{t.name}</b>
                        <small>
                          Example testimonial · replace before launch
                        </small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <form className="review-form" onSubmit={submitReview}>
              <span className="eyebrow">WRITE A REVIEW</span>
              <h2>Tell us how it feels.</h2>
              <p>Your feedback helps us improve the learning experience.</p>
              <label>
                Your name
                <input
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  maxLength={80}
                />
              </label>
              <label>
                Your rating
                <div className="rating-select">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setReviewRating(n)}
                      className={n <= reviewRating ? "rated" : ""}
                      aria-label={`${n} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </label>
              <label>
                Your review
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="What helped you? What could be better?"
                  rows={5}
                  required
                  maxLength={1000}
                />
              </label>
              <button className="btn btn-primary full-width" type="submit">
                Submit for review <ArrowRight size={17} />
              </button>
              {reviewSent && (
                <p className="form-success">
                  <CheckCircle2 size={16} /> Thank you! Your review has been
                  submitted for moderation.
                </p>
              )}
              <small className="form-privacy">
                Reviews are checked before being published publicly.
              </small>
            </form>
          </div>
        </main>
      )}
      {page === "how" && (
        <main className="page-main how-page">
          <div className="page-hero">
            <span className="eyebrow">SIMPLE BY DESIGN</span>
            <h1>
              Four steps to a<br />
              <span>more focused revision plan.</span>
            </h1>
            <p>
              Start with the subject you want to improve, then use a simple
              routine to guide your preparation.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                n: "01",
                icon: Search,
                title: "Choose your subject",
                body: "Browse the subject library and pick the subjects you want to focus on.",
              },
              {
                n: "02",
                icon: Smartphone,
                title: "Pay securely",
                body: "Pay K50 per subject using MTN or Airtel Money through Lenco by BroadPay.",
              },
              {
                n: "03",
                icon: BookOpen,
                title: "Study and practise",
                body: "Work through topic guides, examples and exam-style questions at your pace.",
              },
              {
                n: "04",
                icon: Trophy,
                title: "Review your progress",
                body: "Use your practice results to spot gaps, revisit topics and keep improving.",
              },
            ].map((x) => (
              <article className="step-card" key={x.n}>
                <span className="step-number">{x.n}</span>
                <span className="step-icon">
                  {React.createElement(x.icon, { size: 24 })}
                </span>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
          <section className="faq-panel">
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>Frequently asked questions</h2>
            {[
              {
                q: "How much does one subject cost?",
                a: "Each subject is K50. You choose which subjects you want to purchase.",
              },
              {
                q: "Which payment methods are supported?",
                a: "The planned checkout supports MTN Money and Airtel Money through Lenco by BroadPay, subject to your merchant account being approved and configured.",
              },
              {
                q: "Are the reviews real?",
                a: "The sample quotes on this preview are placeholders. At launch, publish only genuine student feedback with permission.",
              },
              {
                q: "Are the questions official past papers?",
                a: "Only content that you have the right to distribute should be labelled as official past papers. Clearly label original practice questions and mock exams.",
              },
            ].map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <ChevronDown size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        </main>
      )}
      {notice && (
        <div className="toast" role="status">
          <CircleHelp size={18} />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}
      {showCheckout && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setShowCheckout(false)
          }
        >
          <div className="checkout-modal">
            <button
              className="modal-close"
              onClick={() => setShowCheckout(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <div className="checkout-brand">
              <span className="brand-mark star-mark">ST</span>
              <span>STar Academy · Secure checkout</span>
              <ShieldCheck size={17} />
            </div>
            <span className="eyebrow">UNLOCK YOUR LEARNING PATH</span>
            <h2>{paySubject.name}</h2>
            <p className="checkout-sub">One-time subject access</p>
            <div className="checkout-total">
              <span>Total to pay</span>
              <b>
                K50.00 <small>ZMW</small>
              </b>
            </div>
            {payState === "success" ? (
              <div className="payment-result success-result">
                <CheckCircle2 size={32} />
                <h3>Payment confirmed</h3>
                <p>{notice}</p>
                <button
                  className="btn btn-primary full-width"
                  onClick={() => {
                    setShowCheckout(false);
                    go("prep");
                  }}
                >
                  Try sample practice <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                {payState === "pending" || payState === "checking" ? (
                  <div className="payment-result">
                    <Smartphone size={29} />
                    <h3>Approve on your phone</h3>
                    <p>
                      {notice ||
                        "Check your phone and approve the mobile-money request."}
                    </p>
                    <div className="reference-line">
                      Reference <b>{reference}</b>
                    </div>
                    <button
                      className="btn btn-primary full-width"
                      onClick={verifyPayment}
                      disabled={payState === "checking"}
                    >
                      {payState === "checking"
                        ? "Checking payment…"
                        : "I have approved — check payment"}
                    </button>
                    <button
                      className="btn btn-ghost full-width"
                      onClick={() => setPayState("idle")}
                    >
                      Use a different number
                    </button>
                  </div>
                ) : (
                  <form onSubmit={initiatePayment} className="checkout-form">
                    <label>Choose mobile-money network</label>
                    <div className="operator-grid">
                      <button
                        type="button"
                        className={
                          operator === "mtn" ? "operator selected" : "operator"
                        }
                        onClick={() => setOperator("mtn")}
                      >
                        <span className="mtn-logo">MTN</span>
                        <b>MTN Money</b>
                      </button>
                      <button
                        type="button"
                        className={
                          operator === "airtel"
                            ? "operator selected"
                            : "operator"
                        }
                        onClick={() => setOperator("airtel")}
                      >
                        <span className="airtel-logo">airtel</span>
                        <b>Airtel Money</b>
                      </button>
                    </div>
                    <label>
                      Mobile-money phone number
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0971234567"
                        pattern="(?:\+?260|0)?[0-9]{9}"
                        required
                      />
                    </label>
                    <p className="checkout-hint">
                      Enter the number linked to your selected mobile-money
                      wallet. You must approve the request on your phone.
                    </p>
                    {payState === "error" && (
                      <p className="payment-error">{notice}</p>
                    )}
                    <button
                      className="btn btn-primary full-width"
                      type="submit"
                      disabled={payState === "loading"}
                    >
                      {payState === "loading"
                        ? "Sending request…"
                        : "Request payment · K50"}{" "}
                      <ArrowRight size={17} />
                    </button>
                  </form>
                )}
              </>
            )}
            <div className="checkout-security">
              <ShieldCheck size={15} /> Payments are processed by Lenco by
              BroadPay. Never share your PIN.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button
            className="brand footer-brand-button"
            onClick={() => go("home")}
          >
            <span className="brand-mark star-mark">ST</span>
            <span>
              STar<span className="brand-accent"> Academy</span>
              <small>GRADE 12 · ECZ</small>
            </span>
          </button>
          <p>
            Helping Zambia ECZ Grade 12 learners prepare with clarity,
            confidence and purpose.
          </p>
        </div>
        <div>
          <b>Explore</b>
          <button onClick={() => go("subjects")}>All subjects</button>
          <button onClick={() => go("how")}>How it works</button>
          <button onClick={() => go("reviews")}>Student reviews</button>
        </div>
        <div>
          <b>Study tools</b>
          <button onClick={() => go("prep")}>Sample practice</button>
          <button onClick={() => go("subjects")}>Revision library</button>
          <button onClick={() => go("subjects")}>Mock exams</button>
        </div>
        <div className="footer-help">
          <b>Keep moving forward.</b>
          <p>One topic. One session. One step closer.</p>
          <button
            className="btn btn-white btn-small"
            onClick={() => go("subjects")}
          >
            Start preparing <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} STar Academy. Built for focused learning.
        </span>
        <span>
          Made for learners in Zambia <span className="zambia-dot">●</span>
        </span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<StudentAuth />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
