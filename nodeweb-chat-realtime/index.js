// Bibliotecas usadas.
// Carrega a biblioteca EXPRESS
const express = require('express');
const serv = express();
// --------------
const path = require('path');       // Carrega a biblioteca PATH

var http = require('http').Server(serv);
var io = require('socket.io')(http);

// Configuração do Servidor
// IP: 127.0.0.1
// Porta: 3000
// Link: http://127.0.0.1:3000
const hostname = '127.0.0.1';
const port = 3000;


// Configurações Servidor WEB
// Arquivos Estaticos (HTML/Imagem/CSS/JS...)
serv.use(express.static(__dirname + '/public'));    // Carrega todos arquivos/pastas da pasta /public

// Socket.OI
io.on('connection', function(socket){
    let ip = socket.handshake.address;
    io.emit('entrou', { client : ip});

    socket.on('msg-send', function(data){
        if(data.length <= 0) return;
        ip = data.name;

        socket.emit('msg-my', {client : ip, msg : data.msg});
        socket.broadcast.emit('msg', {client : ip, msg : data.msg});
    });
    socket.on('disconnect', function(){
        io.emit('saiu', { client : ip});
    });
});

// Inicia o servidor EXPRESS + SocketIO (HTTP)
http.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});