require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '/help') {
    msg.reply('ayuda con que gil! uheee');
  }
  if (msg.content === '/uhe') {
    msg.reply('uheeeeeeeeee!');
  }
  if (msg.content === '/jugar') {
    let val = Math.random()
    if(val < 0.3) {
      msg.reply('FM');
    }else if(val < 0.6 && val >= 0.3) {
      msg.reply('F');
    }else {
      msg.reply('L');
    }
  }
  if (msg.content.includes('naaa') || msg.content.includes('buu')) {
    msg.reply('ay que lataa!')
  }
  if(msg.content.includes('hue') || msg.content.includes('uhee') || msg.content.includes('prometiste')){
    Math.random() > 0.5 ? msg.reply('tu me lo prometiste viejo!') : msg.reply('oh me salio wequereke')
  }
});

client.login(process.env.TOKEN);