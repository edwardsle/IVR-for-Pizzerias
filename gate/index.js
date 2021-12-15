const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

// ============ Database Functions Begin ============ //
let lastOrderDate = null;
let lastOrderTime = null;
const setLastOrder = (orderDate, orderTime) => {
    lastOrderDate = orderDate;
    lastOrderTime = orderTime;
}

const getLastOrder = (phoneNumber) => {
    const phone = phoneNumber.substring(1, phoneNumber.length);
    axios.post('https://ws.edwardsle.com/getlastorder.php', {
        phone: phone
    })
    .then(res => {
        let date = res.data.date;
        let time = res.data.time;
        setLastOrder(date, time);
    });
}

const postCancelOrder = (phoneNumber) => {
    const phone = phoneNumber.substring(1, phoneNumber.length);
    axios.post('https://ws.edwardsle.com/cancellastorder.php', {
        phone: phone
    });
}

const postOrder = (phoneNumber, pizzas) => {
    const phone = phoneNumber.substring(1, phoneNumber.length);
    axios.post('https://ws.edwardsle.com/postorder.php', {
        phone: phone,
        source: 'phone',
        pizzas: pizzas
    });
}

// ============ Database Functions End ============ //
// ============ Database Functions Vonage ============ //
const TEXT_WELCOME = "<speak>Welcome!<break time='1s' /> Thank you for calling Pizza Company.</speak>";
const TEXT_MAIN_MENU_VOICE = "<speak>How can I help you today? You can say anything like <break strength='weak' />  Order pizza<break strength='strong' />, Check my order<break strength='strong' />, Cancel my order<break strength='strong' />. So tell me what you want to do now?</speak>";
const TEXT_MAIN_MENU_KEYPAD = "<spak>Press 1 to order pizza<break strength='strong' />, press 2 to check your order<break strength='strong' />, press 3 to cancel your order<break strength='strong' />, or press 4 to to talk with a real person<break strength='strong' /></speak>";
const TEXT_RECOGNIZE_ISSUE = "<speak>Sorry, my speech recognition might have some issues.<break strength='weak' /> You can use your keypad now.</speak>";

const TEXT_SYSTEM_ERROR = "<speak>Sorry, there is an issue in our system.<break strength='weak' /> You can disconnect now and try to call back later.<break strength='weak' /> Thank you!</speak>";

let currentAction = null;
let nextAction = null;
let nccoReq = null;
let pizzaSize = null;
let pizzaCrust = null;
let pizzaSauce = null;
let pizzaToppings = null;
let phoneNumber = null;
let arrPizzas = [];

// Homepage
app.get('/', (req, res) => {
  res.send('APIs running (v1.0.0)!')
});

// answer inbound calls
app.get('/answer', (req, res) => {
    console.log(req.query.from);
    phoneNumber = req.query.from;
    arrPizzas = [];
    
    let data = getLastOrder(phoneNumber);
    
    let ncco = [
        {
			action: 'talk',
			bargeIn: false,
			text: TEXT_WELCOME,
			language: "en-US",
            style: 11
        }
    ];
    
    ncco = ncco.concat(mainMenu());
    
	//res.json(ncco);
	res.json(mainMenu());
});

// call events
app.post('/event', (req, res) => {
	// console.log(req.body);
	res.sendStatus(204);
});

const voiceConfirmAnalyze = (arrayResults) => {
    //let textSpeech = speech.results[0].text;
    
    let dictionaryYes = ['yes', 'yup', 'yeah', 'yay'];
    let dictionaryNo = ['no', 'nope', 'nah'];
    
    for(word of dictionaryYes) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'yes';
            }
        }
    }
    
    for(word of dictionaryNo) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'no';
            }
        }
    }
    
    return false;
}

app.post('/confirmation', (req, res) => {
    let ncco = [];
    let validOption = false;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;

    console.log(speech);
    //console.log(dtmf);
    
    if(speech.results && speech.results.length > 0) {
        let voiceResponse = voiceConfirmAnalyze(speech.results);
        
        
        if(voiceResponse === 'yes') {
            validOption = true;
        } 
        
        if(voiceResponse === 'no') {
            validOption = true;
            nextAction = currentAction;
        } 
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                validOption = true;
                break;
            case '2':
                validOption = true;
                nextAction = currentAction;
                break;
            default:
                validOption = false;
        }
    }
    
    if(validOption){
        switch(nextAction) {
            case 'MainMenu':
                ncco = ncco.concat(mainMenu());
                break;
            case 'CancelOrder':
                ncco = ncco.concat(cancelOrder());
                break;
            case 'CheckOrder':
                ncco = ncco.concat(checkOrder());
                break;
            case 'PlaceOrder':
                ncco = ncco.concat(placeOrder());
                break;
            case 'PizzaSize':
                ncco = ncco.concat(getPizzaSize());
                break;
            case 'PizzaCrust':
                ncco = ncco.concat(getPizzaCrust());
                break;
            case 'PizzaSauce':
                ncco = ncco.concat(getPizzaSauce());
                break;
            case 'PizzaToppings':
                ncco = ncco.concat(getPizzaToppings());
                break;
            case 'ConfirmSubmitOrder':
                ncco = ncco.concat(getConfirmSubmitOrder());
                break;
            case 'AddMorePizza':
                ncco = ncco.concat(addMorePizzaToOrder());
                break;
            case 'AddSamePizza':
                ncco = ncco.concat(addSamePizzaToOrder());
                break;
            default:
                ncco = [
                    {
                        action: 'talk',
            			bargeIn: false,
            			text: TEXT_SYSTEM_ERROR,
            			language: "en-US",
                        style: 11
                    }
                ];
        }
    } else {
        const text_timeout_confirm = "<speak>Sorry! I don't understand what's your option.<break strength='strong' /> Now tell me <break strength='weak' />Yes or No</speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_confirm,
    			language: "en-US",
                style: 11
            },
            {
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
        ];
        
    }
    
    res.json(ncco);
});

const mainMenu = () => {
    currentAction = 'MainMenu';
    
    let ncco = [
        {
			action: 'talk',
			bargeIn: true,
			text: TEXT_MAIN_MENU_VOICE,
			language: "en-US",
            style: 11
		},
		{
			action: 'input',
			type: [ 'speech', 'dtmf' ],
			eventUrl: [ 'https://gate.edwardsle.com/confirmmainmenu' ],
			speech: {
			    language: "en-US",
			    context: [
			        "order",
			        "check",
			        "cancel"
			    ],
			    endOnSilence: 1,
			    saveAudio: true
			},
			dtmf:{
                maxDigits: 1,
                submitOnHash: true,
                timeOut: 1
            },
		},
    ];
    
    return ncco;
}

const voiceMainMenuAnalyze = (arrayResults) => {
    //let textSpeech = speech.results[0].text;
    
    let dictionaryCancel = ['cancel', 'cancelation', 'canceling'];
    let dictionaryCheck = ['check', 'what', 'how', 'tell'];
    let dictionaryPurchase = ['order', 'place', 'buy', 'purchase'];
    
    for(word of dictionaryCancel) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'CancelOrder';
            }
        }
    }
    
    for(word of dictionaryCheck) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'CheckOrder';
            }
        }
    }
    
    for(word of dictionaryPurchase) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'PlaceOrder';
            }
        }
    }
    
    return false;
}

app.post('/confirmmainmenu', (req, res) => {
    console.log("=======MAIN MENU was called========");
    currentAction = 'MainMenu';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        nextAction = voiceMainMenuAnalyze(speech.results);
        
        if(nextAction === false) {
            nextAction = 'MainMenu';
            validOption = false;
        }
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                nextAction = 'PlaceOrder';
                break;
            case '2':
                nextAction = 'CheckOrder';
                break;
            case '3':
                nextAction = 'CancelOrder';
                break;
            case '4':
                nextAction = 'Representative';
                validOption = false;
                break;
            default:
                nextAction = 'PlaceOrder';
        }
    } else {
        console.log("No action");
        validOption = false;
    }
    
    console.log("validOption", validOption);
    
    if(validOption) {
        let textConfirmMainAction = null;
    
        switch(nextAction) {
            case 'CancelOrder':
                textConfirmMainAction = "<speak>You want to cancel your order. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'CheckOrder':
                textConfirmMainAction = "<speak>You want to check your order's status. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'PlaceOrder':
                textConfirmMainAction = "<speak>You want to place an order. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            default:
                textConfirmMainAction = "<speak>You want to place an order. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
        }
        
        ncco = [
    		{
    			action: 'talk',
    			bargeIn: true,
    			text: textConfirmMainAction,
    			language: "en-US",
                style: 11
    		},
    		{
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
    	];
    } else if (nextAction === 'Representative') {
        const text_norep_mainmenu = "<speak>Sorry! No representative is available now.<break strength='strong' /> Please choose other options.</speak>";
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_norep_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        ncco = ncco.concat(mainMenu());
    }else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(mainMenu());
    }
	
	res.json(ncco);
});

// ============== Place Order Begin ============== //
const placeOrder = () => {
    currentAction = 'PlaceOrder';
    console.log('=======PlaceOrder=======');
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: false,
    		text: "<speak>Ok! You got it. First,</speak>",
    		language: "en-US",
            style: 11
        }
    ];
    
    ncco = ncco.concat(getPizzaSize());
    
    return ncco;
}

// == Size Begin == //
const getPizzaSize = (keypad = false) => {
    currentAction = 'PizzaSize';
    
    const TEXT_PIZZA_SIZE = "<speak>Tell me what a pizza do you want?<break time='1s' /> You can start with the size.<break strength='strong' /> You can say large <break strength='weak' />, medium, <break strength='weak' /> or small. Now, tell me:</speak>";
    const TEXT_PIZZA_SIZE_KEYPAD = "<speak>Tell me what size pizza do you want?<break strength='strong' /> You can press 1 for large <break strength='weak' />, press 2 for medium, <break strength='weak' /> or press 3 for small.</speak>";
    
    let pizza_size = keypad ? TEXT_PIZZA_SIZE_KEYPAD : TEXT_PIZZA_SIZE;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: pizza_size,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzasizeconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "large",
    			    "medium",
    			    "small",
    			    "regular",
    			    "thin",
    			    "barbecue",
    			    "alfredo",
    			    "pepperoni",
    			    "beef",
    			    "chicken",
    			    "jalapeno",
    			    "mushroom",
    			    "pineapple",
    			    "black olives"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 1,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

const voicePlaceOrderAnalyze = (arrayResults) => {
    
    let dictionarySizes = [
        ['large', 'lord'], 
        ['medium', 'meet'], 
        ['small']
    ];
    let dictionaryCrusts = [
        ['regular'], 
        ['thin', 'think', 'thing']
    ];
    let dictionarySauces = [
        ['regular'], 
        ['barbecue', 'bbq'], 
        ['alfredo']
    ];
    let dictionaryToppings = [
        ['pepperoni'], 
        ['beef'], 
        ['ham'], 
        ['chicken'], 
        ['jalapeno'], 
        ['mushroom'], 
        ['black olives'], 
        ['pineapple']
    ];
    
    let pSize = null;
	let pCrust = null;
	let pSauce = null;
	let pToppings = [];
    let isSize = false;
	let isCrust = false;
	let isSauce = false;
	let isToppings = false;
	
    
    for(let iter of arrayResults) {
		let textSpeech = iter.text.toLowerCase();
		
		// find "with" in text
		const splitKeyword = 'with';
		let posSplitKeyword = textSpeech.indexOf(splitKeyword);
		
		// this is not a full pizza
		if(posSplitKeyword == -1) {
		    return false;
		}
		
		// slpit the text
		let pizzaBase = textSpeech.substring(0, posSplitKeyword);
		let pizzaLayers = textSpeech.substring(posSplitKeyword, textSpeech.length);
		
		// checking size
		if(!isSize) {
		    for(let pizzaSizes of dictionarySizes) {
    			for(let i = 0; i < pizzaSizes.length; i++) {
    				let posWord = pizzaBase.indexOf(pizzaSizes[i]);
    				if(posWord > -1) {
    					isSize = true;
    					pSize = pizzaSizes[0];
    					break;
    				}
    			}
    			
    			if(isSize) {
    				break;
    			}
    		}
		}
		
		// checking crust
		if(!isCrust) {
		    for(let pizzaCrusts of dictionaryCrusts) {
    			for(let i = 0; i < pizzaCrusts.length; i++) {
    				let posWord = pizzaBase.indexOf(pizzaCrusts[i]);
    				if(posWord > -1) {
    					isCrust = true;
    					pCrust = pizzaCrusts[0];
    					break;
    				}
    			}
    			
    			if(isCrust) {
    				break;
    			}
    		}
		}
		
		// checking sauce
		if(!isSauce) {
		    for(let pizzaSauces of dictionarySauces) {
    			for(let i = 0; i < pizzaSauces.length; i++) {
    				let posWord = pizzaLayers.indexOf(pizzaSauces[i]);
    				if(posWord > -1) {
    					isSauce = true;
    					pSauce = pizzaSauces[0];
    					break;
    				}
    			}
    			
    			if(isSauce) {
    				break;
    			}
    		}
		}
		
		// checking toppings
		if(!isToppings) {
		    for(let pizzaToppings of dictionaryToppings) {
    			for(let i = 0; i < pizzaToppings.length; i++) {
    				let posWord = pizzaLayers.indexOf(pizzaToppings[i]);
    				if(posWord > -1 && pToppings.includes(pizzaToppings[0]) === false) {
                        pToppings.push(pizzaToppings[0]);
                    }
    			}
    		}
		}		
		
	}
	
	// set default values
	if(pSize == null) {
	    pSize = dictionarySizes[0][0];
	}
	if(pCrust == null) {
	    pCrust = dictionaryCrusts[0][0];
	}
	if(pSauce == null) {
	    pSauce = dictionarySauces[0][0];
	}
	
	// output
	console.log(pSize, pCrust, pSauce, pToppings);
	pizzaSize = pSize;
	pizzaCrust = pCrust;
	pizzaSauce = pSauce;
	pizzaToppings = pToppings;
	
    return true;
}

app.post('/pizzasizeconfirm', (req, res) => {
    console.log("=======CONFIRM PIZZA SIZE was called========");
    nextAction = 'PizzaCrust';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        let textSpeech = speech.results[0].text.toLowerCase();
        
        let isFullPizza = voicePlaceOrderAnalyze(speech.results);
        
        if(isFullPizza) {
            nextAction = 'ConfirmSubmitOrder';
            
            let textFullPizzaConfirm = `<speak>You want a ${pizzaSize} ${pizzaCrust} pizza with ${pizzaSauce} sauce and ${pizzaToppings}. Is that right?</speak>`;
            ncco = [
        		{
        			action: 'talk',
        			bargeIn: true,
        			text: textFullPizzaConfirm,
        			language: "en-US",
                    style: 11
        		},
        		{
        			action: 'input',
        			type: [ 'speech', 'dtmf' ],
        			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
        			speech: {
        			    language: "en-US",
        			    context: [
        			        "yes",
        			        "no"
        			    ],
        			    endOnSilence: 1,
        			    saveAudio: true
        			},
        			dtmf:{
                        maxDigits: 1,
                        submitOnHash: true,
                        timeOut: 1
                    },
        		},
        	];
        	res.json(ncco);
        	
        	return true;
        }
        
        let voiceLarge = textSpeech.indexOf("large");
        let voiceMedium = textSpeech.indexOf("medium");
        let voiceSmall = textSpeech.indexOf("small");
        
        if(voiceLarge > -1) {
            pizzaSize = 'Large';
        } else if(voiceMedium > -1) {
            pizzaSize = 'Medium';
        } else if(voiceSmall > -1) {
            pizzaSize = 'Small';
        } else {
            validOption = false;
        }
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                pizzaSize = 'Large';
                break;
            case '2':
                pizzaSize = 'Medium';
                break;
            case '3':
                pizzaSize = 'Small';
                break;
            default:
                validOption = false;
        }
    } else {
        console.log("No action");
        validOption = false;
    }
    
    
    if(validOption) {
        let textConfirmAction = null;
    
        switch(pizzaSize) {
            case 'Large':
                textConfirmAction = "<speak>You want a large pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'Medium':
                textConfirmAction = "<speak>You want a medium pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'Small':
                textConfirmAction = "<speak>You want a small pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            default:
                textConfirmAction = "<speak>You want a large pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
        }
        
        ncco = [
    		{
    			action: 'talk',
    			bargeIn: true,
    			text: textConfirmAction,
    			language: "en-US",
                style: 11
    		},
    		{
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
    	];
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(getPizzaSize(true));
    }
	
	res.json(ncco);
});

// == Crust Begin == //
const getPizzaCrust = (keypad = false) => {
    currentAction = 'PizzaCrust';
    
    const TEXT_PIZZA_CRUST = "<speak>Next, do you want a regular crust or a thin crust?<break strength='strong' /></speak>";
    const TEXT_PIZZA_CRUST_KEYPAD = "<speak>Tell me what crust would you like for your pizza?<break strength='strong' /> You can press 1 for regular crust <break strength='weak' />, or press 2 for a thin curst.</speak>";
    
    let pizza_crust = keypad ? TEXT_PIZZA_CRUST_KEYPAD : TEXT_PIZZA_CRUST;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: pizza_crust,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzacrustconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "large",
    			    "medium",
    			    "small"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 1,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

app.post('/pizzacrustconfirm', (req, res) => {
    console.log("=======CONFIRM PIZZA CRUST was called========");
    nextAction = 'PizzaSauce';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        let textSpeech = speech.results[0].text.toLowerCase();
        
        let voiceRegular = textSpeech.indexOf("regular");
        let voiceThin = textSpeech.indexOf("thin");
        
        if(voiceRegular > -1) {
            pizzaCrust = 'Regular';
        } else if(voiceThin > -1) {
            pizzaCrust = 'Thin';
        } else {
            validOption = false;
        }
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                pizzaCrust = 'Regular';
                break;
            case '2':
                pizzaCrust = 'Thin';
                break;
            default:
                validOption = false;
        }
    } else {
        console.log("No action");
        validOption = false;
    }
    
    
    if(validOption) {
        let textConfirmAction = null;
    
        switch(pizzaCrust) {
            case 'Large':
                textConfirmAction = "<speak>You want a regular crust for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'Medium':
                textConfirmAction = "<speak>You want a thin crust for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            default:
                textConfirmAction = "<speak>You want a regular crust for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
        }
        
        ncco = [
    		{
    			action: 'talk',
    			bargeIn: true,
    			text: textConfirmAction,
    			language: "en-US",
                style: 11
    		},
    		{
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
    	];
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(getPizzaCrust(true));
    }
	
	res.json(ncco);
});

// == Sauce Begin == //
const getPizzaSauce = (keypad = false) => {
    currentAction = 'PizzaSauce';
    
    const TEXT_PIZZA_SAUCE = "<speak>You got it.<break strength='weak' /> Now, tell me what sauce do you want?<break strength='strong' /> You can say regular sauce <break strength='weak' />, Barbecue sauce, <break strength='weak' /> or alfredo sauce?</speak>";
    const TEXT_PIZZA_SAUCE_KEYPAD = "<speak>Tell me what sauce would you like for your pizza?<break strength='strong' /> You can press 1 for regular sauce <break strength='weak' />, press 2 for barbecue sauce, <break strength='weak' /> or press 3 for alfredo sauce.</speak>";
    
    let pizza_sauce = keypad ? TEXT_PIZZA_SAUCE_KEYPAD : TEXT_PIZZA_SAUCE;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: pizza_sauce,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzasauceconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "regular",
    			    "barbecue",
    			    "alfredo"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 1,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

app.post('/pizzasauceconfirm', (req, res) => {
    console.log("=======CONFIRM PIZZA SAUCE was called========");
    nextAction = 'PizzaToppings';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        let textSpeech = speech.results[0].text.toLowerCase();
        
        let voiceRegular = textSpeech.indexOf("regular");
        let voiceBBQ = textSpeech.indexOf("barbecue");
        let voiceAlfredo = textSpeech.indexOf("alfredo");
        
        if(voiceRegular > -1) {
            pizzaSauce = 'Regular';
        } else if(voiceBBQ > -1) {
            pizzaSauce = 'BBQ';
        } else if(voiceAlfredo > -1) {
            pizzaSauce = 'Alfredo';
        } else {
            validOption = false;
        }
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                pizzaSauce = 'Regular';
                break;
            case '2':
                pizzaSauce = 'BBQ';
                break;
            case '3':
                pizzaSauce = 'Alfredo';
                break;
            default:
                validOption = false;
        }
    } else {
        console.log("No action");
        validOption = false;
    }
    
    
    if(validOption) {
        let textConfirmAction = null;
    
        switch(pizzaSauce) {
            case 'Regular':
                textConfirmAction = "<speak>You want a regular sauce for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'BBQ':
                textConfirmAction = "<speak>You want a barbecue sauce for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            case 'Alfredo':
                textConfirmAction = "<speak>You want a alfredo sauce for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
                break;
            default:
                textConfirmAction = "<speak>You want a regular sauce for your pizza. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>";
        }
        
        ncco = [
    		{
    			action: 'talk',
    			bargeIn: true,
    			text: textConfirmAction,
    			language: "en-US",
                style: 11
    		},
    		{
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
    	];
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(getPizzaSauce(true));
    }
	
	res.json(ncco);
});

// == Toppings Begin == //
const getPizzaToppings = (keypad = false) => {
    currentAction = 'PizzaToppings';
    
    const TEXT_PIZZA_TOPPINGS = "<speak>Last step.<break strength='weak' /> You can tell me all toppings you want?<break strength='strong' /> You can say pepperoni <break strength='weak' />, beef <break strength='weak' />, ham <break strength='weak' />, chicken <break strength='weak' />, jalapeno <break strength='weak' />, mushroom <break strength='weak' />, black olives <break strength='weak' />, and pineapple <break strength='weak' /></speak>";
    const TEXT_PIZZA_TOPPINGS_KEYPAD = "<speak>Tell me what toppings would you like for your pizza?<break strength='strong' /> You can press 1 for pepperoni <break strength='weak' />, press 2 for beef, <break strength='weak' /> press 3 for ham, <break strength='weak' /> press 4 for chicken, <break strength='weak' /> press 5 for jalapeno, <break strength='weak' /> press 6 for mushroom, <break strength='weak' /> press 7 for black olives, <break strength='weak' /> and press 8 for pineapple.</speak>";
    
    let pizza_toppings = keypad ? TEXT_PIZZA_TOPPINGS_KEYPAD : TEXT_PIZZA_TOPPINGS;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: pizza_toppings,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzatoppingsconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "pepperoni",
    			    "beef",
    			    "ham",
    			    "chicken",
    			    "jalapeno",
    			    "mushroom",
    			    "black olives",
    			    "pineapple"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 8,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

const matchToppings = (arrayVoices) => {
    const listToppings = ["pepperoni", "beef", "ham", "chicken", "jalapeno", "mushroom", "black", "pineapple"];
    const results = [];
    
    for(iter of arrayVoices){
        let textSpeech = iter.text.toLowerCase();
        
        for(topping of listToppings){
            let posWord = textSpeech.indexOf(topping);
            if(posWord > -1 && results.includes(topping) === false) {
                results.push(topping);
            }
        }
    }
    
    return results;
}

app.post('/pizzatoppingsconfirm', (req, res) => {
    console.log("=======CONFIRM PIZZA TOPPINGS was called========");
    nextAction = 'ConfirmSubmitOrder';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        pizzaToppings = matchToppings(speech.results);
        
        if(pizzaToppings.length < 1) {
            validOption = false;
        }
        console.log(pizzaToppings);
    } else if(dtmf.timed_out === false) {
        console.log(dtmf.digits);
    } else {
        console.log("No action");
        validOption = false;
    }
    
    
    if(validOption) {
        let text_toppings_list = '';
        
        for(topping of pizzaToppings) {
            if (pizzaToppings.length > 1 && topping == pizzaToppings[pizzaToppings.length-1]) {
                text_toppings_list += " and ";
            }
            
            text_toppings_list += topping + ", <break strength='weak' />";
        }
    
        let textConfirmAction = `<speak>The toppings you want is: ${text_toppings_list}. Is that right?<break strength='strong' /> You can say Yes or No. <break strength='strong' /> You also can press 1 for Yes and press 2 for No.</speak>`;
        
        ncco = [
    		{
    			action: 'talk',
    			bargeIn: true,
    			text: textConfirmAction,
    			language: "en-US",
                style: 11
    		},
    		{
    			action: 'input',
    			type: [ 'speech', 'dtmf' ],
    			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
    			speech: {
    			    language: "en-US",
    			    context: [
    			        "yes",
    			        "no"
    			    ],
    			    endOnSilence: 1,
    			    saveAudio: true
    			},
    			dtmf:{
                    maxDigits: 1,
                    submitOnHash: true,
                    timeOut: 1
                },
    		},
    	];
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(getPizzaToppings(true));
    }
	
	res.json(ncco);
});

// == Submit Begin == //
const getConfirmSubmitOrder = (keypad = false) => {
    currentAction = 'ConfirmSubmitOrder';
    console.log("=======CONFIRM SUBMIT PIZZA was called========");
    
    // add pizza to array for sending order
    arrPizzas.push([pizzaSize, pizzaCrust, pizzaSauce, pizzaToppings]);
    
    const TEXT_PIZZA_SUBMIT = "<speak>Ok.<break strength='weak' /> Do you want to submit your order now or you want to add another pizza to your order? Say Yes for submitting your order, <break strength='weak' /> or say No for adding more pizza</speak>";
    const TEXT_PIZZA_SUBMIT_KEYPAD = "<speak>Do you want to submit your order now?<break strength='strong' /> You can press 1 for submitting your order <break strength='weak' />, or press 2 for adding another pizza to your order.</speak>";
    
    let pizza_submit = keypad ? TEXT_PIZZA_SUBMIT_KEYPAD : TEXT_PIZZA_SUBMIT;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: pizza_submit,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzasubmitconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "yes",
    			    "no",
    			    "submit",
    			    "place",
    			    "add",
    			    "adding",
    			    "another"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 8,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

const voiceConfirmSubmitAnalyze = (arrayResults) => {
    let dictionaryYes = ['submit', 'place', 'yes', 'yeah', 'yep', 'yup'];
    let dictionaryNo = ['add', 'no', 'another', 'nope'];
    
    for(word of dictionaryNo) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return false;
            }
        }
    }
    
    for(word of dictionaryYes) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return true;
            }
        }
    }
    
    return false;
}

app.post('/pizzasubmitconfirm', (req, res) => {
    console.log("=======CONFIRM SUBMIT ORDER was called========");
    
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    let confirm = true;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        confirm = voiceConfirmSubmitAnalyze(speech.results);
    } else if(dtmf.timed_out === false) {
        console.log(dtmf.digits);
        
        if(dtmf.digits == 2) {
            confirm = false;
        }
        
    } else {
        console.log("No action");
        validOption = false;
    }
    
    
    if(validOption) {
        let textConfirmAction = null;
        if(confirm) {
            // submit order
            console.log(arrPizzas);
            postOrder(phoneNumber, arrPizzas);
            
            textConfirmAction = "<speak>Your order has been submitted. Thank you and see you next time!</speak>";
            ncco = [
                {
        			action: 'talk',
        			bargeIn: false,
        			text: textConfirmAction,
        			language: "en-US",
                    style: 11
                }
            ];
        } else {
            // add more pizza
            currentAction = 'AddMorePizza';
            nextAction = 'AddSamePizza';
            textConfirmAction = "<speak>Ok. We can add another pizza to your order. <break strength='strong' /> Do you want the same pizza?</speak>";
            ncco = [
        		{
        			action: 'talk',
        			bargeIn: true,
        			text: textConfirmAction,
        			language: "en-US",
                    style: 11
        		},
        		{
        			action: 'input',
        			type: [ 'speech', 'dtmf' ],
        			eventUrl: [ 'https://gate.edwardsle.com/confirmation' ],
        			speech: {
        			    language: "en-US",
        			    context: [
        			        "yes",
        			        "no"
        			    ],
        			    endOnSilence: 1,
        			    saveAudio: true
        			},
        			dtmf:{
                        maxDigits: 1,
                        submitOnHash: true,
                        timeOut: 1
                    },
        		},
        	];
        }
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(getPizzaToppings(true));
    }
	
	res.json(ncco);
});

const addMorePizzaToOrder = () => {
    currentAction = 'PlaceOrder';
    console.log('=======AddMorePizzaToOrder=======');
    resetPizzaAttribute();
    let ncco = [
        {
            action: 'talk',
    		bargeIn: false,
    		text: "<speak>No problem!<break strength='weak' /></speak>",
    		language: "en-US",
            style: 11
        }
    ];
    
    ncco = ncco.concat(getPizzaSize());
    
    return ncco;
}

const addSamePizzaToOrder = () => {
    currentAction = 'ConfirmSubmitOrder';
    // add pizza to array for sending order
    arrPizzas.push([pizzaSize, pizzaCrust, pizzaSauce, pizzaToppings]);
    
    const TEXT_ORDER_SUBMIT = "<speak>Ok. You got another same pizza in your order<break strength='weak' /> Do you want to submit your order now? <break strength='strong' /> Say Yes to submit your order, <break strength='weak' /> or say No for adding more pizza</speak>";
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: TEXT_ORDER_SUBMIT,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/pizzasubmitconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "yes",
    			    "no",
    			    "submit",
    			    "place",
    			    "add",
    			    "adding",
    			    "another"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 8,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

const resetPizzaAttribute = () => {
    pizzaSize = null;
    pizzaCrust = null;
    pizzaSauce = null;
    pizzaToppings = null;
}
// ============== Place Order End ============== //
// ============== Check Order Begin ============== //
const checkOrder = () => {
    currentAction = 'CheckOrder';
    console.log('=======CheckOrder=======');
    
    let TEXT_LAST_ORDER = `<speak>Your last order was on ${lastOrderDate} <break strength='strong' /> at ${lastOrderTime}.</speak>`;
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: TEXT_LAST_ORDER,
    		language: "en-US",
            style: 11
        }
    ];
    
    ncco = ncco.concat(mainMenu());
    
    return ncco;
}
// ============== Check Order End ============== //
// ============== Cancel Order Begin ============== //
const cancelOrder = () => {
    currentAction = 'CancelOrder';
    console.log('=======CancelOrder=======');
    
    const TEXT_CANCEL_ORDER = "<speak>Are you sure you want to cancel your last order? <break time='2s' /> You also can press 1 for Yes and press 2 for No.</speak>";
    
    let ncco = [
        {
            action: 'talk',
    		bargeIn: true,
    		text: TEXT_CANCEL_ORDER,
    		language: "en-US",
            style: 11
        },
        {
    		action: 'input',
    		type: [ 'speech', 'dtmf' ],
    		eventUrl: [ 'https://gate.edwardsle.com/cancellastorderconfirm' ],
    		speech: {
    		    language: "en-US",
    			context: [
    			    "yes",
    			    "no",
    			    "cancel"
    			],
    			endOnSilence: 1,
    			saveAudio: true
    		},
    		dtmf:{
                maxDigits: 8,
                submitOnHash: true,
                timeOut: 1
            },
    	}
    ];
    
    return ncco;
}

const voiceConfirmCancelOrderAnalyze = (arrayResults) => {
    let dictionaryYes = ['yes', 'yeah', 'yep', 'yup', 'cancel'];
    let dictionaryNo = ['no', 'nope'];
    
    for(word of dictionaryNo) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'no';
            }
        }
    }
    
    for(word of dictionaryYes) {
        for(iter of arrayResults){
            let textSpeech = iter.text.toLowerCase();
            let posWord = textSpeech.indexOf(word);
            
            if(posWord > -1) {
                return 'cancel';
            }
        }
    }
    
    return false;
}

app.post('/cancellastorderconfirm', (req, res) => {
    console.log("=======CONFIRM CANCEL ORDER was called========");
    currentAction = 'CancelOrder';
    let ncco = [];
    let validOption = true;
    
    const speech = req.body.speech;
    const dtmf = req.body.dtmf;
    
    let digits = dtmf.digits;
    let timed_out_dtmf = dtmf.timed_out;
    let timed_out_speech = speech.timed_out;
    let user_option = null;
    
    console.log(dtmf);
    console.log(speech);
    
    if(speech.results && speech.results.length > 0) {
        user_option = voiceConfirmCancelOrderAnalyze(speech.results);
        
        if(user_option === false) {
            validOption = false;
        }
    } else if(dtmf.timed_out === false) {
        switch(dtmf.digits) {
            case '1':
                user_option = 'cancel';
                break;
            case '2':
                user_option = 'no';
                break;
            default:
                validOption = false;
        }
    } else {
        console.log("No action");
        validOption = false;
    }
    
    if(validOption) {
        let textConfirmMainAction = null;
        postCancelOrder(phoneNumber);
        
        switch(user_option) {
            case 'cancel':
                textConfirmMainAction = "<speak>Your order has been cancelled!<break strength='strong' /> Thank you and see you next time!</speak>";
                ncco = [
            		{
            			action: 'talk',
            			bargeIn: false,
            			text: textConfirmMainAction,
            			language: "en-US",
                        style: 11
            		}
            	];
                break;
            case 'no':
                textConfirmMainAction = "<speak>Ok! You are going to be sent back to the main menu.<break strength='strong' /></speak>";
                ncco = [
            		{
            			action: 'talk',
            			bargeIn: true,
            			text: textConfirmMainAction,
            			language: "en-US",
                        style: 11
            		}
            	];
            	ncco = ncco.concat(mainMenu());
                break;
            default:
                textConfirmMainAction = "<speak>Ok! You are going to be sent back to the main menu.<break strength='strong' /></speak>";
        }
        
    } else {
        const text_timeout_mainmenu = "<speak>Sorry! I didn't hear what you just said<break strength='strong' /> Now tell me <break strength='weak' /></speak>";
        
        ncco = [
            {
                action: 'talk',
    			bargeIn: false,
    			text: text_timeout_mainmenu,
    			language: "en-US",
                style: 11
            }
        ];
        
        ncco = ncco.concat(mainMenu());
    }
	
	res.json(ncco);
});
// ============== Cancel Orderr End ============== //

app.listen(port, () => {
  console.log(`listening at https://gate.edwardsle.com:${port}`)
});