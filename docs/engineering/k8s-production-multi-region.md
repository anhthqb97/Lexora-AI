# K8s Production Multi-Region

**Task:** P3-T22  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** DevOps

---

## Overview

Production Kubernetes on Azure (AKS) with multi-region failover for Lexora at scale (>50K MAL).

---

## Regions

| Region | Role | Workloads |
|---|---|---|
| Southeast Asia (primary) | Active | Next.js BFF, ai-gateway, MongoDB primary |
| Japan East (DR) | Standby | Read replicas, warm microservices |

Traffic: **Azure Front Door** → regional ingress.

---

## Cluster Layout

```
Front Door
  ├── AKS lexora-sea-prod
  └── AKS lexora-jp-dr (scaled down)
```

Namespaces: `lexora-web`, `lexora-ai`, `lexora-data`.

---

## References

- [`kubernetes-migration-plan.md`](kubernetes-migration-plan.md)
- [`mongodb-multi-region.md`](mongodb-multi-region.md)
