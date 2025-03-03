/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 20:54:49
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-03 20:57:24
 * @FilePath: /mySite/app/reactbits/FuzzyTextDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FuzzyText from '~/components/reactbits/FuzzyText'

export function FuzzyTextDemo() {
  return (
    <div className="bg-black">
      <FuzzyText baseIntensity={0.2}>404</FuzzyText>
    </div>
  )
}
