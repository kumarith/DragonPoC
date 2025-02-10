import { useState } from 'react'
import './App.css'
import Monster from './components/Monster'

function App() {

  const [figher1, setFigher1] = useState<Monster | null>(null);
  const [figher2, setFigher2] = useState<Monster | null>(null);


  return (
    <>
      <h1>Dragon Flight</h1>
      <Monster onMonsterChange={setFigher1}/>
      <Monster onMonsterChange={setFigher2}/>
      <h2>Figther 1: {figher1?.name}</h2>
      <h2>Figther 2: {figher2?.name}</h2>

    </>
  )
}

export default App
