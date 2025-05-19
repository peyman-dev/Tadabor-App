"use client"
import React from 'react'

const Error = ({error, digest} : {error: any, digest: any}) => {
    console.log(error, digest)
    console.log("Error page")
  return (
    <div>Error</div>
  )
}

export default Error