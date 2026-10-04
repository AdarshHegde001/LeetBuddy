import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Cloud, 
  Code2, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  FileText, 
  Zap, 
  Database,
  Binary,
  CheckCircle2,
  FolderDown
} from 'lucide-react';

export default function HomePage() {
  return (
    <div style={styles.pageWrapper}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <div style={styles.brandIcon}>
            <Binary size={20} color="#ffffff" />
          </div>
          <span style={styles.brandName}>LeetBuddy</span>
        </div>
        <div style={styles.navLinks}>
          <a href="#how-it-works" style={styles.navLink}>Pipeline</a>
          <a href="#preview" style={styles.navLink}>Note Format</a>
          <div style={styles.statusBadge}>
            <span style={styles.statusDot}></span>
            <span>API Gateway Ready</span>
          </div>
        </div>
      </nav>

      <main style={styles.container}>
        {/* Hero Section */}
        <header style={styles.heroSection}>
          <div style={styles.badge}>
            <Terminal size={14} style={{ marginRight: '6px' }} />
            <span>Automated Algorithmic Note-Taking</span>
          </div>
          <h1 style={styles.heroTitle}>
            Turn Accepted Submissions Into <br />
            <span style={styles.heroHighlight}>Rigorous Technical Notes</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Never forget an algorithmic methodology again. LeetBuddy pulls your daily LeetCode 
            submissions via GraphQL, derives the asymptotic bounds and state transitions 
            with local or cloud models, and exports digital-garden ready Markdown.
          </p>

          <div style={styles.featuresRow}>
            <div style={styles.featureItem}>
              <Code2 size={18} color="#3b82f6" />
              <span>Direct GraphQL Session Ingestion</span>
            </div>
            <div style={styles.featureItem}>
              <ShieldCheck size={18} color="#10b981" />
              <span>Stateless Proxy: Zero Token Persistence</span>
            </div>
            <div style={styles.featureItem}>
              <Zap size={18} color="#f59e0b" />
              <span>Deterministic Asymptotic Math</span>
            </div>
          </div>
        </header>

        {/* Mode Selection Cards */}
        <section style={styles.cardsSection}>
          <div style={styles.cardsContainer}>
            {/* Card 1: Local Ollama Engine */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIconWrapper, backgroundColor: '#fef3c7' }}>
                  <Cpu size={26} color="#d97706" />
                </div>
                <span style={styles.cardPill}>Edge Inference</span>
              </div>
              <h2 style={styles.cardTitle}>Local Engine (Ollama)</h2>
              <p style={styles.cardDescription}>
                Run zero-latency, private inference directly on your local GPU using open-weight models
                like Qwen 2.5 or Gemma 2. Generated Markdown notes can be written straight to your
                local filesystem or Obsidian vault.
              </p>
              <ul style={styles.specsList}>
                <li>• Endpoint: <code>http://localhost:11434</code></li>
                <li>• Fully offline & zero API cost</li>
                <li>• Direct disk write via Node.js <code>fs</code></li>
              </ul>
              <Link to="/local" style={{ ...styles.button, backgroundColor: '#f59e0b' }}>
                <span>Launch Local Mode</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2: Cloud Gemini Engine */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIconWrapper, backgroundColor: '#dbeafe' }}>
                  <Cloud size={26} color="#2563eb" />
                </div>
                <span style={styles.cardPill}>Serverless Cloud</span>
              </div>
              <h2 style={styles.cardTitle}>Cloud Engine (Gemini)</h2>
              <p style={styles.cardDescription}>
                Leverage Google's high-speed cloud infrastructure for inference when running on
                resource-constrained hardware or deployed remotely on Render. Export your notes as
                downloadable <code>.md</code> bundles directly in the browser.
              </p>
              <ul style={styles.specsList}>
                <li>• Model: <code>gemini-2.5-flash</code></li>
                <li>• No local VRAM or GPU required</li>
                <li>• In-browser Blob download</li>
              </ul>
              <Link to="/cloud" style={{ ...styles.button, backgroundColor: '#3b82f6' }}>
                <span>Launch Cloud Mode</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Pipeline Architecture */}
        <section id="how-it-works" style={styles.pipelineSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionCategory}>SYSTEM ARCHITECTURE</span>
            <h2 style={styles.sectionTitle}>How LeetBuddy Processes Your Code</h2>
          </div>

          <div style={styles.pipelineGrid}>
            <div style={styles.pipelineStep}>
              <div style={styles.stepNumber}>01</div>
              <div style={styles.stepIcon}><Database size={22} color="#2563eb" /></div>
              <h3 style={styles.stepTitle}>Extract</h3>
              <p style={styles.stepDesc}>
                Queries LeetCode's undocumented GraphQL endpoint using your session token to pull the raw accepted solution and question metadata without fragile web scrapers.
              </p>
            </div>

            <div style={styles.pipelineStep}>
              <div style={styles.stepNumber}>02</div>
              <div style={styles.stepIcon}><Cpu size={22} color="#f59e0b" /></div>
              <h3 style={styles.stepTitle}>Infer</h3>
              <p style={styles.stepDesc}>
                Feeds AST syntax tokens into the LLM with low temperature ($T=0.1$) to sharply peak next-token probabilities around algorithmic invariants and Big-O bounds.
              </p>
            </div>

            <div style={styles.pipelineStep}>
              <div style={styles.stepNumber}>03</div>
              <div style={styles.stepIcon}><FolderDown size={22} color="#10b981" /></div>
              <h3 style={styles.stepTitle}>Export</h3>
              <p style={styles.stepDesc}>
                Packages notes with YAML frontmatter tags (difficulty, patterns, date) and streams it directly to your disk or prepares an instant browser file download.
              </p>
            </div>
          </div>
        </section>

        {/* Note Anatomy Preview */}
        <section id="preview" style={styles.previewSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionCategory}>SAMPLE ARTIFACT</span>
            <h2 style={styles.sectionTitle}>What Your Generated Notes Look Like</h2>
          </div>

          <div style={styles.mockTerminal}>
            <div style={styles.terminalHeader}>
              <div style={styles.terminalDots}>
                <span style={{ ...styles.dot, backgroundColor: '#ef4444' }}></span>
                <span style={{ ...styles.dot, backgroundColor: '#f59e0b' }}></span>
                <span style={{ ...styles.dot, backgroundColor: '#10b981' }}></span>
              </div>
              <span style={styles.terminalTitle}>15-3Sum-Notes.md</span>
              <FileText size={16} color="#94a3b8" />
            </div>
            <pre style={styles.terminalBody}>
              <code>{`---
difficulty: Medium
tags: [two-pointers, sorting, array]
solved_at: 2026-10-04
source: leetcode.com/problems/3sum/
---

### 1. Algorithmic Invariant & Technique
- **Mechanism:** Two-Pointer Convergence after an $O(N \\log N)$ quicksort.
- **Deduplication:** Skip identical adjacent values ($nums[i] == nums[i-1]$) to guarantee uniqueness without set overhead.

### 2. Mathematical Complexity
- **Time Complexity:** $O(N^2)$
  - Outer pivot iterates $N$ times.
  - Inner two-pointer loop performs a linear scan $O(N)$ across remaining elements.
- **Auxiliary Space:** $O(1)$ (ignoring output array and language recursion stack for sorting).

### 3. Recurrence & State Mechanics
- Condition check: $S = nums[i] + nums[left] + nums[right]$
  - If $S < 0 \\implies left \\leftarrow left + 1$ (increase mass)
  - If $S > 0 \\implies right \\leftarrow right - 1$ (decrease mass)`}</code>
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>© {new Date().getFullYear()} LeetBuddy · Built for local & cloud algorithmic workflows</p>
          <div style={styles.footerGuarantees}>
            <span><CheckCircle2 size={14} color="#10b981" /> No database logs</span>
            <span><CheckCircle2 size={14} color="#10b981" /> Markdown native</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    color: '#0f172a',
  },
  navbar: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
  },
  brandIcon: {
    backgroundColor: '#0f172a',
    padding: '6px',
    borderRadius: '8px',
    display: 'flex',
  },
  brandName: {
    fontWeight: '800',
    fontSize: '1.2rem',
    letterSpacing: '-0.02em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#ecfdf5',
    color: '#047857',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  container: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '2rem 1.5rem 5rem 1.5rem',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '3.5rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 14px',
    borderRadius: '9999px',
    backgroundColor: '#e2e8f0',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '1.25rem',
  },
  heroTitle: {
    fontSize: '3.25rem',
    fontWeight: '800',
    letterSpacing: '-0.035em',
    lineHeight: '1.15',
    margin: '0 0 1.25rem 0',
  },
  heroHighlight: {
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    lineHeight: '1.6',
    color: '#475569',
    maxWidth: '720px',
    margin: '0 auto 2rem auto',
  },
  featuresRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.75rem',
    flexWrap: 'wrap',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#334155',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid #e2e8f0',
  },
  cardsSection: {
    marginBottom: '5rem',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.25rem',
  },
  cardIconWrapper: {
    padding: '10px',
    borderRadius: '12px',
    display: 'flex',
  },
  cardPill: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  cardTitle: {
    fontSize: '1.45rem',
    fontWeight: '700',
    margin: '0 0 0.75rem 0',
  },
  cardDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.55',
    color: '#64748b',
    flexGrow: 1,
    marginBottom: '1.5rem',
  },
  specsList: {
    listStyleType: 'none',
    padding: 0,
    margin: '0 0 1.75rem 0',
    fontSize: '0.85rem',
    color: '#475569',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.85rem 1.25rem',
    borderRadius: '10px',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  sectionCategory: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '0.1em',
    color: '#3b82f6',
  },
  sectionTitle: {
    fontSize: '1.85rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    margin: '0.4rem 0 0 0',
  },
  pipelineSection: {
    marginBottom: '5rem',
  },
  pipelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  pipelineStep: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.25rem',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#e2e8f0',
  },
  stepIcon: {
    marginBottom: '1rem',
  },
  stepTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
  },
  stepDesc: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },
  previewSection: {
    marginBottom: '2rem',
  },
  mockTerminal: {
    backgroundColor: '#0f172a',
    borderRadius: '14px',
    border: '1px solid #1e293b',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  terminalDots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  terminalTitle: {
    color: '#94a3b8',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
  },
  terminalBody: {
    padding: '1.5rem',
    margin: 0,
    color: '#e2e8f0',
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    overflowX: 'auto',
  },
  footer: {
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    padding: '2rem 1.5rem',
  },
  footerContent: {
    maxWidth: '1120px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.85rem',
    color: '#64748b',
  },
  footerGuarantees: {
    display: 'flex',
    gap: '1.25rem',
  },
};
