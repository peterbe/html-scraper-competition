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

### Benchmark with dump omitted

```sh
hyperfine --warmup 6 "bun run src/bun-webview.ts https://www.peterbe.com > webview.html" "bun run src/bun-puppeteer.ts https://www.peterbe.com  > puppeteer.html" "./obscura fetch https://www.peterbe.com --dump original > obscura-original.html"
```

```text
Summary
  ./obscura fetch https://www.peterbe.com --dump original > obscura-original.html ran
    2.81 ± 0.27 times faster than bun run src/bun-puppeteer.ts https://www.peterbe.com  > puppeteer.html
    3.35 ± 0.92 times faster than bun run src/bun-webview.ts https://www.peterbe.com > webview.html
```

## Measuring peak memory usage

Tested like this on macos:

```sh
➜  html-scraper-competition git:(main) /usr/bin/time -l  bun run src/bun-webview.ts https://www.peterbe.com > webview.html
        0.57 real         0.01 user         0.01 sys
            17711104  maximum resident set size
```

Run a bunch of times, median collected:

- `bun run src/bun-webview.ts https://www.peterbe.com`: 17216.00 KB
- `bun run src/bun-puppeteer.ts https://www.peterbe.com`: 192656.00 KB
- `./obscura fetch https://www.peterbe.com --dump original`: 10320.00 KB

`obscura` uses 40% less than Bun WebView.
`obscura` uses 95% less than Puppeteer.
