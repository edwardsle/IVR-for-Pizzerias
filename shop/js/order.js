let pizzaBuilder = document.getElementById('pizza-builder');
let idCount = 1;

const createBuilder = () => {
    let column = document.createElement('div');
    column.id = idCount;
    column.classList.add('col-md-4');
    column.classList.add('mb-5');
    
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('pizza');

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('row');
    cardHeader.classList.add('justify-content-between');
    cardHeader.classList.add('card-header');

    let divCardTitle = document.createElement('span');
    divCardTitle.classList.add('col-10');
    divCardTitle.classList.add('pizza-builder-title');

    let cardTitle = document.createElement('h5');
    cardTitle.innerHTML = "Pizza Builder";

    let divRemoveButton = document.createElement('span');
    divRemoveButton.classList.add('col-2');
    divRemoveButton.classList.add('pizza-builder-tool');
    divRemoveButton.classList.add('text-right');

    let removeBtn = document.createElement('a');
    removeBtn.innerHTML = "x";
    removeBtn.onclick = function() {
        pizzaBuilder.removeChild(column);
    }

    divCardTitle.appendChild(cardTitle);    
    divRemoveButton.appendChild(removeBtn);
    cardHeader.appendChild(divCardTitle);
    cardHeader.appendChild(divRemoveButton);

    card.appendChild(cardHeader);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let labelSize = document.createElement('h6');
    labelSize.innerHTML = "1. Size";

    let divSize = document.createElement('div');
    let sizeLargeInput = document.createElement('input');
    sizeLargeInput.name = `data[${idCount}][size]`;
    sizeLargeInput.type = 'radio';
    sizeLargeInput.id = `size_large_${idCount}`;
    sizeLargeInput.value = 'large'; 
    let sizeLargeLabel = document.createElement('label');
    sizeLargeLabel.classList.add('mx-1');
    sizeLargeLabel.htmlFor = `size_large_${idCount}`;
    sizeLargeLabel.innerHTML = 'Large';
    divSize.appendChild(sizeLargeInput);
    divSize.appendChild(sizeLargeLabel);

    let sizeMediumInput = document.createElement('input');
    sizeMediumInput.classList.add('ml-4');
    sizeMediumInput.name = `data[${idCount}][size]`;
    sizeMediumInput.type = 'radio';
    sizeMediumInput.id = `size_medium_${idCount}`;
    sizeMediumInput.value = 'medium'; 
    let sizeMediumLabel = document.createElement('label');
    sizeMediumLabel.classList.add('mx-1');
    sizeMediumLabel.htmlFor = `size_medium_${idCount}`;
    sizeMediumLabel.innerHTML = 'Medium';  
    divSize.appendChild(sizeMediumInput);
    divSize.appendChild(sizeMediumLabel);

    let sizeSmallInput = document.createElement('input');
    sizeSmallInput.classList.add('ml-4');
    sizeSmallInput.name = `data[${idCount}][size]`;
    sizeSmallInput.type = 'radio';
    sizeSmallInput.id = `size_small_${idCount}`;
    sizeSmallInput.value = 'small';
    let sizeSmallLabel = document.createElement('label');
    sizeSmallLabel.classList.add('mx-1');
    sizeSmallLabel.htmlFor = `size_small_${idCount}`;
    sizeSmallLabel.innerHTML = 'Small'; 
    divSize.appendChild(sizeSmallInput);
    divSize.appendChild(sizeSmallLabel);

    cardBody.appendChild(labelSize);
    cardBody.appendChild(divSize);

    let labelCrust = document.createElement('h6');
    labelCrust.classList.add('mt-4');
    labelCrust.innerHTML = "2. Crust";

    let divCrust = document.createElement('select');
    divCrust.name = `data[${idCount}][crust]`;
    divCrust.classList.add('custom-select');
    divCrust.classList.add('custom-select-sm');

    let optionCrustRegular = document.createElement('option');
    optionCrustRegular.value = 'regular';
    optionCrustRegular.innerHTML = 'Regular';

    let optionCrustThin = document.createElement('option');
    optionCrustThin.value = 'thin';
    optionCrustThin.innerHTML = 'Thin';

    divCrust.appendChild(optionCrustRegular);
    divCrust.appendChild(optionCrustThin);

    cardBody.appendChild(labelCrust);
    cardBody.appendChild(divCrust);

    let labelSauce = document.createElement('h6');
    labelSauce.classList.add('mt-4');
    labelSauce.innerHTML = "3. Sauce";

    let divSauce = document.createElement('select');
    divSauce.name = `data[${idCount}][sauce]`;
    divSauce.classList.add('custom-select');
    divSauce.classList.add('custom-select-sm');

    let optionSauceRegular = document.createElement('option');
    optionSauceRegular.value = 'regular';
    optionSauceRegular.innerHTML = 'Regular Sauce';

    let optionSauceBBQ = document.createElement('option');
    optionSauceBBQ.value = 'bbq';
    optionSauceBBQ.innerHTML = 'BBQ Sauce';

    let optionSauceAlfredo = document.createElement('option');
    optionSauceAlfredo.value = 'alfredo';
    optionSauceAlfredo.innerHTML = 'Alfredo Sauce';

    divSauce.appendChild(optionSauceRegular);
    divSauce.appendChild(optionSauceBBQ);
    divSauce.appendChild(optionSauceAlfredo);

    cardBody.appendChild(labelSauce);
    cardBody.appendChild(divSauce);

    let labelToppings = document.createElement('h6');
    labelToppings.classList.add('mt-4');
    labelToppings.innerHTML = "4. Toppings";

    let divToppings = document.createElement('div');
    divToppings.classList.add('row');

    let divMeatToppings = document.createElement('div');
    divMeatToppings.classList.add('col-6');    

    let toppingPeperoni = document.createElement('div');
    toppingPeperoni.classList.add('form-check');
    let toppingPeperoniInput = document.createElement('input');
    toppingPeperoniInput.classList.add('form-check-input');
    toppingPeperoniInput.type = 'checkbox';
    toppingPeperoniInput.name = `data[${idCount}][toppings][]`;
    toppingPeperoniInput.value = 'pepperoni';
    toppingPeperoniInput.id = `pepperoni_${idCount}`;
    let toppingPeperoniLabel = document.createElement('label');
    toppingPeperoniLabel.classList.add('form-check-label');
    toppingPeperoniLabel.htmlFor = `pepperoni_${idCount}`;
    toppingPeperoniLabel.innerHTML = 'pepperoni';
    toppingPeperoni.appendChild(toppingPeperoniInput);
    toppingPeperoni.appendChild(toppingPeperoniLabel);

    let toppingBeef = document.createElement('div');
    toppingBeef.classList.add('form-check');
    let toppingBeefInput = document.createElement('input');
    toppingBeefInput.classList.add('form-check-input');
    toppingBeefInput.type = 'checkbox';
    toppingBeefInput.name = `data[${idCount}][toppings][]`;
    toppingBeefInput.value = 'beef';
    toppingBeefInput.id = `beef_${idCount}`;
    let toppingBeefLabel = document.createElement('label');
    toppingBeefLabel.classList.add('form-check-label');
    toppingBeefLabel.htmlFor = `beef_${idCount}`;
    toppingBeefLabel.innerHTML = 'beef';
    toppingBeef.appendChild(toppingBeefInput);
    toppingBeef.appendChild(toppingBeefLabel);

    let toppingHam = document.createElement('div');
    toppingHam.classList.add('form-check');
    let toppingHamInput = document.createElement('input');
    toppingHamInput.classList.add('form-check-input');
    toppingHamInput.type = 'checkbox';
    toppingHamInput.name = `data[${idCount}][toppings][]`;
    toppingHamInput.value = 'ham';
    toppingHamInput.id = `ham_${idCount}`;
    let toppingHamLabel = document.createElement('label');
    toppingHamLabel.classList.add('form-check-label');
    toppingHamLabel.htmlFor = `ham_${idCount}`;
    toppingHamLabel.innerHTML = 'ham';
    toppingHam.appendChild(toppingHamInput);
    toppingHam.appendChild(toppingHamLabel);

    let toppingChicken = document.createElement('div');
    toppingChicken.classList.add('form-check');
    let toppingChickenInput = document.createElement('input');
    toppingChickenInput.classList.add('form-check-input');
    toppingChickenInput.type = 'checkbox';
    toppingChickenInput.name = `data[${idCount}][toppings][]`;
    toppingChickenInput.value = 'chicken';
    toppingChickenInput.id = `chicken_${idCount}`;
    let toppingChickenLabel = document.createElement('label');
    toppingChickenLabel.classList.add('form-check-label');
    toppingChickenLabel.htmlFor = `chicken_${idCount}`;
    toppingChickenLabel.innerHTML = 'chicken';
    toppingChicken.appendChild(toppingChickenInput);
    toppingChicken.appendChild(toppingChickenLabel);

    divMeatToppings.appendChild(toppingPeperoni);
    divMeatToppings.appendChild(toppingBeef);
    divMeatToppings.appendChild(toppingHam);
    divMeatToppings.appendChild(toppingChicken);
    divToppings.appendChild(divMeatToppings);

    let divNonMeatToppings = document.createElement('div');
    divNonMeatToppings.classList.add('col-6');

    let toppingJalapeno = document.createElement('div');
    toppingJalapeno.classList.add('form-check');
    let toppingJalapenoInput = document.createElement('input');
    toppingJalapenoInput.classList.add('form-check-input');
    toppingJalapenoInput.type = 'checkbox';
    toppingJalapenoInput.name = `data[${idCount}][toppings][]`;
    toppingJalapenoInput.value = 'jalapeno';
    toppingJalapenoInput.id = `jalapeno_${idCount}`;
    let toppingJalapenoLabel = document.createElement('label');
    toppingJalapenoLabel.classList.add('form-check-label');
    toppingJalapenoLabel.htmlFor = `jalapeno_${idCount}`;
    toppingJalapenoLabel.innerHTML = 'jalapeno';
    toppingJalapeno.appendChild(toppingJalapenoInput);
    toppingJalapeno.appendChild(toppingJalapenoLabel);

    let toppingMushroom = document.createElement('div');
    toppingMushroom.classList.add('form-check');
    let toppingMushroomInput = document.createElement('input');
    toppingMushroomInput.classList.add('form-check-input');
    toppingMushroomInput.type = 'checkbox';
    toppingMushroomInput.name = `data[${idCount}][toppings][]`;
    toppingMushroomInput.value = 'mushroom';
    toppingMushroomInput.id = `mushroom_${idCount}`;
    let toppingMushroomLabel = document.createElement('label');
    toppingMushroomLabel.classList.add('form-check-label');
    toppingMushroomLabel.htmlFor = `mushroom_${idCount}`;
    toppingMushroomLabel.innerHTML = 'mushroom';
    toppingMushroom.appendChild(toppingMushroomInput);
    toppingMushroom.appendChild(toppingMushroomLabel);

    let toppingBlackOlives = document.createElement('div');
    toppingBlackOlives.classList.add('form-check');
    let toppingBlackOlivesInput = document.createElement('input');
    toppingBlackOlivesInput.classList.add('form-check-input');
    toppingBlackOlivesInput.type = 'checkbox';
    toppingBlackOlivesInput.name = `data[${idCount}][toppings][]`;
    toppingBlackOlivesInput.value = 'black-olives';
    toppingBlackOlivesInput.id = `black_olives_${idCount}`;
    let toppingBlackOlivesLabel = document.createElement('label');
    toppingBlackOlivesLabel.classList.add('form-check-label');
    toppingBlackOlivesLabel.htmlFor = `black_olives_${idCount}`;
    toppingBlackOlivesLabel.innerHTML = 'black olives';
    toppingBlackOlives.appendChild(toppingBlackOlivesInput);
    toppingBlackOlives.appendChild(toppingBlackOlivesLabel);

    let toppingPineapple = document.createElement('div');
    toppingPineapple.classList.add('form-check');
    let toppingPineappleInput = document.createElement('input');
    toppingPineappleInput.classList.add('form-check-input');
    toppingPineappleInput.type = 'checkbox';
    toppingPineappleInput.name = `data[${idCount}][toppings][]`;
    toppingPineappleInput.value = 'pineapple';
    toppingPineappleInput.id = `pineapple_${idCount}`;
    let toppingPineappleLabel = document.createElement('label');
    toppingPineappleLabel.classList.add('form-check-label');
    toppingPineappleLabel.htmlFor = `pineapple_${idCount}`;
    toppingPineappleLabel.innerHTML = 'pineapple';
    toppingPineapple.appendChild(toppingPineappleInput);
    toppingPineapple.appendChild(toppingPineappleLabel);

    divNonMeatToppings.appendChild(toppingJalapeno);
    divNonMeatToppings.appendChild(toppingMushroom);
    divNonMeatToppings.appendChild(toppingBlackOlives);
    divNonMeatToppings.appendChild(toppingPineapple);
    divToppings.appendChild(divNonMeatToppings);  

    cardBody.appendChild(labelToppings);
    cardBody.appendChild(divToppings);    
     

    card.appendChild(cardBody);

    column.appendChild(card);
    pizzaBuilder.appendChild(column);
}

createBuilder();

const addPizza = () => {
    idCount = idCount + 1;
    createBuilder();
}