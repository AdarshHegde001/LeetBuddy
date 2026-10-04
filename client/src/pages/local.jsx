import React, { useState } from 'react';
import { ArrowLeft, Terminal, Database, Code2, Play, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LocalPage() {
  // The state machine determining which input UI to project
  const [ingestionMode, setIngestionMode] = useState('api'); // 'api' | 'manual'

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    sessionCookie: '',
    questionCount: 1,
    manualCode: '',
    problemTitle: '',
    language: 'python'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where we will map the state to our Express POST request
    console.log("Dispatching payload to pipeline:", { mode: ingestionMode, ...formData });
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <header style={styles.header}>
          <div style={styles.iconWrapper}>
            <Terminal size={28} color="#f59e0b" />
          </div>
          <h1 style={styles.title}>Local Inference Engine</h1>
          <p style={styles.subtitle}>
            Extract code and pass syntax tokens to your local open-weight model via Ollama. 
            Runs on port <code style={styles.codeSnippet}>11434</code>.
          </p>
        </header>

        <div style={styles.card}>
          {/* Mode Selector Toggle */}
          <div style={styles.toggleContainer}>
            <button
              type="button"
              onClick={() => setIngestionMode('api')}
              style={{
                ...styles.toggleBtn,
                backgroundColor: ingestionMode === 'api' ? '#f1f5f9' : 'transparent',
                color: ingestionMode === 'api' ? '#0f172a' : '#64748b',
                fontWeight: ingestionMode === 'api' ? '600' : '500',
              }}
            >
              <Database size={16} /> GraphQL Extraction
            </button>
            <button
              type="button"
              onClick={() => setIngestionMode('manual')}
              style={{
                ...styles.toggleBtn,
                backgroundColor: ingestionMode === 'manual' ? '#f1f5f9' : 'transparent',
                color: ingestionMode === 'manual' ? '#0f172a' : '#64748b',
                fontWeight: ingestionMode === 'manual' ? '600' : '500',
              }}
            >
              <Code2 size={16} /> Manual Code Paste
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* CONDITIONAL RENDER: API Mode */}
            {ingestionMode === 'api' && (
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>LeetCode Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="e.g., neetcode"
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Batch Size (Recent Solved)</label>
                  <input
                    type="number"
                    name="questionCount"
                    value={formData.questionCount}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    style={styles.input}
                    required
                  />
                  <span style={styles.helpText}>Max 5 per execution to prevent context overflow.</span>
                </div>

                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>LEETCODE_SESSION Token</label>
                  <input
                    type="password"
                    name="sessionCookie"
                    value={formData.sessionCookie}
                    onChange={handleInputChange}
                    placeholder="Paste the cryptographic hash from browser cookies..."
                    style={styles.input}
                    required
                  />
                  <span style={styles.helpText}>
                    Kept strictly in ephemeral memory. Never logged to disk.
                  </span>
                </div>
              </div>
            )}

            {/* CONDITIONAL RENDER: Manual Mode */}
            {ingestionMode === 'manual' && (
              <div style={styles.manualGrid}>
                <div style={styles.rowLayout}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Problem Title</label>
                    <input
                      type="text"
                      name="problemTitle"
                      value={formData.problemTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., 15. 3Sum"
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={{ width: '150px' }}>
                    <label style={styles.label}>Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      style={styles.input}
                    >
                      <option value="python">Python</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="javascript">JavaScript</option>
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <div style={styles.terminalHeader}>
                    <Settings2 size={14} color="#94a3b8" />
                    <span style={styles.terminalTitle}>Raw Syntax Injection</span>
                  </div>
                  <textarea
                    name="manualCode"
                    value={formData.manualCode}
                    onChange={handleInputChange}
                    placeholder="def threeSum(self, nums: List[int]) -> List[List[int]]:&#10;    ..."
                    style={styles.terminalTextarea}
                    required
                  />
                </div>
              </div>
            )}

            {/* Shared Submit Action */}
            <div style={styles.actionRow}>
              <button type="submit" style={styles.submitBtn}>
                <Play size={18} /> Execute Pipeline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#0f172a',
    padding: '3rem 1.5rem',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '2rem',
    transition: 'color 0.2s',
  },
  header: {
    marginBottom: '2.5rem',
  },
  iconWrapper: {
    display: 'inline-flex',
    padding: '12px',
    backgroundColor: '#fef3c7',
    borderRadius: '14px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },
  codeSnippet: {
    backgroundColor: '#e2e8f0',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9em',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  toggleContainer: {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    padding: '0.5rem',
    gap: '0.5rem',
    backgroundColor: '#f8fafc',
  },
  toggleBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  form: {
    padding: '2rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  manualGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  rowLayout: {
    display: 'flex',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  helpText: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  terminalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#1e293b',
    padding: '0.5rem 1rem',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  terminalTitle: {
    color: '#94a3b8',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  terminalTextarea: {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '1.5rem',
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    minHeight: '250px',
    border: 'none',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    outline: 'none',
    resize: 'vertical',
  },
  actionRow: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.85rem 1.5rem',
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)',
    transition: 'transform 0.1s, box-shadow 0.1s',
  },
};
