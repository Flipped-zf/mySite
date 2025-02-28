/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-28 09:58:03
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-02-28 10:20:59
 * @FilePath: \mySite\app\magicui\MeteorDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Meteors } from '~/components/magicui/meteors'

export function MeteorDemo() {
  return (
    <div className="relative flex h-[500px] w-[50%] flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Meteors
      </span>
    </div>
  )
}
