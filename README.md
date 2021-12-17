---
title: vite-stepBystep
---

## vite-stepBystep

<center>vite + vue3 + vue-router + vuex + jest + typescript + scss + eslint/prettier + git hooks</center>

### Vite

- 搭建脚手架

~~~shell
npm init @vite/js 项目名
~~~

- 选择语言 **vue**
- 选择 **vue-ts**
- 进入项目目录

~~~shell
cd ./项目名
~~~

- 安装依赖

~~~shell
npm install
~~~

- 开启服务

~~~shell
npm run dev
~~~

### Typescript

- 无需安装，在选择 `vue-ts` 之后，会自动安装
- 配置 `tsconfig.json`

~~~json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": [
      "esnext",
      "dom"
    ],
    "baseUrl": "./",
    "paths": {
      "@": [
        "src"
      ],
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ]
}
~~~

- 配置 `vite.config.ts` - 配置`@`定位到`src`目录

~~~typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const pathResolve = (pathStr: string): string => {
  return path.resolve(__dirname, pathStr);
};

export default defineConfig({
    define: {
        'process.env': {}
    },
    plugins: [vue()],
    resolve: {
      alias: [{ find: "@", replacement: pathResolve("./src") }],
    },
})
~~~

### scss

- 安装 `scss` 依赖

~~~shell
npm install sass sass-loader -D
~~~

- 配置 `vite.config.ts` 文件-设置公共样式

~~~typescript
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";'
            }
        }
    }
~~~

### eslint/prettier

- 安装依赖

~~~shell
# eslint
npm i typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
# prettier
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
~~~

- 创建 `.eslintrc.js` 文件

~~~javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    'prettier/prettier': ['error',{
      endOfLine: "auto", // 忽略行尾序列
    },],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/camelcase': 'error',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 100
        },
        multiline: {
          max: 1
        }
      }
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__ /*.{j,t}s?(x)',
        '**/tests/unit /**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ],
  globals: {
    defineProps: 'readonly'
  }
}
~~~

- 创建 `prettier.config.js` 文件

~~~javascript
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 未尾逗号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'none', // 未尾分号
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf'
}
~~~

- 创建 `.prettierignore` 文件

~~~txt
node_modules
.DS_Store
dist
~~~

- 创建 `.prettierrc` 文件

~~~json
{
  "semi": false,
  "eslintIntegration": true,
  "singleQuote": true,
  "endOfLine": "auto",
  "tabWidth": 2,
  "trailingComma": "none",
  "bracketSpacing": true
}
~~~

### jest 配置

- 安装依赖

~~~shell
# jest不支持esModule 需要安装 babel 解析
npm install @babel/core @babel/preset-env -D
​
# 支持 ts 文件
npm install @babel/preset-typescript -D
​
# babel-jest
npm install babel-jest -D
​
# 安装 jest 相关依赖
npm install jest ts-jest vue-jest @types/jest @vue/test-utils -D
# ts-jest ts文件 jest支持
# vue-jest vue文件 支持
# @types/jest 类型声明文件
# @vue/test-utils

npm install babel-jest@26.0.0 jest@26.0.0 ts-jest@26.4.4 -D #固定版本
~~~

- 测试代码

~~~vue
<template>
  <div>
    <h1 class="div">Vue app</h1>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "jestTest",
  setup() {
    let count = ref(0);
    function increment() {
      count.value++;
    }
    return {
      count,
      increment,
    };
  },
});
</script>
~~~

~~~javascript
// jest-单元测试
import { mount } from "@vue/test-utils";

import App from "@/views/Home/jestTest.vue";

test("uses mounts", async () => {
  const wrapper = mount(App);
  expect(wrapper.html()).toContain("Vue app");
  expect(wrapper.html()).toContain("Count: 0");

  await wrapper.find("button").trigger("click");
  expect(wrapper.html()).toContain("Count: 1");
});
~~~

### git hooks：husky / lint-staged

- 安装 `husky` 依赖

~~~shell
npm install --save-dev husky
~~~

- `package.json` 中添加 `husky` 字段配置

~~~json
"scripts": {
	"lint": "eslint src --fix --ext .js,.vue"
 },
 "husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run lint"
    }
  }
~~~

- 安装 `lint-staged` 依赖

~~~shell
npm install --save-dev lint-staged
~~~

- `package.json` 中添加 `lint-staged` 字段配置

~~~json
"lint-staged": {
   "src/**/*.{js,vue}": [
     "npm run lint",
     "git add"
   ]
},
~~~
