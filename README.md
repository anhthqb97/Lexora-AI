# Lexora AI

> **Learn Smarter. Speak Better.**

Next.js modular monolith for Lexora AI — speaking coach and TOEIC prep for Vietnamese learners.

**Repository:** [github.com/anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI)  
**Docs:** [`docs/README.md`](docs/README.md)

## Quick start

```bash
cp .env.example .env.local
npm install
npm run local:setup   # Docker: MongoDB + Redis + Ollama
npm run ollama:pull   # first time only
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Local services

| Service | URL                                |
| ------- | ---------------------------------- |
| MongoDB | `mongodb://localhost:27017/lexora` |
| Redis   | `redis://localhost:6379`           |
| Ollama  | `http://localhost:11434`           |
| Speech  | `SPEECH_PROVIDER=mock` (no Azure)  |

## Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Development server               |
| `npm run build`       | Production build                 |
| `npm run lint`        | ESLint                           |
| `npm run typecheck`   | TypeScript check                 |
| `npm run local:setup` | Start Docker stack + health wait |
| `npm run local:check` | Verify MongoDB, Redis, Ollama    |

## Project structure

See [`docs/engineering/tdd-platform.md`](docs/engineering/tdd-platform.md) §3.
