(function(){

var loadPage = function(number) {
  var label = document.getElementById("pageText")
  label.innerHTML = "Pagina ".concat(number)
};
  
var counter = 0, // to keep track of current slide
    $items = document.querySelectorAll('.diy-slideshow figure'), // a collection of all of the slides, caching for performance
    numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
  var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
  
  // remove .show from whichever element currently has it 
  // http://stackoverflow.com/a/16053538/2006057
  [].forEach.call( $items, function(el){
    el.classList.remove('show');
  });
  
  // add .show to the one item that's supposed to have it
  $items[itemToShow].classList.add('show');    
};

// add click events to prev & next buttons 
document.querySelector('.next').addEventListener('click', function() {
     counter++;
     showCurrent();
  }, false);

document.querySelector('.prev').addEventListener('click', function() {
     counter--;
     showCurrent();
  }, false);

document.querySelector('#button1').addEventListener('click', function() {
     loadPage('1')
  }, false);

document.querySelector('#button2').addEventListener('click', function() {
     loadPage('2')
  }, false);

document.querySelector('#button3').addEventListener('click', function() {
     loadPage('3')
  }, false);

document.querySelector('#button4').addEventListener('click', function() {
     loadPage('4')
  }, false);

document.querySelector('#button5').addEventListener('click', function() {
     loadPage('5')
  }, false);

document.querySelector('#button6').addEventListener('click', function() {
     loadPage('6')
  }, false);

document.querySelector('#button7').addEventListener('click', function() {
     loadPage('7')
  }, false);

document.querySelector('#button8').addEventListener('click', function() {
     loadPage('8')
  }, false);

document.querySelector('#button9').addEventListener('click', function() {
     loadPage('9')
  }, false);

document.querySelector('#button10').addEventListener('click', function() {
     loadPage('10')
  }, false);
  
})();  