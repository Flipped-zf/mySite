/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-10 20:38:55
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-10 22:04:12
 * @FilePath: /mySite/app/routes/self.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Kv } from '~/webgl/kv'
import type { Route } from './+types/home'
import { TextPressureDemo } from '~/reactbits/TextPressureDemo'
import { InteractiveHoverButtonDemo } from '~/magicui/InteractiveHoverButtonDemo'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'tommy' },
    { name: 'description', content: "Welcome to Tommy's website!" },
  ]
}

export default function Self() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // 你的动画代码
        // ScrollTrigger.create({
        //   trigger: '#self-info',
        //   scrub: true,
        //   markers: true,
        //   start: 'top top',
        //   end: '+=300%',
        //   pin: true,
        //   onEnter() {
        //     console.log('enter')
        //   },
        //   onUpdate() {
        //     console.log('123')
        //   },
        // })
      }, containerRef) // 将上下文限制在容器内

      return () => ctx.kill()
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div id="app" className="w-full">
      <section ref={containerRef} id="self-info" className="w-full h-screen">
        <Kv />
        <div className="tit absolute top-0 left-0 w-full h-full pointer-events-none">
          <TextPressureDemo></TextPressureDemo>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center translate-y-[-100%]">
          <InteractiveHoverButtonDemo></InteractiveHoverButtonDemo>
        </div>
      </section>
      <section id="self-projects" className="w-full h-screen">
        <h1>Projects</h1>
      </section>
      <section id="self-contact" className="w-full h-screen">
        <h1>Contact</h1>
      </section>
    </div>
  )
}
