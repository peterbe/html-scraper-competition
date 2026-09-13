# html-scraper-competition

## Bun WebView

```sh
bun run src/bun-webview.ts https://www.peterbe.com > webview.html
```

## Bun Puppeteer

```sh
bun run src/bun-puppeteer.ts https://www.peterbe.com  > puppeteer.html
```

### Installing puppeteer

```sh
bun install
```

## Obscura

```sh
./obscura fetch https://www.peterbe.com --dump html > obscura.html
```

### Obscura raw original

```sh
./obscura fetch https://www.peterbe.com --dump original > obscura-original.html
```

### Installing obscura

```sh
# macOS Apple Silicon
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-aarch64-macos.tar.gz
tar xzf obscura-aarch64-macos.tar.gz
```

## Benchmark

```sh
hyperfine "bun run src/bun-webview.ts https://www.peterbe.com > webview.html" "bun run src/bun-puppeteer.ts https://www.peterbe.com  > puppeteer.html" "./obscura fetch https://www.peterbe.com --dump html > obscura.html" "./obscura fetch https://www.peterbe.com --dump original > obscura-original.html"
```

### Result

```text
Summary
  ./obscura fetch https://www.peterbe.com --dump original > obscura-original.html ran
    2.49 ± 0.22 times faster than bun run src/bun-webview.ts https://www.peterbe.com > webview.html
    2.90 ± 0.71 times faster than bun run src/bun-puppeteer.ts https://www.peterbe.com  > puppeteer.html
    5.04 ± 0.71 times faster than ./obscura fetch https://www.peterbe.com --dump html > obscura.html
```
