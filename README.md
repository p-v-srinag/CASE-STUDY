# **Maersk Financial Case Study (Q2 2025)**

## **Project Overview**

This is a **frontend case study application** that presents an interactive financial analysis of the **Maersk Q2 2025 Interim Report**.

The application features a **split-screen layout**:

- **Left Panel:** Displays the official PDF report.  
- **Right Panel:** Shows a financial analysis of the report's data.

### **Key Feature**
Interactive citations (e.g., **[1], [2], [3]**) inside the analysis text automatically:
- Navigate the PDF viewer to the exact referenced page.
- Highlight the relevant supporting text in the PDF.

---

## **Features**

- **Interactive PDF Viewer:** Seamlessly navigates to specific pages and sections.
- **Smart Highlighting:** Neon-style animated highlight boxes over exact text matches.
- **Dual Pane Layout:** Optimized for reading and cross-referencing financial data.
- **Simulated Chat:** Demonstrates how an AI assistant might answer questions about the report.
- **Zoom Controls:** Zoom in/out of the PDF document.
- **Responsive Design:** Adjusts layout for desktop and mobile.
- **Zero-Build Deployment:** Entirely browser-based; single-file React + Babel architecture.

---

## **Technologies Used**

- **React** – UI components  
- **PDF.js** – Client-side PDF rendering  
- **CSS3** – Dark-mode design & highlight animations  
- **Babel (Standalone)** – In-browser JSX compilation (no bundlers)  

---

## **How to Run Locally**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/maersk-case-study.git
cd maersk-case-study
