# ClawClient Website

The public ClawClient website. This is intentionally separate from the Tauri launcher and platform API repositories.

## Requirements

* Node.js 22+
* npm 11.7.0 (pinned in `package.json`)

## Local development

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The baseline has no required API dependency, so a production build works without the Claw platform API.

Only set public, browser-safe values with the `NEXT_PUBLIC_` prefix. Do not put secrets in those variables. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_RELEASES_API_URL` must be absolute URLs when set; startup/build validation rejects malformed values.

## Quality gates

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run check` runs all four gates. GitHub Actions runs the same commands for pull requests and pushes to `main`.

## Deployment

Vercel is the deployment target. A developer with Vercel access can create a preview from the current pull-request branch with:

```powershell
vercel deploy --target=preview --scope xiri-ventures
```

Promote an approved `main` build with:

```powershell
vercel deploy --prod --scope xiri-ventures
```

The Vercel project is `xiri-ventures/clawclient-website`. Connect the repository in Vercel's Git settings to automate preview deployments for every PR and production deployments from protected `main`; this requires Vercel's GitHub integration to be authorized for the ClawClientMC organization. The production target is `clawclient.net`; configure the apex domain in Vercel and redirect `www.clawclient.net` to the apex domain. Deployments are immutable, so rollback uses `vercel rollback <deployment-url-or-id>` or the Vercel dashboard after verifying the previous deployment.

Do not deploy production before the CI quality gate is green. The repository’s CSP and security headers are defined in `vercel.json`.
Public website for ClawClient
