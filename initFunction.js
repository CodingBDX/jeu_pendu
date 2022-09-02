const els = {
    score: null,
    answer: null,
    choices: null
}

const words = [
    'pomme', 'banane', 'anneaux', 'siege', 'pouvoir', 'france', 'angleterre', 'temoins'
]

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;




const checkLetter = (letter) => {
    console.log('TEST', wordMapping)
    let isLetterInWord = false;

    wordMapping.forEach((letterMapping) => {

        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true
            // console.log(isLetterInWord )
        }
    });
    // console.log(isLetterInWord)
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }
}



const displayChoices = (choices) => {
    const choicesHtml = choices.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`
        } else {
            return `<li class="disable">${letterMapping.letter}</li>`
        }
    })
        els.answer.querySelector('ul').innerHTML = choicesHtml.join('');

}


const displayScore = () => {
    els.score.innerHTML = `score :${scoreCount} / ${maxScore}`;
}

const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        // (letterMapping.isVisible === true) ? return `<li>${letterMapping.letter}</li>` : return `<li></li>`;
        if (letterMapping.isVisible === true)
        {
         return   `<li>${letterMapping.letter}</li>`
        } else {
            return `<li>_</li>`
        };
    });
    // console.log('wordhtml', wordHtml)
    els.choices.querySelector('ul').innerHTML = wordHtml.join('');
}

const generateChoice = () => {
      const choices = [];
    for (let index = 65; index <= 90; index++) {
        
        choices.push(String.fromCharCode(index));
        
    }

    return choices;
}

const getChoicesMapping = (choices) => {
    const choicesMapping = choices.map((letter) => {
        return {
            letter,
            isChosen: false,
        }
        
    })
    return choicesMapping;

}

const getWordMapping = (word) => {
    const wordArr = word.split('');
    const wordMapping = wordArr.map((letter, index) => {
        let isVisible = false
        if (index === 0 || index === wordArr.length -1) {
            isVisible = true;
        }
    return {
        letter,
        isVisible
    }
    })
    return wordMapping;
}

const pickWord = () => {
  
    const randomIndex = getRandomInit(0, words.length -1);
    return words[randomIndex];
}
