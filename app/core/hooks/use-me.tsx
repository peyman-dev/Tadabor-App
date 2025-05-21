import React from 'react'

const useMe = () => {
    const deviceId = localStorage.getItem("deviceId")
    return deviceId || 0
}

export default useMe