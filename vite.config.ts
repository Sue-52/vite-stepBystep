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
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";'
            }
        }
    }
})