# Contributing to FitRations

This is a small project with a small team, so the process is intentionally lightweight, but a few rules keep `main` clean and releases reproducible.

## Roles

| Role | Can do |
|------|--------|
| **Owner** | Merge PRs, cut releases, push tags, push images to the registry |
| **Contributor** | Open issues, create branches/forks, open PRs |

Contributors do **not** push to `main`, push tags, or push Docker images. Releases are handled only by the owner (see [Releasing a New Version](#releasing-a-new-version)).

---

## Issues

Use issues to track bugs, feature ideas, and questions. Search existing issues before opening a new one.

### Bug reports

Include:

- A short, descriptive title
- What you expected to happen vs. what actually happened
- Steps to reproduce
- Version (image tag or commit), host OS, and how you're running it (Docker / dev compose)
- Relevant logs or screenshots

### Feature requests

Include:

- The problem you're trying to solve (not just the solution)
- A rough idea of the proposed behavior
- Any alternatives you considered

### Labels (suggested)

`bug`, `enhancement`, `question`, `docs`, `maintenance`, `blocked`, `good first issue`

### Workflow

1. Open an issue (or comment on an existing one) **before** starting significant work.
2. Wait for a quick thumbs-up from the owner on scope for anything non-trivial.
3. Reference the issue in your branch name and PR (`Closes #12`).

---

## Pull Requests

Pull requests are **restricted**:

- `main` is protected. No direct pushes, including from the owner, except for the version bump commit described below.
- All changes land via PR and require **owner approval** before merging.
- PRs must pass any automated checks (build, lint, tests) before merge.
- Force-pushes to `main` are not allowed.

### Branching

Branch from the latest `main` and use a descriptive name:

```
feature/<short-description>
fix/<short-description>
docs/<short-description>
maint/<short-description>
```

Example: `feature/tdee-calculator`, `fix/backup-restore-path`

### Commit messages

Use a short prefix so history is easy to scan:

| Prefix | Use for |
|--------|---------|
| `Feat:` | New functionality |
| `Fix:` | Bug fixes |
| `Docs:` | Documentation only |
| `Refactor:` | Code restructuring with no behavior change |
| `Maint:` | Dependencies, tooling, version bumps, housekeeping |
| `Security:` | Security specific hotfixes

Keep the subject line under about 72 characters, written in the imperative mood ("Add backup endpoint", not "Added backup endpoint").

### Pull request checklist

Before requesting review, confirm:

- [ ] The PR is linked to an issue (or explains why not)
- [ ] The change is focused: one logical change per PR
- [ ] The app builds and runs locally (`docker compose -f docker-compose.build.yaml up --build --no-cache`)
- [ ] New or changed behavior has been tested manually (or with tests, where they exist)
- [ ] Docs/README are updated if behavior or setup changed
- [ ] **Version numbers and `CHANGELOG.md` are NOT touched** (the owner handles these at release time)

### Review and merge

- The owner reviews PRs and may request changes.
- Respond to feedback by pushing new commits to the same branch.
- The owner merges (squash or merge commit at the owner's discretion).
- Delete the branch after merge.

---

## Releasing a New Version

> **Owner only.** Contributors should not perform these steps.

Releases follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

### 1. Finish and commit all code changes for this release

Whatever functionality is going into the next version should be fully committed first. This is just normal day-to-day commits and merged PRs, with nothing version-specific yet.

### 2. Update `CHANGELOG.md`

Add the new version heading with today's date and a summarized list of changes since the last version.

- Feature: Implemented calendar date selection for journal entries
- Feature: Include pre and post workout options for meal types
- Feature: TDEE calculator now allows for imperial or metric calculations
- Bugfix: Fixed rounding error with partial portions in macro calculations
- UI: Various UI styling changes for organization and more flexible layout

```markdown
## [X.X.X] - YYYY-MM-DD
### Added
- ...
### Changed
- ...
### Fixed
- ...
```

### 3. Update version references

Update every place the version appears:

- [ ] Image tag in `docker-compose.yaml`
- [ ] Image tag in `docker-compose.dev.yaml`
- [ ] Any version number in the README's installation instructions or badges
- [ ] The `version` field in the FastAPI app in `main.py`
- [ ] The version number on the app's main page (bottom right)

### 4. Commit the version bump

Make a **dedicated commit**, separate from the feature commits, so the version bump is a clean, identifiable point in history:

### 5. Push the commit

`main` now reflects everything that will become the new version.

### 6. Tag the commit

```bash
git tag -a vX.X.X -m "Short summary of the release"
git push github vX.X.X
```

The tag now points at the exact commit from step 4, the one containing the correct version numbers everywhere.

### 7. Build the Docker image, tagged to match

Build from that same tagged commit so the image contents and the Git tag are guaranteed to correspond to the same source. Make sure the working tree is clean and the on the tagged commit (`git status`, `git describe --tags`).


### 8. Push the image to the registry

The new version matched image is pushed to the registry.

### 9. Create the GitHub Release

Create a release from the `vX.X.X` tag. The release notes can mirror or summarize the `CHANGELOG.md` entry from step 2.

### Release checklist (quick copy)

- [ ] 1. All feature/fix commits are in `main`
- [ ] 2. `CHANGELOG.md` updated
- [ ] 3. Version references updated (compose files, README, `main.py`, UI)
- [ ] 4. Dedicated `Maint: bump version to X.X.X` commit
- [ ] 5. Pushed to GitHub
- [ ] 6. Annotated tag created and pushed to both remotes
- [ ] 7. Image built from the tagged commit
- [ ] 8. Image pushed to GHCR
- [ ] 9. GitHub Release published

---

## Questions

Not sure about something? Open an issue with the `question` label.
