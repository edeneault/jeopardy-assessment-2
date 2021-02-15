// Jeopardy JS - Dynamic MarkUp - Data: jservice API //
// by Etienne Deneault
// LOAD MARK_UP AND UTIL FUNCTIONS //
$.getScript('markUp.js', function() {});

// Variable decleration and global selectors //
const BASE_URL = "http://jservice.io/api/";
const CAT_NUM = 6;
const CAT_NUM_CLUES = 5;
const CAT_COUNT = 100;
const LONG_DELAY = 1000;
const SHORT_DELAY = 500;
let categories = [];
let ongoingGame = false;


const bodyHTML = document.querySelector("body");
const gameBoard = document.querySelector("#gameContainer");
const tBody = document.querySelectorAll("td");
const snd = new Audio("assets/jeopardy-board.mp3"); // buffers automatically when created

// Map function to get all id's in new Array and Lodash to return a CAT_NUM random sample //
async function getCategoryIds() {
   
    const result = await axios.get(BASE_URL + "categories", { params: { count: CAT_COUNT } });
    let newCatIds = result.data.map(cat => cat.id );
    return _.sampleSize(newCatIds, CAT_NUM);
}

// request data about a category to API, use map to build object with title and an Array called clues //
// Clues array contains properties answer, question and showing set to null. //
async function getCategory(catId) {
    const result = await axios.get(BASE_URL + "category", { params: { id: catId } });
    let cat = result.data;
    let cluesArr = cat.clues;
    let randomizeClues = _.sampleSize(cluesArr, CAT_NUM_CLUES);
    let clues = randomizeClues.map(clues => ({
        question: clues.question,
        answer: clues.answer,
        showing: null,
    }));
    return { title: cat.title, clues }
}

// Fill the table, Markup functions are in seperated js file //
async function fillTable() {
    buildContainerAndTable();
    buildTopRow();
    buildCluesByCategory();
    ongoingGame = true;
}

// Game logic:  FIRST click - show question, SECOND click - show answer //
// THIRD click: no action //
function handleClick(e) {
    let cellId = e.target.id;
    let idsArr = _.split(cellId, '-', 2);
    let clueID = idsArr[1];
    let catID = idsArr[0];
    let clue = categories[catID].clues[clueID];

    if (clue.showing === null) {
        e.target.innerText = clue.question;
        clue.showing = "question";
    }
    else if (clue.showing === "question") {
        e.target.innerText = clue.answer;
        clue.showing = "answer";
    }
    else {
        return
    }
}

// Function to handle start/reset button click //
function  handleBtnClick(FSBtn) {
    FSBtn.addEventListener('click', (e) => {
        snd.play();
        removeIntro();

        if (ongoingGame === false) {
            setTimeout(function () {
                setupAndStart()
                FSBtn.classList.remove("pulse");
                FSBtn.innerHTML = '<i class="large material-icons center">restore</i>';
            }, SHORT_DELAY);
            setTimeout(() => { removeLoader() }, LONG_DELAY);
        }
        else if (ongoingGame === true) {
            categories = [];
            setTimeout(function () {
                $("#firstsplash-btn").on("click", setupAndStart());
            }, LONG_DELAY);
            setTimeout(() => { removeLoader() }, LONG_DELAY);
           return
        }    
    }); 
}

// Set up and start game function //
async function setupAndStart() {
    showLoader();
    ongoingGame = false;
    let catIds = await getCategoryIds();
    categories = [];
    for (let catId of catIds) {
        categories.push(await getCategory(catId));
    }
    fillTable();
}

//////////////
///  MAIN  ///
//////////////
    
firstSplash();
buildPreloader(bodyHTML);
