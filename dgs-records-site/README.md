# DGS Records

Standalone static site for [dgsrecords.com](https://dgsrecords.com). One page: label intro, artists, THE INFLUENCE, work-with-us, and socials.

The dog-with-headphones logo, favicon, and apple touch icon are copied from the DJ Dogcon site. The artist site's hero video and social preview image are not included.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Contact address

`index.html` does not contain a real inbox. Search for `TODO(contact)` and replace every `mailto:TODO` with the real DGS Records address before publishing.

## Publish as its own GitHub Pages repo

This folder is meant to become the **root** of a separate repository, not stay nested inside the DJ Dogcon repo.

1. Create a new public GitHub repository.
2. Copy the contents of this folder into that repo so `index.html` and `CNAME` are at the repository root.
3. Push the `main` branch.
4. In the new repo, open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, branch `main`, folder **/ (root)**, and save.
5. At GoDaddy, open DNS for `dgsrecords.com`.
   - Add four **A** records on the apex host `@`:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME** for `www` pointing at `<user>.github.io` (the GitHub user or organization name, plus `.github.io`, with no `https://`).
   - Remove GoDaddy parking records, and any other A or AAAA records on `@` or `www`, so only the records above answer for the domain.
6. `CNAME` in this folder already contains `dgsrecords.com`. Pages uses that file for the custom domain. After DNS propagates, turn on **Enforce HTTPS** in the Pages settings.

GitHub's Pages IPs are the four addresses above. `.nojekyll` is included so Pages serves the files as-is.
