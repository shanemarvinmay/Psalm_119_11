const textarea = document.querySelector('#textarea');
const checkBtn = document.querySelector('#checkBtn');
let verse = `My dear brothers and sisters, how can you claim to have faith in our glorious Lord Jesus Christ if you favor some people over others? For example, suppose someone comes into your meeting dressed in fancy clothes and expensive jewelry, and another comes in who is poor and dressed in dirty clothes. If you give special attention and a good seat to the rich person, but you say to the poor one, “You can stand over there, or else sit on the floor”—well, doesn’t this discrimination show that your judgments are guided by evil motives?`;

const getDifficulty = () => {
    const difficulty = document.getElementsByName('difficulty');
    for (let i = 0; i < difficulty.length; i++) {
        if (difficulty[i].checked)
            return difficulty[i].value
    }
    return 'none';
}

const getVerse = () => {
    const difficulty = getDifficulty();
    let ratioWordsShown = 0;
    let words = verse.split(" ");
    let verseShown = '';
    if (difficulty == 'none') {
        ratioWordsShown = 0;
    }
    else if (difficulty == 'easy') {
        ratioWordsShown = 5;
    }
    else if (difficulty == 'medium') {
        ratioWordsShown = 3;
    }
    else if (difficulty == 'hard') {
        ratioWordsShown = 2;
    }
    else {
        ratioWordsShown = 1;
    }
    // TODO: add the other difficutlies
    for (let i = 0; i < words.length; i++) {
        if (i % ratioWordsShown == 0) {
            for (let j = 0; j < words[i].length; j++) {
                verseShown += '_';
            }
        } else {
            verseShown += words[i];
        }
        verseShown += ' ';
    }
    textarea.value = verseShown.slice(0, -1);
    return verseShown.slice(0, -1);
}

const checkInput = () => {
    // TODO: show user if they are right, or what they missed
    if (textarea.value.toUpperCase() == verse.toUpperCase()) {
        showAlert('success_alert');
        // setTimeout(() => showAlert('success_alert'), 5000);
    } 
    else {
        showAlert('fail_alert');
        // setTimeout(() => showAlert('fail_alert'), 5000);
    }
    if (textarea.value != verse) {
        let output = '';
        let input = textarea.value.split(' ');
        let answer = verse.split(' ');
        let i = 0;
        while (i < Math.min(input.length, answer.length)) {
            if (input[i].toUpperCase() != answer[i].toUpperCase()) {
                output += answer[i].toUpperCase() + ' ';
            }
            else {
                output += input[i] + ' ';
            }
            i += 1;
        }
        // incase the length of input and the verse are different
        while (i < answer.length) {
            output += answer[i].toUpperCase() + ' ';
            i += 1;
        }
        if (i < input.length) {
            output += 'THIS IS NOT NEEDED: ' + input.slice(i) + ' ';
        }
        output = output.slice(0, -1);
        textarea.value = output;
    }
    return textarea.value == verse;
}

const showAlert = (typeOfAlert) => {
    // console.log(typeOfAlert + '\t' + document.querySelector(`#${typeOfAlert}`).style.display);
    if (document.querySelector(`#${typeOfAlert}`).style.display == 'none') {
        document.querySelector(`#${typeOfAlert}`).style.display = 'block';
    }
    else {
        document.querySelector(`#${typeOfAlert}`).style.display = 'none';
    }
    // making sure only the 'typeOfAlert' is possibly shown
    const alerts = document.querySelectorAll(".alert");
    for(let i = 0; i < alerts.length; i++) {
        if (alerts[i].style.display == 'block' && alerts[i].id != typeOfAlert) {
            alerts[i].style.display = 'none';
        }
    }
};

checkBtn.onclick = checkInput;
getVerse();