/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-02 17:39:21
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-02 23:03:37
 * @FilePath: /mySite/tailwind.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', "./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    // rest of the code
    colors: {
      ok: '#1fb6ff'
    },
  },
  plugins: [
    // rest of the code
    addVariablesForColors,
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
