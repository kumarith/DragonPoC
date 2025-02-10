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
  }

  const Monster: React.FC<MonsterProps> = ({ onMonsterChange }) => {

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
        .then((data) => {setMonsterDetails(data || null) , onMonsterChange(data || null)}) // update resepcitve fighter in parent ( figher1,2..)
        .catch((err) => console.error("Error fetching monster details:", err));
        console.log("details", monsterDetails)
    }
  }, [selectedMonster]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Select a Monster</h2>
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
          <h3 className="text-lg font-semibold">{monsterDetails.name}</h3>
          <p><strong>Type:</strong> {monsterDetails.type}</p>
          <p><strong>Strength:</strong> {monsterDetails.strength}</p>
          <p><strong>Height:</strong> {monsterDetails.height}m</p>
          <p><strong>Size:</strong> {monsterDetails.size}</p>
          <p><strong>Health:</strong> {monsterDetails.health}</p>
        </div>
      )}
    </div>
  );
};

export default Monster;
