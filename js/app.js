'use strict';
console.log('app js connected');

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





//Global Variables
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImageTag = document.getElementById('left_pizza_img');
let rightPizzaImageTag = document.getElementById('right_pizza_img');

let totalClicks = 0;

//the variable to store the pizzas that are already on the page
let leftPizzaOnThePage = null;
let rightPizzaOnThePage = null;





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


const renderNewPizzas = function(leftIndex, rightIndex){
  // console.log(PizzaPicture.allImages[leftIndex].url);
  // console.log(PizzaPicture.allImages[rightIndex].url);
  leftPizzaImageTag.src = PizzaPicture.allImages[leftIndex].url;
  rightPizzaImageTag.src = PizzaPicture.allImages[rightIndex].url;
};




//add function for getting new pizza objects from array based on the index number we get back from out random generator.
const pickNewPizzas = function(){
  const leftIndex = Math.floor(Math.random() * PizzaPicture.allImages.length);
  console.log('left index for the left image', leftIndex);
  let rightIndex;
  do {
    rightIndex = Math.floor(Math.random() * PizzaPicture.allImages.length);
  } while(rightIndex === leftIndex);
  // console.log(PizzaPicture.allImages[leftIndex].name + ' and ' + PizzaPicture.allImages[rightIndex].name);
  leftPizzaOnThePage = PizzaPicture.allImages[leftIndex];
  rightPizzaOnThePage = PizzaPicture.allImages[rightIndex];
  // console.log('how do these relate to our if below', {leftPizzaOnThePage, rightPizzaOnThePage});
  renderNewPizzas(leftIndex, rightIndex);
};





const handleClickOnPizza = function(event){
  console.log('clicking on the picture', event.target);


  //how many times do we run the vote? 5 time.s
  if(totalClicks < 5){
    const thingWeClickedOn = event.target;
    // console.log('why',thingWeClickedOn.id);
    const id = thingWeClickedOn.id;


    if(id === 'left_pizza_img' || id === 'right_pizza_img'){
      //track the pizzas
      //increment the image in the left slot
      if(id === 'left_pizza_img'){
        leftPizzaOnThePage.clicks++;
      }
      if(id === 'right_pizza_img'){
        rightPizzaOnThePage.clicks++;
      }

      leftPizzaOnThePage.timesShown++;
      rightPizzaOnThePage.timesShown++;

      pickNewPizzas();
    }

  }//if totalclick is 5





  totalClicks++;
  console.log(totalClicks);
  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
};//closes the function to handle the click









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

pickNewPizzas();
