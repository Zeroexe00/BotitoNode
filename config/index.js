require('dotenv').config()
const mySecret = process.env['TOKEN'] ||  process.env.TOKEN
const port = process.env.PORT || 6000

export {
  mySecret,
  port
}