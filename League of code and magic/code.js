/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
// System
var NUMBER_OR_TURNS_DRAFT = 30;
var action;
var turns = 0;

// Player
var playerHealth;
var playerMana;
var playerDeck;
var playerRune;

// Ennemy
var opponentHealth;
var opponentMana;
var opponentDeck;
var opponentRune;

// Action choice
var nCard = 0;

// game loop
while (true) {
    var action = '';
    // Getting the informations of the player first
    var inputs = readline().split(' ');
    playerHealth = parseInt(inputs[0]);
    playerMana = parseInt(inputs[1]);
    playerDeck = parseInt(inputs[2]);
    playerRune = parseInt(inputs[3]);
    // Getteing the informations of the ennemie
    inputs = readline().split(' ');
    opponentHealth = parseInt(inputs[0]);
    opponentMana = parseInt(inputs[1]);
    opponentDeck = parseInt(inputs[2]);
    opponentRune = parseInt(inputs[3]);
        
    var opponentHand = parseInt(readline());
    var cardCount = parseInt(readline());
    for (var i = 0; i < cardCount; i++) {
        var inputs = readline().split(' ');
        var cardNumber = parseInt(inputs[0]);
        var instanceId = parseInt(inputs[1]);
        var location = parseInt(inputs[2]);
        var cardType = parseInt(inputs[3]);
        var cost = parseInt(inputs[4]);
        var attack = parseInt(inputs[5]);
        var defense = parseInt(inputs[6]);
        var abilities = inputs[7];
        var myHealthChange = parseInt(inputs[8]);
        var opponentHealthChange = parseInt(inputs[9]);
        var cardDraw = parseInt(inputs[10]);
    }

    // If we are under 30, we are in the DRAFT mode
    if(turns<NUMBER_OR_TURNS_DRAFT) {
    	// For now, we dont really care which card to pick
        action += 'PICK '+nCard;
    // If we are above 30, we are in the BATTLE mode
    } else {
        
    }
    // Pass to the next turns
    print(action);
    turns++;
}