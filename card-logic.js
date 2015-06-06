// total number of packs for a user to open
dmDD.packs = 12;

// opens a pack and updates the view
dmDD.openPack = function() {
	// get two random card ids
	var card1 = dmDD.getCard();
	var card2 = dmDD.getCard('common');
	// prevent two of the same common in a pack
	while (card1 == card2) {
		card2 = dmDD.getCard('common');
	}
	// add card images to view
	var cards = '<img src="card-images/' + card1 + '.jpg" /><img src="card-images/' + card2 + '.jpg" />';
	d = document.getElementById("cards");
	d.innerHTML = cards + d.innerHTML;
	// add card names to list
	l = document.getElementById("list");
	l.innerHTML = '<li class="' + dmDD.cardData[card1]['Rarity'] + '">' + dmDD.cardData[card1]['Card Name'] + '</li><li class="' + dmDD.cardData[card2]['Rarity'] + '">' + dmDD.cardData[card2]['Card Name'] + '</li>' + l.innerHTML;
	// decrement packs, remove if no packs left
	dmDD.packs--;
	p = document.getElementById("packs");
	p.innerHTML = dmDD.packs;
	if (dmDD.packs == 0) {
		var f = document.getElementById("foil");
		f.parentNode.removeChild(f);
		//d.className = "done";
	}
};

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