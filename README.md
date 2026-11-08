# dsh-plugin-mfgabc

Repository: https://github.com/moldkey/dsh-plugin-mfgabc

Read-only mfgabc.com tools for DeepSeek Harness: standards pages, industrial city guides, process clusters, and cross-border compliance pages.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

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
