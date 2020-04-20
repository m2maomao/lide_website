import { useState, useEffect } from 'react'
import http from '@/axios/http'

export const useFetch = (url, data) => {
  const [state, setState] = useState({ ...data })

  useEffect(() => {
    setState((state) => ({ ...state }))
    http.get(url).then((data) => {
      if (data.status === 200) {
        setState((prevState) => ({
          ...prevState,
          ...data.data,
        }))
      }
    })
  }, [url])

  return state
}
