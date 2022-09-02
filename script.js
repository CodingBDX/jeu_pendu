const els = {
    score: null,
    answer: null,
    choices: null
}

const words = [
    'POMME', 'BANANE', 'ANNEAUX', 'SIEGE', 'POUVOIR', 'FRANCE', 'ANGLETERRE', 'TEMOINS'
]

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;

let icons = [
  
    '👍',
    '🥇',
    '🥈',
    '🥉',
    '🎱',
    '😥',
    '🤟',
    '👍',
     '🐉',
]
let maxScore = 8;



const Init = () => {
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
   
    els.choices = document.querySelector('#choices');

 
    word = pickWord();
    choices = generateChoice();
    choicesMapping = getChoicesMapping(choices);
    wordMapping = getWordMapping(word);
    displayWord(wordMapping);
    displayChoices(choicesMapping);
    // displayScore();

    els.answer.addEventListener('click', ({target}) => {
        if (target.matches('li')) {
    checkLetter(target.innerHTML)
}
    })

    document.addEventListener('keydown', ({ keyCode }) => {
        const letter = String.fromCharCode(keyCode);
        // console.log('letter', letter)
        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter);
        }
    })
  
}


const checkLetter = (letter) => {
    // console.log('TEST', wordMapping)
    
    let isLetterInWord = false;
    let allLetterFound = true;
    console.log('isletter1:', isLetterInWord )

    wordMapping.forEach((testMapping) => {
        
        console.log('isletter2:', testMapping.letter, 'letter1:', letter )
        if (testMapping.letter === letter) {
            testMapping.isVisible = true;
            isLetterInWord = true

        }
        if (!testMapping.isVisible) {
            allLetterFound = false;
        }
    });
    console.log('isletter3:', isLetterInWord )

    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true
        }
    })
    displayChoices(choicesMapping);
    // console.log(isLetterInWord)
    if (isLetterInWord === true) {
        displayWord(wordMapping);
        // console.log(displayWord(wordMapping))
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        wordMapping.forEach(w => w.isVisible = true)
        displayWord(wordMapping)
        document.querySelector('body').style.backgroundColor = 'red'
                els.score.innerHTML = `<h1>game loose<br />recharge dans 3 secondes</h1>`;
                setTimeout(function(){
   window.location.reload();
}, 5000);

    }
    if (allLetterFound === true) {
        document.querySelector('body').style.backgroundColor = 'rgb(75, 135, 7)'

        els.score.innerHTML = `<h1>game win<br />recharge dans 3 secondes</h1>`;
        setTimeout(function(){
   window.location.reload();
}, 3000);
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
    // els.score.innerHTML = `score :${scoreCount} / ${maxScore}`;
  console.log(icons[scoreCount])
    els.score.innerHTML = `<p class="icons">${icons[scoreCount]}</p>`
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


window.addEventListener('load', () => {
    Init();
})



const getRandomInit =(max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() *  (max - min + 1)) + min

}

