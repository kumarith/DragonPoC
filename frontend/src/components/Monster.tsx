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
          setMonsterDetails(data || null);
          onMonsterChange(data || null);
        })
        .catch((err) => console.error("Error fetching monster details:", err));
    }
  }, [selectedMonster, refreshKey]);

  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Monster Selection card like style*/}
      <select
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        value={selectedMonster}
        onChange={(e) => setSelectedMonster(e.target.value)}
      >
        <option value="">Select a Monster</option>
        {monsters.map((monster) => (
          <option key={monster} value={monster}>
            {monster}
          </option>
        ))}
      </select>

      {/* Monster Details Card */}
      {monsterDetails && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              {monsterDetails.name} (Won {noOfWins} times)
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm font-medium text-gray-600">Type:</div>
            <div className="text-sm text-gray-700">{monsterDetails.type}</div>

            <div className="text-sm font-medium text-gray-600">Strength:</div>
            <div className="text-sm text-gray-700">{monsterDetails.strength}</div>

            <div className="text-sm font-medium text-gray-600">Height:</div>
            <div className="text-sm text-gray-700">{monsterDetails.height}m</div>

            <div className="text-sm font-medium text-gray-600">Size:</div>
            <div className="text-sm text-gray-700">{monsterDetails.size}</div>

            <div className="text-sm font-medium text-gray-600">Health:</div>
            <div className="text-sm text-red-700">{monsterDetails.health}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monster;
