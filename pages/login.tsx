import { useState } from "react";

export default function () {
  let [time, setTime] = useState(2)
  let build = true

  if (build) {
    setInterval(() => {
      setTime(time - 1)
    }, 1000)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <div>Building . . .</div>
        <div>Redirecting in {time} second(s)</div>
        <meta http-equiv="refresh" content="2; url=/" />
      </div>
    )
  }

  return (
    <>Lorem ipsum dolor sit amet.</>
  )
}