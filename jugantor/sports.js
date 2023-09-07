import axios from 'axios'
import cheerio from 'cheerio'
import db from '../db.js';


export const CallJugantorSports = ()=>{
    axios.get('https://www.jugantor.com/sports')
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const url = $('#lead-news .top_lead_card a').attr('href')

  axios.get(url)
  .then(res =>{
    const htmlPost = res.data;
    const $ = cheerio.load(htmlPost)
    const title = $('#news-title').attr('data-title');
    const content = $('#myText').text()
    const photo = $('.figure-img').attr('src') || null;


    const q = "INSERT INTO posts (id, title, content, photo, type) VALUES (?,?, ?, ?, ?)"
    const values = [ url, title, content, photo, 'sports']
    db.query(q, values, (err, result)=>{
        if(err) return console.log("Checked: Already indexed");
        console.log("New post saved on database"); 
    })
  })
  .catch(error=>{
    console.log(error)
  })
})
.catch(error => {
  console.log(error);
});
}