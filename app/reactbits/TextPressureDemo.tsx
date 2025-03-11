/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 20:38:55
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-10 16:48:01
 * @FilePath: /mySite/app/reactbits/TextPressureDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { forwardRef, useImperativeHandle, useRef } from 'react'
import TextPressure from '~/components/reactbits/TextPressure'
import type { TextPressureHandle } from '~/components/reactbits/TextPressure'

// Define the handle type for the component
export interface TextPressureDemoHandle {
  pauseAnimation: () => void;
  resumeAnimation: () => void;
}

export const TextPressureDemo = forwardRef<TextPressureDemoHandle, {}>((props, ref) => {
  const textPressureRef = useRef<TextPressureHandle>(null);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    pauseAnimation: () => {
      textPressureRef.current?.pauseAnimation();
    },
    resumeAnimation: () => {
      textPressureRef.current?.resumeAnimation();
    }
  }));

  return (
    <div style={{ position: 'relative', height: 'auto' }}>
      <TextPressure
        ref={textPressureRef}
        text="Hello!"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#fff"
        strokeColor=""
        minFontSize={36}
        className='mix-blend-soft-light'
      />
    </div>
  )
})
