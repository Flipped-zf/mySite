/*
 * @Author: Tommy 468369392@qq.com
 * @Date: 2025-03-03 21:05:05
 * @LastEditors: Tommy 468369392@qq.com
 * @LastEditTime: 2025-03-03 21:44:01
 * @FilePath: /mySite/app/reactbits/RotatingTextDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LayoutGroup, motion } from 'framer-motion'
import RotatingText from '~/components/reactbits/RotatingText'

export function RotatingTextDemo() {
  return (
    <div className="flex justify-center">
      <LayoutGroup>
        <motion.div className="flex items-center font-black gap-[0.2em]" layout>
          <motion.span
            className=""
            layout
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            Creative{' '}
          </motion.span>
          <RotatingText
            texts={['React', 'Bits', 'Is', 'Cool!']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.div>
      </LayoutGroup>
    </div>
  )
}
