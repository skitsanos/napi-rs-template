# NAPI-RS Template

> A production-ready template for building high-performance Node.js native modules using Rust and NAPI-RS.

[![CI](https://github.com/skitsanos/napi-rs-template/actions/workflows/ci.yml/badge.svg)](https://github.com/skitsanos/napi-rs-template/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![Rust](https://img.shields.io/badge/Rust-2021-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🚀 **Zero-cost abstractions** with NAPI-RS v3
- 🔒 **Memory safety** with Rust's ownership model
- ⚡ **High performance** with optimized release builds
- 🛡️ **Security-first** with overflow protection and input validation
- 🧪 **Comprehensive testing** with Node.js native test runner
- 🔧 **Cross-platform** CI/CD with GitHub Actions
- 📦 **Clean build artifacts** organized in `dist/` folder
- 🎯 **TypeScript definitions** auto-generated from Rust code

## Quick Start

### Using this Template

1. Click **"Use this template"** button on GitHub
2. Clone your new repository:
   ```bash
   git clone https://github.com/skitsanos/napi-rs-template.git
   cd napi-rs-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run tests:
   ```bash
   npm test
   ```

### Prerequisites

- **Node.js** ≥ 18.0.0
- **Rust** (latest stable)
- **npm** or **yarn**

## Project Structure

```
├── src/
│   └── lib.rs              # Rust source code with NAPI bindings
├── tests/
│   └── napi.test.js        # Node.js native test runner tests
├── dist/                   # Build artifacts (auto-generated)
│   ├── index.js            # JavaScript bindings
│   ├── index.d.ts          # TypeScript definitions
│   └── *.node             # Native binaries
├── .github/
│   └── workflows/
│       └── ci.yml          # Cross-platform CI/CD pipeline
├── Cargo.toml              # Rust project configuration
├── package.json            # Node.js project configuration
└── build.rs                # Build script
```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the native module in release mode |
| `npm run build:debug` | Build in debug mode for development |
| `npm test` | Run all tests using Node.js test runner |
| `npm run artifacts` | Generate platform-specific artifacts |
| `npm run universal` | Create universal binaries |

### Adding New Functions

1. **Define Rust function** in `src/lib.rs`:
   ```rust
   #[napi]
   pub fn my_function(input: String) -> Result<String> {
       // Your implementation
       Ok(format!("Processed: {}", input))
   }
   ```

2. **Add tests** in `tests/napi.test.js`:
   ```javascript
   test('should process input correctly', () => {
       assert.strictEqual(myFunction('test'), 'Processed: test');
   });
   ```

3. **Build and test**:
   ```bash
   npm run build
   npm test
   ```

### Best Practices

#### Security
- ✅ Use `checked_*` arithmetic methods for overflow protection
- ✅ Validate all inputs from JavaScript
- ✅ Return `Result<T>` for operations that can fail
- ✅ Add proper error handling with descriptive messages

#### Performance
- ✅ Use `#[inline]` for small, frequently called functions
- ✅ Leverage Rust's zero-cost abstractions
- ✅ Profile critical paths with `cargo bench`
- ✅ Consider `#[cold]` for error paths

#### Code Quality
- ✅ Write comprehensive documentation with `///`
- ✅ Include `# Errors` sections for fallible functions
- ✅ Add `#[must_use]` for functions returning values
- ✅ Use `cargo clippy` with pedantic warnings

## Configuration

### Cargo.toml Optimizations

The template includes production-ready optimizations:

```toml
[profile.release]
lto = true              # Link-time optimization
opt-level = 3           # Maximum optimization
debug = false           # No debug symbols
panic = "abort"         # Smaller binary size
strip = true            # Strip symbols
codegen-units = 1       # Better optimization
overflow-checks = true  # Security: detect overflows
```

### NAPI Configuration

```json
{
  "napi": {
    "binaryName": "demo-napi",
    "outputDir": "dist",
    "triples": {}
  }
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with verbose output
npm test -- --verbose

# Run specific test file
node --test tests/napi.test.js
```

### Test Structure

The template uses Node.js native test runner (Node ≥18) with:
- **Unit tests** for individual functions
- **Integration tests** for complete workflows
- **Error handling tests** for edge cases
- **Type validation tests** for JavaScript bindings

### Example Test

```javascript
describe('sum function', () => {
  test('should handle overflow protection', () => {
    assert.throws(() => {
      sum(2147483647, 1); // i32::MAX + 1
    }, {
      message: /Integer overflow in sum operation/
    });
  });
});
```

## CI/CD Pipeline

### GitHub Actions Workflow

The template includes a comprehensive CI/CD pipeline:

#### Manual Workflow Triggers

You can manually trigger the CI workflow using GitHub CLI:

```bash
# Trigger the workflow on current branch
gh workflow run ci.yml

# Trigger with debug mode enabled
gh workflow run ci.yml -f debug_enabled=true

# View workflow runs
gh run list

# Watch the latest run
gh run watch
```

- **Multi-platform testing**: Ubuntu, Windows, macOS
- **Node.js matrix**: Versions 18, 20, 22
- **Security auditing**: Automated dependency scanning
- **Native platform builds**: Linux x64, macOS x64/ARM64
- **Code quality**: Formatting, linting, and type checking

### Supported Platforms

| Platform | Architecture | Status |
|----------|-------------|---------|
| Linux | x64 | ✅ |
| macOS | x64, ARM64 (Apple Silicon) | ✅ |
| Windows | x64 (via test matrix) | ✅ |

## Deployment

### Publishing to npm

1. **Update version** in `package.json`
2. **Build artifacts**:
   ```bash
   npm run build
   npm run artifacts
   ```
3. **Publish**:
   ```bash
   npm publish
   ```

### Platform-specific Binaries

The template supports publishing platform-specific packages:

```bash
# Generate platform artifacts
npm run artifacts

# Publish with platform support
npm run prepublishOnly
```

## Performance

### Benchmarks

The template includes optimized configurations for:

- **Binary size**: Strip symbols, LTO, panic=abort
- **Runtime performance**: Aggressive optimization, single codegen unit
- **Security**: Overflow checks enabled in release builds
- **Memory usage**: Rust's zero-cost abstractions

### Profiling

```bash
# Install profiling tools
cargo install cargo-flamegraph

# Profile your functions
cargo flamegraph --bin your-binary
```

## Security

### Built-in Protections

- ✅ **Integer overflow detection** in release builds
- ✅ **Memory safety** via Rust ownership
- ✅ **Input validation** for all JavaScript inputs
- ✅ **Dependency auditing** in CI pipeline
- ✅ **Error boundary** handling

### Security Audit

```bash
# Install cargo-audit
cargo install cargo-audit

# Run security audit
cargo audit
```

## Troubleshooting

### Common Issues

1. **Build failures on Apple Silicon**:
   ```bash
   # Install Rust targets
   rustup target add aarch64-apple-darwin
   ```

2. **Node.js version conflicts**:
   ```bash
   # Check Node.js version
   node --version  # Should be ≥18
   ```

3. **Missing build tools on Windows**:
   ```bash
   # Install Visual Studio Build Tools
   npm install --global windows-build-tools
   ```

### Debug Build

```bash
# Build in debug mode for troubleshooting
npm run build:debug

# Check generated files
ls -la dist/
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
# Clone and setup
git clone https://github.com/skitsanos/napi-rs-template.git
cd napi-rs-template
npm install

# Run development checks
cargo fmt --all -- --check
cargo clippy --all-targets --all-features -- -D warnings
npm test
```

### GitHub CLI Integration

```bash
# Check workflow status
gh workflow list
gh run list --limit 5

# Trigger CI manually
gh workflow run ci.yml

# Create a pull request
gh pr create --title "feat: add new feature" --body "Description of changes"

# View PR checks
gh pr checks

# Merge PR after CI passes
gh pr merge --squash
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NAPI-RS](https://napi.rs/) - The foundation for Node.js ⚡ Rust bindings
- [Rust](https://www.rust-lang.org/) - Systems programming language
- [Node.js](https://nodejs.org/) - JavaScript runtime

## Related Projects

- [NAPI-RS Examples](https://github.com/napi-rs/napi-rs/tree/main/examples)
- [Node-API Documentation](https://nodejs.org/api/n-api.html)
- [Rust Performance Book](https://nnethercote.github.io/perf-book/)

---

⭐ **Star this repository** if you find it helpful!

**Need help?** [Open an issue](https://github.com/skitsanos/napi-rs-template/issues) or [start a discussion](https://github.com/skitsanos/napi-rs-template/discussions).