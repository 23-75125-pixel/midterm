const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, 'public')));

// In-memory leaderboard: { socketId: { name, score, finished, time } }
const players = {};

io.on('connection', (socket) => {

  // Player joins with a name
  socket.on('join', (name) => {
    players[socket.id] = {
      name: name.trim().substring(0, 24) || 'Anonymous',
      score: 0,
      finished: false,
      time: null,
      joinedAt: Date.now()
    };
    // Send current leaderboard to everyone
    io.emit('leaderboard', getLeaderboard());
    console.log(`+ ${players[socket.id].name} joined`);
  });

  // Player submits final score
  socket.on('submit_score', ({ score, timeTaken }) => {
    if (players[socket.id]) {
      players[socket.id].score = score;
      players[socket.id].finished = true;
      players[socket.id].time = timeTaken;
      io.emit('leaderboard', getLeaderboard());
      console.log(`✓ ${players[socket.id].name} → ${score}/20`);
    }
  });

  // Player updates score in real-time (after each question)
  socket.on('score_update', (score) => {
    if (players[socket.id]) {
      players[socket.id].score = score;
      io.emit('leaderboard', getLeaderboard());
    }
  });

  socket.on('disconnect', () => {
    if (players[socket.id]) {
      console.log(`- ${players[socket.id].name} left`);
      delete players[socket.id];
      io.emit('leaderboard', getLeaderboard());
    }
  });
});

function getLeaderboard() {
  return Object.values(players)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // If same score, finished ones rank higher
      if (a.finished && !b.finished) return -1;
      if (!a.finished && b.finished) return 1;
      // Faster time wins
      return (a.time || 9999) - (b.time || 9999);
    })
    .map((p, i) => ({ ...p, rank: i + 1 }));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Quiz server running on port ${PORT}`);
});
