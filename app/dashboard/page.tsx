import React from 'react'
import Container from '../components/pages/dashboard/Main/Container'
import VideoPlayer from '../components/pages/dashboard/Main/VideoPlayer'
import VerseSection from '../components/pages/dashboard/Main/Verse/VerseSection'
import Description from '../components/pages/dashboard/Main/Description/Description'

const DashboardPage = () => {

  return (
    <Container>
      {/* <Cover /> */}
      <VideoPlayer />
      <VerseSection />
      <Description />
    </Container>
  )
}

export default DashboardPage