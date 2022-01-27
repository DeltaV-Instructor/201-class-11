'use strict';
console.log('app js connected');




//Global Variables
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImageTag = document.getElementById('left_pizza_img');
let rightPizzaImageTag = document.getElementById('right_pizza_img');

let totalClicks = 0;

//the variable to store the pizzas that are already on the page
let leftPizzaOnThePage = null;
let rightPizzaOnThePage = null;






//3.HERE WE WILL UPDATE OUR CONSTRUCTOR TO USE A GLOBAL ARRAY OF OBJECTS
// =======================================
// Constructors
// =======================================

//Constructor Function Expression
const PizzaPicture = function(name, imageSrc){
  this.name = name;
  this.url = imageSrc;
  //count our pizza votes
  this.clicks = 0;
  this.timesShown = 0;
  //push into an array
  PizzaPicture.allImages.push(this);


};
PizzaPicture.allImages = [];






//4.
// =======================================
// Other Functions
// =======================================

const handleClickOnPizza = function(event){
  console.log('clicking on the picture', event.target);




  if(id === 'left_pizza_img'){
    leftPizzaOnThePage.clicks++;
  }
  if(id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }

  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;






  totalClicks++;
  console.log(totalClicks);
  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
};//closes the function to handle the click








// 1. START HERE
// ===================================
// Initialize the Page
// ===================================

//add in event listener
pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);




//create pizza objects
new PizzaPicture('Papa Vito\'s Thin', 'assets/images/mwDeluxePizzaThinCrust.jpg');
new PizzaPicture('Chicago Deep Dish', 'assets/images/chicagoPizza.jpg');
new PizzaPicture('Brick Oven Pizza', 'assets/images/brickOvenPizza.jpg');
new PizzaPicture('Calzone', 'assets/images/calzonePizza.jpg');
new PizzaPicture('Chicago Pizza and Oven Grinder', 'assets/images/cpoGinderPizza.jpg');
new PizzaPicture('Detroit Style', 'assets/images/detroitPizza.jpg');
new PizzaPicture('New York Thin', 'assets/images/newYorkPizza.jpg');
new PizzaPicture('Shot Gun Dans', 'assets/images/sgDansHtossedMeatLovPizza.jpg');


leftPizzaOnThePage = PizzaPicture.allImages[0];
rightPizzaOnThePage = PizzaPicture.allImages[1];





//2. THEN LATER WE WILL ADD THE CHART IN LAST
// ==================================
// ChartJs Implementation
// ==================================
