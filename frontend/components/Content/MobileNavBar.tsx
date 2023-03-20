import { Title, Transition, UnstyledButton } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"


const transLive = {
  out: { left: 0, top: 0, opacity: 0, },
  in: { left: "-45%", top: "-2.2rem", opacity: 100 },
  common: {},
  transitionProperty: "left, top, opacity"
}
const transPodcast = {
  out: { left: 0, top: 0, opacity: 0, },
  in: { left: "-100%", top: "0rem", opacity: 100 },
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
            <Title order={3} className='hover:text-white'>Live</Title>
          </UnstyledButton>
        )}
      </Transition>
      <Transition mounted={showOptions} transition={transPodcast} duration={100} timingFunction="ease">
        {(transition) => (
          <UnstyledButton
            style={{ ...transition }}
            className="absolute -left-[350%] top-0 text-white">
            <Title order={3} className='hover:text-white'>Podcasts</Title>
          </UnstyledButton>
        )}
      </Transition>
      <UnstyledButton
        onClick={() => setShowOptions(!showOptions)}>
        <div className="text-white flex items-center">
          {showOptions ? <IconChevronRight size={36} /> : <IconChevronLeft size={36} />}
          <Title order={2}>Zen.FM</Title>
        </div>
      </UnstyledButton>
    </div >
  )
}
