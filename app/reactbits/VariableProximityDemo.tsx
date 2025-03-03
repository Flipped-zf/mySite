/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 21:40:06
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-03 21:47:33
 * @FilePath: /mySite/app/reactbits/VariableProximityDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef } from 'react'
import VariableProximity from '~/components/reactbits/VariableProximity'

export function VariableProximityDemo() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <VariableProximity
        label={'Hover me! And then star React Bits on GitHub, or else...'}
        className={
          'variable-proximity-demo cursor-pointer text-center max-w-[20ch] leading-none !text-[4rem]'
        }
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        containerRef={containerRef}
        radius={100}
        falloff="linear"
      />
    </div>
  )
}
