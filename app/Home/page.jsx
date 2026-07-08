import React from 'react'
import HeroSection from '../Componant/Layout/Herosection'
import SchoolIntroduction from '../Componant/Layout/Schoolintroduction'
import PrincipalsMessage from '../Componant/Layout/Princepalmessage'
import NoticeBoard from '../Componant/Layout/Notistbord'
import UpcomingEvents from '../Componant/Layout/Upcomingevent'
import Achievements from '../Componant/Layout/Achivement'
import GalleryPreview from '../Componant/Layout/Gallary'
import Testimonials from '../Componant/Layout/Testemonial'
import SchoolLocation from '../Componant/Layout/Googlemap'
const Page = () => {
  return (
    <div>
      <HeroSection />
      <SchoolIntroduction />
      <PrincipalsMessage />
      <NoticeBoard />
      <UpcomingEvents />
      <Achievements />
      <GalleryPreview />
      <Testimonials />
      <SchoolLocation />
    </div>
  )
}

export default Page