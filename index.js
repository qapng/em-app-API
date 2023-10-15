const express = require('express');
const cors = require('cors');

const entryRouter = require('./app/routes/entry.routes');
const gameRouter = require('./app/routes/game.routes');
const wordRouter = require('./app/routes/word.routes');
const userRouter = require('./app/routes/user.routes');


const app = express();

// var corsOptions = {
//   origin: 'http://localhost:8081',
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true }),
); /* bodyParser.urlencoded() is deprecated */

app.use('/api/entries', entryRouter);
app.use('/api/games', gameRouter);
app.use('/api/words', wordRouter);
app.use('/api/users', userRouter);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to em-app application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
