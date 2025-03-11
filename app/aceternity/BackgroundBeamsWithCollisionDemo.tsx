/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-03-04 15:40:36
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 17:52:47
 * @FilePath: \mySite\app\aceternity\BackgroundBeamsWithCollisionDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { BackgroundBeamsWithCollision } from "~/components/aceternity/BackgroundBeamsWithCollision";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <div className="w-full h-[80%]">
        <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          What&apos;s cooler than Beams?{" "}
          
        </h2>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
