# Elizabeth Smith | Willis & Smith Group QR Landing Page

This is a static, mobile-first QR landing page for Elizabeth Smith and the Willis & Smith Group.

The site is ready for public hosting on Vercel. It does not depend on localhost, a local server, or file paths from one computer.

## Project Files

- `index.html` - single-page landing page
- `styles.css` - responsive mobile-first styling
- `script.js` - small sticky CTA behavior
- `assets/coastal-hero.png` - coastal hero background
- `assets/elizabeth-smith-portrait.jpg` - Elizabeth portrait
- `vercel.json` - Vercel static hosting config
- `.vercelignore` - prevents docs validation files from taking over the Vercel static deployment
- `docs.json` - Mintlify-compatible metadata with a valid `mint` theme
- `.mintignore` - keeps generated zip/folder artifacts out of docs deployment
- `ASSISTANT.md` - docs page required by the docs navigation

## Important: docs.json

This project includes a valid `docs.json` because the deployment system expects it.

The `theme` value must stay set to `mint`. Valid themes include `mint`, `maple`, `palm`, `willow`, `linden`, `almond`, `aspen`, `luma`, and `sequoia`.

For Vercel, the actual public site is still the custom static page at `index.html`. The `.vercelignore` file excludes `docs.json`, `ASSISTANT.md`, and `.mintignore` from the Vercel deployment so the docs page does not replace the QR landing page.

The deployable root should contain only:

```text
assets/
.gitignore
.mintignore
.vercelignore
ASSISTANT.md
docs.json
index.html
README.md
script.js
styles.css
vercel.json
```

## Functional Links

- Phone buttons use `tel:+19783020824`
- Email buttons use `mailto:elizabethsmith@kw.com`
- Instagram buttons link to `https://www.instagram.com/willisandsmith/`

## Deploy to Vercel

### 1. Push Code to GitHub

Create a new GitHub repository, then upload the contents of this folder.

The repository root should contain:

```text
index.html
styles.css
script.js
vercel.json
docs.json
ASSISTANT.md
.mintignore
assets/
```

### 2. Connect the Repo to Vercel

1. Go to `https://vercel.com`.
2. Sign in or create an account.
3. Click `Add New...` then `Project`.
4. Import the GitHub repository.
5. Use these exact settings:
   - Framework Preset: `Other`
   - Build Command: leave empty
   - Output Directory: leave empty
   - Root Directory: `.` or the folder containing `index.html`
7. Click `Deploy`.

If Vercel still tries to run a docs/Next.js build, delete the existing Vercel project and re-import the repo with Framework Preset set to `Other`, or clear the project Build Command in Vercel Project Settings.

### 3. Copy the Live Production URL

After deployment, Vercel will provide a public HTTPS URL, usually like:

```text
https://your-project-name.vercel.app
```

Open that URL on a phone and confirm:

- The page loads over HTTPS.
- The portrait image loads.
- The coastal hero image loads.
- CSS styling loads.
- Call and email buttons work.
- Instagram opens the Willis & Smith Instagram page.
- The layout looks good at roughly 390px mobile width.

### 4. Optional: Update Social Preview URL

For the best social preview, update these two tags in `index.html` after you know the final production URL:

```html
<meta property="og:image" content="https://your-project-name.vercel.app/assets/coastal-hero.png">
<meta name="twitter:image" content="https://your-project-name.vercel.app/assets/coastal-hero.png">
```

Then commit and redeploy.

### 5. Generate the QR Code

Use the final Vercel production URL, not a localhost URL.

Example QR code target:

```text
https://your-project-name.vercel.app
```

Recommended QR code tools:

- `https://www.qr-code-generator.com/`
- `https://www.canva.com/qr-code-generator/`
- `https://www.adobe.com/express/feature/image/qr-code-generator`

After creating the QR code, scan it from a phone that is not connected to your computer. The page should open publicly from the Vercel URL.

## Netlify Alternative

You can also deploy this static site to Netlify.

### Drag-and-Drop

1. Go to `https://app.netlify.com/drop`.
2. Drag this entire folder into the upload area.
3. Netlify will create a public HTTPS URL.
4. Use that HTTPS URL for the QR code.

### GitHub Deploy

1. Push this folder to GitHub.
2. In Netlify, click `Add new site`.
3. Choose `Import an existing project`.
4. Select the GitHub repository.
5. Use these settings:
   - Build command: leave empty
   - Publish directory: `.`
6. Deploy.

## QR Code Checklist

- Do not use `localhost`.
- Do not use `127.0.0.1`.
- Do not use a Windows file path.
- Use the final public HTTPS URL from Vercel or Netlify.
- Test the QR code from a mobile phone before printing.
