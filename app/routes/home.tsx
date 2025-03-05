/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-27 09:51:47
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-05 15:09:55
 * @FilePath: \my-site\app\routes\home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Route } from './+types/home'
// import { Welcome } from "../welcome/welcome";
import { Kv } from '~/webgl/kv'
import { AnimatedBeamDemo } from '~/magicui/AnimatedBeamDemo'
import { MeteorDemo } from '~/magicui/MeteorDemo'
import { OrbitingCirclesDemo } from '~/magicui/OrbitingCirclesDemo'
import { TiltedCardDemo } from '~/reactbits/TiltedCardDemo'
import { HyperspeedDemo } from '~/reactbits/HyperspeedDemo'
import { ThreeDCardDemo } from '~/aceternity/ThreeDCardDemo'
import { AnimatedPinDemo } from '~/aceternity/AnimatedPinDemo'
import { BackgroundBoxesDemo } from '~/aceternity/BackgroundBoxesDemo'
import { TextPressureDemo } from '~/reactbits/TextPressureDemo'
import { FuzzyTextDemo } from '~/reactbits/FuzzyTextDemo'
import { TrueFocusDemo } from '~/reactbits/TrueFocusDemo'
import { RotatingTextDemo } from '~/reactbits/RotatingTextDemo'
import { ScrollVelocityDemo } from '~/reactbits/ScrollVelocityDemo'
import { VariableProximityDemo } from '~/reactbits/VariableProximityDemo'
import { BackgroundBeamsWithCollisionDemo } from '~/aceternity/BackgroundBeamsWithCollisionDemo'
import { CardStackDemo } from '~/aceternity/CardStackDemo'
import { CompareDemo } from '~/aceternity/CompareDemo'
import { CoverDemo } from '~/aceternity/CoverDemo'
import { ExpandableCardDemo } from '~/aceternity/ExpandableCardDemo'
import { FloatingDockDemo } from '~/aceternity/FloatingDockDemo'
import { FollowingPointerDemo } from '~/aceternity/FollowingPointerDemo'
import { LinkPreviewDemo } from '~/aceternity/LinkPreviewDemo'
import { WobbleCardDemo } from '~/aceternity/WobbleCardDemo'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <div className="warp w-full min-h-[100vh]">
      <div className="relative w-full h-screen">
        <Kv />
      </div>
      <div className="relative w-full">
        <AnimatedBeamDemo></AnimatedBeamDemo>
        <MeteorDemo></MeteorDemo>
        <OrbitingCirclesDemo></OrbitingCirclesDemo>
        {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          <div className="">ok</div>
          <div className="absolute">hello</div>
        </div> */}
      </div>
      <div className="relative w-full bg-ok">
        <TiltedCardDemo></TiltedCardDemo>
        <HyperspeedDemo></HyperspeedDemo>
        <TextPressureDemo></TextPressureDemo>
        <FuzzyTextDemo></FuzzyTextDemo>
        <TrueFocusDemo></TrueFocusDemo>
        <RotatingTextDemo></RotatingTextDemo>
        <ScrollVelocityDemo></ScrollVelocityDemo>
        <VariableProximityDemo></VariableProximityDemo>
      </div>
      <div className="relative w-full">
        <ThreeDCardDemo></ThreeDCardDemo>
        <AnimatedPinDemo></AnimatedPinDemo>
        <BackgroundBoxesDemo></BackgroundBoxesDemo>
        <BackgroundBeamsWithCollisionDemo></BackgroundBeamsWithCollisionDemo>
        <CardStackDemo></CardStackDemo>
        <CompareDemo></CompareDemo>
        <CoverDemo></CoverDemo>
        <ExpandableCardDemo></ExpandableCardDemo>
        <FloatingDockDemo></FloatingDockDemo>
        <FollowingPointerDemo></FollowingPointerDemo>
        <LinkPreviewDemo></LinkPreviewDemo>
        <WobbleCardDemo></WobbleCardDemo>
      </div>
    </div>
  )
}
