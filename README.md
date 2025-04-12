# 🔎 Threat Intelligence & Vulnerability Management Portal

A simple Flask-based web application for viewing mapped MITRE ATT&CK threats based on selected technologies and filtering by severity. Also includes (or soon will include) integrated vulnerability search functionality.

---

## 🚀 Features

- Select technologies (Windows, Linux, Cloud, Network, etc.) and view relevant threats
- Filter results by severity (Low, Medium, High)
- Grouped by MITRE ATT&CK tactics (Reconnaissance, Execution, etc.)
- Future support for vulnerability management and search
- Clean UI and expandable sections for threat details

---

## 🛠️ Setup & Usage

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/threat-portal.git
cd threat-portal
```

### 2. Optional but reccommended in demo version (Set up venv)
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

# Then Visit `http://localhost:5000` in your browser.

📌 Notes
Built using MITRE ATT&CK Enterprise Matrix techniques

This is an MVP project in active development — feedback and contributions are welcome!

