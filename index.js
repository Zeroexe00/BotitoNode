const mySecret = process.env['TOKEN'] ||  process.env.TOKEN
require('dotenv').config()
const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const client = new Discord.Client();
const express = require('express')
const app = express()
const port = process.env.PORT || 6000

app.get('/', (req, res) => {
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


//funcion para la reproduccion de videos
async function connectVoiceChannel(msg, str = '') {
  try {
    let voice_Channel = await client.channels.fetch(msg.member.voice.channelID);

    if (!voice_Channel && str == 'here') return;
    if (!voice_Channel) return msg.reply("Error: el canal de voz no existe!");

    let voice_Connection = await voice_Channel.join();

    if(msg.content === 'stop') {
      voice_Connection.disconnect();
      return;
    }

    if(str.includes('https://')) {
      let stream = ytdl(str, {
        filter: "audioonly",
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
      });
      let repro = await voice_Connection.play(stream, { type: 'opus' });
      await repro.on('finish', () => {
        msg.guild.me.voice.channel.leave();
      })
    } else if (msg.content === 'hablemos') {
      let repro = await voice_Connection.play('sound.mp3');
      await repro.on('finish', () => {
        msg.guild.me.voice.channel.leave();
      })
    } else if (msg.content === 'here') {
      let repro
      const val = Math.random();
      if (val >= 0.8) {
        repro = await voice_Connection.play('sound/Here.wav');
      } else if (val >= 0.4) {
        repro = await voice_Connection.play('sound/Ghost2(lightattack).wav');
      } else {
        repro = await voice_Connection.play('sound/Heartbeat(loop)2.wav');
      }

      await repro.on('finish', () => {
        setTimeout(() => {
          msg.guild.me.voice.channel.leave();
        }, 60000);
      })
    }else if (str == 'sugee') {
      let repro = await voice_Connection.play('sound/luffy_sugoi.mp3');
      await repro.on('finish', () => {
        msg.guild.me.voice.channel.leave();
      })
    }
    else {
      msg.reply(msg.content + "--No es una url...")
    }
  } catch (error) {
    if (str == 'here') return;
    msg.reply("Error: ya me rompiste wey! " + error)
  }
}

//funcion para la votacion
function handleDemocraticElection(msg) {
  let vote = {
    name: msg.author.id,
    gameName: ''
  }
  if (msg.content === 'f') {
    vote.gameName = 'Fornite'
  } else if (msg.content === 'lol') {
    vote.gameName = 'League of Legend'
  } else if (msg.content === 'p' || msg.content.includes('fobia')) {
    vote.gameName = 'Phasmofobia'
  } else {
    msg.reply('is that a vote? you need to vote for f,lol,p')
  }
  // console.log(msg)
  if (!gameVotes.some((e) => e.name === msg.author.id)) {
    gameVotes.push(vote)
  } else {
    msg.reply('ya votaste hijito!')
  }

  result = gameVotes.reduce((acc, cur) => {
    if (acc) {
      let i = acc.findIndex(e => e.gameName === cur.gameName)
      if (typeof i === 'number' && i !== -1) {
        acc[i].numVotes = acc[i].numVotes + 1
        return [...acc]
      } else {
        return [...acc, { gameName: cur.gameName, numVotes: 1 }]
      }
    }
  }, [])
  result = result.sort((a, b) => a.numVotes + b.numVotes)
  resultMessage = `El resultado fue ${result[0].gameName} con ${result[0].numVotes}`
}
client.on('message', async msg => {
  if (isVoting && !msg.author.bot) {
    handleDemocraticElection(msg)
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
    await connectVoiceChannel(msg, message[1])
  }


  //phsmofobia meme
  if (msg.content.includes('manifiestate') || msg.content.includes('estas aqui') || msg.content.includes('danos una se')) {
    await connectVoiceChannel(msg, 'here')
  }


  //respuesta a hue prometiste
  if (msg.content.includes('hue') || msg.content.includes('prometiste')) {
    let value = Math.random()
    value > 0.8 ? msg.reply('tu me lo prometiste viejo!') : value < 0.4 ? msg.reply('oh me salio wequereke') : msg.reply('uheeeeee!')
  }

  //chatear  voz con el bot
  if (msg.content === 'hablemos' || msg.content === 'here') {
    await connectVoiceChannel(msg)
  }
  if(msg.content.includes('sugee')) {
    await connectVoiceChannel(msg, 'sugee')
  }
  if(msg.content.includes('stop')) {
    await connectVoiceChannel(msg, 'stop')
  }
});

client.login(mySecret);
