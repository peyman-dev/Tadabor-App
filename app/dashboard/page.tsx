import React from 'react'
import Container from '../components/pages/dashboard/Main/Container'
import MediaSection from '../components/pages/dashboard/Main/media-section'
import VerseSection from '../components/pages/dashboard/Main/Verse/VerseSection'
import Description from '../components/pages/dashboard/Main/Description/Description'

const DashboardPage = () => {

  return (
      <Container>
        <MediaSection />
        <VerseSection />
        <Description />
      </Container>
  )
}

export default DashboardPage