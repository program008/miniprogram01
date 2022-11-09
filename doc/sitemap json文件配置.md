# sitemap 配置
小程序根目录下的 `sitemap.json `文件用来配置小程序及其页面是否允许被微信索引。
## 例1：
所有页面都会被微信索引（默认情况）
```json{.line-numbers}
{
  "rules":[{
    "action": "allow",
    "page": "*"
  }]
}
```
## 例2：
配置 path/to/page 页面不被索引，其余页面允许被索引
```json
{
  "rules":[{
    "action": "disallow",
    "page": "path/to/page"
  }]
}
```
## 例3：
配置 path/to/page 页面被索引，其余页面不被索引
```json
{
  "rules":[{
    "action": "allow",
    "page": "path/to/page"
  }, {
    "action": "disallow",
    "page": "*"
  }]
}
```
## 例4：
包含 a 和 b 参数的 path/to/page 页面会被微信优先索引，其他页面都会被索引，例如：

- path/to/page?a=1&b=2 => 优先被索引
- path/to/page?a=1&b=2&c=3 => 优先被索引
- path/to/page => 被索引
- path/to/page?a=1 => 被索引
其他页面都会被索引
```json
{
  "rules":[{
    "action": "allow",
    "page": "path/to/page",
    "params": ["a", "b"],
    "matching": "inclusive"
  }, {
    "action": "allow",
    "page": "*"
  }]
}
```

## 例5：
- path/to/page?a=1&b=2 => 优先被索引
- path/to/page?a=1&b=2&c=3 => 优先被索引
- path/to/page => 不被索引
- path/to/page?a=1 => 不被索引
- 其他页面由于命中第二条规则，所以不会被索引
- 由于优先级的问题，第三条规则是没有意义的

```json
{
  "rules":[{
    "action": "allow",
    "page": "path/to/page",
    "params": ["a", "b"],
    "matching": "inclusive"
  }, {
    "action": "disallow",
    "page": "*"
  }, {
    "action": "allow",
    "page": "*"
  }]
}
```
**注：没有 sitemap.json 则默认所有页面都能被索引**

**注：{"action": "allow", "page": "*"} 是优先级最低的默认规则，未显式指明 "disallow" 的都默认被索引**
