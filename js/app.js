'use strict';
console.log('app js connected');


// lab 12 requirements
/**
As a marketeer, I want to prevent users from seeing the same image in two subsequent iterations, so that they are not biased.

Update your algorithm to randomly generate three unique product images from the images directory.
Update your algorithm so that new products are generated, confirm that these products are not duplicates from the immediate previous set.
As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.

Using ChartJS (imported from CDN), display the vote totals and the number of times a product was viewed in a bar chart format. (hint: don't forget about the <canvas> tags)
Place the bar chart in the section located beneath your three product images
The bar charts should only appear after all voting data has been collected.
*/



//Global Variables
let totalClicks = 0;
//new arrays
let previouslyPickedPizzas = [];
const allPizzas = [];
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
let chartResults = document.getElementById('chartResults');
let resultsList = document.getElementById('resultsList');

//the variable to store the pizzas that are already on the page
let leftPizzaOnThePage;
let rightPizzaOnThePage;






//3.HERE WE WILL UPDATE OUR CONSTRUCTOR TO USE A GLOBAL ARRAY OF OBJECTS
// =======================================
// Constructors
// =======================================

//Constructor Function Expression
const PizzaPicture = function(name, imageSrc){
  this.name = name;
  this.imageSrc = imageSrc;
  //count our pizza votes
  this.clicks = 0;
  this.timesShown = 0;
  //push into an array
  allPizzas.push(this);


};
console.log(allPizzas);

//4.
// =======================================
// Other Functions
// =======================================

const handleClickOnPizza = function(event){
  // console.log('clicking on the picture', event.target);
  if(event.target.tagName !== 'IMG'){
    console.log('not an image');
    return;
  }
  totalClicks++;
  console.log(event.target.id);
  if(event.target.id === 'left_pizza_img'){
    leftPizzaOnThePage.clicks++;
  }
  if(event.target.id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }

  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;

  const tempPickedPizzas = [];

  let leftPizzaIndex;
  do{
    leftPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while(
    previouslyPickedPizzas.includes(allPizzas[leftPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[leftPizzaIndex])
  );
  tempPickedPizzas.push(allPizzas[leftPizzaIndex]);
  //---------
  let rightPizzaIndex;
  do{
    rightPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while(
    previouslyPickedPizzas.includes(allPizzas[rightPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[rightPizzaIndex])
  );

  tempPickedPizzas.push(allPizzas[rightPizzaIndex]);
  // Now set the new indexs up for the next objects to be seen and tracked
  console.log({leftPizzaIndex, rightPizzaIndex});
  leftPizzaOnThePage = allPizzas[leftPizzaIndex];
  rightPizzaOnThePage = allPizzas[rightPizzaIndex];


  //now update src with new url from object to display the objects on the page.
  console.log('do I have an imageSrc?',leftPizzaOnThePage.imageSrc);
  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;


  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);




  console.log(totalClicks);
  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
};//closes the function to handle the click





function handleResultsList(){
  console.log('clickin in results list');
  console.log(allPizzas);
  document.getElementById('pizza-clicks').style.background = '#8197c9';
  document.getElementById('pizza-clicks').style.color = 'whitesmoke';
  let ul = document.getElementById('pizza-clicks');
  ul.innerHTML = '';
  for(let i = 0; i < allPizzas.length; i++){
    let current = allPizzas[i];
    let li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.clicks + ' votes';
    ul.appendChild(li);
  }

}

function handleChartResults(){
  console.log('click on chart button');
  makeAPizzaChart();
}






















// 1. START HERE
// ===================================
// Initialize the Page
// ===================================

//add in event listener
pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);
chartResults.addEventListener('click', handleChartResults);
resultsList.addEventListener('click', handleResultsList);



//create pizza objects
new PizzaPicture('Papa Vito\'s Thin', 'assets/images/mwDeluxePizzaThinCrust.jpg');
new PizzaPicture('Chicago Deep Dish', 'assets/images/chicagoPizza.jpg');
new PizzaPicture('Brick Oven Pizza', 'assets/images/brickOvenPizza.jpg');
new PizzaPicture('Calzone', 'assets/images/calzonePizza.jpg');
new PizzaPicture('Chicago Pizza and Oven Grinder', 'assets/images/cpoGinderPizza.jpg');
new PizzaPicture('Detroit Style', 'assets/images/detroitPizza.jpg');
new PizzaPicture('New York Thin', 'assets/images/newYorkPizza.jpg');
new PizzaPicture('Shot Gun Dans', 'assets/images/sgDansHtossedMeatLovPizza.jpg');


leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];





//2. THEN LATER WE WILL ADD THE CHART IN LAST
// ==================================
// ChartJs Implementation
// ==================================
function makeAPizzaChart(){













  
}