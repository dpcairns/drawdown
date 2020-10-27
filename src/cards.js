
// mountain - two coins rent/claim, coin focus

// ocean - one coin rent/claim, card focus

// desert - one coin rent/claim, land-focus

// land () - restock to full as an action

// forest - two coins rent/claim, carbon focus

// all lands have an action: drawdown (forest) - move carbon from air to land

const forest = {
    name: 'forest',
    resource: 'timber',
    next: 'M',
};

const desert = {
    name: 'desert',
    resource: 'oil',
};

const ocean = {
    name: 'ocean',
    resource: 'fish',
    next: 'F'
};

const mountain = {
    name: 'mountain',
    resource: 'coal',
    next: 'O'
};

const typeMap = {
    F: forest,
    M: mountain,
    D: desert,
    O: ocean
};

const makeCardsByTypeLetter = (typeLetter) => {
    const { name, resource, next: nextLetter } = typeMap[typeLetter];
    const { name: nextName, resource: nextResource } = typeMap[nextLetter] || {};

    return [

// factories (ocean) - generate cards

    // two of same resouce: draw three from that pile. discard one unless pay one res.
        {
            name: `${name} factory 1`,
            text: `Pay two ${resource} to draw three from ${name}. Discard one unless you pay an additional ${resource}`,
            pay: `${typeLetter}${typeLetter}`,        
        },

    // two different resources: draw two, one from each pile.
        {
            name: `${name} factory 2`,
            text: `Pay one ${resource} and one ${nextResource} to draw one forest and one ${nextName} card.`,
            pay: `${typeLetter}${nextLetter}`,        
        },

        typeLetter !== 'D' && {
            name: `${name} factory 3`,
            text: `Pay one ${resource} and one oil to draw one ${name} and one desert card.`,
            pay: `${typeLetter}D`,        
        },
// extraction (mountain) - generate cash

    // two of same resouce: extract 4.
        {
            name: `${name} extraction 1`,
            text: `Pay two ${resource} tuck two from ${name}.`,
            pay: `${typeLetter}${typeLetter}`,        
        },
    // two different resources: draw two, one from each pile. repeat as much as you like.
        typeLetter !== 'D' && {
            name: `${name} extraction 3`,
            text: `Pay one ${resource} and one oil to tuck one ${name} and one desert card.`,
            pay: `${typeLetter}D`,        
        },

// power plants - more actions, function of carbon ratio
        {
            name: `Green ${name} power plant`,
            text: `Three potential actions. Gets better as total planetary carbon in ground goes up.`,
            actions: ['>4', '>6', '>8'],
            number: 3,
        },
        {
            name: `Fossil-fuel ${name} power plant`,
            text: `Three potential actions. Gets better as total planetary carbon in ground goes down.`,
            actions: ['<4', '<6', '<8'],
            number: 2,
        },
// civics

    // flip an industry card and change the slider
        {
            name: `${name} flipper`,
            text: `Flip one land of any type. Then restock a ${name} and adjust the culture slider`,
            pay: `${typeLetter}${typeLetter}`
        },
    // wheel your hand
        {
            name: `${name} wheel`,
            text: `Clear the auction block, then discard your hand and draw that many cards. Adjust the culture slider`,
            triggered: true
        },
    // when another flayor factorys (draw), you restock
        {
            name: `${name} onFactory trigger`,
            text: `When another playor uses as factory action, you restock any land you control. Adjust the culture slider.`,
            triggered: true
        },
    // when another player extracts (cash), you play land for cost
        {
            name: `${name} onExtraction trigger`,
            text: `When another playor extracts (draw), you play a land for its cost from your hand. Adjust the culture slider.`,
            triggered: true
        },
    // when another player plays a land, you extract (cash)
        {
            name: `${name} onLand trigger`,
            text: `When another playor plays a land, you may extract a ${resource} from the deck. Adjust the culture slider.`,
            triggered: true
        },
    // when another player restocks, you factory (draw)
        {
            name: `${name} onRestock trigger`,
            text: `When another playor restocks, you may draw one ${name} card. Adjust the culture slider.`,
            triggered: true
        },
    // when you factory (draw), you may pay extra resource to draw again
        {
            name: `${name} factory doubler`,
            text: `When you play a factory action, you may draw one additional ${name} card. Adjust the culture slider.`,
            triggered: true
        },
    // when you play a land (draw), you may discard an additional card resource to play a land again
        {
            name: `${name} factory doubler`,
            text: `When you play your first land card for the turn, you may play an additional ${name} card from your hand (you still discard and additional card and pay its claim cost). Adjust the culture slider.`,
            triggered: true
        },
    ]
    .filter(card => !!card)
    .map(card => ({
        ...card,
        type: name,
    }));
};

const forestCards = makeCardsByTypeLetter('F');
const oceanCards = makeCardsByTypeLetter('O');
const mountainCards = makeCardsByTypeLetter('M');
const desertCards = makeCardsByTypeLetter('D');

const cards = [
    ...forestCards, 
    ...oceanCards, 
    ...mountainCards, 
    ...desertCards, 
];

export default cards;