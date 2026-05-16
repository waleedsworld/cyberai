# PointBlank

PointBlank is a cybersecurity platform focused on AI-assisted security reviews, compliance workflows, and incident response. It provides a website compliance workflow (region selection → laws → scan → report) with a branded landing page and a `/compliance-check` experience.

## Local development

```sh
npm i
npm run dev
```

## Frontend API base URL

The frontend defaults to:

- `https://cyberaiapi.digitalsoftwaremarket.online`

Optionally override at build-time with:

```sh
VITE_API_BASE_URL=https://cyberaiapi.digitalsoftwaremarket.online
```

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
