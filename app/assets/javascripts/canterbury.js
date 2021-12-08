d3.json('public/javascripts/json/casemanagement.json', function(error, data) {
    //data, header, columns, target, tableClass
    //tabulateDateStyle1(data, 'Case Managers', ['Available', 'Required', 'Difference'], '#case-management', 'case-management');
});

d3.json('public/javascripts/json/telephony.json', function(error, data) {
    //data, header, columns, target, tableClass
    //tabulateDateStyle1(data, 'Telephony', ['Available', 'Required', 'Difference'], '#case-management', 'telephony');
});

var mapZoom = 6;
var mapLat = 54.310670;
var mapLng = -2.548042;
var nationalViewLocations = [{
    "lat": 51.27909869,
    "lng": 1.08112335,
    "label": "Canterbury",
    "color": "#5f98c2",
    "url": "/canterbury_jc"
}, {
    "lat": 51.57660773,
    "lng": -0.223663,
    "label": "Hammersmith",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.506476,
    "lng": -0.088247,
    "label": "London Bridge",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.396554,
    "lng": -0.106609,
    "label": "Thornton Heath",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.360889,
    "lng": -0.190101,
    "label": "Sutton",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.338950,
    "lng": -0.119386,
    "label": "Purley",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.127767,
    "lng": -2.987857,
    "label": "Brigwater",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 52.479407,
    "lng": 1.750893,
    "label": "Lowestoft",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 57.477687,
    "lng": -4.224003,
    "label": "Inverness",
    "color": "#5f98c2",
    "url": "#"
}, {
    "lat": 51.204361,
    "lng": -3.481728,
    "label": "Minehead",
    "color": "#5f98c2",
    "url": "#"
}]
