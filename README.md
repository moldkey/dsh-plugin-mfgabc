# dsh-plugin-mfgabc

[![DSHIO.ORG](https://img.shields.io/badge/DSHIO.ORG-inspection%20passed-blue)](https://dshio.org/standards/10/)
[![DSH test report](https://img.shields.io/badge/DSH-test%20report-brightgreen)](https://deepseekbase.com/ecosystem/plugin-tests/)

Repository: https://github.com/moldkey/dsh-plugin-mfgabc

Read-only mfgabc.com tools for DeepSeek Harness: standards pages, industrial city guides, process clusters, and cross-border compliance pages.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

## Standards & testing (DSHIO.ORG)

- **Standard body: DSHIO.ORG** — DSHIO/T 10—2026 (DSH plugin standard).
- **Inspection passed**: DSHIO/T 10 inspection passed; the test report is published on deepseekbase.com (install / list / mount / boot, DSH 0.2.2-rc.1).
- **Inspection scope**: manifest `dsh.bundle.patch`, patch structure, `engines.dsh` lower bound, tool contract, declared permissions (`network` only), no red-line permission combinations.
- **Not a certification**: DSHIO/T 32 certification is not enabled; this is an inspection result with a test report, not a certification.

- **DSHIO/T 10—2026** (DSH plugin standard): conformance checked — manifest `dsh.bundle.patch`, patch structure, `engines.dsh` lower bound, tool contract, declared permissions (`network` only), no red-line permission combinations.
- **DSH sandbox**: install / list / mount / boot tested on deepseekbase.com (DSH 0.2.2-rc.1).
- This is a conformance statement, not a certification: DSHIO/T 32 certification is not enabled yet.

## Tools

| Tool | Purpose |
|---|---|
| `mfgabc_standard` | Standard number → standards page (status/title/link) |
| `mfgabc_city` | Industrial city guide page |
| `mfgabc_process` | Process cluster page (process + city) |
| `mfgabc_compliance` | Cross-border compliance page (category + country) |
| `mfgabc_page` | Inspect any path on the site |

## Install

```bash
dsh plugin --profile web add @liangjiehappy/dsh-plugin-mfgabc
```

## Config

```yaml
- insert:
    - id: dsh-plugin-mfgabc
      name: "@liangjiehappy/dsh-plugin-mfgabc"
      config:
        baseUrl: "https://www.mfgabc.com"
```

Zero-config works; the default base URL is `https://www.mfgabc.com`.

## Permissions

- Outbound HTTPS GET to `www.mfgabc.com` only (configurable `baseUrl`)
- No file reads or writes, no credential access, no shell
- Read-only: no form submission, no login, no writes

## Limitations

- mfgabc is mostly static; tools return page status/title/link, not full text
- Standard slugs are normalized from the standard number; some may 404 and the real status is returned
- The site blocks AI training crawlers with 403; this plugin uses a plain UA for public pages
