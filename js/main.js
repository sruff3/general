var reservationData = {};

var config = {
  apiKey: "AIzaSyCQJknfXPdRubbH_XgikSYJf5U56nrUIFE",
   authDomain: "reservation-site-21a14.firebaseapp.com",
   databaseURL: "https://reservation-site-21a14.firebaseio.com",
   projectId: "reservation-site-21a14",
   storageBucket: "reservation-site-21a14.appspot.com",
   messagingSenderId: "547607594571"
};

firebase.initializeApp(config);

var database = firebase.database();

$('.reservation-day li').click(function() {
  reservationData.day = $(this).text();
});

$('.reservations').on('submit', function(e) {
  e.preventDefault();
  reservationName.name = $('.reservation-name').val();
  database.ref('reservations').push(reservationName);
});

function getReservations(){
  database.ref('reservations').on('child_added', function(e) {
    var reservationList = $('.reservation-list');
    var reservations = e.val();
    var source   = $("#reservation-template").html();
    var template = Handlebars.compile(source);
    var reservationTemplate = template(reservations);
    reservationList.append(reservationTemplate);
  });
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}

initMap();
