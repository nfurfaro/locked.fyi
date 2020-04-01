import { useState, useEffect } from "react"

export const useLocks = (locks = []) => {
  const [loading, setLoading] = useState(true)
  const [locked, setLocked] = useState(true)

  const unlock = () => {
    window.unlockProtocol.loadCheckoutModal()
  }

  useEffect(() => {
    if (!locks || !locks.length) {
      setLocked(false)
      setLoading(false)
      return
    }

    const eventHandler = (event) => {
      setLocked(event.detail === "locked")
      setLoading(false)
    }

    // Sets listener
    window.addEventListener("unlockProtocol", eventHandler)

    // resets the config
    window.unlockProtocol.resetConfig({
      locks: locks.reduce(
        (acc, x) => ({
          ...acc,
          [x]: {},
        }),
        {}
      ),
      callToAction: {},
    })

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener("unlockProtocol", eventHandler)
  }, [locks])
  return { loading, locked, unlock }
}

export default useLocks
