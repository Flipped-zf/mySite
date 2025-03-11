/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-10 20:38:55
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 10:43:29
 * @FilePath: /mySite/app/routes/self.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Kv } from '~/webgl/kv'
import type { Route } from './+types/home'
import { TextPressureDemo } from '~/reactbits/TextPressureDemo'
import type { TextPressureDemoHandle } from '~/reactbits/TextPressureDemo'
import { InteractiveHoverButtonDemo } from '~/magicui/InteractiveHoverButtonDemo'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Define the interface for the Kv component ref
interface KvRef {
  startParallaxAnimation: () => void;
  pauseParallaxAnimation: () => void;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'tommy' },
    { name: 'description', content: "Welcome to Tommy's website!" },
  ]
}

export default function Self() {
  const containerRef = useRef(null)
  const kvRef = useRef<KvRef>(null)
  const textPressureRef = useRef<TextPressureDemoHandle>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            pin: true,
            start: 'top top',
            markers: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress;
              
              if (progress > 0.5) {
                kvRef.current?.pauseParallaxAnimation();
                textPressureRef.current?.pauseAnimation();
              } else {
                kvRef.current?.startParallaxAnimation();
                textPressureRef.current?.resumeAnimation();
              }
            }
          },
        })
      }, containerRef)

      return () => ctx.kill()
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div id="app" className="w-full">
      <section ref={containerRef} id="self-info" className="w-full h-screen">
        <Kv ref={kvRef} />
        <div className="tit absolute top-0 left-0 w-full h-full pointer-events-none">
          <TextPressureDemo ref={textPressureRef}></TextPressureDemo>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center translate-y-[-100%]">
          <InteractiveHoverButtonDemo></InteractiveHoverButtonDemo>
        </div>
      </section>
      <section id="self-projects" className="w-full h-screen relative bg-background">
        <h1>Projects</h1>
      </section>
      <section id="self-contact" className="w-full h-screen relative">
        <h1>Contact</h1>
      </section>
    </div>
  )
}
