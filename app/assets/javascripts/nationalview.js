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
    "lat": 53.195124,
    "lng": -1.254475,
    "label": "DM",
    "color": "#28A197",
    "url": "/dm"
}, {
    "lat": 51.27909869,
    "lng": 1.08112335,
    "label": "Canterbury",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 53.57660773,
    "lng": -2.42703438,
    "label": "Bolton",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 54.57474829,
    "lng": -1.23810768,
    "label": "Middlesbrough",
    "color": "#e57c7f",
    "url": "/canterbury"
}, {
    "lat": 50.3403779,
    "lng": -4.7834252,
    "label": "St Austell",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 53.8175053,
    "lng": -3.0356748,
    "label": "Blackpool",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 53.567471,
    "lng": -0.080784,
    "label": "Grimsby",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 53.22739,
    "lng": -4.129263,
    "label": "Bangor",
    "color": "#5f98c2",
    "url": "/canterbury"
}, {
    "lat": 52.586214,
    "lng": -1.982919,
    "label": "Walsall",
    "color": "#5f98c2",
    "url": "/canterbury"
}]
