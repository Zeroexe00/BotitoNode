import ytdl from "discord-ytdl-core";
//funcion para la reproduccion de videos
export const connectVoiceChannel = async (msg, str = '', client) => {
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
