import { mySecret, port} from './config/index.js'
import { handleDemocraticElection, connectVoiceChannel } from './src/index.js'
import Discord from 'discord.js'
import express from 'express'


const client = new Discord.Client();
const app = express()

app.get('/', (_,res) => {
  res.send('Hello Bot!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}, botready`)
})


let gameVotes = []
let result = []
let resultMessage = ''
let isVoting = false
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (isVoting && !msg.author.bot) {
    handleDemocraticElection(msg, result, resultMessage, gameVotes)
  }

  if (msg.author.bot) return

  //votacion de juegos
  if (msg.content === '/quejugar') {

    isVoting = !isVoting

    if (!isVoting) return msg.channel.send('Ya comenzo una votación...')

    setTimeout(() => {
      isVoting = false;
      msg.channel.send(resultMessage)
      resultMessage = ''
      gameVotes = []
    }, 60000)

    msg.channel.send('Empieza la votación... los leo pueden votar por f o lol o p');
  }
  //help no hay help
  if (msg.content === '/help') {
    msg.channel.send('ayuda con que gil! uheee');
  }
  //eleccion random
  if (msg.content === '/jugar') {
    let val = Math.random()
    if (val < 0.3) {
      msg.channel.send('FM');
    } else if (val < 0.6 && val >= 0.3) {
      msg.channel.send('F');
    } else {
      msg.channel.send('L');
    }
  }

  //respuesta a naa buu
  if (msg.content.includes('naaa') || msg.content.includes('buu') || msg.content.includes('Naa')) {
    msg.channel.send('ay que lataa!');
  }

  //reproducir video
  if (msg.content.includes('/re ')) {
    let message = msg.content.split('/re ')
    await connectVoiceChannel(msg, message[1], client)
  }


  //phsmofobia meme
  if (msg.content.includes('manifiestate') || msg.content.includes('estas aqui') || msg.content.includes('danos una se')) {
    await connectVoiceChannel(msg, 'here', client)
  }


  //respuesta a hue prometiste
  if (msg.content.includes('hue') || msg.content.includes('prometiste')) {
    let value = Math.random()
    value > 0.8 ? msg.reply('tu me lo prometiste viejo!') : value < 0.4 ? msg.reply('oh me salio wequereke') : msg.reply('uheeeeee!')
  }

  //chatear  voz con el bot
  if (msg.content === 'hablemos' || msg.content === 'here') {
    await connectVoiceChannel(msg, '', client)
  }
  if(msg.content.includes('sugee')) {
    await connectVoiceChannel(msg, 'sugee', client)
  }
  if(msg.content.includes('stop')) {
    await connectVoiceChannel(msg, 'stop', client)
  }
});

// client.login(mySecret);
