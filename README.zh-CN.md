# dsh-plugin-mfgabc

[![DSHIO.ORG](https://img.shields.io/badge/DSHIO.ORG-inspection%20passed-blue)](https://dshio.org/standards/10/)
[![DSH test report](https://img.shields.io/badge/DSH-test%20report-brightgreen)](https://deepseekbase.com/ecosystem/plugin-tests/)

Repository: https://github.com/moldkey/dsh-plugin-mfgabc

mfgabc.com 只读查询插件：标准页、产业带城市、工艺集群、跨境合规、任意站内页。

English docs: [README.md](README.md).

## 标准与检验（DSHIO.ORG）

- **标准发布方：DSHIO.ORG** — DSHIO/T 10—2026（DSH 插件标准）。
- **检验通过**：已通过 DSHIO/T 10 检验，检验报告发布在 deepseekbase.com（install / list / mount / boot，DSH 0.2.2-rc.1）。
- **检验范围**：`dsh.bundle.patch`、patch 结构、`engines.dsh` 只写下限、工具契约、权限声明（仅 `network`）、无红线权限组合。
- **不是认证**：DSHIO/T 32 认证尚未启用；这是带检验报告的检验结果，不是认证。

## 工具

| 工具 | 作用 |
|---|---|
| `mfgabc_standard` | 标准号 → 标准页（状态/标题/链接） |
| `mfgabc_city` | 城市产业带页 |
| `mfgabc_process` | 工艺集群页（工艺 + 城市） |
| `mfgabc_compliance` | 跨境合规页（品类 + 国家） |
| `mfgabc_page` | 任意站内路径查询 |

## 安装

```bash
dsh plugin --profile web add @liangjiehappy/dsh-plugin-mfgabc
```

## 配置

```yaml
- insert:
    - id: dsh-plugin-mfgabc
      name: "@liangjiehappy/dsh-plugin-mfgabc"
      config:
        baseUrl: "https://www.mfgabc.com"
```

## 权限声明

- 只对 `www.mfgabc.com` 发 HTTPS GET
- 不读写文件、不读凭证、不执行 shell
- 只读：不提交表单、不登录、不写数据

## 限制

- mfgabc 以静态页为主，工具返回页面状态/标题/链接，不做全文提取
- 标准页 slug 由标准号规范化生成；个别标准可能 404，工具会如实返回状态码
- 站点对 AI 训练爬虫有 403 策略；本插件以普通 UA 访问公开页面
