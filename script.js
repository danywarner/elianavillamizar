(function(){

var currentGroup = '1';
var currentPage = '1';

var setGroup = function(groupNumber) {

  currentGroup = groupNumber
}

var setPage = function(pageNumber) {
    
    currentPage = pageNumber
}

var loadPage = function() {
  var label = document.getElementById("pageText")
  label.innerHTML = "Pagina ".concat(currentPage)
  var label1 = document.getElementById("groupText")
  label1.innerHTML = "Grupo ".concat(currentGroup)
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
     setPage('1')
     loadPage()
  }, false);

document.querySelector('#button2').addEventListener('click', function() {
     setPage('2')
     loadPage()
  }, false);

document.querySelector('#button3').addEventListener('click', function() {
     setPage('3')
     loadPage()
  }, false);

document.querySelector('#button4').addEventListener('click', function() {
     setPage('4')
     loadPage()
  }, false);

document.querySelector('#button5').addEventListener('click', function() {
     setPage('5')
     loadPage()
  }, false);

document.querySelector('#button6').addEventListener('click', function() {
     setPage('6')
     loadPage()
  }, false);

document.querySelector('#button7').addEventListener('click', function() {
     setPage('7')
     loadPage()
  }, false);

document.querySelector('#button8').addEventListener('click', function() {
     setPage('8')
     loadPage()
  }, false);

document.querySelector('#button9').addEventListener('click', function() {
     setPage('9')
     loadPage()
  }, false);

document.querySelector('#button10').addEventListener('click', function() {
     setPage('10')
     loadPage()
  }, false);

document.querySelector('#group1').addEventListener('click', function() {
     setGroup('1')
     loadPage()
  }, false);

document.querySelector('#group2').addEventListener('click', function() {
     setGroup('2')
     loadPage()
  }, false);

document.querySelector('#group3').addEventListener('click', function() {
     setGroup('3')
     loadPage()
  }, false);

document.querySelector('#group4').addEventListener('click', function() {
     setGroup('4')
     loadPage()
  }, false);
  
})();  