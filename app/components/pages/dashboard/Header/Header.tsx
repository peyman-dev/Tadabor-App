"use client"

import React from 'react'
import BorderedButton from '../../../common/buttons/bordered-button'
import Profile from './Profile'
import HeaderTitle from './Title'
import moment from 'moment-jalaali'

const Header = () => {
  moment.loadPersian({ dialect: 'persian-modern' })
  const today = moment()
  const persianDay = today.format('jD')
  const persianDate = today.format('jD jMMMM jYYYY')
  const gregorianDate = today.format('D MMMM YYYY')

  return (
    <header className='container py-2.5 w-full mx-auto flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <BorderedButton>
          <p className='!text-xl pt-1 font-IRANSans-Bold'>
            {persianDay}
          </p>
        </BorderedButton>
        <div className='text-xs'>
          {persianDate} <br />
          {gregorianDate}
        </div>
      </div>
      <HeaderTitle />
      <Profile />
    </header>
  )
}

export default Header