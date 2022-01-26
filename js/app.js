'use strict';
console.log('app js connected');
//lab 11 requirements
/*
  Practice domain modeling by planning out an app  that allows users to choose their favorite between two pizzas
  App Flow:
  - Randomly put 2 pizzas on the screen
    - Random number generator
    - a function to display pizzas
  - A user clicks on a pizza
    - event listener needs to be on the image to fire the event handler
    - the event handler fires
      - ? check if (let totalClicks >= 5) ?
        - stop letting the user click remove eventlistener
        - display the clicks
      -? If not ?
        - track which pizza was clicked on
        - update click++ images count of how many times it has been clicked on
        - update both images'count of times shown++
        - Randomly Pick 2 pizzas, run the same code that put them on the screen to begin with
  HTML
    - have a left and right image container in the html
    - Give them id's so we can select them
    - let the user know what they are supposed to do
      - instructions

  More javascript details
  We need Objects with all the image properties
  const Image = function ()
  {
    name : 'Chicago Pizza',
    clicks: 0,
    timesShown: 0,
    url : 'chicagoPizza.jpeg'
  }

  We need an Array to hold all image Objects

  function to randomly pick an image{
    Prevent last picked pizzas from being picked
      - STRETCH pick all pizzas evenly as possible
    Math.floor  Math.random() * array.length()
    make sure left and right image are unique
  }

  click on an image, targetted by id
  add event listener('click', function(){
    keep track of the image that is clicked
    prevent all currently displayed images from being re clicked {
    }
  })

  function to display all the clicks at the end () {
    generate a table or list
    populate the data - adds to the inner html of an existing element (table or list)
    divide object's times clicked by total shown
  }

*/


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







//Global letiables
let totalClicks = 0;
//Add new array-----------------------------------------------
const allPizzas = [];
let previouslyPickedPizzas = [];
let leftPizzaOnThePage;
let rightPizzaOnThePage;
// References to the DOM TODO:
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let rightPizzaImage = document.getElementById('left_pizza_img');
let leftPizzaImage = document.getElementById('right_pizza_img');
// console.log('',{leftPizzaImage, rightPizzaImage});
//the letiable to store the pizzas that are already on the page
let chartResults = document.getElementById('chartResults');
console.log(chartResults);
let resultsList = document.getElementById('resultsList');





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
  // PizzaPicture.allImages.push(this);
  allPizzas.push(this);


};
// PizzaPicture.allImages = [];

console.log(allPizzas);

//5. Comment out the no longer using functions ---------------------------------
// const renderNewPizzas = function(leftIndex, rightIndex){
//   // console.log(PizzaPicture.allImages[leftIndex].url);
//   // console.log(PizzaPicture.allImages[rightIndex].url);
//   leftPizzaImage.src = PizzaPicture.allImages[leftIndex].url;
//   rightPizzaImage.src = PizzaPicture.allImages[rightIndex].url;
// };



//5. Comment out the no longer using functions ---------------------------------

//add function for getting new pizza objects from array based on the index number we get back from out random generator.
// const pickNewPizzas = function(){
//   const leftIndex = Math.floor(Math.random() * PizzaPicture.allImages.length);
//   console.log('left index for the left image', leftIndex);

//   let rightIndex;
//   do {
//     rightIndex = Math.floor(Math.random() * PizzaPicture.allImages.length);
//   } while(rightIndex === leftIndex);
//   console.log(PizzaPicture.allImages[leftIndex].name + ' and ' + PizzaPicture.allImages[rightIndex].name);


//   leftPizzaOnThePage = PizzaPicture.allImages[leftIndex];
//   rightPizzaOnThePage = PizzaPicture.allImages[rightIndex];

//   // console.log('how do these relate to our if below', {leftPizzaOnThePage, rightPizzaOnThePage});
//   renderNewPizzas(leftIndex, rightIndex);

// };










//4.
// =======================================
// Other Functions
// =======================================


















function handleClickOnPizza(event){
  // console.log('clicking on the picture', event.target);
  if(event.target.tagName !== 'IMG'){
    // console.log('not clicking on pic!');
    return;
  }
  console.log(event.target.tagName);
  console.log(event.target.id);
  //increment total clicks
  totalClicks++;
  console.log('total clicks',totalClicks);
  //how many times do we run the vote? 5 time.s
  // if(totalClicks < 5){
  // const thingWeClickedOn = event.target;
  // console.log('why',thingWeClickedOn.id);
  // const id = thingWeClickedOn.id;
  // if(id === 'left_pizza_img' || id === 'right_pizza_img'){
  //track the pizzas
  //increment the image in the left slot

  //refactor this with new id --------------------------
  if(event.target.id === 'left_pizza_img'){
    //log to see diff between getting id and then getting src
    console.log(leftPizzaOnThePage);
    leftPizzaOnThePage.clicks++;
    console.log('did we see the click count',leftPizzaOnThePage.clicks);
  }
  if(event.target.id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }
  // leftPizzaOnThePage.timesShown++;
  // rightPizzaOnThePage.timesShown++;
  // pickNewPizzas();
  // }
  // }//if totalclick is 5



  //--------------------------------------------------------------

  // Add the pick pizza image to avoid duplicates and no repeatable showings
  //Pick two new pizzas
  const tempPickedPizzas = [];
  let leftPizzaIndex;
  do{
    leftPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[leftPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[leftPizzaIndex])
  );
  //Then update the temp picked pizzas array with new image.
  tempPickedPizzas.push(allPizzas[leftPizzaIndex]);
  console.log('temp array', tempPickedPizzas);
  //--------------------------------------------------------------

  let rightPizzaIndex;
  do{
    rightPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[rightPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[rightPizzaIndex])
  );
  //Then update the temp picked pizzas array with new image.
  tempPickedPizzas.push(allPizzas[rightPizzaIndex]);



  //--------------------------------------------------------------

  // Now set the new indexs up for the next objects to be seen and tracked
  leftPizzaOnThePage = allPizzas[leftPizzaIndex];
  rightPizzaOnThePage = allPizzas[rightPizzaIndex];
  console.log({leftPizzaOnThePage, rightPizzaOnThePage});

  //now update src with new url from object to display the objects on the page.
  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;
  console.log({leftPizzaImage, rightPizzaImage});

  //reset previously picked images for randomization
  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);






  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
    
  }
}//closes the function to handle the click




function handleResultsList(event){
  console.log('click on the result LIST',event);
  console.log(allPizzas);

  document.getElementById('pizza-clicks').style.background = '#8197c9';
  document.getElementById('pizza-clicks').style.color = 'whitesmoke';

  let ul = document.getElementById('pizza-clicks');
  //reset list
  ul.innerHTML = '';
  //for each placholder image...
  for(let i = 0; i < allPizzas.length; i++){
    let current = allPizzas[i];
    console.log(current.name);
    //add to <ul id="results">
    let li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.clicks + ' votes';
    ul.appendChild(li);
  }
}


function handleChartResults(){
  console.log('click on the result CHART');
  //Add call to the makeAPizzaChart();
}




















// 1. START HERE
// ===================================
// Initialize the Page
// ===================================

//add in event listener
pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);

resultsList.addEventListener('click', handleResultsList);
chartResults.addEventListener('click', handleChartResults);

//create pizza objects
new PizzaPicture('Papa Vito\'s Thin', 'assets/images/mwDeluxePizzaThinCrust.jpg');
new PizzaPicture('Chicago Deep Dish', 'assets/images/chicagoPizza.jpg');
new PizzaPicture('Brick Oven Pizza', 'assets/images/brickOvenPizza.jpg');
new PizzaPicture('Calzone', 'assets/images/calzonePizza.jpg');
new PizzaPicture('Chicago Pizza and Oven Grinder', 'assets/images/cpoGinderPizza.jpg');
new PizzaPicture('Detroit Style', 'assets/images/detroitPizza.jpg');
new PizzaPicture('New York Thin', 'assets/images/newYorkPizza.jpg');
new PizzaPicture('Shot Gun Dans', 'assets/images/sgDansHtossedMeatLovPizza.jpg');
//1. HERE TOO -----------------------------------------------------
// When I first load the page, I need to know which pizza is left and right, so they can track their clicks in the javascript
leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];
// console.log('',{leftPizzaOnThePage, rightPizzaOnThePage});
// pickNewPizzas();


//2. THEN LATER WE WILL ADD THE CHART IN LAST
// ==================================
// ChartJs Implementation
// ==================================
