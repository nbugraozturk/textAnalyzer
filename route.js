const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var controller = require('./controller.js');
    const baseUrl = 'http://' + req.headers.host + '/';
    const requestUrl = new URL(req.url, baseUrl);
    var wordList;

    if (requestUrl.pathname == '/analyze' && req.method === 'POST') {
        console.log('Post Request');


        var requestData;
        var wordList;
        var wordCount;
        var duration;
        var letters;
        var longest;
        var avgLength;
        var medianWordLength;
        var medianWord;
        var language;
        var commonWords;

        req.on('data', function (text) {
            requestData = text.toString('utf8');
            jsonRequestData = JSON.parse(requestData).text.replace(/\n\n/g, '');
            wordList = jsonRequestData.match(/[\wığüşöçĞÜŞÖÇİ’'!?;:]+(?:’[^\wığüşöçĞÜŞÖÇİ'’,!?;:])*/g);


            wordCount = controller.counterWords(wordList);

            letters = controller.counterLetters(jsonRequestData);

            longest = controller.findLongestWord(wordList);

            avgLength = controller.findAvaragegWordLength(wordCount, letters);
            avgLength = avgLength.toFixed(1);

            duration = controller.calculateReadingDuration(wordCount);

            medianWordLength = controller.findMedianWordLength(wordList);

            medianWord = controller.findMedianWordSorted(wordList);

            language = controller.findLanguage(wordList);

            commonWords = controller.findCommonWords(wordList);



            var response = {
                wordCount: wordCount,
                letters: letters,
                longest: longest.word,
                avgLength: avgLength,
                duration: duration,
                medianWordLength: medianWordLength,
                medianWord: medianWord,
                language: language,
                commonWords: commonWords
            };


            if (requestUrl.search) {
                var responseBySearch = {};
                var responseKeys = requestUrl.search.split("=");
                responseKeys = responseKeys[1].split(",");
                responseKeys.forEach(function (key) {
                    responseBySearch[key] = response[key];
                })

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(responseBySearch));

            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }



        });


    }



});