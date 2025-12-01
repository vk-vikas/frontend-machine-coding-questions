import { useState } from 'react'

import './App.css'
import Stopwatch2 from './components/StopWatch-reqAnimationFrame'
import Stopwatch from './components/StopWatch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Stopwatch2/>
     <Stopwatch />
    </>
  )
}

export default App
