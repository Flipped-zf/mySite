/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-27 09:51:47
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-02-27 22:45:42
 * @FilePath: \my-site\app\routes\home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Route } from './+types/home'
// import { Welcome } from "../welcome/welcome";
import { Kv } from '~/webgl/kv'
import { AnimatedBeamDemo } from '~/magicui/test'
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <div className="warp w-full min-h-[100vh]">
      <div className="relative w-full h-screen">
        <Kv />
      </div>
      <div className="relative w-full h-screen">
        <AnimatedBeamDemo></AnimatedBeamDemo>
      </div>
    </div>
  )
}
