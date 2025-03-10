/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 20:38:55
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-10 16:48:01
 * @FilePath: /mySite/app/reactbits/TextPressureDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TextPressure from '~/components/reactbits/TextPressure'

export function TextPressureDemo() {
  return (
    <div style={{ position: 'relative', height: 'auto' }}>
      <TextPressure
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
}
