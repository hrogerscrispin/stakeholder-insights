# Stakeholder Insights — AI-Powered Request Classifier

A full-stack prototype that converts unstructured stakeholder requests into structured business insights using AI.


---

## What It Does

Paste any stakeholder request in plain text and the system will automatically:

- Classify the request into a business category
- Extract the key issues mentioned
- Generate practical suggested actions
- Store the submission and display it in a dashboard

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (via Mongoose) |
| AI | Groq API — LLaMA 3.3 70B |

---

## Project Structure

```
stakeholder-insights/
├── backend/
│   └── src/
│       ├── config/         # MongoDB connection
│       ├── controller/     # Request handlers
│       ├── model/          # Mongoose schema
│       ├── routes/         # API routes
│       ├── services/       # Groq AI integration
│       └── app.js
└── frontend/
    └── src/
        ├── components/     # SubmissionForm, SubmissionList, StatsCards
        ├── constants/      # Category color mapping
        ├── services/       # Axios API client
        └── App.jsx
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submissions/create` | Analyze and store a new submission |
| GET | `/api/submissions/list` | Retrieve all submissions |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Architecture Approach

The system follows a clean 3-layer architecture:

1. **React frontend** handles user input and displays the dashboard
2. **Express REST API** receives the text, calls the AI service, and persists the result
3. **MongoDB Atlas** stores every submission with its AI-generated insights

When a user submits a request, the backend sends the text to the Groq API with a structured prompt that instructs LLaMA 3.3 70B to return a JSON object containing the category, detected issues, and suggested actions. The response is parsed and saved to MongoDB, then displayed in the dashboard.

---

## How AI Was Used

- **LLM processing:** Groq (LLaMA 3.3 70B-Versatile) classifies the category, extracts issues, and generates suggested actions from raw stakeholder text in a single API call
- **Structured output:** The prompt enforces a strict JSON response format, making the output directly usable without additional transformation
- **Development:** Claude (Anthropic) was used as a coding assistant to accelerate development throughout the build

---

## Tradeoffs

- **Categories are hardcoded in the prompt** rather than stored in a separate collection — this keeps the system simple and fast for a prototype, but would need to be dynamic in production
- **No authentication** — submissions are public, which is fine for a prototype but would need role-based access in a real deployment
- **Single AI call per submission** — classification, extraction, and action generation happen in one prompt, which is efficient but less flexible than a multi-step pipeline
- **No error retry logic** — if the AI call fails, the submission fails. A production system would benefit from a retry queue

---

## Submission Notes

- **Tools used:** React, Vite, Tailwind CSS, Node.js, Express, MongoDB Atlas, Mongoose, Groq API (LLaMA 3.3 70B), Axios
- **Time spent:** ~ 4.5 hours
- **AI in workflow:** Groq/LLaMA for runtime classification and extraction; Claude as development assistant for architecture decisions and code generation

## Demo

[Watch the Loom walkthrough](https://share.descript.com/view/e1KreEuMDJw)
