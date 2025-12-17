# Contributing to URL Shortener

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/SWETANKSINHA23/locknlink_main.git`
3. Create a feature branch: `git checkout -b feat/your-feature`
4. Install dependencies: `npm run install-deps`

## Development Workflow

### Before Making Changes

1. Ensure you're on the latest main branch:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. Create a new branch:
   ```bash
   git checkout -b feat/your-feature
   # or
   git checkout -b fix/bug-description
   ```

### Making Changes

1. **Write tests first** (TDD approach recommended)
2. Implement your changes
3. Ensure all tests pass
4. Follow code style guidelines

### Code Style Guidelines

#### JavaScript/TypeScript
- Use ES6+ features
- Single quotes for strings
- 2 spaces for indentation
- Semicolons required
- Max line length: 100 characters

#### Formatting
We use Prettier for automatic formatting:
```bash
npm run format
```

#### Linting
```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

### Commit Message Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

**Examples:**
```bash
feat(auth): add JWT refresh token support
fix(url): resolve redirect loop for password-protected URLs
docs(readme): update installation instructions
test(backend): add integration tests for URL controller
```

### Running Tests

#### Before Submitting PR

**Required:** All tests must pass before submitting a PR.

```bash
# Backend tests (must pass)
cd backend
npm test
npm run test:coverage

# Frontend tests (must pass)
cd frontend
npm test
npm run coverage

# E2E tests (recommended)
npm run test:e2e

# Performance tests (optional)
k6 run load-test/url-shortening-load.js
```

#### Test Coverage Requirements

- Backend: Minimum 80% coverage
- Frontend: Minimum 75% coverage
- New features must include tests
- Bug fixes should include regression tests

### Pre-commit Hooks

Husky will automatically run on commit:
- ESLint on staged files
- Prettier formatting
- TypeScript type checking (frontend)

If hooks fail, fix the issues before committing.

## Pull Request Process

1. **Update documentation** if needed
2. **Run all tests** and ensure they pass
3. **Update CHANGELOG.md** with your changes
4. **Push to your fork**:
   ```bash
   git push origin feat/your-feature
   ```
5. **Create Pull Request** on GitHub
6. **Fill out PR template** completely
7. **Wait for CI checks** to pass
8. **Address review feedback** promptly

### PR Checklist

- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] Commit messages follow conventions
- [ ] No merge conflicts
- [ ] CI checks passing
- [ ] Reviewed own code changes

## Testing Guidelines

### Unit Tests

- Test individual functions/components
- Mock external dependencies
- Focus on edge cases
- Use descriptive test names

```javascript
describe('UrlController', () => {
  it('should create short URL with custom alias', async () => {
    // Test implementation
  });
});
```

### Integration Tests

- Test API endpoints end-to-end
- Use test database (MongoDB Memory Server)
- Test authentication flows
- Verify error handling

### E2E Tests

- Test complete user workflows
- Use Playwright for browser automation
- Test across multiple browsers
- Include happy path and error scenarios

## Project-Specific Guidelines

### Backend

- Use async/await (no callbacks)
- Validate all inputs
- Handle errors properly
- Add JSDoc comments for complex functions
- Use Mongoose for database operations

### Frontend

- Use TypeScript for type safety
- Create reusable components
- Use React hooks (no class components)
- Handle loading and error states
- Ensure accessibility (a11y)

### Docker

- Keep images small
- Use multi-stage builds
- Don't include secrets in images
- Update base images regularly

## Getting Help

- Check existing issues and PRs
- Read documentation thoroughly
- Ask questions in issue comments
- Join community discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
