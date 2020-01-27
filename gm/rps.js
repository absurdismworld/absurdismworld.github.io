var rps = {
  /* [PROPERTIES] */
  eYou : null, // holds your move HTML container
  eCom : null, // holds computer move HTML container
  eSel : null, // holds HTML rock, scissors, paper selector
  eGo : null, // holds HTML go button
  eWin : null, wins : 0, // wins counter
  eLose: null, loses : 0, // loses counter
  eDraw : null, draws : 0, // draws counter

  /* [GAME INIT] */
  load : function () {
  // load() : preload all the images

    var images = ["game-rock.png", "game-paper.png", "game-scissors.png"],
        img = null,
        loaded = 0;
    for (var i of images) {
      img = new Image();
      img.onload = function(){
        loaded++;
        if (loaded == images.length) { rps.init(); }
      };
      img.src = i;
    }
  },

  init : function () {
  // init() : prepare the game

    // Get all the necessary game elements
    rps.eYou = document.getElementById("rps-you-move");
    rps.eCom = document.getElementById("rps-com-move");
    rps.eSel = document.getElementById("rps-you-sel");
    rps.eGo = document.getElementById("rps-you-go");
    rps.eWin = document.getElementById("rps-win");
    rps.eLose = document.getElementById("rps-lose");
    rps.eDraw = document.getElementById("rps-draw");

    // When user changes rock, paper, scissors selection
    rps.eSel.addEventListener("change", rps.switch);
    rps.switch();

    // When user hits "Go!"
    rps.eGo.addEventListener("click", rps.game);

    // Unlock all controls
    rps.eSel.disabled = false;
    rps.eGo.disabled = false;
  },

  /* [GAME RUN] */
  switch : function () {
  // switch() : when user changes move

    var img = new Image();
    img.src = "game-" + rps.eSel.value + ".png";
    rps.eYou.innerHTML = "";
    rps.eYou.appendChild(img);
  },

  game : function () {
  // game() : game on!

    // Random computer move - Equal 33.3333% chance to get each
    var comMove = Math.random();
    if (comMove <= 0.33) { comMove = "rock"; }
    else if (comMove <= 0.67) { comMove = "paper"; }
    else { comMove = "scissors"; }

    // Update computer move graphic
    var img = new Image();
    img.src = "game-" + comMove + ".png";
    rps.eCom.innerHTML = "";
    rps.eCom.appendChild(img);

    // Win, lose, or draw?
    var youMove = rps.eSel.value;
    if (youMove == comMove) {
      rps.draws++;
      rps.eDraw.innerHTML = rps.draws;
      alert("DRAW");
    } else {
      var win = true;
      switch (youMove) {
        case "rock":
          if (comMove=="paper") { win = false; }
          break;
        case "paper":
          if (comMove=="scissors") { win = false; }
          break;
        case "scissors":
          if (comMove=="rock") { win = false; }
          break;
      }
      if (win) {
        rps.wins++;
        rps.eWin.innerHTML = rps.wins;
        alert("YOU WIN");
      } else {
        rps.loses++;
        rps.eLose.innerHTML = rps.loses;
        alert("YOU LOSE");
      }
    }
  }
};
window.addEventListener("load", rps.load);