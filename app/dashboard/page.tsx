import React from 'react'
import Container from '../components/pages/dashboard/Main/Container'
import Cover from '../components/pages/dashboard/Main/Cover'
import AudioPlayer from '../components/pages/dashboard/Main/AudioPlayer'
import VerseSection from '../components/pages/dashboard/Main/Verse/VerseSection'
import Description from '../components/pages/dashboard/Main/Description/Description'

const DashboardPage = async () => {


  return (
    <Container>
      {/* <Cover /> */}
      <AudioPlayer />
      <VerseSection />
      <Description />
    </Container>
  )
}

export default DashboardPage