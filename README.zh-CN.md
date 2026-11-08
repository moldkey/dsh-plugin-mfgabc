# dsh-plugin-mfgabc

mfgabc.com 只读查询插件：标准页、产业带城市、工艺集群、跨境合规、任意站内页。

English docs: [README.md](README.md).

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
