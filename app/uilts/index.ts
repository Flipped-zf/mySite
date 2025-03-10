/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-03-10 17:16:41
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-10 21:43:37
 * @FilePath: \mySite\app\uilts\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import Lenis from '@studio-freight/lenis';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'; 
// import { Flip } from "gsap/Flip";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// let Flip;
// let ScrollTrigger:any;

/**
 * 创建并初始化 Lenis 平滑滚动实例
 * @param options Lenis 配置选项
 * @returns Lenis 实例
 */
export async function createSmoothScroll(options?: {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}) {
  // 创建 Lenis 实例，使用默认选项或传入的自定义选项
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    ...options,
  });

  gsap.registerPlugin(useGSAP);


  // await import("gsap/Flip").then((flipModule) => {
  //   Flip = flipModule.Flip;
  //   gsap.registerPlugin(Flip);
  // });

  // await import("gsap/ScrollTrigger").then((flipModule) => {
  //   ScrollTrigger = flipModule.ScrollTrigger;
  //   gsap.registerPlugin(ScrollTrigger);
  // });

  gsap.registerPlugin(Flip,ScrollTrigger);


  lenis.on('scroll', () => ScrollTrigger.update());

  // 设置 RAF 循环来更新 Lenis
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // 启动 RAF 循环
  requestAnimationFrame(raf);

  return lenis;
}

/**
 * 滚动到指定元素
 * @param lenis Lenis 实例
 * @param target 目标元素或选择器
 * @param options 滚动选项
 */
export function scrollTo(
  lenis: Lenis,
  target: string | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    lock?: boolean;
    onComplete?: () => void;
  }
) {
  lenis.scrollTo(target, options);
}
