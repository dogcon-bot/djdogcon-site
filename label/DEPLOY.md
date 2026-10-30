# Deploy dgsrecords.com (GitHub Pages + GoDaddy DNS)

Do **not** use GoDaddy Website Builder or GoDaddy hosting. Domain stays at GoDaddy; site is static GitHub Pages (same pattern as djdogcon.com).

## 1. Create / push the repo
1. Create a public GitHub repo (suggested: `dogcon-bot/dgsrecords-site`).
2. Push the contents of `/workspace/dgsrecords_site/` to the default branch (`main`).
3. Confirm `CNAME` at the repo root contains exactly:
   ```
   dgsrecords.com
   ```

## 2. GitHub Pages settings
1. Repo → **Settings → Pages**.
2. Build from branch: `main` / root (`/`).
3. Custom domain: `dgsrecords.com`.
4. Enable **Enforce HTTPS** after DNS propagates (can take minutes to hours).

## 3. GoDaddy DNS (replace any forwarder)
Remove the temporary forward to djdogcon.com once Pages is ready. Point the apex and www at GitHub Pages:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |
| CNAME | `www` | `<owner>.github.io` | 600 |

Replace `<owner>` with the GitHub user/org that owns the repo (e.g. `dogcon-bot.github.io`).

Optional: keep a second CNAME or redirect for bare vs www — GitHub Pages will serve both once the custom domain is verified.

## 4. Verify
- https://dgsrecords.com/ loads this site
- https://www.dgsrecords.com/ redirects or loads
- HTTPS padlock is valid
- Hero video autoplays muted; reduced-motion users see the still banner

## 5. Do not
- Deploy from this box without Leon’s explicit OK
- Put passwords, stream keys or private emails beyond the public booking address already on djdogcon.com
- Name or imitate real festival / major-label brands on the live pages

## Contact used on the site
- Email: `dogconautosales@gmail.com` (existing booking contact on djdogcon.com `#booking`)
- Primary web: `dgsrecords.com`
- Secondary: `djdogcon.com`

## Optional
Do not upload `previews/` to the live repo if you want the smallest clone; they are local QA screenshots only. First-load critical path is under ~0.5 MB (HTML/CSS/logo/hero still + muted loop).
