import React, { useEffect, useState } from 'react'

const useLocal = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const jsonVal = localStorage.getItem(key)
        if (jsonVal !== null) return JSON.parse(jsonVal)

        if (typeof defaultValue == 'function') return defaultValue()
        else return defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    })

    return [value, setValue]

}

export default useLocal