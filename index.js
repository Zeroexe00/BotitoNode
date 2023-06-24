import {port} from './config/index.js'
import express from 'express'
import axios from 'axios';

const app = express();

app.get('/', async (_,res) => {
  const date = new Date()
  res.send('Hello Bot! ' + date);
  // const resu = await axios.delete('https://jsonplaceholder.typicode.com/posts/1', {
  //   headers: {
  //     Authorization: ''
  //   }
  // });
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}, botready`)
})