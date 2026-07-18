# Uploading this project to GitHub

A step-by-step guide for getting `hitster-game` onto GitHub safely.

> ⚠️ **Before you start:** your `.env` file holds real secrets
> (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`). It is already listed in
> `.gitignore`, so it will **not** be uploaded. Never remove it from
> `.gitignore` or force-add it. If a secret ever does get pushed, treat it as
> compromised and rotate it.

The local repo is already initialized and committed for you. You just need to
create the remote on GitHub and push.

---

## Step 1 — Create an empty repo on GitHub

1. Go to <https://github.com/new>.
2. **Repository name:** `hitster-game` (or anything you like).
3. Choose **Private** or **Public**.
4. **Do NOT** check "Add a README", "Add .gitignore", or "Add a license" —
   this project already has them. You want a completely empty repo.
5. Click **Create repository**.

GitHub then shows a page with a URL like:

- HTTPS: `https://github.com/<you>/hitster-game.git`
- SSH: `git@github.com:<you>/hitster-game.git`

---

## Step 2 — Connect your local repo and push

In the project folder, run (swap in your URL from Step 1):

```bash
cd /Users/roee.krupman/hitster-game
git remote add origin https://github.com/<you>/hitster-game.git
git push -u origin main
```

- If prompted for a password over HTTPS, use a **Personal Access Token**, not
  your GitHub password (see below).
- After the first push, future updates are just `git push`.

That's it — refresh the GitHub page and your code is there.

---

## Authentication options

### Option A — HTTPS with a Personal Access Token (simplest)

1. Create a token: <https://github.com/settings/tokens> → **Generate new token
   (classic)** → tick the **`repo`** scope → generate → copy it.
2. When `git push` asks for a password, paste the token.
3. To avoid re-entering it, cache it in the macOS keychain:
   ```bash
   git config --global credential.helper osxkeychain
   ```

### Option B — SSH keys

1. Generate a key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "roee.krupman@riskified.com"
   ```
2. Copy the public key and add it at
   <https://github.com/settings/keys>:
   ```bash
   pbcopy < ~/.ssh/id_ed25519.pub
   ```
3. Use the **SSH** remote URL in Step 2 (`git@github.com:...`).

### Option C — GitHub CLI (`gh`) — fewest steps, needs an install

`gh` is not currently installed. If you'd rather use it:

```bash
brew install gh          # requires Homebrew
gh auth login            # follow the browser prompt
gh repo create hitster-game --private --source=. --remote=origin --push
```

That single `gh repo create` creates the remote AND pushes in one command —
you can skip Steps 1 and 2 entirely.

---

## Making changes later

```bash
git add -A
git commit -m "Describe your change"
git push
```

## Verifying no secrets leaked

At any time, confirm `.env` is not tracked:

```bash
git ls-files | grep -x ".env" && echo "⚠️ .env IS tracked — remove it!" || echo "✅ .env is safe"
```
