const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {}; // Oda bilgilerini tutar

// Statik dosyaları sun
app.use(express.static(__dirname));

// Ana sayfa isteğine MAİN PAGE.html gönder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'MAİN PAGE.html'));
});

// Socket.io bağlantı olayları
io.on('connection', (socket) => {
  console.log(`Yeni bağlantı: ${socket.id}`);

  // Oda oluşturma
  socket.on('createRoom', ({ playerName }, callback) => {
    let roomId;
    do {
      roomId = Math.floor(10000 + Math.random() * 90000).toString(); // Rastgele 5 haneli oda ID
    } while (rooms[roomId]); // Aynı ID varsa yeniden oluştur

    rooms[roomId] = {
      players: [{ id: socket.id, name: playerName }],
    };

    socket.join(roomId); // Socket'i odaya ekle
    console.log(`Oda oluşturuldu: ${roomId} | Oyuncu: ${playerName}`);
    callback({ success: true, roomId });
  });

  // Odaya katılma
  socket.on('joinRoom', ({ roomId, playerName }, callback) => {
    const room = rooms[roomId];
    if (room) {
      room.players.push({ id: socket.id, name: playerName });
      socket.join(roomId); // Socket'i odaya ekle
      console.log(`Oyuncu katıldı: ${playerName} | Oda: ${roomId}`);
      callback({ success: true });
    } else {
      callback({ success: false, message: 'Oda bulunamadı!' });
    }
  });

  // Bağlantı kesildiğinde
  socket.on('disconnect', () => {
    console.log(`Bağlantı kesildi: ${socket.id}`);
    for (const roomId in rooms) {
      const room = rooms[roomId];
      room.players = room.players.filter((player) => player.id !== socket.id);

      // Oda boşsa bir süre bekleyip sil
      if (room.players.length === 0) {
        setTimeout(() => {
          if (rooms[roomId] && rooms[roomId].players.length === 0) {
            delete rooms[roomId];
            console.log(`Oda silindi: ${roomId}`);
          }
        }, 5000); // 5 saniye bekleme süresi
      }
    }
  });

  // Hata ayıklama için bağlantı durumlarını kontrol et
  socket.on('error', (err) => {
    console.error(`Socket hatası: ${err.message}`);
  });
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});