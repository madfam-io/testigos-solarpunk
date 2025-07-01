# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-07-01

### Added

- **Comprehensive Documentation Suite**

  - Fully bilingual README.md with complete project overview
  - i18n.md - Complete internationalization guide with examples
  - themes.md - Theme system documentation with customization guide
  - TESTING.md - 6x matrix testing strategy documentation
  - Component catalog with 30+ documented components
  - Added troubleshooting sections to all major docs
  - Code examples for every documented feature

- **Health Check System**

  - i18n health check validating translation completeness
  - Theme system health check for consistency
  - Performance health check with Lighthouse integration
  - Accessibility health check for WCAG AAA compliance
  - Comprehensive health check runner with HTML reports

- **Developer Experience**
  - Enhanced TypeScript types for all health check scripts
  - Added @types/pa11y for accessibility testing
  - Improved error handling with instanceof checks
  - Fixed all ESLint errors (0 errors)
  - Fixed all TypeScript errors (0 errors)

### Changed

- **Documentation Improvements**

  - Enhanced README with badges for coverage, Lighthouse, i18n, and themes
  - Added visual project structure diagrams
  - Expanded 3-phase strategy with timelines and KPIs
  - Added comprehensive troubleshooting guides
  - Improved API documentation with complete examples

- **Code Quality**
  - Fixed unused variable warnings in 20+ English pages
  - Updated useTranslations to support template parameters
  - Fixed strict boolean expression errors throughout
  - Improved type exports with 'export type' syntax
  - Commented out unused imports to maintain clean codebase

### Fixed

- **TypeScript Issues**

  - Resolved type annotation errors in health check scripts
  - Fixed pa11y type mapping for AccessibilityIssue
  - Fixed route type assertions in i18n health check
  - Resolved deprecated MediaQueryList.addListener warnings
  - Fixed ESLint unused CSS selector warnings

- **Build & Testing**
  - All tests passing (141 tests)
  - Maintained 99.73% test coverage
  - 0 TypeScript errors
  - 0 ESLint errors

## [0.3.0](https://github.com/madfam-io/testigos-solarpunk/compare/v0.2.1...v0.3.0) (2025-06-30)

### Features

- add manual release workflow for controlled versioning ([85744a4](https://github.com/madfam-io/testigos-solarpunk/commit/85744a43f56a6b4071d35a75c2f7d473fca6121b))

### Bug Fixes

- update workflow configuration for better compatibility ([d6fa1de](https://github.com/madfam-io/testigos-solarpunk/commit/d6fa1de04cdfa9eb0eeb97601f26af9d5846152e))

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
