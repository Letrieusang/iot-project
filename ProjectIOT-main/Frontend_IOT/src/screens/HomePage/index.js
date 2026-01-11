import React from 'react'
import Footer from '../../layout/components/NavBottom/Footer'
import NavTop from '../../layout/components/NavTop/NavTop'
import Cards from './components/Cards'
import WorldMap from './components/WorldMap'

const HomePage = () => {
  return (
    <>
      <NavTop />
      <WorldMap />
      {/*<div className="blob"></div>*/}
      <Cards />
      <Footer />

    </>
  )
}
export default HomePage
