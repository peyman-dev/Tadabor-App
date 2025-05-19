import React from 'react'
import Container from '../components/pages/dashboard/Main/Container'
import MediaSection from '../components/pages/dashboard/Main/media-section'
import VerseSection from '../components/pages/dashboard/Main/Verse/VerseSection'
import Description from '../components/pages/dashboard/Main/Description/Description'

const DashboardPage = () => {

  return (
    <Container>
      <MediaSection />
      <div className='md:w-1/2 space-y-[42px] w-full'>
        <VerseSection />
        <Description />
      </div>
    </Container >
  )
}

export default DashboardPage