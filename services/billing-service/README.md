# Billing Service Extraction

**Task:** P2-T19  
**Extracted from:** `lib/modules/billing`

The billing microservice exposes subscription and plan endpoints. Main app continues using `lib/modules/billing` with optional `BILLING_SERVICE_URL` routing in future sprints.

## Endpoints

- `GET /health`
- `GET /v1/plans`
- `GET /v1/subscription/:userId`

## Local

```bash
cd services/billing-service && npm install && npm run dev
```

Port: **8083**
