'use strict';
console.log('media js connected');

//player
let levees = document.getElementById('levees');
console.log(levees);
//button
let randomizer = document.getElementById('randomizer');
console.log(randomizer);

 randomizer.addEventListener('click' ,function(){
  levees.volume = Math.random();   
  console.log(levees.volume);
  levee.autoplay = true;
});                               