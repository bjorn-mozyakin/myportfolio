$(document).ready(function(){

  var companyPos = new google.maps.LatLng(40.643263, -73.987559);
  var map;

  initialize();

/* ------------FUNCTIONS------------ */
  function initialize() {
    var mapOptions = {
        zoom: 14,
        center: companyPos,
        scrollwheel: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE
            ]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
              "stylers": [
                {"invert_lightness": true},
                {"saturation": -100},
              ]
            }]
    };

    map = new google.maps.Map( $('.footer_map')[0], mapOptions);


   // var markerImage = new google.maps.MarkerImage(
   //      'images/icons/marker.png',
   //      new google.maps.Point(0, 0),
   //      new google.maps.Point(100, 100),
   //      new google.maps.Size(200, 200)
   //  );
    /* Set marker */
    var marker = new google.maps.Marker({
      position: companyPos,
      map: map,
      title:"Company Name Marker"
    });

    marker.setMap(map);

    /* Set description for marker */
    var infowindow = new google.maps.InfoWindow({
      content:"Info about company with lots of details!"
      });

    /* Show description after clicking the marker */
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }
});