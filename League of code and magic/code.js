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
var TYPE_ITEM_GREEN = 1;
var TYPE_ITEM_RED = 2;
var TYPE_ITEM_BLUE = 3;
var action;
var cards;
var turns = 0;

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
    this.summon=false;
    this.hasGuard = function() { return this.abilities.indexOf('G')!=-1 ? true : false };
    this.hasDrain = function() { return this.abilities.indexOf('D')!=-1 ? true : false };
    this.hasCharge = function() { return this.abilities.indexOf('C')!=-1 ? true : false };
    this.hasWard = function() { return this.abilities.indexOf('W')!=-1 ? true : false };
    this.hasLethal = function() { return this.abilities.indexOf('L')!=-1 ? true : false };
}

function chooseCard(cards) {
    cards.sort(function(a,b) {return rankCard(a)>rankCard(b)});
    var cardsDefault = cards[0]; 
    removeOverChoosenCard();
    if(cards.length>0) {
        deck.push(cards[0]);
        return cards[0].index;
    } else {
        deck.push(cardsDefault);
        return cardsDefault.index;    
    }
}

function removeOverChoosenCard() {
    for(var i=cards.length;i--;) {
        if(cards[i].cardType!=TYPE_CREATURE && cards[i].cardType!=TYPE_ITEM_GREEN) {
            for(var j=deck.length,countDuplicate=0;j--;) {
                if(deck[j].cardNumber===cards[i].cardNumber) countDuplicate++;    
            }
            if(countDuplicate>=1) {
                cards.splice(i,1);        
            }
        }
    }    
}

/**
* System of rank card
*/
function rankCard(card) {
    switch(card.cardNumber) {
        /* MUST HAVE */
        case 142: return -22; /* Remove the guard */
        case 151: return -21; /* Kill a monster */
        case 143: return -20; /* Remove all abilities */
        case 149: return -19; /* Remove all abilities and draw a card */
        case 148: return -19; /* Remove all abilities and 2 damage */
        case 118: return -18; /* 0/+3 */
        case 128: return -17; /* Boost +4/3 */
        case 122: return -16; /* Boost +1/3 G */
        case 125: return -15; /* Boost +2/1 Drain */
        case 124: return -14; /* Boost +2/1 Drain */
        case 124: return -13; /* Boost +3/3 */
        case 126: return -12; /* Boost +2/3 */
        case 127: return -12; /* Boost +0/6 */
        case 129: return -11; /* Boost +2/5 */
        case 123: return -10; /* Boost +4/0 */
        case 134: return -9; /* Boost +2/2 draw+1 */
        case 133: return -8; /* Boost +4/0 ward */
        case 131: return -7; /* Boost +4/1 */
        case 132: return -6; /* Boost +3/3 B */
        case 154: return -5; /* Damage 2 - Draw 1 */
        case 156: return -4; /* Damage 3 and heal 3 */
        case 160: return -3; /* Damage 2 and heal 2 */
        case 153: return -2; /* Damage 2 and heal 2 */
        case 157: return -1; /* Damage 1 - heal 1 - Draw 1 */
        case 141: return -1; /* M0 -1/-1 */
        
        case 51: return 1; /* M4 3/5 L */
        case 52: return 2; /* M4 2/4 L */
        case 53: return 3; /* M4 1/1 CL */
        case 50: return 4; /* M3 3/2 L */
        case 49: return 5; /* M2 1/2 GL */
        case 54: return 6; /* M3 2/2 L */
        case 48: return 7; /* M1 1/1 lethal */
        case 70: return 8; /* M4 6/3 B */
        case 72: return 9; /* M4 5/3 B */
        case 101: return 10; /* M4 3/4 G */
        case 42: return 11; /* M4 4/2 D */
        case 40: return 12; /* M3 2/3 DG */
        case 104: return 13; /* M4 4/4 G */
        case 73: return 14; /* M4 4/4 B/H+4 */
        case 96: return 15; /* M2 3/2 G */
        case 47: return 16; /* M2 1/5 D */
        case 38: return 17; /* M1 1/3 drain */
        case 103: return 18; /* M4 3/6 G */
        case 14: return 19; /* M4 9/1 */
        case 18: return 20; /* M4 7/4 */
        case 16: return 21; /* M4 6/2 */
        case 11: return 22; /* M3 5/2 */
        case 41: return 23; /* M3 2/2 CD */
        case 10: return 24; /* M3 3/1 D */
        case 65: return 25; /* M2 2/2 W */
        case 7: return 26; /* M2 2/2 W */
        case 13: return 27; /* M4 5/3 H+1/-1 */
        case 87: return 28; /* M4 2/5 CG */
        case 99: return 29; /* M3 2/5 G */
        case 98: return 30; /* M3 2/4 G */
        case 102: return 31; /* M4 3/3 G H-1 */
        case 69: return 32; /* M3 4/4 B */
        case 97: return 33; /* M3 3/3 G */
        case 95: return 34; /* M2 2/3 G */
        case 9: return 35; /* M3 3/4 */
        case 6: return 36; /* M2 3/2 */
        case 39: return 37; /* M1 2/1 Drain */
        case 100: return 38; /* M3 1/6 G */
        case 15: return 39; /* M4 4/5 */
        case 17: return 39; /* M4 4/5 */
        case 33: return 40; /* M4 4/3 Draw+1 */
        case 30: return 41; /* M3 4/2 H-2 */
        case 8: return 42; /* M2 2/3 */
        case 64: return 43; /* M2 1/1 GW */
        case 5: return 44; /* M2 4/1 */
        case 63: return 45; /* M2 0/4 GW */
        case 71: return 46; /* M4 3/2 CB */
        case 26: return 47; /* M2 3/2 H-1 */
        case 32: return 48; /* M3 3/2 Draw+1 */
        case 12: return 49; /* M3 2/5 */
        case 25: return 50; /* M2 3/1 H-2 */
        case 31: return 51; /* M3 3/1 H-1 */
        case 57: return 52; /* M4 1/8 */
        case 94: return 53; /* M2 1/4 G */
        case 93: return 54; /* M1 2/1 G */
        case 3: return 55; /* M1 2/2 */
        case 84: return 56; /* M2 1/1 CDW */
        case 91: return 57; /* M0 1/2 GH+1 */
        case 27: return 58; /* M2 2/2 H+2 */
        case 1: return 59; /* M1 2/1 H+1 */
        case 86: return 60; /* M3 1/5 C */
        case 4: return 61; /* M2 1/5 */
        case 2: return 62; /* M1 1/2 H-1 */
        case 29: return 63; /* M2 2/1 Draw+1 */
        case 83: return 64; /* M0 1/1 Charge */
        case 28: return 65; /* M2 1/2 Draw+1 */
        case 92: return 66; /* M1 0/1 G H+2 */
        case 24: return 67; /* M1 1/1 H-1 */
        case 55: return 68; /* M2 0/5 G */
        
        
        /* 5 Mana */
        case 106: return 500; /* M5 5/5 G */
        case 74: return 501; /* M5 5/4 BG */
        case 66: return 502; /* M5 5/1 W */
        case 20: return 503; /* M5 8/2 */
        case 75: return 504; /* M5 6/5 B */
        case 21: return 505; /* M5 6/5 */
        case 105: return 506; /* M5 4/6 G */
        case 109: return 507; /* M5 5/6 */
        case 19: return 508; /* M5 5/6 */
        case 88: return 509; /* M5 4/4 C */
        case 108: return 510; /* M5 2/6 G */
        case 34: return 511; /* M5 3/5 Draw+1 */
        case 89: return 512; /* M5 4/1 C */
        case 107: return 513; /* M5 3/3 G H+3 */
        case 109: return 514; /* M5 5/6 */
        case 110: return 514; /* M5 0/9 G */
    
        /* Super Card */
        case 116: return 1000; /* M12 8/8 BCDGLW */
        case 82: return 1001; /* M7 7/7 BDW */
        case 62: return 1002; /* 12/12 BG */
        case 61: return 1003; /* 10/10 */
        case 80: return 1004; /* M8 8/8 BG Draw 1 */
        case 79: return 1005; /* M8 8/8 B */
        case 23: return 1006; /* M7 8/8 */
        case 76: return 1007; /* M6 5/5 BD */
        case 44: return 1008; /* M6 3/7 DL */
        case 114: return 1009; /* M7 7/7 G */
        case 77: return 1010; /* M7 7/7 B */
        case 45: return 1011; /* M6 6/5 BD H-3 */
        case 111: return 1012; /* M6 6/6 G */
        case 112: return 1013; /* M6 4/7 G */
        case 68: return 1014; /* M6 7/5 W */
        case 43: return 1015; /* M6 5/5 D */
        case 59: return 1016; /* 7/7 H+1/H-1 */  
        case 22: return 1017; /* M6 7/5 */
        case 81: return 1018; /* 6/6 BC */
        case 78: return 1019; /* M8 5/5 B H-5 */
        case 36: return 1020; /* M6 4/4 Draw 2 cards */
        case 35: return 1021; /* M6 5/2 B Draw 1 */
        case 37: return 1022; /* M6 5/7 Draw 1 */
        case 67: return 1023; /* M6 5/5 WH-2 */
        case 58: return 1024; /* M6 5/6 B */
        case 115: return 1025; /* M8 5/5 GW */
        case 60: return 1026; /* 4/8 */
        case 90: return 1027; /* 5/5 C */
        case 113: return 1028; /* M6 2/4 G H+4 */
    }
    return 10000;
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
        itemInHand.sort(function(a,b) {return a.cost>b.cost });
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
    	if(!finishHim()) {
        	freeActions();
        	removeGuardActions();
        	removeDrainActions();
        	lethalItemActions();
        	boostGuardActions();
        	summonActions();
        	boostDrainActions();
        	attackItemActions();
        	boostItemActions();
            attackMonsterActions();
    	}
    }
    // Pass to the next turns
    print(action);
    turns++;
}

function finishHim() {
    var power=0;
    var tmpMana=me.mana;
    for(var i=monsterInGame.length;i--;) {
        power+=monsterInGame[i].att;
    }
    for(var i=itemInHand.length;i--;) {
        if(tmpMana>=itemInHand[i].cost) {
            tmpMana-=itemInHand[i].cost;
            switch(itemInHand[i].cardNumber) {
                case 157: power+=1; break;
                case 154: power+=2; break;
                case 156: power+=3; break;
                case 160: power+=2; break;
                case 153: power+=2; break;
                case 128: power+=4; break;
                case 122: power+=1; break;
                case 125: power+=2; break;
                case 127: power+=0; break;
                case 129: power+=2; break;
                case 123: power+=4; break;
                case 131: power+=4; break;
                case 132: power+=3; break;
                case 133: power+=4; break;
            }
        }
    }
    if(power>=opponent.health && !isStillGuardMonster()) {
        for(var i=itemInHand.length;i--;) {
            action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[0].instanceId+';';    
        }
        for(var i=monsterInGame.length;i--;) {
            action+='ATTACK '+monsterInGame[i].instanceId+' -1;';    
        }
        return true;
    }
    return false;
}

/**
* Cherche pour toutes les actions gratuites 
*/
function freeActions() {
	isNeedDisable();
	isEasyKill();
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

function isEasyKill() {
    if(getCardNumberFromHand(141)) {
        for(var j=0;j<monsterOpponent.length;j++) {
            if(monsterOpponent[j].def===1) {
                action+='USE '+getCardNumberFromHand(141)+' '+monsterOpponent[j].instanceId+';';
                removeInMonsterOpponent(monsterOpponent[j].instanceId);
                break;
            }
        }
    }
}

function removeGuardActions() {
    if(opponentHasGuardMonster && !hasMonsterInHandPlayable() && !hasBoostPlayable()) {
        var monsterGuard=opponentHasGuardMonster();
        for(var i=itemInHand.length;i--;) {
            if((itemInHand[i].cardNumber===148 || itemInHand[i].cardNumber===142 || itemInHand[i].cardNumber===149) && me.mana>=itemInHand[i].cost) {
                monsterGuard.abilities='';
                action+='USE '+itemInHand[i].instanceId+' '+monsterGuard.instanceId+';';
                me.mana-=itemInHand[i].cost;
            }
        }    
    }
}


function removeDrainActions() {
    for(var i=monsterOpponent.length,monsterDrain=false;i--;) {
        if(monsterOpponent[i].hasDrain()) {
            monsterDrain=monsterOpponent[i];
        }
    }
    if(monsterDrain) {
        for(var i=itemInHand.length;i--;) {
            if((itemInHand[i].cardNumber===148 || itemInHand[i].cardNumber===142 || itemInHand[i].cardNumber===149) && me.mana>=itemInHand[i].cost) {
                monsterDrain.abilities='';
                action+='USE '+itemInHand[i].instanceId+' '+monsterDrain.instanceId+';';
                me.mana-=itemInHand[i].cost;
            }
        }    
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

function boostGuardActions() {
    if(hasBoostPlayable() && hasGuardMonsterAlive()) {
        boostItemActions();
    }
}

function summonActions() {
	summonNormalWithItemGuardActions();
	summonGuardMonsterActions();
	summonDrainMonsterActions();
	summonOtherMonsterActions();
}

function summonNormalWithItemGuardActions() {
    // If I can summon a normal monster with the item for making in guard
    if(getCardNumberFromHand(122)) {
        for(var i=monsterInHand.length;i--;) {
            if(!monsterInHand[i].hasGuard() && me.mana-2>=monsterInHand[i].cost) {
                // On cherche si on peux jouer mettre un monstre qui peut jouer ce tour la guard
                for(var j=monsterInGame.length,betterMonster=false;j--;) {
                     if(!monsterInGame[j].hasGuard() && !monsterInGame[j].hasDrain()) {
                        betterMonster=monsterInGame[j];              
                     }
                }
                action+='SUMMON '+monsterInHand[i].instanceId+";";
                if(!betterMonster) {
                    action+="USE "+getCardNumberFromHand(122)+' '+monsterInHand[i].instanceId+';';   
                } else {
                    action+="USE "+getCardNumberFromHand(122)+' '+betterMonster.instanceId+';';
                }
                me.mana-=monsterInHand[i].cost+2;
            }
        }
    }	
}

function summonGuardMonsterActions() {
	for(var i=monsterInHand.length;i--;) {
		if(monsterInHand[i].hasGuard() && me.mana>=monsterInHand[i].cost) {
			summonMonster(monsterInHand[i]);
		}
	}	
}

function summonDrainMonsterActions() {
	for(var i=monsterInHand.length;i--;) {
		if(monsterInHand[i].hasDrain() && me.mana>=monsterInHand[i].cost) {
			summonMonster(monsterInHand[i]);
		}
	}	
}

function summonOtherMonsterActions() {
	for(var i=monsterInHand.length;i--;) {
		if(me.mana>=monsterInHand[i].cost) {
			summonMonster(monsterInHand[i]);
		}
	}	
}

function summonMonster(monster) {
	me.mana-=monster.cost;
	monster.played=true;
	action+='SUMMON '+monster.instanceId+";";
	monsterInGame.push(monster);
	if(monster.hasCharge()) {
		monster.played=false;           
	}
	removeInHand(monster.instanceId);
}

/**
* Si je n'ai pas de creatures a poser mais des sorts d'attaque 
**/
function attackItemActions() {
	for(var i=itemInHand.length;i--;) {
		if(itemInHand[i].cardType==TYPE_ITEM_BLUE) {
			if(me.mana>=itemInHand[i].cost) {
				itemInHand[i].played=true;
				action+='USE '+itemInHand[i].instanceId+' -1;';
				me.mana-=itemInHand[i].cost;
			}
		}
	}
}

function boostDrainActions() {
    if(!isStillGuardMonster()) {
        // First we try to add this to a monster without drain
        for(var j=monsterInGame.length;j--;) {
            if(!monsterInGame[j].hasDrain()) {
                for(var i=itemInHand.length;i--;) {
                    if(itemInHand[i].cardType==TYPE_ITEM_GREEN && me.mana>=itemInHand[i].cost && itemInHand[i].cardNumber!=118) {
                        action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
                        removeInHand(itemInHand[i].instanceId);
                    }   
                }
            }
        }
        // Secondly, we try to add this on a monster without caring about abilities
        for(var j=monsterInGame.length;j--;) {
            for(var i=itemInHand.length;i--;) {
                if(itemInHand[i].cardType==TYPE_ITEM_GREEN && me.mana>=itemInHand[i].cost && itemInHand[i].cardNumber!=118) {
                    action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
                    removeInHand(itemInHand[i].instanceId);
                }   
            }
        }
    }
}

function boostItemActions() {
    itemInHand.sort(function(a,b) { return rankCard(a)<rankCard(b)});
	for(var i=itemInHand.length;i--;) {
		if(itemInHand[i].cardType===TYPE_ITEM_GREEN) {
			if(itemInHand[i].cardNumber==118) {
    			for(var j=monsterInGame.length;j--;) {
    				if(monsterInGame[j].hasGuard() && !itemInHand[i].played && me.mana>=itemInHand[i].cost) {
    					action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
    					itemInHand[i].played=true;
    					me.mana-=itemInHand[i].cost;
    				}
    			}   
			}
			// First we try to apply it and a guard monster
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].blocked && monsterInGame[j].abilities.indexOf('G')!=-1 && !itemInHand[i].played && itemInHand[i].cardNumber!=118 && me.mana>=itemInHand[i].cost) {
					action+='USE '+itemInHand[i].instanceId+' '+monsterInGame[j].instanceId+';';
					itemInHand[i].played=true;
					me.mana-=itemInHand[i].cost;
				}
			}
			// And then on all monsters
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].blocked && !itemInHand[i].played && itemInHand[i].cardNumber!=118 && me.mana>=itemInHand[i].cost) {
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
	attackWithGuardOpponentActions();
}

function attackWithoutOpponentActions() {
	if(monsterOpponent.length==0) {
		for(var i=monsterInGame.length;i--;) {
			action+='ATTACK '+monsterInGame[i].instanceId+' -1;';
		}
	}
}

function attackWithGuardOpponentActions() {   
    // If I have ward monster that can kill monster without dying
    for(var i=monsterOpponent.length;i--;) {
		for(var j=monsterInGame.length;j--;) {
			if(!monsterInGame[j].played && monsterInGame[j].hasWard() && monsterOpponent[i].def<=monsterInGame[j].att && monsterInGame[j].att>0) {
				action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
				removeInMonsterOpponent(monsterOpponent[i].instanceId);
				monsterInGame[j].played=true;
				monsterInGame[j].blocked=true;
				j=0;
			}
		}
	}
    // If I can kill a guard without dying
	for(var i=monsterOpponent.length;i--;) {
		if(monsterOpponent[i].hasGuard()) {
    		for(var j=monsterInGame.length;j--;) {
    			if(!monsterOpponent[i].played && monsterOpponent[i].att<monsterInGame[j].def && monsterOpponent[i].def<monsterInGame[j].att && monsterInGame[j].att>0) {
    				action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
    				removeInMonsterOpponent(monsterOpponent[i].instanceId);
    				monsterInGame[j].played=true;
    				monsterInGame[j].blocked=true;
    				j=0;
    			}
    		}
		}
	}
	// If I can damage a guard monster without dying
	for(var i=monsterOpponent.length;i--;) {
	    if(monsterOpponent[i].hasGuard()) {
    		for(var j=monsterInGame.length;j--;) {
    			if(!monsterInGame[j].played && monsterOpponent[i].def<monsterInGame[j].att && monsterOpponent[i].att<monsterInGame[j].def && monsterInGame[j].att>0) {
    				action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
    				monsterOpponent[i].played=true;
    				monsterInGame[j].played=true;
    				monsterInGame[j].blocked=true;
    			}
    		}
	    }
	}
	// If I have a lethal monster that can kill a badass monster
	for(var i=monsterOpponent.length;i--;) {
		if(!monsterOpponent[i].played && monsterOpponent[i].hasGuard) {
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].played && monsterInGame[j].hasLethal() && !monsterInGame[j].hasGuard()) {
					action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
					removeInMonsterOpponent(monsterOpponent[i].instanceId);
					monsterInGame[j].played=true;
					monsterInGame[j].blocked=true;
					j=0;
				}
			}
		}
	}	
	// If I kill but I gonna die
	for(var i=monsterOpponent.length;i--;) {
		if(!monsterOpponent[i].played && (monsterOpponent[i].abilities.indexOf('G')!=-1)) {
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].played && (!monsterInGame[j].hasGuard() || !monsterInGame[j].hasDrain()) && monsterInGame[j].att>=monsterOpponent[i].def  && monsterInGame[j].att>0) {
					action+='ATTACK '+monsterInGame[j].instanceId+' '+monsterOpponent[i].instanceId+';';
					removeInMonsterOpponent(monsterOpponent[i].instanceId);
					monsterInGame[j].played=true;
					monsterInGame[j].blocked=true;
					j=0;
				}
			}
		}
	}
	for(var i=monsterOpponent.length;i--;) {
		if(!monsterOpponent[i].played && monsterOpponent[i].abilities.indexOf('G')!=-1 ) {
			for(var j=monsterInGame.length;j--;) {
				if(!monsterInGame[j].played && !monsterInGame[j].hasGuard() && !monsterInGame[j].hasDrain() && monsterInGame[j].att>0) {
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
        if(!monsterOpponent[i].played && monsterOpponent[i].hasGuard()) {
            return true;            
        }
    }
    return false;
}

function hasMonsterInHandPlayable() {
    for(var i=monsterInHand.length;i--;) {
        if(me.mana>=monsterInHand[i].cost) return true;
    }    
    return false;
}

function hasBoostPlayable() {
    for(var i=itemInHand.length;i--;) {
        if(itemInHand[i].cardType===TYPE_ITEM_GREEN && me.mana>=itemInHand[i].cost) return itemInHand[i].instanceId;     
    }
    return false;
}

function hasGuardMonsterAlive() {
    for(var i=monsterInGame.length;i--;) {
        if(monsterInGame[i].hasGuard()) return true;
    }    
    return false;    
}

function opponentHasGuardMonster() {
    for(var i=monsterOpponent.length,monsterGuard=false;i--;) {
        if(monsterOpponent[i].hasGuard()) {
            return monsterOpponent[i];
        }
    }
    return false;
}

function removeInMonsterOpponent(instanceId) {
    for(var i=monsterOpponent.length;i--;) {
        if(monsterOpponent[i].instanceId===instanceId) monsterOpponent.splice(i,1);
    }
}

function removeInHand(instanceId) {
    for(var i=monsterInHand.length;i--;) {
        if(monsterInHand[i].instanceId===instanceId) monsterInHand.splice(i,1);
    }
    for(var i=itemInHand.length;i--;) {
        if(itemInHand[i].instanceId===instanceId) itemInHand.splice(i,1);
    }
}

function getCardNumberFromHand(cardNumber) {
    for(var i=itemInHand.length;i--;) {
        if(itemInHand[i].cardNumber===cardNumber) return itemInHand[i].instanceId;     
    }
    return false;
}