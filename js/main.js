

//-----WIP-----
window.onload = function(){
  startMenu();
  // printCards(game.cards);
}

function printCards(array){
  $("main").empty()
  $("main").append(`<div id="game-board"></div>`)
  $("main").append(`<div id="scoreboard">scores</div>`)
  $("header").empty()
  $("header").append(`<h1>Pokemon Match</h1><div id="current-player"></div>`)
  $("#game-board").attr('class', 'container');
  $("#game-board").empty();

  let boxCurrent = 0;
  for(let i=0; i<game.dimensions[1]; i++){
    $("#game-board").append(`<div class="row green" id="editing"></div>`);
    for(let j=0; j<game.dimensions[0]; j++){
      $("#editing").append(`<div class="red card-box" id="box${boxCurrent}"></div>`);
      boxCurrent++;
    }
    $("#editing").removeAttr('id');
  }

  //Prints cards
  for(let i=0; i<array.length; i++){
    $(`#box${i}`).append(
      `<div class="card card-active" id="crd${i}">
        <div class="inner-card" data-name="${array[i].name}" id="inr${i}">
          <h2 id="tit${i}">${array[i].name}</h2>
        </div>
      </div>`
    );
    if(array[i].url === undefined){
      $(`#inr${i}`).append(
        `<img src="images/blank-sq.jpg" alt="${array[i].name}" id="img${i}">`
      );
    }else{
      $(`#inr${i}`).append(
        `<img src="${array[i].url}" alt="${array[i].name}" id="img${i}">`
      )
    }
    if(array[i].visible === false){
      $(`#inr${i}`).addClass("hidden");
    }
    if(array[i].active === true){
      $(`#crd${i}`).addClass("card-active");
    }else{
      $(`#crd${i}`).removeClass("card-active");
      $(`#inr${i}`).addClass("hidden");

    }
  }

  let cardSize = 40;
  let x = game.dimensions[0];
  let y = game.dimensions[1];
  //Makes card sizes all exact dimensions
  $(".card").css("width", `${2.5*cardSize}px`);
  $(".card").css("height", `${3.5*cardSize}px`);
  $(".card").css("border-radius", `${cardSize*0.2}px`);
  //Makes height of board based on how many cards wide and high
  // Card ratio * Card Size + Card Margin multiplied by how many cards plus BOARD padding
  $("#game-board").css("width", `${(2.5*cardSize+20)*x+50}px`);
  $("#game-board").css("height", `${(3.5*cardSize+20)*y+50}px`);

  //Runs every time a card is clicked
  $(".card-active").click(function(e){
    if(game.status !== "play"){
      return;
    }

    let myID = $(e.target).attr("id").charAt(3)+$(e.target).attr("id").charAt(4);
    myID = parseInt(myID);
    if(game.fMatch[1] !== myID){
      flipCard(myID);
      seeIfMatch(myID);
    }
  });


  //pushes info out to scoreboard and header
  $("#current-player").append(`player ${game.player}`)
  for(let i=0; i<game.players; i++){
    $("#scoreboard").append(`<div>player ${i+1}: ${game.scores[i]}</div>`);
  }

}
//-----WIP-----
