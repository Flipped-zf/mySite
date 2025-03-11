/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 21:36:15
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 16:15:07
 * @FilePath: /mySite/app/reactbits/ScrollVelocityDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ScrollVelocity from '~/components/reactbits/ScrollVelocity'

export function ScrollVelocityDemo() {
  return (
    <ScrollVelocity
      texts={['React Vue', 'Three.js GSAP']}
    />
  )
}
