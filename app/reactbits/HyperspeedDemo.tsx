/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-28 15:09:08
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-02 18:59:59
 * @FilePath: \mySite\app\reactbits\HyperspeedDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Hyperspeed from '~/components/reactbits/Hyperspeed/index'

export function HyperspeedDemo() {
  return (
    <div className="w-full h-[66vh] bg-black relative flex items-center flex-col justify-center">
      <p className="absolute font-black text-[4rem] text-transparent top-[1.5rem] bg-gradient-to-b from-gray-600 to-gray-900 bg-clip-text">
        Click Me
      </p>
      <div className="absolute w-full h-full top-0 left-0">
        <Hyperspeed></Hyperspeed>
      </div>
    </div>
  )
}
