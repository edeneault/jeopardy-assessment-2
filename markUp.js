// JS file "markUp.js" Jeopardy by Etienne Denault //

// Function to build the Markup for the first splash //
function firstSplash() {
       
    const first_Splash = document.createElement("div");
    first_Splash.setAttribute("id", "first-splash");
    first_Splash.classList.add("container", "center");

    const splashDivCol = document.createElement('div');
    splashDivCol.classList.add("container", "center");
    splashDivCol.setAttribute("id", "splash-div");
    
    first_Splash.append(splashDivCol);
    const FSImage = document.createElement("img");
    FSImage.setAttribute("src", "assets/Jeopardy!_logo.svg");
    FSImage.classList.add( "responsive-img");

    const FSBtn = document.createElement('button');
    FSBtn.setAttribute("id", "firstsplash-btn");
    FSBtn.classList.add("btn-floating", "orange", "waves-effect",
        "waves-light", "center-align", "flow-text", "pulse", "darken-3");
    FSBtn.innerHTML = '<i class="large material-icons center">play_circle_filled</i>';

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("container");

    document.querySelector("body").append(btnDiv);
    btnDiv.append(FSBtn);
    splashDivCol.append(FSImage);
    
                        
    bodyHTML.append(first_Splash); 
   
    const introSpeach = document.createElement("div");
    introSpeach.setAttribute("id", "intro-speach");
    introSpeach.classList.add("container", "center");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("row", "center");
    // String literal here...Todo: redo in JS Vanilla
    videoContainer.innerHTML = `  
                                <div class="tv container "> 
                                    <img src="http://honeypotmarketing.com/wp-content/uploads/OLD-SCHOOL-TV.png" alt="" /> 
                                    <div class="video">
                                        <iframe class="b" src="https://www.youtube.com/embed/njPzMyRGq9c"
                                        frameborder="0">  
                                    </div>
                                <div> 
                                `;

      
   

    const instructions = document.createElement('div');
    instructions.setAttribute("id", "instructions");
    instructions.classList.add("container", "center");
    instructions.innerHTML = `
                              <h3 class="text-white">Welcome to Jeopardy "Trivia"</h1>  
                              <h4>Click the play button to start a game</h4>
                              <h6>Click on a card to see the question, click again to see the answer!</h6>
                            `;
    introSpeach.append(instructions);
    introSpeach.append(videoContainer);  
    
    bodyHTML.append(introSpeach);

   // Function to handle button click 
    handleBtnClick(FSBtn, bodyHTML);
}

// Function to buld Game Container and Table //
function buildContainerAndTable() {

    const gameContainer = document.createElement("div");
    gameContainer.classList.add("container");
    gameContainer.setAttribute("id", "game-container");

    // Remove Game Board - TODO: convert to JS Vanilla //
    $('#board').remove();

    
    const table = document.createElement("table");
    table.setAttribute("id", "board");
    table.classList.add("center", "indigo", "darken-4");
    gameContainer.append(table);
    
    bodyHTML.append(gameContainer);
   
    // Question: Why does the below not work.... //
    // while (table.lastChild) {
    //     table.removeChild(table.lastChild);
    // }

    }

// Function to build the Category Row //
function buildTopRow() {
     
        const topHead = document.createElement("thead"); 
    
        const top = document.createElement("tr"); 
        top.setAttribute("id", "category-row");
     
        const gameTable = document.querySelector("#board");
   
        //  empty table categories jQuery = $('thead').empty(); //
        while (topHead.lastChild) {
            topHead.removeChild(topHead.lastChild);
        }
    
        for (let x = 0; x < CAT_NUM; x++) {
            const headCell = document.createElement("th");
            headCell.setAttribute("id", x);
            headCell.classList.add("indigo", "darken-4", "center-align", "flow-text",
                "white-text", "col", "s2", "responsive-table" 
            );
            top.append(headCell);
            headCell.innerText = categories[x].title;
          }
        topHead.append(top);
        gameTable.append(topHead);
}
    
// Function build cells with Questions //
function buildCluesByCategory() {
    const tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "t-body");
    // empty table body jQuery = $('tbody').empty(); //
    while (tableBody.lastChild) {
        tableBody.removeChild(tableBody.lastChild);
    }

    for (let clueID = 0; clueID < CAT_NUM_CLUES; clueID++) {
        const row = document.createElement("tr");
        for (let catID = 0; catID < CAT_NUM; catID++) {
            const cell = document.createElement("td");
            cell.classList.add("center-align", "indigo", "darken-4");
            const cellDiv = document.createElement("div");
            cellDiv.setAttribute("id", `${catID}-${clueID}`);
            cellDiv.classList.add(  "center-align", "indigo", "darken-4",
                "white-text", "hover" );
            cellDiv.innerText = "?";
            cell.append(cellDiv);
            row.append(cell);
        }
        tableBody.append(row);
    }
       
    board.append(tableBody);
    
    tableBody.addEventListener('click', (e) => {
        handleClick(e);   
     });
}

// Function to display preloader //  
function showLoader() {
    $( "#loadingDiv" ).slideDown(SHORT_DELAY, function() {
        $( "#loadingDiv" ).css("display","inline"); 
    });  
}
 
// Function to remove preloader //
function removeLoader() {
        $( "#loadingDiv" ).slideDown("slow", function() {
        $( "#loadingDiv" ).css("display","none"); 
      });  
}

// Function to remove the IntroVideo and Instructions //
function removeIntro() {
    $('#intro-speach').fadeOut("slow", function() {
        $('#intro-speach').empty();
    });
}

// Function to build the preloader //
function buildPreloader(bodyHTML) {
    const preLoader = document.createElement('div');
    preLoader.innerHTML = `<div class="container progress active text-center" style="display: none" id="loadingDiv"">
                            <div class="center indeterminate"></div>
                                </div>`;
    bodyHTML.append(preLoader);
}