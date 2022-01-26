'use strict';
console.log('app js connected');




let totalClicks = 0;
const allPizzas = [];
let leftPizzaOnThePage;
let rightPizzaOnThePage;
let previouslyPickedPizzas = [];

let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
let chartResults = document.getElementById('chartResults');
let resultsList = document.getElementById('resultsList');



const PizzaPicture = function(name, imageSrc){
  this.name = name;
  this.imageSrc = imageSrc;
  this.clicks = 0;
  this.timesShown = 0;
  allPizzas.push(this);
};




function handleClickOnPizza(event){
  if(event.target.tagName !== 'IMG'){
    return;
  }

  totalClicks++;

  if(event.target.id === 'left_pizza_img'){
    console.log('current left picture', leftPizzaOnThePage);
    leftPizzaOnThePage.clicks++;
    console.log('did we see the click count left',leftPizzaOnThePage.clicks);
  }
  if(event.target.id === 'right_pizza_img'){
    console.log('current right picture',rightPizzaOnThePage);
    rightPizzaOnThePage.clicks++;
    console.log('did we see the click count right',rightPizzaOnThePage);

  }
  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;

  const tempPickedPizzas = [];
  let leftPizzaIndex;
  do{
    leftPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[leftPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[leftPizzaIndex])
  );
  tempPickedPizzas.push(allPizzas[leftPizzaIndex]);
  //--------------------------------------------------------------

  let rightPizzaIndex;
  do{
    rightPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[rightPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[rightPizzaIndex])
  );
  tempPickedPizzas.push(allPizzas[rightPizzaIndex]);



  //--------------------------------------------------------------

  // Now set the new indexs up for the next objects to be seen and tracked
  leftPizzaOnThePage = allPizzas[leftPizzaIndex];
  rightPizzaOnThePage = allPizzas[rightPizzaIndex];

  //now update src with new url from object to display the objects on the page.
  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;

  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);

  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);

  }
}//closes the function to handle the click




function handleResultsList(){

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
  console.log(allPizzas);
  // makeAPizzaChart();
}


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

leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];




function makeAPizzaChart(){

  const pizzaNamesArray = [];
  const pizzaClicksArray = [];

  for(let i = 0; i < allPizzas.length; i++){
    const singlePizzaName = allPizzas[i].name;
    pizzaNamesArray.push(singlePizzaName);
  }

  for(let i = 0; i < allPizzas.length; i++){
    const singlePizzaClicks = allPizzas[i].clicks;
    pizzaClicksArray.push(singlePizzaClicks);
  }

  const ctx = document.getElementById('pizzaChart').getContext('2d');
  const pizzaChart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: pizzaNamesArray,
      datasets: [{
        label: 'Pizza Clicks',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: pizzaClicksArray
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
