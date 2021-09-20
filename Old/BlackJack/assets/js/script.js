var cards = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardCount = 0;
// pushing cards in Cards[] array
for (s in suits) {
  var suit = suits[s][0].toUpperCase();
  var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
  for (n in numb) {
    //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
    var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
    //var cardValue = 1;
    var card = {
      suit: suit,
      icon: suits[s],
      bgcolor: bgcolor,
      cardnum: numb[n],
      cardvalue: cardValue
    }
    cards.push(card);
  }
}



if (localStorage.wallatbal == undefined) {
  localStorage.wallatbal = 500;
  document.getElementById("myWalletbal5").innerHTML == 500;
}
else if(localStorage.wallatbal)
{

  myWalletbal5.innerHTML = parseInt(localStorage.wallatbal);
}

else{
  console.log("hey hey");
  localStorage.wallatbal = 500;
  document.getElementById("myWalletbal5").innerHTML == 500;
}
 
var myWalletbal =localStorage.wallatbal;

function startGame(){
  var regex=/^[1-9]\d{0,2}$/;
  var betAmount=parseInt(document.getElementById("betAmount").value);;
  if(regex.test(betAmount) && betAmount>=1)
  {
      
   
   // dealNew();
    
    if(betAmount<=myWalletbal )
    {
      localStorage.wallatbal = myWalletbal-betAmount;
      myWalletbal=localStorage.wallatbal;
      document.getElementById('btnDiv').style.display = 'block';
      document.getElementById('cardDiv').style.display = 'block';
      document.getElementById('inputDiv').style.display = 'none';
      betAmount2.innerHTML = betAmount;
      myWalletbal5.innerHTML = localStorage.wallatbal;
      document.getElementById('btnResetDiv').style.display = 'none';

      shuffleDeck(cards);
      dealNew();    



    }
    else{
      alert("you don't have enough balance in your wallat");
   }

  }
  else{
     alert("Enter Valid Amount");
  }

}

//playerucard funtion for Hit Action
function playucard() {
  playerCard.push(cards[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length - 1));
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
  console.log(a);
  switch (a) {
    case 'hit':
      playucard(); // add new card to players hand
      break;
    case 'hold':
      playend(); // playout and calculate
      break;
    case 'double':
      var betAmount = parseInt(document.getElementById('betAmount').value);
      if ((myWalletbal - betAmount) < 0) {
        betAmount = betAmount + myWalletbal;
        myWalletbal = 0;
      } else {
        myWalletbal = myWalletbal - betAmount;
        betAmount = betAmount * 2;
      }
      document.getElementById('myWalletbal5').innerHTML = myWalletbal;
      document.getElementById('betAmount').value = betAmount;
      playucard(); // add new card to players hand
      playend(); // playout and calculate
      break;
    default:
      console.log('done');
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
  if(localStorage.wallatbal>0)
  {
  deal();
  }
  else{
    
    alert("Out of Ca$h");
    location.reload();
  }
}

function deal() {
  for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x == 0) {
      dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
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
    if (arr[i].cardnum == 'A' && !aceAdjust) {
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
  if(hpos = (x > 0)){ 
    hpos =  x * 60 + 100;
    return '<div class="icard ' + cards[n].icon + '" style=" left:' + hpos + 'px; transform: rotate(8deg);">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
    '<br></div> </div>';
  } else{
    hpos = 100
    return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px; ">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
    '<br></div> </div>';
  };
  
}

// Reset game funcation

function gameReset()
{
  location.reload();
}

//
function ResetLocalStorage()
{
  if (localStorage.wallatbal) {
	  localStorage.removeItem("wallatbal");
	}
  location.reload();
}


//play end 

function playend() {
  endplay = true;
  document.getElementById('btnDiv').style.display = 'none';
  document.getElementById('btnResetDiv').style.display = 'block';
  document.getElementById('cover').style.display = 'none';
  message.innerHTML = "Game Over<br>";
  var payoutJack = 1;
  var dealervalue = checktotal(dealerCard);
  dealerValue.innerHTML = dealervalue;

  while (dealervalue < 17) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length - 1));
    redeal();
    dealervalue = checktotal(dealerCard);
    dealerValue.innerHTML = dealervalue;
  }

  //WHo won???
  var playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    message.innerHTML = "Player Blackjack";
    payoutJack = 1.5;
    playend();
  }

  var betvalue = parseInt(document.getElementById('betAmount').value) * payoutJack;
  if ((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22)) {
    message.innerHTML += '<span style="color:green;">You WIN! You won Rs. ' + betvalue + '</span>';
    localStorage.wallatbal = parseInt(localStorage.wallatbal) + (betvalue * 2);
  } else if (playervalue > 21) {
    message.innerHTML += '<span style="color:red;">Dealer Wins! You lost Rs. ' + betvalue + '</span>';
  } else if (playervalue == dealervalue) {
    message.innerHTML += '<span style="color:blue;">Game Tie</span>';
    localStorage.wallatbal = parseInt(localStorage.wallatbal) + betvalue;
  } else {
    message.innerHTML += '<span style="color:red;">Dealer Wins! You lost Rs. ' + betvalue + '</span>';
  }
  playerValue.innerHTML = playervalue;
  myWalletbal5.innerHTML = localStorage.wallatbal;
}