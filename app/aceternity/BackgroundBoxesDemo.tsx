/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-02 17:27:53
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-02 17:28:41
 * @FilePath: /mySite/app/aceternity/BackgroundBoxesDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import React from 'react'
import { Boxes } from '~/components/aceternity/BoxesCore'
import { cn } from '~/lib/utils'

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Framer motion is the best animation library ngl
      </p>
    </div>
  )
}
