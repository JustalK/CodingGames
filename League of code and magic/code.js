/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
// System
var NUMBER_OR_TURNS_DRAFT = 30;
var MAX_ON_BOARD_SIDE=6;
var CARD_IN_HAND = 0;
var CARD_ON_BOARD = 1;
var OPPONENT_BOARD = -1;
var TYPE_CREATURE = 0;
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

function card(cardNumber,instanceId,location,cardType,cost,attack,defense,abilities,myHealthChange,opponentHealthChange,cardDraw) {
    this.cardNumber=parseInt(cardNumber);
    this.instanceId=parseInt(instanceId);
    this.location=parseInt(location);
    this.cardType=parseInt(cardType);
    this.cost=parseInt(cost);
    this.cardNumber=parseInt(cardNumber);
    this.att=parseInt(attack);    
    this.def=parseInt(defense);    
    this.abilities=abilities; 
    this.myHealthChange=parseInt(myHealthChange);  
    this.opponentHealthChange=parseInt(opponentHealthChange);  
    this.cardDraw=parseInt(cardDraw);  
    this.rank;
}

function chooseCard(cards) {
    // Choose the cards with the best att/def/cost combo
    var index=0;
    var actualRank=165;
    for(var i=cards.length;i--;) {
        cards[i].rank = rankCard(cards[i]);
        if(cards[i].rank<actualRank) {
            actualRank = cards[i].rank;
            index = i;
        }
    }
    
    return index;
}

/**
* System of rank card
*/
function rankCard(card) {
    switch(card.cardNumber) {
        /* 0 mana */
        case 91: return 1;
        case 83: return 2;
        /* 1 mana */
        case 2: return 3;
        case 24: return 4;
        case 93: return 5;
        case 1: return 6;
        case 3: return 7;
        case 39: return 8;
        case 38: return 9;
        case 48: return 10;
        case 92: return 11;
        /* 2 mana */
        case 29: return 12; /* 2/1 Draw+1 */
        case 28: return 13; /* 1/2 Draw+1 */
        case 25: return 14; /* 3/1 H-2 */
        case 26: return 15; /* 3/2 H-1 */
        case 96: return 16; /* 3/2 G */
        case 95: return 17; /* 2/3 G */
        case 94: return 18; /* 1/4 G */
        case 64: return 19; /* 1/1 GW */
        case 55: return 20; /* 0/5 G */
        case 63: return 21; /* 0/4 GW */
        case 27: return 22; /* 2/2 H+2 */
        case 84: return 23; /* 1/1 CDW */
        case 5: return 24; /* 4/1 */
        case 6: return 25; /* 3/2 */
        case 8: return 26; /* 2/3 */
        case 65: return 27; /* 2/2 W */
        case 7: return 28; /* 2/2 W */
        case 4: return 29; /* 1/5 */
        case 47: return 30; /* 1/5 D */
        case 49: return 31; /* 1/2 GL */
        /* 3 mana*/
        case 32: return 32; /* 3/2 Draw+1 */
        case 30: return 33; /* 4/2 H-2 */
        case 31: return 34; /* 3/1 H-1 */
        case 97: return 35; /* 3/3 G */
        case 99: return 36; /* 2/5 G */
        case 98: return 37; /* 2/4 G */
        case 100: return 38; /* 1/6 G */
        case 40: return 39; /* 2/3 DG */
        case 69: return 40; /* 4/4 B */
        case 41: return 41; /* 2/2 CD */
        case 86: return 42; /* 1/5 C */
        case 11: return 43; /* 5/2 */
        case 50: return 44; /* 3/2 L */
        case 10: return 45; /* 3/1 D */
        case 54: return 46; /* 2/2 L */
        case 12: return 47; /* 2/5 */
        /* 4 Mana */
        case 33: return 48; /* 4/3 Draw+1 */
        case 13: return 49; /* 5/3 H+1/-1 */
        case 102: return 50; /* 3/3 G H-1 */
        case 103: return 51; /* 3/6 G */
        case 104: return 52; /* 4/4 G */
        case 101: return 53; /* 3/4 G */
        case 14: return 54; /* 9/1 */
        case 87: return 55; /* 2/5 CG */
        case 73: return 56; /* 4/4 B/H+4 */
        case 18: return 57; /* 7/4 */
        case 70: return 58; /* 5/3 6/3 B */
        case 72: return 59; /* 5/3 5/3 B */
        case 16: return 60; /* 6/2 */
        case 15: return 61; /* 4/5 */
        case 17: return 62; /* 4/5 */
        case 71: return 63; /* 3/2 CB */
        case 42: return 64; /* 4/2 D */
        case 51: return 65; /* 3/5 L */
        case 52: return 66; /* 2/4 L */
        case 53: return 67; /* 1/1 CL */
        case 57: return 68; /* 1/8 */
        /* 5 Mana */
        case 34: return 69; /* 3/5 Draw+1 */
        case 107: return 70; /* 3/3 G H+3 */
        case 74: return 71; /* 5/4 BG */
        case 106: return 72; /* 5/5 G */
        case 105: return 73; /* 4/6 G */
        case 108: return 74; /* 2/6 G */
        case 75: return 75; /* 6/5 B */
        case 20: return 76; /* 8/2 */
        case 88: return 77; /* 4/4 C */
        case 89: return 78; /* 4/1 C */
        case 21: return 79; /* 6/5 */
        case 19: return 80; /* 5/6 */
        case 109: return 81; /* 5/6 */
        case 66: return 82; /* 5/1 W */
        case 109: return 83; /* 0/9 G */
        /* 6 Mana */
        case 36: return 84; /* 4/4 Draw 2 cards */
        case 35: return 85; /* 5/2 B Draw 1 */
        case 37: return 86; /* 5/7 Draw 1 */
        case 113: return 87; /* 2/4 G H+4 */
        case 111: return 88; /* 6/6 G */
        case 112: return 89; /* 4/7 G */
        case 67: return 90; /* 5/5 WH-2 */
        case 45: return 91; /* 6/5 BD */
        case 58: return 92; /* 5/6 B */
        case 76: return 93; /* 5/5 BD */
        case 68: return 94; /* 7/5 W */
        case 22: return 95; /* 7/5 */
        case 43: return 96; /* 5/5 D */
        case 44: return 97; /* 3/7 DL */
        /* Super Card */
        case 78: return 98; /* 5/5 B H-5 */
        case 62: return 99; /* 12/12 BG */
        case 116: return 100; /* 8/8 BCDGLW */
        case 114: return 101; /* 7/7 G */
        case 82: return 102; /* 7/7 BDW */
        case 80: return 103; /* 8/8 BG Draw 1 */
        case 79: return 104; /* 8/8 B */
        case 77: return 105; /* 7/7 B */
        case 59: return 106; /* 7/7 H+1/H-1 */  
        case 81: return 107; /* 6/6 BC */
        case 61: return 108; /* 10/10 */
        case 23: return 109; /* 8/8 */
        case 60: return 110; /* 4/8 */
        case 115: return 111; /* 5/5 GW */
        case 90: return 112; /* 5/5 C */
    }
    return 1000;
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
    var guardOpponentCard = [];
    for(var i=cards.length;i--;) {
        if(cards[i].location===OPPONENT_BOARD) {
            if(cards[i].cardType===TYPE_CREATURE && cards[i].abilities.indexOf('G')!=-1) {
                guardOpponentCard.push(cards[i]);    
            }
        }
    }
    for(var i=cards.length;i--;) {
        if(cards[i].location===CARD_ON_BOARD) {
            if(guardOpponentCard.length==0) {
                rsl += 'ATTACK '+cards[i].instanceId+' -1'+";";
            } else {
                rsl += 'ATTACK '+cards[i].instanceId+' '+guardOpponentCard[0].instanceId+";";
            }
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
