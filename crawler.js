var request = require('request');
var cheerio = require('cheerio');
var URL     = require('url-parse');

var pageToVisit = "https://symfony.com/blog/";

console.log("Visiting page " + pageToVisit);

var posts = [];

function executeRequest(url)
{
    request(url, (error, response, body) => {

        if(error) {
            console.log("Error: " + error);
        }
        
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);    

        if(response.statusCode === 200) {
            // Parse the document body

            console.log('parsing request body');

            extractData(body);

            console.log(posts);

        }
    });
}

function extractData(body)
{
    var $ = cheerio.load(body);                
    var link = '';

    $('.post__excerpt').each(function() {

        var title  = $(this).find('h2').text();
        var text   = $(this).find('p.m-b-5').text();
        var date   = '';
        var author = '';

        $(this).find('p.metadata').each(function() {
            date   = $(this).find('span').eq(0).text();
            author = $(this).find('span').eq(1).text();
        });

        var post  = {title: title.trim(), text: text.trim(), date: date.trim(), author: author.trim()};

        posts.push(post);
    });
    
    var url  = '';        

    $('.pager').each(function() {            
        if($(this).find('li').eq(1).find('a').length != 0)
        {
            link = $(this).find('li').eq(1).find('a').attr('href');
            var path = pageToVisit.split('/blog');
            url = path[0] + link;
            console.log(url);
            executeRequest(url);
        }
    });
}

executeRequest(pageToVisit);