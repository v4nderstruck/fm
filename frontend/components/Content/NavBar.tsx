import { MediaQuery, Title, UnstyledButton } from '@mantine/core';

export default function NavBar() {
  return (
    <>
        <div className='flex flex-col'>
          <UnstyledButton>
            <Title className='hover:text-white'>Live</Title>
          </UnstyledButton>
          <UnstyledButton>
            <Title className='hover:text-white'>Podcasts</Title>
          </UnstyledButton>
        </div>
    </>
  )
}
