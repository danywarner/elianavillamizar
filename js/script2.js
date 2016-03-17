
var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
};


window.onload = function() {

	document.getElementById('appLink').href="application.html?groupName="+urlParam("groupName");

};