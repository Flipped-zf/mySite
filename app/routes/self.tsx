import { Kv } from '~/webgl/kv'
import type { Route } from './+types/home'
import { TextPressureDemo } from '~/reactbits/TextPressureDemo'
import { InteractiveHoverButtonDemo } from '~/magicui/InteractiveHoverButtonDemo'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'tommy' },
    { name: 'description', content: 'Welcome to Tommy\'s website!' },
  ]
}

export default function Self() { 
  return (
    <div id="app" className='w-full'>
      <section id="self-info" className='w-full h-screen'>
        <Kv />
        <div className="tit absolute top-0 left-0 w-full h-full pointer-events-none">
          <TextPressureDemo></TextPressureDemo>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center translate-y-[-100%]">
          <InteractiveHoverButtonDemo></InteractiveHoverButtonDemo>
        </div>
      </section>
      <section id="self-projects" className='w-full h-screen'>
        <h1>Projects</h1>
      </section>
      <section id="self-contact" className='w-full h-screen'>
        <h1>Contact</h1>
      </section>
    </div>
  )
}