import { useState, useEffect } from "react";
import "./App.css";
import Monster from "./components/Monster";

function App() {
  const [fighter1, setFighter1] = useState<Monster | null>(null);
  const [fighter2, setFighter2] = useState<Monster | null>(null);
  const [winnerNames, setWinnerNames] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0); // refresh new mosnter componen ( as now has reduced health )
  const [likelyWinner, setLikelyWinner] = useState<string | null>(null);

  const countWins = (fighter: string): number => {
    return winnerNames.filter((name) => name === fighter).length;
  };

  const handleFight = async () => {
    //alert(fighter1.name +" is Fighting with "+ fighter2.name);
    if (!fighter1 || !fighter2) {
      return alert("Both fighters must be selected!");
    }
    if (fighter1.name == fighter2.name) {
      return alert("Both fighters must be different!");
    }

    try {
      const response = await fetch(
        `http://localhost:3000/fight?fighter1=${fighter1.name}&fighter2=${fighter2.name}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.winner && data.winner !== "TBD") {
        alert(`The winner is: ${data.winner}`);
        setWinnerNames((prev) => [...prev, data.winner]);
      }
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Error in fight:", err);
    }
  };

  useEffect(() => {
    const fighter1Wins = countWins(fighter1?.name || "");
    const fighter2Wins = countWins(fighter2?.name || "");
    var likelyWinner = null;
    if (fighter1Wins > 0 || fighter2Wins > 0) {
      likelyWinner =
        fighter2Wins > fighter1Wins
          ? fighter2?.name || null
          : fighter1?.name || null;
    }
    setLikelyWinner(likelyWinner);
  }, [winnerNames, fighter2, fighter1]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Dragon Flight</h1>

        <table className="w-full table-auto border-collapse ">
          <tbody>
            <tr>
              <td className=" p-4  ">
                <Monster
                  onMonsterChange={setFighter1}
                  noOfWins={countWins(fighter1?.name || "")}
                  refreshKey={refreshKey}
                />
              </td>
              <td className="p-4 flex flex-col items-center justify-center">
                <button
                  onClick={handleFight}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full"
                >
                  Fight
                </button>
                {winnerNames.length > 0 && likelyWinner && (
                  <p className="text-sm text-gray-500 mt-2">
                    Likely Winner: {likelyWinner}
                  </p>
                )}
              </td>
              <td className=" p-4">
                <Monster
                  onMonsterChange={setFighter2}
                  noOfWins={countWins(fighter1?.name || "")}
                  refreshKey={refreshKey}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {winnerNames.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Winners:</h2>
          <ul>
            {winnerNames.map((winner, index) => (
              <li key={index}>{winner}</li>
            ))}
          </ul>
          <a href="/winners" className="text-blue-500">
            Details </a>
        </div>
      )}
    </>
  );
}

export default App;
