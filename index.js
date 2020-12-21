require('dotenv').config()
const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const client = new Discord.Client();

let gameVotes = []
let isVoting = false
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function connectVoiceChannel(msg, str = '') {
  try {
    let voice_Channel = await client.channels.fetch(msg.member.voice.channelID);
    
    if (!voice_Channel) return msg.reply("Error: el canal de voz no existe!");
    
    let voice_Connection = await voice_Channel.join();
    // await voice_Connection.play(await ytdl('hhttps://www.youtube.com/watch?v=IDgm3fXa8Kw'), { type: 'opus' });
    // let stream = ytdl("https://www.youtube.com/watch?v=IDgm3fXa8Kw", {
    // let stream = ytdl("https://www.youtube.com/watch?v=o-hzTmeCqN0", {
    if (str.includes('https://')) {
      let stream = ytdl(str, {
        filter: "audioonly",
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
      });
      // let stream = ytdl.arbitraryStream("https://listen.moe/kpop/opus", {
      //     opusEncoded: true,
      //     encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
      // });
      let repro = await voice_Connection.play(stream, { type: 'opus' });
      await repro.on('finish', () => {
        msg.guild.me.voice.channel.leave();
      })
    } else if(msg.content === 'hablemos') {
      let repro = await voice_Connection.play('sound.mp3');
      await repro.on('finish', () => {
        msg.guild.me.voice.channel.leave();
      })
    } else {
      msg.reply("No es una url...")
    }
  } catch (error) {
    msg.reply("Error: ya me rompiste wey! " + error)
  }
}
function handleDemocraticElection(msg) {
  let vote = {
    name: msg.author.id,
    gameName:''
  }
  if(msg.content === 'f') {
    vote.gameName = 'Fornite'
  }else if (msg.content === 'lol') {
    vote.gameName = 'League of Legend'
  } else if (msg.content === 'p' || msg.content.includes('fobia')) {
    vote.gameName = 'Phasmofobia'
  }else {
    msg.reply('is that a vote? you need to vote for f,lol,p')
  }
  // console.log(msg)
  if(!gameVotes.some((e)=> e.name === msg.author.id)){
    gameVotes.push(vote)
  }else {
    msg.reply('ya votaste hijito!')
  }
}
client.on('message', async msg => {
  // console.log(JSON.stringify(msg.author.bot,null,2),isVoting)
  // console.log(gameVotes)
  if(isVoting && !msg.author.bot) {
    handleDemocraticElection(msg)
  }
  
  if(msg.author.bot) return

  if(msg.content === '/quejugar') {
    isVoting= true
    setTimeout(()=> {
      isVoting = false;
      msg.channel.send('los resultados son : ' + JSON.stringify(gameVotes,null,2))
      gameVotes = []
    },120000)
    msg.channel.send('Empieza la votación... los leo pueden votar por f o lol o p');
  }
  if (msg.content === '/help') {
    msg.channel.send('ayuda con que gil! uheee');
  }
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
  if (msg.content.includes('naaa') || msg.content.includes('buu') || msg.content.includes('Naa')) {
    msg.channel.send('ay que lataa!');
  }
  if (msg.content.includes('/re ')) {
    let message = msg.content.split('/re ')
    await connectVoiceChannel(msg, message[1])
  }

  if (msg.content.includes('manifiestate') || msg.content.includes('estas aqui') || msg.content.includes('danos una se')) {
    msg.channel.send('HERE');
  }

  if (msg.content.includes('hue') || msg.content.includes('prometiste')) {
    let value = Math.random() 
    value > 0.8 ? msg.reply('tu me lo prometiste viejo!') : value < 0.4 ? msg.reply('oh me salio wequereke') : msg.reply('uheeeeee!')
  }
  
  if(msg.content === 'hablemos') {
    connectVoiceChannel(msg)
  }
});

client.login(process.env.TOKEN);