const url = require('url');
const turkishStopWords = require('./stopWords/stop_words_turkish.json');
const englishStopWords = require('./stopWords/stop_words_english.json');





function counterWords(wordlist) {
    var length = wordlist.length;
    return length;
};

function counterLetters(text) {
    return text.split("").length;
};

function findLongestWord(wordList) {
    var longestWord = {
        length: 0,
        word: ""
    };

    var currentLength = 0;

    wordList.forEach(function (word) {
        var letterArray = word.split("");

        letterArray.forEach(function (letter) {
            currentLength++;
        });
        if (currentLength > longestWord.length) {
            longestWord.word = word;
            longestWord.length = currentLength;
        }
        currentLength = 0;
    });

    return longestWord;
};

function findAvaragegWordLength(wordsCount, lettersCount) {
    return lettersCount / wordsCount;
};

function calculateReadingDuration(wordsCount) {
    return wordsCount / 2;
};

function findMedianWordLength(wordList) {
    var medianWord = wordList[(wordList.length / 2).toFixed() - 1];
    return medianWord.length;
};

function findMedianWordSorted(wordList) {
    wordListSorted = [...wordList];
    wordListSorted.sort(function (a, b) {
        return b.length - a.length;
    });
    var medianWordSorted = wordListSorted[(wordList.length / 2).toFixed() - 1];
    return medianWordSorted;
};

function findLanguage(wordList) {
    var turkishCounter = 0;
    var englishCounter = 0;
    wordList.forEach(function (textWord) {
        turkishStopWords.forEach(function (turkishWord) {
            if (textWord === turkishWord) {
                turkishCounter++;
            }
        });
        englishStopWords.forEach(function (englishWord) {
            if (englishWord === textWord) {
                englishCounter++;
            }
        });
    })
    if (englishCounter > turkishCounter) {
        return 'en';
    }
    else {
        return 'tr';
    }



};

function findCommonWords(wordList) {
    var frequencyTable = {};
    var tempList = [];
    var lastList = [];

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const wordUnique = wordList.filter(unique)

    wordUnique.forEach(function (wordUnique) {
        var count = 0;

        wordList.forEach(function (word) {
            if (wordUnique === word) {
                count++;
            }
        });
        frequencyTable[wordUnique] = count;

    });
    const sortedFrequencyTable = Object.fromEntries(Object.entries(frequencyTable).sort(([, a], [, b]) => b - a));
    tempList = Object.keys(sortedFrequencyTable);
    for (let i = 0; i < 5; i++) {
        lastList[i] = tempList[i];
    }
    return lastList;

};

module.exports = {
    counterWords, counterLetters, findLongestWord, findAvaragegWordLength,
    calculateReadingDuration, findMedianWordLength, findMedianWordSorted, findLanguage, findCommonWords
};

