const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); 

const app = express();
const PORT = 3000;
app.use(cors()); 

const monstersFilePath = path.join(__dirname, "data", "monsters.json");
const fights = path.join(__dirname, "data", "fightresults.json");


// read the monsters data from file as json
const readMonstersData = () => {
  const data = fs.readFileSync(monstersFilePath, "utf-8");
  return JSON.parse(data);
 
};

const readWinnersData = () => {
  const data = fs.readFileSync(fights, "utf-8");
  return JSON.parse(data);
 
};
const monsters = readMonstersData();
const winnerList = readWinnersData();
// locally save the monsters data in variable , to update the health during fight.

//  list of monsters
app.get("/monsterlist", (req, res) => {
  try {
    //const monsters = readMonstersData();
    const monsterNames = monsters.map((monster) => monster.name);
    res.json({ monsters: monsterNames });
  } catch (err) {
    res.status(500).json({ error: "Failed to read monster data." });
  }
});

// details of monster
app.get("/monster", (req, res) => {
  const monsterName = req.query.name;
  if (!monsterName) {
    return res.status(400).json({ error: "Monster name is required." });
  }

  try {
    //const monsters = readMonstersData();
    const monster = monsters.find((m) => m.name.toLowerCase() === monsterName.toLowerCase());

    if (monster) {
      res.json(monster);
    } else {
      res.status(404).json({ error: "Monster not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to read monster data." });
  }
}); // monster details end

// fight aceept two monsternames and randomly reduce health for both
app.post("/fight", (req, res) => {
  const fighter1 = req.query.fighter1;
  const fighter2 = req.query.fighter2;
  if (!fighter1) {
    return res.status(400).json({ error: "Select some valid fighter 1" });
  }
  if (!fighter2) {
    return res.status(400).json({ error: "Select some valid fighter 2" });
  }

  try {
   // const monsters = readMonstersData();
    const monster1 = monsters.find((m) => m.name.toLowerCase() === fighter1.toLowerCase());
    const monster2 = monsters.find((m) => m.name.toLowerCase() === fighter2.toLowerCase());
    let winner = "TBD"; //to  be decided status.
    if (monster1 && monster2) {
      const damage = Math.floor(Math.random() * 10);
      if (monster2.health>=0) monster1.health -= damage; // if other monster is already 0, it cant do damage.
      const damage2 = Math.floor(Math.random() * 10);
      if (monster1.health>=0) monster2.health -= damage2;

      if (monster1.health <= 0) {
        monster1.health = 0;
        winner = monster2.name;
      }
      if (monster2.health <= 0) {
        monster2.health = 0;
        winner = monster1.name;
      }
      if (monster1.health < 0 && monster2.health < 0) {
        monster1.health = 0;
        monster2.health = 0;
        winner = "TBD";
      }

  if(winner !== "TBD") {
  const winnerRecord = {
    timestamp: new Date().toISOString(), // Current timestamp
    winner: winner,
  };
  
  winnerList.push(winnerRecord);
  
  }
      res.status(200).json({  winner: winner });
    } else {
      res.status(404).json({ error: "Monster not found." });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to read monster data." });
  }
}); // fight end


app.get('/winners', (req, res) => {
  try {
    if (winnerList.length > 0) {
      res.status(200).json(winnerList);
    } else {
      res.status(404).json({ message: "No winners found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve winner list." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
