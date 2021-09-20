var cards = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardCount = 0;
// pushing cards in Cards[] array
for (s in suits) {
  var suit = suits[s][0].toUpperCase();
  var bgcolor = suit == "S" || suit == "C" ? "black" : "red";
  for (n in numb) {
    //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
    var cardValue = n > 9 ? 10 : parseInt(n) + 1;
    //var cardValue = 1;
    var card = {
      suit: suit,
      icon: suits[s],
      bgcolor: bgcolor,
      cardnum: numb[n],
      cardvalue: cardValue,
    };
    cards.push(card);
  }
}

if (localStorage.wallatbal == undefined) {
  localStorage.wallatbal = 500;
  document.getElementById("myWalletbal5").innerHTML == 500;
} else if (localStorage.wallatbal) {
  myWalletbal5.innerHTML = parseInt(localStorage.wallatbal);
} else {
  localStorage.wallatbal = 500;
  document.getElementById("myWalletbal5").innerHTML == 500;
}

var myWalletbal = localStorage.wallatbal;

function startGame() {
  play_audio_click();
  var regex = /^[1-9]\d{0,2}$/;
  var betAmount = parseInt(document.getElementById("betAmount").value);
  if (regex.test(betAmount) && betAmount >= 1) {
    // dealNew();

    if (betAmount <= myWalletbal) {
      play_game_start();
      localStorage.wallatbal = myWalletbal - betAmount;
      myWalletbal = localStorage.wallatbal;
      document.getElementById("inputDiv").style.display = "none";
      document.getElementById("btnDiv").style.display = "block";
      document.getElementById("cardDiv").style.display = "block";
      // betAmount2.innerHTML = betAmount;
      document.getElementById("betAmount2").innerText = betAmount;
      myWalletbal5.innerHTML = localStorage.wallatbal;
      document.getElementById("btnResetDiv").style.display = "none";
      shuffleDeck(cards);
      dealNew();
    } else {
      alert("You don't have enough balance in your Wallat.");
    }
  } else {
    alert("Enter Valid Amount.");
  }
}

//playerucard funtion for Hit Action
function playucard() {
  playerCard.push(cards[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, playerCard.length - 1);
  redeal();
  var rValu = checktotal(playerCard);
  playerValue.innerHTML = rValu;
  if (rValu > 21) {
    message.innerHTML = "busted!";
    playend();
  }
}

// cardAction Function
function cardAction(a) {
  play_audio_click();
  switch (a) {
    case "hit":
      playucard(); // add new card to players hand
      break;
    case "hold":
      playend(); // playout and calculate
      break;
    case "double":
      var betAmount = parseInt(document.getElementById("betAmount").value);
      if (myWalletbal - betAmount < 0) {
        betAmount = betAmount + myWalletbal;
        myWalletbal = 0;
      } else {
        myWalletbal = myWalletbal - betAmount;
        betAmount = betAmount * 2;
      }
      document.getElementById("myWalletbal5").innerHTML = myWalletbal;
      document.getElementById("betAmount").value = betAmount;
      playucard(); // add new card to players hand
      playend(); // playout and calculate
      break;
    default:
      console.log("done");
      playend(); // playout and calculate
  }
}

// deal function

function dealNew() {
  dealerValue.innerHTML = "?";
  playerCard = [];
  dealerCard = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";
  if (localStorage.wallatbal > 0) {
    deal();
  } else {
    alert("Out of Ca$h");
    location.reload();
  }
}

function deal() {
  for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x == 0) {
      dealerHolder.innerHTML +=
        '<div id="cover" style="margin-left:-110px;"></div>';
    }
    redeal();
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    redeal();
  }
  var playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    playend();
  }
  playerValue.innerHTML = playervalue;
}

// redeal funtion
function redeal() {
  cardCount++;
  if (cardCount > 40) {
    console.log("NEW DECK");
    shuffleDeck(cards);
    cardCount = 0;
  }
}

// checkTotal

function checktotal(arr) {
  var rValue = 0;
  var aceAdjust = false;
  for (var i in arr) {
    if (arr[i].cardnum == "A" && !aceAdjust) {
      aceAdjust = true;
      rValue = rValue + 10;
    }
    rValue = rValue + arr[i].cardvalue;
  }

  if (aceAdjust && rValue > 21) {
    rValue = rValue - 10;
  }
  return rValue;
}

// shuffle card deck function

function shuffleDeck(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
// cardOutput funtion

function cardOutput(n, x) {
  if ((hpos = x > 0)) {
    hpos = x * 60 + 100;
    return (
      '<div class="icard ' +
      cards[n].icon +
      '" style=" transform: rotate(8deg);">  <div class="top-card suit">' +
      cards[n].cardnum +
      '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' +
      cards[n].cardnum +
      "<br></div> </div>"
    );
  } else {
    hpos = 100;
    return (
      '<div class="icard ' +
      cards[n].icon +
      '" >  <div class="top-card suit">' +
      cards[n].cardnum +
      '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' +
      cards[n].cardnum +
      "<br></div> </div>"
    );
  }
}

// Reset game funcation

function gameReset() {
  play_audio_click();
  location.reload();
}

//
function ResetLocalStorage() {
  play_audio_click();
  if (localStorage.wallatbal) {
    localStorage.removeItem("wallatbal");
  }
  location.reload();
}

//play end

function playend() {
  document.getElementById("btnDiv").style.display = "none";
  document.getElementById("btnResetDiv").style.display = "block";
  document.getElementById("cover").style.display = "none";
  message.innerHTML = "Game Over<br>";
  var payoutJack = 1;
  var dealervalue = checktotal(dealerCard);
  dealerValue.innerHTML = dealervalue;

  while (dealervalue < 17) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, dealerCard.length - 1);
    redeal();
    dealervalue = checktotal(dealerCard);
    dealerValue.innerHTML = dealervalue;
  }

  //WHo won???
  var playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    play_audio_win();
    message.innerHTML = "Player Blackjack 💥😎🤑😉🎉✨🎁";
    payoutJack = 1.5;
    playend();
  }

  var betvalue =
    parseInt(document.getElementById("betAmount").value) * payoutJack;
  if (
    (playervalue < 22 && dealervalue < playervalue) ||
    (dealervalue > 21 && playervalue < 22)
  ) {
    play_audio_win();
    message.innerHTML +=
      '<span style="color:green;">You WIN! 💥🤑🎁 You won <strong>₹ ' +
      betvalue +
      "</strong></span>";
    localStorage.wallatbal = parseInt(localStorage.wallatbal) + betvalue * 2;
  } else if (playervalue > 21) {
    game_tie_audio();
    message.innerHTML +=
      '<span style="color:red;">Dealer Wins! You lost <strong>₹ ' +
      betvalue +
      " 🤯💔</strong></span>";
  } else if (playervalue == dealervalue) {
    ame_tie_audio();
    message.innerHTML += '<span style="color:blue;">Game Tie ✨🎉</span>';
    localStorage.wallatbal = parseInt(localStorage.wallatbal) + betvalue;
  } else {
    game_tie_audio();
    message.innerHTML +=
      '<span style="color:red;">Dealer Wins! You lost <strong>₹ ' +
      betvalue +
      " 🤯🤯💔</strong></span>";
  }
  playerValue.innerHTML = playervalue;
  myWalletbal5.innerHTML = localStorage.wallatbal;
}



function play_audio_click(){

	let audio=new Audio('./music/click3.wav');
	audio.volume = 0.5;
	audio.play();
	}
	function play_audio_win(){
	
		let audio=new Audio('./music/Tada-sound.mp3');
		audio.volume = 0.2;
		audio.play();
		}
		function play_game_start(){
	
			let audio=new Audio('./music/start_new.wav');
			audio.volume = 0.2;
			audio.play();
			}
			function game_tie_audio(){
	
				let audio=new Audio('./music/tie.mp3');
				audio.play();
				}