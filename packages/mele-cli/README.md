# mele-cli

> 一个脚手架工具

## 安装

```shell
npm install -g mele-cli
```

## 查看版本信息 :white_check_mark:

### 使用

```shell
mele -v
mele --version
```

## 查看脚手架信息 :white_check_mark:

### 使用

```shell
mele info
mele i
```

## 显示命令帮助 :white_check_mark:

### 使用

```shell
# 全部
mele h
mele
# 单个(比如: mele h info)
mele h [命令]
```

## 设置默认语言 :white_check_mark:

### 使用

```shell
mele language
mele l
```

### 自定义

#### 添加语言

> 目前只提供`en`和`zh-CN`两种语言，可以根据需求添加语言文件

- 查看I18N目录

```shell
mele i
```

- 在目录下添加语言文件

```json
{
  "MELE_DESC": "一个前端脚手架工具",
  "MELE_EXIT": "退出命令",
  "MELE_CHECKBOX_ONE": "至少要选一个",
  "MELE_PACKAGE_MANAGER": "请选择包管理工具",
  "MELE_USAGE": "<命令> [参数]",
  "MELE_VERSION_DESC": "查看版本信息",
  ......
}
```

## 创建一个新项目 :x:

### 使用

```shell
mele new <项目名>
mele n <项目名>
```

## 向现有项目添加补丁 :white_check_mark:

> 每次创建新项目，都需要手动安装eslint、husky、prettier等一系列插件，还要配置文件

### 使用

```shell
mele patch
mele p
```

### 自定义

#### 包管理器

> 目前只提供`npm`和`pnpm`两种包管理器，需要增加包管理器可以配置`cli.config.json`文件

```json
{
  // 配置文件格式验证
  "$schema": "./schemas/cli.config.schema.json",
  "packageManager": [
    {
      // 包管理器名
      "name": "npm",
      // 包管理器命令
      "cmd": {
        // 安装开发依赖
        "installD": "npm install -D",
        // 安装生产依赖
        "installS": "npm install -S",
        // 安装全局依赖
        "installG": "npm install -g",
        // 卸载依赖
        "uninstall": "npm uninstall"
      }
    },
    {
      // 同上
      "name": "pnpm",
      "cmd": {
        "installD": "pnpm add -D",
        "installS": "pnpm add -S",
        "installG": "pnpm add -g",
        "uninstall": "pnpm remove"
      }
    },
    {
      // 同上
      "name": "pnpm(Monorepo)",
      "cmd": {
        "installD": "pnpm add -D -w",
        "installS": "pnpm add -S -w",
        "installG": "pnpm add -g",
        "uninstall": "pnpm remove"
      }
    }
  ]
}
```

#### 补丁选项

- [husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/lint-staged/lint-staged#readme)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [typescript](https://www.typescriptlang.org/)
- [@changesets/cli](https://github.com/changesets/changesets/tree/main#readme)

> 以上是目前默认提供的补丁选项

##### 添加补丁选项配置

> `patch.config.json`文件中配置

```json
{
  // 配置文件格式验证
  "$schema": "./schemas/patch.config.schema.json",
  "patch": [
    {
      // 选项名
      "nodeName": "husky",
      // 此选项需要的依赖(与dependency目录中的<依赖名>.v.json文件关联)
      "dependency": [
        {
          "name": "husky",
          "dep": []
        }
      ]
    },
    {
      // 选项名
      "nodeName": "eslint",
      "dependency": [
        {
          // 选项依赖名
          "name": "eslint",
          // 没有深度依赖,直接安装
          "dep": []
        },
        {
          "name": "globals",
          // globals依赖eslint,当前项目依赖或者选项依赖有eslint才会安装
          "dep": ["eslint"]
        },
        {
          "name": "@eslint/js",
          // @eslint/js依赖eslint,当前项目依赖或者选项依赖有eslint才会安装
          "dep": ["eslint"]
        },
        {
          "name": "eslint-config-prettier",
          // eslint-config-prettier依赖eslint和prettier,当前项目依赖或者选项依赖有eslint和prettier才会安装
          "dep": ["eslint", "prettier"]
        },
        {
          "name": "eslint-plugin-prettier",
          // eslint-plugin-prettier依赖eslint和prettier,当前项目依赖或者选项依赖有eslint和prettier才会安装
          "dep": ["eslint", "prettier"]
        },
        {
          "name": "@typescript-eslint/parser",
          // eslint-plugin-prettier依赖eslint和typescript,当前项目依赖或者选项依赖有eslint和typescript才会安装
          "dep": ["eslint", "typescript"]
        },
        {
          "name": "@typescript-eslint/eslint-plugin",
          // @typescript-eslint/eslint-plugin依赖eslint和typescript,当前项目依赖或者选项依赖有eslint和typescript才会安装
          "dep": ["eslint", "typescript"]
        },
        {
          "name": "eslint-plugin-vue",
          // eslint-plugin-vue依赖eslint和vue,当前项目依赖或者选项依赖有eslint和vue才会安装
          "dep": ["eslint", "vue"]
        }
      ]
    },
    {
      // 同上
      "nodeName": "prettier",
      "dependency": [
        {
          "name": "prettier",
          "dep": []
        }
      ]
    }
  ]
}
```

##### 添加补丁选项要的依赖配置

- 查看配置文件、依赖文件和模板文件目录

```shell
mele i
```

- `<依赖名>.v.json`文件中配置(🔴配置规则是 `<依赖名>.v.json`)

```json
{
  // 依赖名<必填>
  "name": "husky",
  "v": {
    // node版本号(PS: 当前项目node大版本比较, >= 18)<必填>
    "18": {
      // 依赖版本(PS: 在依赖的 package.json 中找到 engines 查看是否版本符合要求)<必填>
      "v": "9.1.4",
      // 安装完后运行的初始化命令[可选]
      "init": ["npx husky init", "echo npm run husky:test > .husky/pre-commit"],
      // 需要注入到当前项目package.json中的npm script脚本[可选]
      "pkgInject": {
        "scripts": {
          "husky:test": "echo \"Error: husky test\" && exit 1",
          "prepare": "husky install"
        }
      },
      // 依赖配置文件[可选]
      "configFile": [
        {
          // 配置文件名<必填>
          "name": ".gitignore",
          // 配置文件后缀<必填>
          "type": "",
          // 输出路径(PS: 当前项目根目录为 ".")<必填>
          "output": ".",
          // 模板文件路径(PS: 以模板文件目录为 "." ,可以使用 mele i 命令来查看路径)<必填>
          "templates": ["patch/default/husky/.gitignore.ejs"]
        },
        {
          "name": "pre-commit",
          "type": "",
          "output": "./.husky",
          "templates": ["patch/default/husky/pre-commit.v9.ejs"]
        }
      ]
    },
    // 同上
    "15": {
      "v": "8.0.3",
      "init": [
        "npm run prepare",
        "echo #!/usr/bin/env sh >> .husky/pre-commit",
        "echo . \"$(dirname -- \"$0\")/_/husky.sh\" >> .husky/pre-commit",
        "npx husky add .husky/pre-commit \"npm run husky:test\""
      ],
      "pkgInject": {
        "scripts": {
          "husky:test": "echo \"Error: husky test\" && exit 1",
          "prepare": "husky install"
        }
      },
      "configFile": [
        {
          "name": ".gitignore",
          "type": "",
          "output": ".",
          "templates": ["patch/default/husky/.gitignore.ejs"]
        },
        {
          "name": "pre-commit",
          "type": "",
          "output": "./.husky",
          "templates": ["patch/default/husky/pre-commit.ejs"]
        }
      ]
    }
  }
}
```

#### 补丁配置文件模板

脚手架会向`ejs`模板暴露出`package.json`中的所有依赖对象,便于在`ejs`模板上使用`locals`实现单独的依赖
生成单独的配置, `ejs`具体语法参考官网(https://ejs.co/)

- 查看模板文件目录

```shell
mele i
```

- `<配置文件名>.ejs`通过`locals`来访问脚手架暴露出来的依赖对象(🔴配置规则是 `<配置文件名>.ejs`)

```json
{
  "**/*.{js,ts,json}": [
  <% if (locals.eslint) { %>"eslint . --fix"<% } %>
  <% if (locals.eslint && locals.prettier) { %>,<% } %>
  <% if (locals.prettier) { %>"prettier . --write"<% } %>
  ]
}
```

## 生成文件 :x:

```shell
mele generate
mele g
```
