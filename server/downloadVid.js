const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

const app = express();

let url = 'http://keepvid.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DuV9iWJxRO64';
//second test url
let url2 = 'http://keepvid.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0e6asIlxrlQ';

request(url,(err, resp, body) => {
    if(err){
        console.log('Error connecting to site', err);
    }

    let $ = cheerio.load(body);
    let linkArray = [];

//download links
    $('.result-table a[href^="https"]').each((i, element) =>{
        let link = $(element).attr('href');
        linkArray.push(link);
    });

//video title
    let vidTitle = $('body > div.search-result-content > div > div:nth-child(1) > div.item-3 > p:nth-child(3)').text();
    console.log('video title', vidTitle);

// console.log(linkArray);
let url = linkArray[0];
console.log(url);
    request(url).pipe(fs.createWriteStream('videos/' + vidTitle + '.mp4'));
});

// app.listen(3000, () => {
//     console.log('Running on ', 3000);
// });
