/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-02 17:27:53
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 22:34:53
 * @FilePath: /mySite/app/aceternity/BackgroundBoxesDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Boxes } from '~/components/aceternity/BoxesCore'
import { cn } from '~/lib/utils'
import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'

// // 注册 ScrollTrigger 插件
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger)
// }

export function BackgroundBoxesDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // 创建 ScrollTrigger
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%', // 当元素顶部到达视口 80% 位置时
          end: 'bottom 20%', // 当元素底部到达视口 20% 位置时
          onEnter: () => setIsVisible(true),
          onLeave: () => setIsVisible(false),
          onEnterBack: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
          markers: process.env.NODE_ENV === 'development', // 开发环境显示标记
        })
      }, containerRef)

      // 清理函数
      return () => ctx.revert()
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div
      ref={containerRef}
      className="h-96 relative z-10 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg"
    >
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {isVisible && <Boxes />}

      <h1 className={cn('md:text-4xl text-xl text-white relative z-10')}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-10">
        Framer motion is the best animation library ngl
      </p>
    </div>
  )
}
