import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css'; // Imports the CSS file defined below

// Set up the PDF worker (Required for react-pdf to render)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [activeHighlight, setActiveHighlight] = useState(null);
  
  // Configuration: Mapping citations to specific PDF pages and highlighting zones
  // Rect coordinates are percentages: { top, left, width, height }
  const highlights = {
    // Citation [1]: Page 3 - "EBITDA increase... attributed to operational improvements"
    1: {
        pageNumber: 3,
        // Coordinates target the specific paragraph on Page 3
        rect: { top: '28%', left: '10%', width: '85%', height: '6%' } 
    },
    // Citation [3]: Page 15 - "Gain on sale of non-current assets..."
    3: {
      pageNumber: 15, 
      // Coordinates target the exact line in the table
      rect: { top: '23.5%', left: '11%', width: '45%', height: '1.5%' } 
    }
  };

  // Handle clicking a citation button
  const handleCitationClick = (id) => {
    if (highlights[id]) {
      setActiveHighlight(highlights[id]);
      
      // Logic to scroll the PDF container back to top so the user sees the highlight immediately
      const container = document.querySelector('.pdf-panel');
      if(container) container.scrollTop = 0;
    }
  };

  return (
    <div className="app-container">
      
      {/* --- LEFT PANEL: PDF VIEWER --- */}
      <div className="pdf-panel">
        {/* Load the PDF file from the public folder */}
        <Document file="/report.pdf" className="pdf-document">
          
          {activeHighlight ? (
             <div className="pdf-wrapper">
                {/* Render ONLY the page relevant to the citation */}
                <Page 
                    pageNumber={activeHighlight.pageNumber} 
                    width={600} 
                />
                {/* The Yellow Highlight Overlay */}
                <div 
                    className="highlight-box"
                    style={{
                        top: activeHighlight.rect.top,
                        left: activeHighlight.rect.left,
                        width: activeHighlight.rect.width,
                        height: activeHighlight.rect.height,
                    }}
                />
             </div>
          ) : (
             /* Default View: Show Page 1 when no citation is selected */
             <div className="pdf-wrapper">
                <Page pageNumber={1} width={600} />
             </div>
          )}
        </Document>
      </div>

      {/* --- RIGHT PANEL: FINANCIAL ANALYSIS CONTENT --- */}
      <div className="sidebar-panel">
        
        <div className="header">
          <h1>Financials</h1>
        </div>

        {/* SECTION 1: ANALYSIS */}
        <div className="card">
            <span className="card-title text-blue">Analysis</span>
            <p style={{ marginBottom: '1rem' }}>
                No extraordinary or one-off items affecting EBITDA were reported in Maersk's Q2 2025 results.
            </p>
            <p>
                The report explicitly notes that EBITDA improvements stemmed from operational performance—including volume growth, cost control, and margin improvement. 
                <span style={{ fontStyle: 'italic', color: '#9ca3af', marginLeft: '4px' }}>
                   Gains or losses from asset sales are shown separately under EBIT.
                </span>
            </p>
        </div>

        {/* SECTION 2: FINDINGS */}
        <div className="card">
            <span className="card-title text-emerald">Findings</span>
            
            {/* Finding 1: Page 3 */}
            <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'white', display:'block', marginBottom:'0.25rem' }}>Page 3 - Highlights Q2 2025</strong>
                <p>
                    EBITDA increase (USD 2.3 bn vs USD 2.1 bn prior year) attributed to operational improvements; no mention of extraordinary or one-off items.
                    <button 
                        onClick={() => handleCitationClick(1)}
                        className="citation-btn btn-blue"
                    >
                        [1]
                    </button>
                </p>
            </div>

            {/* Finding 2: Page 15 (The specific requirement from case study) */}
            <div>
                <strong style={{ color: 'white', display:'block', marginBottom:'0.25rem' }}>Page 15 - Condensed Income Statement</strong>
                <div className="quote-block">
                    "Gain on sale of non-current assets USD 25 m (vs prior year) reported separately below EBITDA; therefore, not part of EBITDA."
                    <button 
                        onClick={() => handleCitationClick(3)} 
                        className="citation-btn btn-emerald"
                    >
                        [3]
                    </button>
                </div>
            </div>
        </div>

        {/* SECTION 3: SUPPORTING EVIDENCE */}
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #374151' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280', marginBottom: '1rem' }}>
                Supporting Evidence
            </h3>
            
            {/* Link for Citation [1] */}
            <div 
                style={{ cursor: 'pointer', padding: '0.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }} 
                onClick={() => handleCitationClick(1)}
            >
                <span className="text-blue" style={{ fontFamily: 'monospace', marginRight: '0.5rem' }}>[1]</span>
                <span className="hover-text" style={{ fontSize: '0.85rem' }}>
                    A.P. Moller - Maersk Q2 2025 Interim Report - Page 3
                </span>
            </div>

            {/* Link for Citation [3] */}
            <div 
                style={{ cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }} 
                onClick={() => handleCitationClick(3)}
            >
                <span className="text-emerald" style={{ fontFamily: 'monospace', marginRight: '0.5rem' }}>[3]</span>
                <span className="hover-text" style={{ fontSize: '0.85rem' }}>
                    A.P. Moller - Maersk Q2 2025 Interim Report - Page 15
                </span>
            </div>
        </div>

        {/* Chat Input (Simulated) */}
        <div className="input-wrapper">
            <input 
                type="text" 
                placeholder="Ask about your chat data..." 
                className="chat-input"
            />
            <div style={{ position: 'absolute', right: '10px', top: '12px', fontSize: '0.7rem', color: '#6b7280'}}>
                AI Assistant
            </div>
        </div>

      </div>
    </div>
  );
}

export default App;