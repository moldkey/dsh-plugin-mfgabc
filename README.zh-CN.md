# dsh-plugin-mfgabc

[![DSHIO/T 10](https://deepseekbase.com/badge/std.svg)](https://dshio.org/10/) [![deepseekbase](https://deepseekbase.com/badge/liangjiehappy-dsh-plugin-mfgabc.svg)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mfgabc/)
[![deepseekbase endpoint](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeepseekbase.com%2Fbadge%2Fliangjiehappy-dsh-plugin-mfgabc.json&style=flat-square)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mfgabc/)

Repository: https://github.com/moldkey/dsh-plugin-mfgabc

mfgabc.com 只读查询插件：标准页、产业带城市、工艺集群、跨境合规、任意站内页。

English docs: [README.md](README.md).

## 标准与检验（DSHIO.ORG）

**符合性声明（DSHIO/T 10—2026 §8.1）**

```
符合 DSHIO/T 10—2026（基準 DSH 0.2.2-rc.1，靜態層 + 動態層）
檢驗日期：2026-11-08
環境指紋：dsh=0.2.2-rc.1;img=dsh-sandbox:5.0@sha256:d90b02baef228bb105d4817d1a7d23bdd6aec24f463cc7bc3d1fbb2e5af45c00;node=24.11.1;pnpm=9.15.9;mem=768m;cpu=1
重複次數：2 次（一致）
（總體判定為「有條件符合」：待人工判断 2 项（5.5.1、5.5.2））
```

- **覆盖范围**：静态层（T0）+ 动态层（T1–T4）。T5（工具调用）当前未实施，本插件不作此声明。
- **人工判断项**：DSHIO/T 10 的 5.5.1（描述质量）与 5.5.2（权限一致性）由开发者自行判定，本插件由作者确认。
- **不是认证**：这是检验报告，不是认证；DSHIO/T 32 认证尚未启用。

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
