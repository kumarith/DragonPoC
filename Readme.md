# Dragon Fight
## Frontend
```sh
npm install
npm run dev
```

## Bakcend
- Update initial data in /data/monsters.json ( that will be loaded in memory)
```sh
npm insall
node server.js
```
### API Routes
- Details of monster. GET http://localhost:3000/monster?name=xxx
- List monsters. GET http://localhost:3000/monsterlist 
- Coduct fight between monsters. POST:  http://localhost:3000/fight?fighter1=xx&fighter2=yy
