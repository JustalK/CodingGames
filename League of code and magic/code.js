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
var boostItem = [128,122,125,127,129,123,131,132];

// Action choice
var nCard = 0;
var deck = [];
var monsterInHand = [];
var itemInHand = [];
var monsterInGame = [];

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

function card(cardNumber,instanceId,location,cardType,cost,attack,defense,abilities,myHealthChange,opponentHealthChange,cardDraw,index) {
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
    this.index=index;
    this.played=false;
    this.blocked=false;
}


function chooseCard(cards) {
    cards.sort(function(a,b) {return rankCard(a)>rankCard(b)});
    deck.push(cards[0]);
    return cards[0].index;
}

/**
* System of rank card
*/
function rankCard(card) {
    switch(card.cardNumber) {
        /* MUST HAVE */
        case 142: return -6; /* Remove the guard */
        case 143: return -5; /* Remove all abilities */
        case 148: return -5; /* Remove all abilities and 2 damage */
        case 154: return -4; /* Damage 2 - Draw 1 */
        case 156: return -3; /* Damage 3 and heal 3 */
        case 160: return -2; /* Damage 2 and heal 2 */
        case 153: return -1; /* Damage 2 and heal 2 */
        case 128: return -1; /* Boost +4/3 */
        case 122: return -1; /* Boost +1/3 G */
        case 125: return -1; /* Boost +2/1 Drain */
        case 127: return -1; /* Boost +0/6 */
        case 129: return -1; /* Boost +2/5 */
        case 123: return -1; /* Boost +4/0 */
        case 131: return -1; /* Boost +4/1 */
        case 132: return -1; /* Boost +3/3 B */
        
        case 82: return 1; /* 7/7 BDW */
        case 116: return 2; /* 8/8 BCDGLW */
        case 80: return 2; /* M8 8/8 BG Draw 1 */
        case 79: return 2; /* M8 8/8 B */
        case 77: return 2; /* M7 7/7 B */
        case 114: return 2; /* M7 7/7 G */
        
        case 43: return 4; /* M6 5/5 D */
        case 76: return 5; /* M6 5/5 BD */
        case 44: return 6; /* M6 3/7 DL */
        case 42: return 7; /* M4 4/2 D */
        case 10: return 8; /* M3 3/1 D */
        case 39: return 9; /* M1 2/1 Drain */
        case 41: return 10; /* M3 2/2 CD */
        case 47: return 11; /* M2 1/5 D */
        case 38: return 12; /* M1 1/3 drain */
        case 45: return 13; /* M6 6/5 BD H-3 */
        
        case 64: return 4; /* M2 1/1 GW */
        case 63: return 5; /* M2 0/4 GW */
        case 91: return 1; /* M0 1/2 GH+1 */
        case 93: return 2; /* M1 2/1 G */
        case 84: return 3; /* M2 1/1 CDW */
        case 49: return 6; /* M2 1/2 GL */
        case 96: return 7; /* M2 3/2 G */
        case 95: return 8; /* M2 2/3 G */
        case 94: return 9; /* M2 1/4 G */
        case 55: return 10; /* M2 0/5 G */
        case 100: return 11; /* M3 1/6 G */
        case 99: return 12; /* M3 2/5 G */
        case 98: return 13; /* M3 2/4 G */
        case 97: return 14; /* M3 3/3 G */
        case 40: return 15; /* M3 2/3 DG */
        case 103: return 16; /* M4 3/6 G */
        case 87: return 17; /* M4 2/5 CG */
        case 104: return 18; /* M4 4/4 G */
        case 101: return 19; /* M4 3/4 G */
        case 102: return 20; /* M4 3/3 G H-1 */
        case 105: return 21; /* M5 4/6 G */
        case 108: return 22; /* M5 2/6 G */
        case 106: return 23; /* M5 5/5 G */
        case 74: return 24; /* M5 5/4 BG */
        case 107: return 25; /* M5 3/3 G H+3 */
        case 109: return 26; /* M5 0/9 G */
        case 112: return 27; /* M6 4/7 G */
        case 111: return 28; /* M6 6/6 G */
        case 113: return 29; /* M6 2/4 G H+4 */
        
        /* 0 mana */
        case 83: return 100; /* 1/1 Charge */
        /* 1 mana */
        case 48: return 101; /* 1/1 lethal */
        case 2: return 104; /* 1/2 H-1 */
        case 24: return 105; /* 1/1 H-1 */
        case 1: return 106; /* 2/1 H+1 */
        case 3: return 107; /* 2/2 */
        case 92: return 108; /* 0/1 G H+2 */
        /* 2 mana */
        case 29: return 109; /* 2/1 Draw+1 */
        case 28: return 110; /* 1/2 Draw+1 */
        case 65: return 111; /* 2/2 W */
        case 7: return 112; /* 2/2 W */
        case 27: return 113; /* 2/2 H+2 */
        case 25: return 114; /* 3/1 H-2 */
        case 26: return 115; /* 3/2 H-1 */
        case 5: return 116; /* 4/1 */
        case 6: return 117; /* 3/2 */
        case 8: return 118; /* 2/3 */
        case 4: return 120; /* 1/5 */
        /* 3 mana*/
        case 32: return 121; /* 3/2 Draw+1 */
        case 50: return 122; /* 3/2 L */
        case 54: return 123; /* 2/2 L */
        case 30: return 124; /* 4/2 H-2 */
        case 31: return 125; /* 3/1 H-1 */
        case 69: return 126; /* 4/4 B */
        case 86: return 128; /* 1/5 C */
        case 11: return 129; /* 5/2 */
        case 12: return 131; /* 2/5 */
        /* 4 Mana */
        case 14: return 132; /* 9/1 */
        case 33: return 133; /* 4/3 Draw+1 */
        case 51: return 134; /* 3/5 L */
        case 52: return 135; /* 2/4 L */
        case 18: return 136; /* 7/4 */
        case 16: return 137; /* 6/2 */
        case 13: return 139; /* 5/3 H+1/-1 */
        case 73: return 140; /* 4/4 B/H+4 */
        case 70: return 141; /* 5/3 6/3 B */
        case 72: return 142; /* 5/3 5/3 B */
        case 15: return 143; /* 4/5 */
        case 17: return 144; /* 4/5 */
        case 71: return 145; /* 3/2 CB */
        case 57: return 146; /* 1/8 */
        case 53: return 147; /* 1/1 CL */
        /* 5 Mana */
        case 66: return 151; /* 5/1 W */
        case 34: return 152; /* 3/5 Draw+1 */
        case 20: return 153; /* 8/2 */
        case 75: return 154; /* 6/5 B */
        case 21: return 155; /* 6/5 */
        case 109: return 156; /* 5/6 */
        case 19: return 157; /* 5/6 */
        case 88: return 158; /* 4/4 C */
        case 89: return 159; /* 4/1 C */
        /* 6 Mana */
        case 68: return 160; /* M6 7/5 W */
        case 22: return 161; /* M6 7/5 */
        case 36: return 166; /* 4/4 Draw 2 cards */
        case 35: return 167; /* 5/2 B Draw 1 */
        case 37: return 168; /* 5/7 Draw 1 */
        case 67: return 169; /* 5/5 WH-2 */
        case 58: return 170; /* 5/6 B */
        /* Super Card */
        case 115: return 172; /* M8 5/5 GW */
        case 62: return 174; /* 12/12 BG */
        case 78: return 175; /* 5/5 B H-5 */
        case 61: return 177; /* 10/10 */
        case 59: return 181; /* 7/7 H+1/H-1 */  
        case 81: return 182; /* 6/6 BC */
        case 23: return 183; /* 8/8 */
        case 60: return 184; /* 4/8 */
        case 90: return 185; /* 5/5 C */
    }
    return 1000;
}

// game loop
while (true) {
    action = '';
    cards = [];
    monsterInHand = [];
    monsterInGame = [];
    itemInHand = [];
    monsterOpponent = [];
    
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
        var acard = new card(inputs[0],inputs[1],inputs[2],inputs[3],inputs[4],inputs[5],inputs[6],inputs[7],inputs[8],inputs[9],inputs[10],i);
        if(acard.cardType===TYPE_CREATURE && acard.location===CARD_IN_HAND) monsterInHand.push(acard);
        monsterInHand.sort(function(a,b) {return a.cost>b.cost });
        if(acard.location===CARD_ON_BOARD) monsterInGame.push(acard);
        if(acard.cardType!==TYPE_CREATURE && acard.location===CARD_IN_HAND) itemInHand.push(acard);
        if(acard.cardType===TYPE_CREATURE && acard.location===OPPONENT_BOARD) monsterOpponent.push(acard);
        monsterOpponent.sort(function(a,b) {return a.cost>b.cost });
        cards.push(acard);
    }
    
    // If we are under 30, we are in the DRAFT mode
    if(turns<NUMBER_OR_TURNS_DRAFT) {
    	// For now, we dont really care which card to pick
    	nCard=chooseCard(cards);
        action += 'PICK '+nCard;
    // If we are above 30, we are in the BATTLE mode
    } else {
    	freeActions();
    	boostMonsterSaveActions();
    	lethalItemActions();
    	summonActions();
    	attackItemActions();
    	boostItemActions();
        attackMonsterActions();
    }
    // Pass to the next turns
    print(action);
    turns++;
}

/**
* Cherche pour toutes les actions gratuites 
*/
function freeActions() {
	isNeedDisable();
}

/**
* Si il y a des creatures avec garde et aue j'ai une carte de disable, on l'a joue 
**/
function isNeedDisable() {
	for(var j=0;j<monsterOpponent.length;j++) {
		if(monsterOpponent[j].abilities.indexOf('G')!=-1) {
			for(var i=0;i<itemInHand.length;i++) {
				if(itemInHand[i].cardNumber==142 || itemInHand[i].cardNumber==143) {
					if(!itemInHand[i].played) {
						itemInHand[i].played=true;
						monsterOpponent[j].abilities.replace('G','-');
						action+='USE '+itemInHand[i].instanceId+' '+monsterOpponent[j].instanceId+';';
					}
				}
			}
		}
	}
}

function summonActions() {
	summonGuardMonsterActions();
	summonOtherMonsterActions();
}

function boostMonsterSaveActions() {
    monsterOpponent.sort(function(a,b) {return a.att>b.att });
    var attMe = 0;
    var attOpponent = 0;
    for(var i=monsterOpponent.length;i--;) {
        if(attOpponent<monsterOpponent[i].att) {
            attOpponent=monsterOpponent[i].att;
        }
    }    
    for(var i=monsterInHand.length;i--;) {
        if(attMe<monsterInHand[i].att) {
            attMe=monsterInHand[i].att;
        }
    }
    for(var i=monsterInGame.length;i--;) {
        if(attMe<monsterInGame[i].att) {
            attMe=monsterInGame[i].att;
        }
    }
    if(attOpponent>=attMe) {
        boostItemActions();
    }
}

function lethalItemActions() {
    for(var i=monsterOpponent.length,monsterLethal=false;i--;) {
        if(monsterOpponent[i].abilities.indexOf('L')!=-1 || monsterOpponent[i].abilities.indexOf('L')!=-1) {
            monsterLethal=monsterOpponent[i];
        }
    }
    if(monsterLethal) {
        var monsterLethalAttack=monsterLethal.def;
        for(var i=itemInHand.length;i--;) {
            if(itemInHand[i].cardNumber===148 && me.mana>=itemInHand[i].cost && monsterLethalAttack<=2) {
                action+='USE '+itemInHand[i].instanceId+' '+monsterLethal.instanceId+';';
                me.mana-=itemInHand[i].cost;
                removeInMonsterOpponent(monsterLethal.instanceId);
            }
        }
    }
}

function summonGuardMonsterActions() {
    for(var i=0,guardItem=false;i<itemInHand.length;i++) {
        if(itemInHand[i].cardNumber===122) guardItem=itemInHand[i].instanceId;     
    }
    if(guardItem) {
        for(var i=monsterInHand.length;i--;) {
            if(monsterInHand[i].abilities.indexOf('G')==-1 && me.mana-2>=monsterInHand[i].cost) {
                action+='SUMMON '+monsterInHand[i].instanceId+";USE "+guardItem+' '+monsterInHand[i].instanceId+';';   
                me.mana-=monsterInHand[i].cost-2;
            }
        }
    }
	for(var i=monsterInHand.length;i--;) {
		if(monsterInHand[i].abilities.indexOf('G')!=-1 && me.mana>=monsterInHand[i].cost) {
			me.mana-=monsterInHand[i].cost;
			monsterInHand[i].played=true;
			action+='SUMMON '+monsterInHand[i].instanceId+";";
			if(monsterInHand[i].abilities.indexOf('C')!=-1) {
			    monsterInGame.push(monsterInHand[i]);           
			}
		}
	}	
}

function summonOtherMonsterActions() {
	for(var i=monsterInHand.length;i--;) {
		if(me.mana>=monsterInHand[i].cost) {
			me.mana-=monsterInHand[i].cost;
			monsterInHand[i].played=true;
			action+='SUMMON '+monsterInHand[i].instanceId+";";
		}
	}	
}

/**
* Si je n'ai pas de creatures a poser mais des sorts d'attaque 
**/
function attackItemActions() {
	for(var i=itemInHand.length;i--;) {
		if(itemInHand[i].cardNumber==154 || itemInHand[i].cardNumber==155 || itemInHand[i].cardNumber==156 ||itemInHand[i].cardNumber==160 || itemInHand[i].cardNumber==153) {
			if(me.mana>=itemInHand[i].cost) {
				itemInHand[i].played=true;
				action+='USE '+itemInHand[i].instanceId+' -1;';
				me.mana-=itemInHand[i].cost;
			}
		}
	}
}

function boostItemActions() {
	for(var i=itemInHand.length;i--;) {
		if(boostItem.indexOf(itemInHand[i].cardNumber)!=-1) {
			// First we try to apply it and a guard monster
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].blocked && monsterInGame[j].abilities.indexOf('G')!=-1 && !itemInHand[i].played && me.mana>=itemInHand[i].cost) {
					action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
					itemInHand[i].played=true;
					me.mana-=itemInHand[i].cost;
				}
			}
			// And then on all monsters
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].blocked && !itemInHand[i].played && me.mana>=itemInHand[i].cost) {
					action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
					itemInHand[i].played=true;
					me.mana-=itemInHand[i].cost;
				}
			}
		}
	}
}

function attackMonsterActions() {
	attackWithoutOpponentActions();
	attackWithoutGuardOpponentActions();
	attackWithGuardOpponentActions();
}

function attackWithoutOpponentActions() {
	if(monsterOpponent.length==0) {
		for(var i=monsterInGame.length;i--;) {
			action+='ATTACK '+monsterInGame[i].instanceId+' -1;';
		}
	}
}

function attackWithoutGuardOpponentActions() {
	for(var i=monsterOpponent.length;i--;) {
		if(monsterOpponent[i].abilities.indexOf('G')!=-1) {
			return false;
		}
	}
	for(var i=monsterInGame.length;i--;) {
		action+='ATTACK '+monsterInGame[i].instanceId+' -1;';
		monsterInGame[i].played=true;
		monsterInGame[i].blocked=false;
	}
}

function attackWithGuardOpponentActions() {
    // If I can kill a guard without dying
	for(var i=monsterOpponent.length;i--;) {
		for(var j=monsterInGame.length;j--;) {
			if(monsterOpponent[i].abilities.indexOf('G')!=-1  && monsterOpponent[i].att<monsterInGame[j].def && monsterOpponent[i].def<monsterInGame[j].att && monsterInGame[j].att>0) {
				action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
				monsterOpponent[i].played=true;
				monsterInGame[j].played=true;
				monsterInGame[j].blocked=true;
			}
		}
	}
	// If I can damage a guard monster without dying
	for(var i=monsterOpponent.length;i--;) {
		for(var j=monsterInGame.length;j--;) {
			if(!monsterInGame[j].played && monsterOpponent[i].abilities.indexOf('G')!=-1  && monsterOpponent[i].att<monsterInGame[j].def && monsterInGame[j].att>0) {
				action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
				monsterOpponent[i].played=true;
				monsterInGame[j].played=true;
				monsterInGame[j].blocked=true;
			}
		}
	}
	// If I kill but I gonna die
	for(var i=monsterOpponent.length;i--;) {
		if(!monsterOpponent[i].played && (monsterOpponent[i].abilities.indexOf('G')!=-1)) {
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].played && (monsterInGame[j].abilities.indexOf('G')==-1 && monsterInGame[j].abilities.indexOf('D')==-1) && monsterInGame[j].att>=monsterOpponent[i].def  && monsterInGame[j].att>0) {
					action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
					monsterOpponent[i].played=true;
					monsterInGame[j].played=true;
					monsterInGame[j].blocked=true;
				}
			}
		}
	}
	for(var i=monsterOpponent.length;i--;) {
		if(!monsterOpponent[i].played && monsterOpponent[i].abilities.indexOf('G')!=-1 ) {
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].played && monsterInGame[j].abilities.indexOf('G')==-1 && monsterInGame[j].att>0) {
					action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
					monsterOpponent[i].deff -= monsterInGame[j].att;
					monsterInGame[j].played=true;
					monsterInGame[j].blocked=true;
					if(monsterOpponent[i].deff<=0) {
					    monsterOpponent[i].played=true;
					}
				}
			}
		}
	}
	if(!isStillGuardMonster()) {
    	for(var j=monsterInGame.length;j--;) {
    		if(!monsterInGame[j].played) {
    			action+='ATTACK '+monsterInGame[j].instanceId+' -1;';
    			monsterInGame[j].played=true;
    		}
    	}
	}
}

function isStillGuardMonster() {
    for(var i=monsterOpponent.length;i--;) {
        if(!monsterOpponent[i].played && monsterOpponent[i].abilities.indexOf('G')!=-1) {
            return true;            
        }
    }
    return false;
}

function removeInMonsterOpponent(instanceId) {
    for(var i=monsterOpponent.length;i--;) {
        if(monsterOpponent[i].instanceId===instanceId) monsterOpponent.splice(i,1);
    }
}