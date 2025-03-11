/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-10 20:38:55
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 17:54:10
 * @FilePath: /mySite/app/routes/self.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Kv } from '~/webgl/kv'
import type { Route } from './+types/home'
import { TextPressureDemo } from '~/reactbits/TextPressureDemo'
import type { TextPressureDemoHandle } from '~/reactbits/TextPressureDemo'
import { InteractiveHoverButtonDemo } from '~/magicui/InteractiveHoverButtonDemo'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RoleModel from '~/demo/Role'
import { RotatingTextDemo } from '~/reactbits/RotatingTextDemo'
import { ScrollVelocityDemo } from '~/reactbits/ScrollVelocityDemo'
import { BlurScrollEffect } from '~/uilts/blurScrollEffect'
import { AnimatedBeamDemo } from '~/magicui/AnimatedBeamDemo'
import { CardStackDemo } from '~/aceternity/CardStackDemo'
import { BackgroundBeamsWithCollisionDemo } from '~/aceternity/BackgroundBeamsWithCollisionDemo'
import { BackgroundBoxesDemo } from '~/aceternity/BackgroundBoxesDemo'

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
  const container2Ref = useRef(null)

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
            // markers: true,
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

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container2Ref.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.pinText',
            pinSpacing: false,
            // snap: [0, 1],
            markers: true,
          },
        })
      }, container2Ref)

      return () => ctx.kill()
    },
    { scope: container2Ref, dependencies: [] }
  )

  useEffect(() => {
    document.querySelectorAll("[data-effect-1]").forEach(el => {
      new BlurScrollEffect(el as HTMLElement);
    });
  },[])


  return (
    <div id="app" className="w-full">
      <section ref={containerRef} id="kv" className="w-full h-screen">
        <Kv ref={kvRef} />
        <div className="tit absolute top-0 left-0 w-full h-full pointer-events-none">
          <TextPressureDemo ref={textPressureRef}></TextPressureDemo>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center translate-y-[-100%]">
          <RotatingTextDemo></RotatingTextDemo>
          <InteractiveHoverButtonDemo></InteractiveHoverButtonDemo>
        </div>
      </section>

      <section ref={container2Ref} id="self-projects" className="w-full h-[300vh] relative">
        <div className="pinText bg-white/60 backdrop-blur-md w-full h-auto relative shadow-lg z-20">
          <ScrollVelocityDemo></ScrollVelocityDemo>
        </div>
        <div className="bg-background z-6 overflow-hidden">
          <div className="flex justify-around my-[100px] ">
            <AnimatedBeamDemo></AnimatedBeamDemo>
            <CardStackDemo></CardStackDemo>
          </div>
          <BackgroundBoxesDemo></BackgroundBoxesDemo>
          <BackgroundBeamsWithCollisionDemo></BackgroundBeamsWithCollisionDemo>

          {/* <div className="text-2xl" data-effect-1>Public opinion is the aggregate result of individual opinions—now uniform, now conflicting—of the men and women who make up society or any group of society. In order to understand public opinion, one must go back to the individual who makes up the group.</div> */}
        </div>
      </section>
      <section id="self-contact" className="w-full h-screen relative">
        <h1>Contact</h1>
      </section>
      <section id="self-contact" className="w-full h-screen relative">
        <h1>Contact</h1>
      </section>
    </div>
  )
}
