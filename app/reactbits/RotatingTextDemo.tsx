/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 21:05:05
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 15:21:30
 * @FilePath: /mySite/app/reactbits/RotatingTextDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LayoutGroup, motion } from 'framer-motion'
import RotatingText from '~/components/reactbits/RotatingText'

export function RotatingTextDemo() {
  return (
    <div className="flex justify-center mb-4">
      <LayoutGroup>
        <motion.div className="flex items-center font-black gap-[0.2em]" layout>
          <motion.span
            className="text-white"
            layout
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            你好{' '}
          </motion.span>
          <RotatingText
            texts={['欢迎来到', 'Tommy', '的', '个人网站!']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.div>
      </LayoutGroup>
    </div>
  )
}
