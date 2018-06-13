var request = require('request');
var jsdom = require('jsdom');

// var url = "https://esaj.tjsp.jus.br/cpopg/show.do?processo.codigo=2SZX6F13N0000&processo.foro=100&uuidCaptcha=sajcaptcha_5e753255684f4c85a172eee6ed465b24";
var url = "https://esaj.tjsp.jus.br/cpopg/show.do?processo.codigo=2SZX9E9CB0000&processo.foro=100&uuidCaptcha=sajcaptcha_16160c283efe4b4083ad8841002ddde4";

console.log("Visiting page " + url);

let process = [];

function executeRequest(url)
{
    request({
        url: url,
        rejectUnauthorized: false
    }, (error, response, body) => {

        // Error check on access url
        if(error) { console.log("Error: " + error) }

        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);    

        if(response.statusCode === 200) {            
            processData(body);
        }
    });
}

function processData(body)
{
    // var $ = cheerio.load(body);
    // extractProcessData(body);
    extractProcessPart(body);
}

// function extractProcessData(body){

//     var $ = cheerio.load(body);

//     let tbDadosProcesso = $('.div-conteudo').find('table.secaoFormBody[id=""]');    

//     tbDadosProcesso.find('tr[class=""]').each(function(i, value) {

//         let label = $(this).find('td').eq(0).text().trim().replace(':','');        
//         let content = $(this).find('td').eq(1);
//         let data = '';

//         data =  content.text().trim();        

//         if(label == '') {
//             if(content.find('table').length > 0)
//             {
//                 let td = content.find('table > tr > td');
//                 label = td.contents().eq(1).text();
//                 text = td.contents().eq(2).text().trim();                                
//                 process.push({label: label, data: text});
//             }
//             else if(content.find('span').length > 0)           
//             {                
//                 let span = content.find('span').text().trim();                

//                 if(span.indexOf('Vara') != -1)
//                 {
//                     label = 'Localização';
//                     data = span;
//                     process.push({label: label, data: data});
//                 }
//             }
//         } else {

//             if(content.find('table').length > 0)
//             {

//                 td =  content.find('table > tr > td');

//                 let text = td.text().trim();
//                 let span = '';

//                 if(td.find('span[id=""] > span[id=""]').length>0)
//                 {
//                     span = td.find('span[id=""] > span[id=""]');
//                 }
//                 else
//                 {
//                     span = td.find('span');    
//                 }
                
//                 if(span.length > 0)
//                 {                    
//                     text = '';
//                     span.each(function() {
//                         text += $(this).text().trim() + ' ';
//                     });                                        
//                 }

//                 data = text;                                
//             }            
        
//             process.push({label: label, data: data});
//         }
//     });
// }

function extractProcessPart(body)
{
    jsdom.env({  
        html: body,
        scripts: [
          'http://code.jquery.com/jquery-1.5.min.js'
        ]
      }, function (err, window) {
        var $ = window.jQuery;
        
        console.log($('.esajTituloOrientacoes').text());

      });    
    var $ = cheerio.load(body);    

    var tabelaPrincipal = $('.div-conteudo').find('table')
                                            .eq(4)
                                            .find('tr > td')
                                            .contents()
                                            .find('table');    
    var teste1 = tabelaPrincipal;

    console.log(teste1);

    teste1.each(function(){
        if($(this).attr('id'))
        {
            console.log($(this).attr('id'));
        }
        
    });
}

executeRequest(url);