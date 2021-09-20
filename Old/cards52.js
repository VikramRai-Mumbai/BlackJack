//clubs (♣), diamonds (♦), hearts (♥), and spades (♠)
let symbol = ["♣", "♦", "♥", "♠"];
let value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cards = [];
let playerHand;
let dealerHand;

for (let i = 0; i < symbol.length; i++) {
  // console.log(symbol[i]);
  for (let j = 0; j < value.length; j++) {
    // console.log(symbol[i] + value[j]);
    cards.push(value[j] + symbol[i]);
  }
}
console.log(cards);

randomCards = () => {
  let getRandomCard = cards[Math.floor(Math.random() * cards.length)];
  cards = cards.filter((item) => item !== getRandomCard);
  console.log(cards.length);
  return getRandomCard;
};

clickCard = () => {
  //   console.log(randomCards());
  playerHand = [randomCards(), randomCards()];
  let playerValue = document.getElementById("playerCard1");
  console.log(playerValue && playerHand);
  playerValue.innerHTML = playerHand[0];
  dealerHand = [randomCards(), randomCards()];
  let dealerValue = document.getElementById("dealerCard1");
  console.log(dealerValue && dealerHand);
  dealerValue.innerHTML = dealerHand[0];
  // cards = cards.filter((item) => item !== randomPlayerCard);
  // console.log(cards.length);
};
// console.log(randomCards());
