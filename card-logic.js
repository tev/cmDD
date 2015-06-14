// total number of packs for a user to open
dmDD.packs = 12;
dmDD.opened = [];

// opens a pack and updates the view
dmDD.openPack = function() {
	// decrement packs, remove if no packs left
	dmDD.packs--;
	p = document.getElementById("packs");
	
	var f = document.getElementById("foil");

	// get two random card ids
	var card1 = dmDD.getCard();
	var card2 = dmDD.getCard('common');
	// prevent two of the same common in a pack
	while (card1 == card2) {
		card2 = dmDD.getCard('common');
	}

	// add to opened card list
	dmDD.opened.unshift({ "name": dmDD.cardData[card2]['Card Name'], "rarity": dmDD.cardData[card2]['Rarity'], "id": card2 });
	dmDD.opened.unshift({ "name": dmDD.cardData[card1]['Card Name'], "rarity": dmDD.cardData[card1]['Rarity'], "id": card1 });
	// update the views
	dmDD.renderList(dmDD.opened);
	dmDD.renderCards(dmDD.opened);
	dmDD.renderDice(dmDD.opened);

	if (dmDD.packs == 0) {
		f.innerHTML = '<button onclick="javascript:dmDD.cleanup(dmDD.opened);">Sort</button>';
		document.getElementById("step1").className = "done";
		document.getElementById("step2").className = "inprogress";
	} else {
		p.innerHTML = dmDD.packs;
	}
	
};

dmDD.cleanup = function(cardList) {
	var f = document.getElementById("foil");
	f.parentNode.removeChild(f);

	document.getElementById("step2").className = "done";
	document.getElementById("step3").className = "inprogress";
	document.getElementById("cards").className = "done";
	
	cardList.sort(function(a, b){
		return a.name == b.name ? 0 : +(a.name > b.name) || -1;
	});
	var arr = {};
	for ( var i=0; i < cardList.length; i++ ) {
	    arr[cardList[i]['name'] + cardList[i]['rarity']] = cardList[i];
	}
	cardList = new Array();
	for ( var key in arr ){
		cardList.push(arr[key]);	
	}

	dmDD.opened.sort(function(a, b){
		return a.name == b.name ? 0 : +(a.name > b.name) || -1;
	});
	
	dmDD.renderList(cardList);
	dmDD.renderCards(cardList);
	dmDD.renderDice(dmDD.opened);

	$('div.image.clickable').on('click', function() {
		$(this).toggleClass('selected');
	});

	return cardList;
};

// renders the card view
dmDD.renderCards = function(cardList) {
	var d = document.getElementById("cards");
	var renderedCards = '';
	for (i=0; i<cardList.length; i++) {
		renderedCards += '<div class="image clickable" style="background-image: url(card-images/' + cardList[i].id + '.jpg)"></div>';

	}
	d.innerHTML = renderedCards;
};

// renders the dice view
dmDD.renderDice = function(cardList) {
	var d = document.getElementById("dice");
	var renderedDice = '';
	for (i=0; i<cardList.length; i++) {
		renderedDice += '<img src="card-images/dice-sm-' + dmDD.diceMap[cardList[i].name] + '.jpg" />';
	}
	d.innerHTML = renderedDice;
};

// renders the list view
dmDD.renderList = function(cardList) {
	var l = document.getElementById("list");
	var renderedList = '';
	for (i=0; i<cardList.length; i++) {
		renderedList += '<li class="' + cardList[i].rarity + '">' + cardList[i].name + '</li>';
	}
	l.innerHTML = renderedList;
}

// get a card id of random rarity
dmDD.getCard = function(optionalRarity) {
	// generate a rarity for this card
	// First card is random, second is always common
	// Out of 90, Super Rare:1, Rare:16, Uncommon:55, Common:18
	var rarity = '';
	if (optionalRarity == 'common') {
		rarity = 'common';
	} else {
		var rarityNum = Math.floor(Math.random() * (90 - 1)) + 1;
		if (rarityNum == 1) { rarity = 'super rare'; }
		if (rarityNum > 1 && rarityNum <= 17) { rarity = 'rare'; }
		if (rarityNum > 17 && rarityNum <= 72) { rarity = 'uncommon'; }
		if (rarityNum > 72) { rarity = 'common'; }
	}
	// get a card of that rarity
	var cardGroup = dmDD.rarityList[rarity];
	var card = Math.floor(Math.random() * cardGroup.length);
	return cardGroup[card];
}