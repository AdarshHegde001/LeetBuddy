import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { markdown, title } = location.state || { markdown: '', title: 'notes' };

    if (!markdown) {
        navigate('/');
        return null;
    }

    const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `${safeTitle}.md`;

    // Ephemeral Blob generation - triggers browser's native "Save As" dialog
    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <Link to="/" style={styles.backLink}>
                    <ArrowLeft size={16} /> Run Another Pipeline
                </Link>

                <header style={styles.header}>
                    <div style={styles.iconWrapper}>
                        <CheckCircle2 size={32} color="#10b981" />
                    </div>
                    <h1 style={styles.title}>Analysis Complete</h1>
                    <p style={styles.subtitle}>Gemma has mapped the asymptotic bounds and algorithmic invariants.</p>
                </header>

                <div style={styles.actionCenter}>
                    <button onClick={handleDownload} style={styles.downloadBtn}>
                        <Download size={20} />
                        Download {fileName}
                    </button>
                </div>

                <div style={styles.documentContainer}>
                    <div style={styles.documentHeader}>
                        <FileText size={16} color="#64748b" />
                        <span>Rendered Output Preview</span>
                    </div>
                    <div style={styles.markdownWrapper}>
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    pageWrapper: { 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc', 
        padding: '3rem 1.5rem', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
    },
    container: { maxWidth: '800px', margin: '0 auto' },
    backLink: { 
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
        color: '#64748b', textDecoration: 'none', marginBottom: '2rem',
        fontWeight: '500' 
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    iconWrapper: { display: 'inline-flex', marginBottom: '1rem' },
    title: { fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#0f172a', letterSpacing: '-0.02em' },
    subtitle: { color: '#64748b', fontSize: '1.1rem', margin: 0 },
    actionCenter: { 
        display: 'flex', justifyContent: 'center', marginBottom: '3rem' 
    },
    downloadBtn: { 
        display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
        padding: '1rem 2rem', backgroundColor: '#3b82f6', color: '#ffffff', 
        border: 'none', borderRadius: '12px', fontSize: '1.1rem', 
        fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
        transition: 'transform 0.1s'
    },
    documentContainer: { 
        backgroundColor: '#ffffff', borderRadius: '16px', 
        border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
    },
    documentHeader: { 
        display: 'flex', alignItems: 'center', gap: '0.5rem', 
        padding: '1rem 1.5rem', backgroundColor: '#f1f5f9', 
        borderBottom: '1px solid #e2e8f0', color: '#475569', 
        fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em'
    },
    markdownWrapper: { 
        padding: '2.5rem', 
        color: '#334155', 
        lineHeight: '1.7',
        fontSize: '1rem'
    }
};
