/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
// System
var NUMBER_OR_TURNS_DRAFT = 30;
var MAX_ON_BOARD_SIDE=6;
var CARD_IN_HAND = 0;
var CARD_ON_BOARD = 1;
var action;
var cards;
var turns = 0;

// Action choice
var nCard = 0;

function player() {
    this.health=0;
    this.mana=0;
    this.deck=0;
    this.rune=0;
    this.reset = function(health,mana,deck,rune) {
        this.health = parseInt(health);
        this.mana = parseInt(mana);
        this.deck = parseInt(deck);
        this.rune = parseInt(rune);
    }
}

var me = new player();
var opponent = new player();

function card(cardNumber,instanceId,location,cardType,cost,cardNumber,attack,defense,abilities,myHealthChange,opponentHealthChange,cardDraw) {
    this.cardNumber=parseInt(cardNumber);
    this.instanceId=parseInt(instanceId);
    this.location=parseInt(location);
    this.cardType=parseInt(cardType);
    this.cost=parseInt(cost);
    this.cardNumber=parseInt(cardNumber);
    this.att=parseInt(attack);    
    this.def=parseInt(defense);    
    this.abilities=parseInt(abilities); 
    this.myHealthChange=parseInt(myHealthChange);  
    this.opponentHealthChange=parseInt(opponentHealthChange);  
    this.cardDraw=parseInt(cardDraw);         
}

function chooseCard(cards) {
    // Choose the cards with the best att/def/cost combo
    var choice=cards[cards.length-1];
    var index=cards.length-1;
    for(var i=cards.length-1;i--;) {
        // If the cost of the card is better
        if(cards[i].cost<choice.cost) {
            choice=cards[i]; 
            index=i;
        // If the cost of the card is equals, we look the att/def
        } else if(cards[i].cost==choice.cost) {
            if(cards[i].att+cards[i].def>choice.att+choice.def) {
                   choice=card[i];
                   index=i;
            }
        }
    }
    return index;
}

function chooseSummon(me,cards) {
    // First, I sort the card
    var cardsSorted=[];
    var rsl = '';
    var onBoard = numberCardOneSide(cards);
    for(var i=cards.length;i--;) {
        if(cards[i].location===CARD_IN_HAND) {
            for(var j=0;j<cardsSorted.length && cardsSorted[j].mana<cards[i].mana;j++);
            for(;j<cardsSorted.length && cardsSorted[j].mana==cards[i].mana && cardsSorted[j].att+cardsSorted[j].def==cards[i].att+cards[i].def;j++);
            cardsSorted.splice(j,0,cards[i]);
        }
    }
    // Once they are sorted, I look how many monster I can play
    for(var i=0,mana=me.mana;i<cardsSorted.length;i++) {
        if(mana>=cardsSorted[i].cost && onBoard<MAX_ON_BOARD_SIDE) {
            mana=mana-cardsSorted[i].cost;
            rsl += 'SUMMON '+cardsSorted[i].instanceId+";";
            onBoard++;
        }
    }
    return rsl;
}

function chooseAttack(cards) {
    var rsl='';
    for(var i=cards.length;i--;) {
        if(cards[i].location===CARD_ON_BOARD) {
            rsl += 'ATTACK '+cards[i].instanceId+' -1'+";";        
        }
    }
    return rsl;
}

function numberCardOneSide(cards) {
    for(var i=cards.length,rsl=0;i--;) {
        if(cards[i].location===CARD_ON_BOARD) {
            rsl++;
        }
    }
    return rsl;
}

// game loop
while (true) {
    action = '';
    cards = [];
    // Getting the informations of the player first
    var inputs = readline().split(' ');
    me.reset(inputs[0],inputs[1],inputs[2],inputs[3]);
    // Getteing the informations of the ennemie
    inputs = readline().split(' ');
    opponent.reset(inputs[0],inputs[1],inputs[2],inputs[3]);
        
    var opponentHand = parseInt(readline());
    var cardCount = parseInt(readline());
    for (var i = 0; i < cardCount; i++) {
        var inputs = readline().split(' ');
        cards.push(new card(inputs[0],inputs[1],inputs[2],inputs[3],inputs[4],inputs[5],inputs[6],inputs[7],inputs[8],inputs[9],inputs[10]));
    }
    
    // If we are under 30, we are in the DRAFT mode
    if(turns<NUMBER_OR_TURNS_DRAFT) {
    	// For now, we dont really care which card to pick
    	nCard=chooseCard(cards);
        action += 'PICK '+nCard;
    // If we are above 30, we are in the BATTLE mode
    } else {
        action += chooseSummon(me,cards);
        action += chooseAttack(cards);
    }
    // Pass to the next turns
    print(action);
    turns++;
}

