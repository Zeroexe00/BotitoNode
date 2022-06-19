//funcion para la votacion
export const handleDemocraticElection = async (msg, result, resultMessage, gameVotes) => {
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