import React from 'react'
import Container from '../components/pages/dashboard/Container'
import MediaSection from '../components/pages/dashboard/media-section'
import VerseSection from '../components/pages/dashboard/Verse/VerseSection'
import Description from '../components/pages/dashboard/Description/Description'

const DashboardPage = () => {
  
  
  return (
    <Container>
      <MediaSection />
      <div className='md:w-1/2 space-y-[42px] w-full **:mx-auto'>
        {/* <VerseSection />
        <Description /> */}
      </div>
    </Container >
  )
}

export default DashboardPage