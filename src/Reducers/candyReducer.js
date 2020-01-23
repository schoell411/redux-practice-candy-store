

const initialState = {
    candyTypes: [
        {
            id: 0,
            name: "Smarties",
            stock: 100,
            img: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/smarties_2_large.jpg?v=1550328122",
            costPerLb: 2
        },
        {
            id: 1,
            name: "Snickers",
            stock: 100,
            img: "http://cdn.shopify.com/s/files/1/0004/8132/9204/products/snickers1.8ox-bar_1_1024x1024.jpg?v=1522356035",
            costPerLb: 8.99
        },
        {
            id: 2,
            name: "Reese's Peanut Butter Cups",
            stock: 100,
            img: "http://cdn.shopify.com/s/files/1/0004/8132/9204/products/reeses_pb_cups_1_1024x1024.jpg?v=1550328137",
            costPerLb: 13.49
        },
        {
            id:3,
            name: 'Fun Dip',
            stock: 100,
            img: 'https://cdn.shopify.com/s/files/1/0004/8132/9204/products/fun-dip_5_large.jpg?v=1522355872',
            costPerLb: 8.25            
        },

        {
            id: 4,
            name: "Kinder Chocolate",
            stock: 100,
            img: "https://m.media-amazon.com/images/I/81xa+e3CZeL._AC_UL320_ML3_.jpg",
            costPerLb: 8.49

        }

    ],

    shoppingBasket: {
        candyTypes: [
            {
                id: 0,
                name: "Smarties",
                pounds: 5
            }
        ],
        totalpounds: 5,
        totalCost: 10
    }
}

export const candyReducer = (state = initialState, action) => {

    switch (action.type){
        case "ADD_TO_BASKET":
            {
                // basic validation: don't let user enter a zero or negative number
                if (action.payload.pounds <= 0)
                    { return state; }
                
                // get data from the store inventory
                let candyData = state.candyTypes.filter(candyInArray => candyInArray.id === action.payload.id)[0];

                // candy not found; return original state
                if (!candyData)
                    { return state; }

                let candyCostPerPound = candyData.costPerLb;
                
                // update state with candy in shopper's basket
                // update total cost and total pounds

                

                return {
                    ...state,
                    candyTypes: state.candyTypes.map(candy => {
                            if (candy.id === action.payload.id && (candy.stock - action.payload.pounds > 0)) {
                                // candy.stock = candy.stock - action.payload.pounds;
                                return {
                                    ...candy,
                                    stock: candy.stock - action.payload.pounds
                                };
                            } else {
                                return candy;
                            }
                        })
                    ,
                    shoppingBasket: {
                        ...state.shoppingBasket,
                        candyTypes: [
                            ...state.shoppingBasket.candyTypes,
                            action.payload
                        ],
                        totalpounds: state.shoppingBasket.totalpounds + action.payload.pounds,
                        totalCost: state.shoppingBasket.totalCost + (candyCostPerPound * action.payload.pounds)
                    }
                };
        }
        case "REMOVE_FROM_BASKET":

            // use Array.filter() to find the candy with the ID held in action.payload and remove it from shoppingBasket.candyTypes

            // find the cost per pound of the candy

            // determine how many pounds of candy to remove from the shopping basket

            // determine how much $ to remove from the shopping basket

            // get data from the store inventory
            {
                console.log("in REMOVE_FROM_BASKET", state);

                let candyData = state.candyTypes.filter(candyInArray => candyInArray.id === action.payload.id)[0];

                // candy not found; return original state
                if (!candyData)
                    { return state; }

                let candyCostPerPound = candyData.costPerLb;

                return {
                    ...state,
                    candyTypes: state.candyTypes.map(candy => {
                        if (candy.id === action.payload.id) {
                            candy.stock = candy.stock + action.payload.pounds;
                            return candy;
                        } else {
                            return candy;
                        }
                    }),
                    shoppingBasket: {
                        ...state.shoppingBasket,
                        candyTypes: [
                            ...state.shoppingBasket.candyTypes.filter(item => item.id !== action.payload.id)
                        ],
                        totalpounds: state.shoppingBasket.totalpounds - action.payload.pounds,
                        totalCost: state.shoppingBasket.totalCost - (candyCostPerPound * action.payload.pounds)
                }
            };}

        default:
            return state;
    }
}