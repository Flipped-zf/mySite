/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-02-27 10:57:06
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-02 22:57:02
 * @FilePath: /mySite/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import glsl from 'vite-plugin-glsl';
import autoprefixer from "autoprefixer"
import tailwindcss from  "@tailwindcss/postcss"

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), glsl()],
  css: {
    postcss: {
      plugins: [
        tailwindcss, 
        autoprefixer,
      ]
    }
  }
});
