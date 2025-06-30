# 🎯 Versioning Strategy

This project uses a **controlled release strategy** optimized for AI-assisted development and meaningful version numbers.

## Version Bump Criteria

### 🔵 Patch Version (0.0.1) - Feature Implementation

**When to use**: Complete features worthy of tracking

- ✅ AI-implemented full features (new components, pages, services)
- ✅ Significant functionality additions
- ✅ New integrations or capabilities
- ✅ Performance optimizations with measurable impact
- ❌ **NOT** for: minor fixes, typos, small style adjustments, documentation

### 🟢 Minor Version (0.1.0) - Feature Set Completion

**When to use**: Completion of related feature groups

- ✅ Complete feature sets (e.g., entire authentication system)
- ✅ Major UI/UX overhaul of a section
- ✅ New content management capabilities
- ✅ API additions or significant expansions
- ✅ Project phase completion

### 🔴 Major Version (1.0.0) - Transformative Changes

**When to use**: Fundamental project changes

- ✅ Complete architectural overhaul
- ✅ Breaking changes to existing functionality
- ✅ Major platform migrations
- ✅ Production-ready milestone achievements
- ✅ Fundamental changes to project direction

## Release Triggers

Releases are **NOT** automatic on every commit. Instead, they are triggered by:

### 1. Explicit Release Commits

```bash
# Trigger a patch release (0.0.1)
git commit -m "release: implement character management system"

# Trigger a minor release (0.1.0)
git commit -m "feat!: complete phase 1 - viral sketches platform"

# Include MINOR RELEASE in commit body
git commit -m "feat: podcast platform implementation

MINOR RELEASE: Complete podcast management system with player"

# Trigger a major release (1.0.0)
git commit -m "refactor: migrate to new architecture

BREAKING CHANGE: Complete platform rewrite"
```

### 2. Manual Release Workflow

Use GitHub Actions UI to trigger releases:

1. Go to Actions → Manual Release
2. Choose version type (patch/minor/major)
3. Add optional release notes
4. Run workflow

## What Doesn't Trigger Releases

These commits accumulate but don't trigger version bumps:

- `fix:` - Bug fixes (unless using `release:` prefix)
- `docs:` - Documentation updates
- `style:` - Code formatting
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks
- Regular commits without conventional commit prefixes

## Examples

```bash
# These DON'T trigger releases (changes accumulate):
git commit -m "fix: typo in navigation"
git commit -m "docs: update README"
git commit -m "style: format code"
git commit -m "update dependencies"

# These DO trigger releases:
git commit -m "release: AI-powered content recommendation engine"  # → 0.0.1
git commit -m "feat!: complete sketch production pipeline"         # → 0.1.0
git commit -m "feat: new platform architecture

BREAKING CHANGE: All APIs have changed"                          # → 1.0.0
```

## Release Process

### Automatic (via commit message):

1. Make your changes and commit normally
2. When ready to release, create a release commit with appropriate trigger
3. Release Please will create a PR
4. Merge the PR to create the release

### Manual (via GitHub UI):

1. Go to Actions → Manual Release
2. Select version bump type
3. Add release notes (optional)
4. The workflow creates a release commit and triggers Release Please

## Best Practices

1. **Batch small changes**: Let minor fixes accumulate without releasing
2. **Release meaningful features**: Each version bump should represent real value
3. **Use manual releases**: When you want explicit control over timing
4. **Document in commit**: Use the release commit to summarize what's included
5. **Follow semantic meaning**: Ensure version numbers reflect actual impact
