import { Title, Transition, UnstyledButton } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"


const transLive = {
  out: { left: 0, top: 0, opacity: 0, },
  in: { left: "-150%", top: "-4rem", opacity: 100 },
  common: {},
  transitionProperty: "left, top, opacity"
}
const transPodcast = {
  out: { left: 0, top: 0, opacity: 0, },
  in: { left: "-350%", top: 0, opacity: 100 },
  common: {},
  transitionProperty: "left, top, opacity"
}

export default function MobileNavBar() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="relative">
      <Transition mounted={showOptions} transition={transLive} duration={100} timingFunction="ease">
        {(transition) => (
          <UnstyledButton
            style={{ ...transition }}
            className="absolute text-white">
            <Title className='hover:text-white'>Live</Title>
          </UnstyledButton>
        )}
      </Transition>
      <Transition mounted={showOptions} transition={transPodcast} duration={100} timingFunction="ease">
        {(transition) => (
          <UnstyledButton
            style={{ ...transition }}
            className="absolute -left-[350%] top-0 text-white">
            <Title className='hover:text-white'>Podcasts</Title>
          </UnstyledButton>
        )}
      </Transition>
      <UnstyledButton
        className="p-2"
        onClick={() => setShowOptions(!showOptions)}>
        <div className="text-white">
          {showOptions ? <IconChevronRight size={42} /> : <IconChevronLeft size={42} />}
        </div>
      </UnstyledButton>
    </div >
  )
}
