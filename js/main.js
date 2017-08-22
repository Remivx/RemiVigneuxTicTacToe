$(document).ready(function(){

  var h1 = $('h1');
  var tip = $('#title p')
  var inf = $('#informationJeu');
  var mor = $('.morpion');
  var col = $('.column');
  var exp = $('.explanations');



  var tl = new TimelineLite();

  tl.from(h1, 1, {opacity:0, y:-20})
  .from(tip, 1, {opacity:0, y:-20}, "-=0.5")
  .from(inf, 1, {opacity:0, y:-20}, "-=0.5")
  .from(mor, 1, {opacity:0, y:-20}, "-=0.5")
  .from(col, 1, {opacity:0}, "-=0.5")
  .from(exp, 1, {opacity:0, y: 20}, "-=0.5")



  function isFull(button){
    return button.innerHTML.length == 0;
  }

  function setSymbol(button, symbole) {
    button.innerHTML = symbole;
  }

  function lookingforWinner(square, players, currentTurn){
    if( square[0].innerHTML == players[currentTurn] &&
        square[1].innerHTML == players[currentTurn] &&
        square[2].innerHTML == players[currentTurn] )
        return true;
    if( square[3].innerHTML == players[currentTurn] &&
        square[4].innerHTML == players[currentTurn] &&
        square[5].innerHTML == players[currentTurn] )
        return true;
    if( square[6].innerHTML == players[currentTurn] &&
        square[7].innerHTML == players[currentTurn] &&
        square[8].innerHTML == players[currentTurn] )
        return true;
    if( square[0].innerHTML == players[currentTurn] &&
        square[3].innerHTML == players[currentTurn] &&
        square[6].innerHTML == players[currentTurn] )
        return true;
    if( square[1].innerHTML == players[currentTurn] &&
        square[4].innerHTML == players[currentTurn] &&
        square[7].innerHTML == players[currentTurn] )
        return true;
    if( square[2].innerHTML == players[currentTurn] &&
        square[5].innerHTML == players[currentTurn] &&
        square[8].innerHTML == players[currentTurn] )
        return true;
    if( square[0].innerHTML == players[currentTurn] &&
        square[4].innerHTML == players[currentTurn] &&
        square[8].innerHTML == players[currentTurn] )
        return true;
    if( square[2].innerHTML == players[currentTurn] &&
        square[4].innerHTML == players[currentTurn] &&
        square[6].innerHTML == players[currentTurn] )
        return true;
  }

  function tableFull(square){
    for(var i = 0; i < square.length; i++){
      if(square[i].innerHTML.length == 0)
        return false;
    }
    return true;
  }

  var Display = function(element){
    var content = element;

    function setText(message) {
      content.innerHTML = message;
    }

    return {sendMessage : setText};
  }

  function main(){
    var square = document.querySelectorAll(".morpion button");
    var players = ['X', 'O'];
    var currentTurn = 0;
    var endGame = false;
    var display = new Display(document.querySelector("#informationJeu p"));

    display.sendMessage("Joueur " + players[currentTurn] + ", c'est à vous de commencer.");

    for(var i = 0; i < square.length; i++){

      square[i].addEventListener("click", function(){

        // ARRETE LE JEU EN CAS DE VICTOIRE / MATCH NUL
        if(endGame)
          return;

        // VERIFIE QU'ON NE JOUE PAS 2 FOIS LE MËME BUTTON
        if(!isFull(this)){
          display.sendMessage("Cette case est pleine.");

        } else {
          // AJOUT DE X ou O
          setSymbol(this, players[currentTurn]);

          // CHERCHE SI IL Y A UN VAINQUEUR
          endGame = lookingforWinner(square, players, currentTurn);

          // FIN DU JEU - VAINQUEUR
          if(endGame) {
            display.sendMessage("Le joueur " + players[currentTurn] + " à gagné !!" + '</br><a href="index.php">Recommencer</a>');
            return;
          }
          // MATCH NUL
          if (tableFull(square)){
            display.sendMessage("Aucun vainqueur ... C'est un match nul !" + '</br><a href="index.php">Recommencer</a>');
            return;
          }
          // JEU EN COURS
          currentTurn = currentTurn ^ 1;
          display.sendMessage("Joueur " + players[currentTurn] + ", c'est à vous de jouer.");
        }
      });
    }
  }

  main();

});
