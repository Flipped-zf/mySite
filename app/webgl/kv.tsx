import ParallaxImage2 from "./ParallaxImage2";
import ball from './img/ball.jpg?url';
import ballMap from './img/ball-map.jpg?url'
import { forwardRef, useImperativeHandle, useRef } from 'react'

/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-27 10:52:18
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 10:19:40
 * @FilePath: \my-site\app\webgl\kv.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const Kv = forwardRef((props, ref) => {
  const parallaxImageRef = useRef(null)

  useImperativeHandle(ref, () => ({
    startParallaxAnimation: () => {
      parallaxImageRef.current?.resumeRendering()
    },
    pauseParallaxAnimation: () => {
      parallaxImageRef.current?.pauseRendering()
    }
  }))

  return (
    <ParallaxImage2
    imageOriginal={new URL('./img/ball.jpg', import.meta.url).href}
    imageDepth={new URL('./img/ball-map.jpg', import.meta.url).href}
      horizontalThreshold={15}
      verticalThreshold={25}
      ref={parallaxImageRef}
    />
  )
})