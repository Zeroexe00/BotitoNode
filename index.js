require('dotenv').config()
const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const client = new Discord.Client();

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

client.on('message', async msg => {
  if (msg.content === '/help') {
    msg.channel.send('ayuda con que gil! uheee');
  }
  if (msg.content === '/uhe') {
      msg.channel.send('uheeeeeeeeee!');
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
  if (msg.content.includes('naaa') || msg.content.includes('buu')) {
    msg.channel.send('ay que lataa!');
  }
  if (msg.content.includes('/re ')) {
    let message = msg.content.split('/re ')
    await connectVoiceChannel(msg, message[1])
  }

  if (msg.content.includes('manifiestate') || msg.content.includes('estas aqui') || msg.content.includes('danos una se')) {
    msg.channel.send('HERE');
  }

  if (msg.content.includes('hue') || msg.content.includes('uhee') || msg.content.includes('prometiste')) {
    Math.random() > 0.5 ? msg.reply('tu me lo prometiste viejo!') : msg.reply('oh me salio wequereke')
  }
  if(msg.content === 'hablemos') {
    connectVoiceChannel(msg)
  }
});

client.login(process.env.TOKEN);