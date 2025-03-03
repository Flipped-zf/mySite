/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 21:00:58
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-03 21:03:19
 * @FilePath: /mySite/app/reactbits/TrueFocusDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TrueFocus from '~/components/reactbits/TrueFocus'

export function TrueFocusDemo() {
  return (
    <TrueFocus
      sentence="True Focus 张帆"
      manualMode={true}
      blurAmount={5}
      borderColor="red"
      animationDuration={2}
      pauseBetweenAnimations={1}
    />
  )
}
