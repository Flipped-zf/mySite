/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-28 14:10:20
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-02-28 14:28:07
 * @FilePath: \mySite\app\reactbits\TiltedCardDemo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TiltedCard from '~/components/reactbits/TiltedCard';

export  function TiltedCardDemo() {
  return (
    <TiltedCard
      imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
      altText="Kendrick Lamar - GNX Album Cover"
      captionText="Kendrick Lamar - GNX"
      containerHeight="300px"
      containerWidth="300px"
      imageHeight="300px"
      imageWidth="300px"
      rotateAmplitude={12}
      scaleOnHover={1.2}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      overlayContent={
        <p className="tilted-card-demo-text text-white tracking-[-.5px] bg-[#0006] rounded-[15px] m-8 py-[0.5rem] px-[1rem] font-black shadow-[0_5px_30px_#06060659]" >
          Kendrick Lamar - GNX
        </p>
      }
    />
  )
}
  