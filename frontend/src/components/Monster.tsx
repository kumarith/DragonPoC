import { useEffect, useState } from "react";

interface Monster {
  name: string;
  strength: number;
  height: number;
  type: string;
  size: string;
  health: number;
}

interface MonsterProps {
  onMonsterChange: (monster: Monster | null) => void;
  refreshKey: number;
  noOfWins?: number;
}

const Monster: React.FC<MonsterProps> = ({
  onMonsterChange,
  refreshKey,
  noOfWins,
}) => {
  const [monsters, setMonsters] = useState<string[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<string>("");
  const [monsterDetails, setMonsterDetails] = useState<Monster | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/monsterlist")
      .then((res) => res.json())
      .then((data) => setMonsters(data.monsters))
      .catch((err) => console.error("Error fetching monsters:", err));
  }, []);

  useEffect(() => {
    if (selectedMonster) {
      fetch(`http://localhost:3000/monster?name=${selectedMonster}`)
        .then((res) => res.json())
        .then((data) => {
          setMonsterDetails(data || null), onMonsterChange(data || null);
        }) // update resepcitve fighter in parent ( figher1,2..)
        .catch((err) => console.error("Error fetching monster details:", err));
      console.log("details", monsterDetails);
    }
  }, [selectedMonster, refreshKey]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg flex flex-col">
      <select
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={selectedMonster}
        onChange={(e) => setSelectedMonster(e.target.value)}
      >
        <option value="">select a monster</option>
        {monsters.map((monster) => (
          <option key={monster} value={monster}>
            {monster}
          </option>
        ))}
      </select>

      {monsterDetails && (
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">{monsterDetails.name} (won {noOfWins} times ) </h3>
       

          <div className="grid grid-cols-2 gap-2">
            <p className="font-medium text-left">Type:</p>
            <p className="text-left">{monsterDetails.type}</p>

            <p className="font-medium text-left">Strength:</p>
            <p className="text-left">{monsterDetails.strength}</p>

            <p className="font-medium text-left">Height:</p>
            <p className="text-left">{monsterDetails.height}m</p>

            <p className="font-medium text-left">Size:</p>
            <p className="text-left">{monsterDetails.size}</p>

            <p className="font-medium text-left">Health:</p>
            <p className="text-left">{monsterDetails.health}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monster;
