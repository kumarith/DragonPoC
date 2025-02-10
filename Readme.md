# Dragon Fight

## Frontend
- Built with Vite + React + Typescript + TailwindCSS
- Makes API calls to backend to fetch monster list and details as well as winnerlist.
- Also, maintians winnerlist in state, to calculate the likely winner in a match.
- Componentaized Monster component that will be renderd for both fighters. 
- Winner page is routed seperately. 

```sh
npm install
npm run dev
```
http://localhost:5173/

## Backend
- Built on NodeJS + Express
- Update initial data in /data/monsters.json ( that will be loaded in memory)
```sh
npm insall
node server.js
```
### API Routes
- Details of monster. GET http://localhost:3000/monster?name=xxx
- List monsters. GET http://localhost:3000/monsterlist 
- Conduct fight between monsters. POST:  http://localhost:3000/fight?fighter1=xx&fighter2=yy
- Winner Stats GET:  http://localhost:3000/winners
