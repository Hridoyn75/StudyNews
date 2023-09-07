import axios from 'axios'
import cheerio from 'cheerio'
import db from '../db.js';


export const CallCricBuzzData = ()=>{
    axios.get('https://www.jugantor.com/campus')
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
    const photo = $('.figure-img').attr('src');
    
    const q = "INSERT INTO posts (id, title, content, photo) VALUES (?,?, ?, ?)"
    const values = [ url, title, content, photo]
    db.query(q, values, (err, result)=>{
        if(err) return console.log("Checked: Already indexed");;
        console.log("New post saved on database"); 
    })
    // console.log(description)
  })
  .catch(error=>{
    console.log(error)
  })
})
.catch(error => {
  console.log(error);
});
}