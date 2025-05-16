import React from 'react'
import db from './../../../db.json'

const useTestData = () => {
    // console.log()

  return JSON.parse(db?.body)
}

export default useTestData