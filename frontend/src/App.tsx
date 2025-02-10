import { useState } from 'react'
import './App.css'
import Monster from './components/Monster'

function App() {

  const [figher1, setFigher1] = useState<Monster | null>(null);
  const [figher2, setFigher2] = useState<Monster | null>(null);
  const handleFight = () => {
    console.log("Fight started between", figher1?.name, "and", figher2?.name);
  };

  return (
    <>
      <h1>Dragon Flight</h1>
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Dragon Flight</h1>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-center">Fighter 1</th>
            <th className="border p-2 text-center">Fight</th>
            <th className="border p-2 text-center">Fighter 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">
              <Monster onMonsterChange={setFigher1} />
            </td>
            <td className="border p-4 flex items-center justify-center">
              <button
                onClick={handleFight}
                className="px-6 py-2 bg-blue-500 text-white rounded-full"
              >
                Fight
              </button>
            </td>
            <td className="border p-4">
              <Monster onMonsterChange={setFigher2} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    </>
  )
}

export default App
