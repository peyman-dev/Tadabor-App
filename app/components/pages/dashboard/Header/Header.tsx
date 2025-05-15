
"use client"

import React from 'react'
import BorderedButton from '../../../common/buttons/bordered-button'
import Profile from './Profile'
import HeaderTitle from './Title'

const Header = () => {
  return (
    <header className='container py-2.5 w-full mx-auto flex items-center justify-between'>
      <div>
        <BorderedButton>
          نهضت <br />
          تدبر
        </BorderedButton>
      </div>
      <HeaderTitle />
      <Profile />
    </header>
  )
}

export default Header