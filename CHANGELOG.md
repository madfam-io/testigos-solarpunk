# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0](https://github.com/madfam-io/testigos-solarpunk/compare/v0.2.1...v0.3.0) (2025-06-30)


### Features

* add Release Please automation for future releases ([85744a4](https://github.com/madfam-io/testigos-solarpunk/commit/85744a43f56a6b4071d35a75c2f7d473fca6121b))


### Bug Fixes

* remove deprecated package-name parameter from Release Please workflow ([d6fa1de](https://github.com/madfam-io/testigos-solarpunk/commit/d6fa1de04cdfa9eb0eeb97601f26af9d5846152e))

## [0.2.1] - 2025-06-30

### Fixed

- Resolved Vercel build errors by fixing Astro parser issues with proper TypeScript typing
- Fixed ESLint errors in dynamic routes (scripts and characters pages)
- Resolved Prettier formatting inconsistencies across 14 files
- Fixed GitHub Actions workflow issues
- Deprecated redundant Vercel deployment workflow in favor of automatic Git deployments
- Fixed vitest vulnerability by updating to v3.2.4

### Changed

- Improved test coverage from 85.84% to 97.16%
- Enhanced TypeScript type safety by eliminating `any` types
- Optimized cache testing with proper size management
- Improved CI/CD pipeline reliability

### Added

- Comprehensive tests for MagazineCutoutPlaceholderService
- Tests for URL builders, cache statistics, and expiry logic
- Better error handling in test suites

## [0.2.0] - Previous Release

### Added

- Initial implementation of DIY Magazine Cutout aesthetic
- Three-phase content strategy pages
- Character and script content collections
- Comprehensive test suite with Vitest and Playwright
- GitHub Actions CI/CD pipeline
- PWA support with offline capabilities

### Changed

- Complete UI overhaul with magazine cutout theme
- Improved navigation and content organization
- Enhanced mobile responsiveness

### Fixed

- Various accessibility improvements
- Performance optimizations for faster load times
