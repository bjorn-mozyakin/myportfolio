$(document).ready(function(){

  var companyPos = new google.maps.LatLng(34.426218,-119.709105);
  var map;

  initialize();

/* ------------FUNCTIONS------------ */
  function initialize() {
    var mapOptions = {
        zoom: 10,
        center: companyPos,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE
            ]
        }
        //mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeControlOptions: {
        // }
    };

    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    /* Set marker */
    var marker = new google.maps.Marker({
    position: companyPos,
    map: map,
    icon: 'images/marker.png',
    title:"Company Name Marker",
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

    // Create the DIV to hold the control and call the CenterControl() constructor
    // passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    var colorControlDiv = document.createElement('div');
    var colorControl = new ColorControl(colorControlDiv, map);

    colorControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(colorControlDiv);

    discolorMap();
  }

  function discolorMap() {
    var mapStyles = [
      {
        "stylers": [
          { "saturation": -100 }
        ]
      },{
      }
    ]

    var styledMapOptions = {};

    var blackWhiteMapType = new google.maps.StyledMapType(
        mapStyles, styledMapOptions);

    map.mapTypes.set('blackwhitemap', blackWhiteMapType);
    map.setMapTypeId('blackwhitemap');
  }

  function CenterControl(controlDiv, map) {
    var controlUI = document.createElement('div');

    $(controlUI)
      .attr('title', 'Click to recenter the map')
      .css({
        'color': 'rgb(25,25,25)',
        'font-family': 'Roboto,Arial,sans-serif',
        'fontSize': '12px',
        'height': '35px',
        'line-height': '35px',
        'padding-left': '25px',
        'padding-right': '25px',
        'background-color': '#fff',
        'border-radius': '3px',
        'box-shadow': '0 2px 6px rgba(0,0,0,.3)',
        'cursor': 'pointer',
        'margin-top': '10px',
        'text-align': 'center'
      })
      .html('Центрировать карту')
      .hover(function(){
          $(this).css("background-color", "#E5E5E5");
        }, function(){
          $(this).css("background-color", "#fff");
        })
      .on('click', function() {
         map.setCenter(companyPos);
       });

    $(controlDiv).append(controlUI);
  }

  function ColorControl(controlDiv, map) {
    var controlUI = document.createElement('div');

    $(controlUI)
      .attr('title', 'Click to discolor the map 1')
      .css({
        'color': 'rgb(25,25,25)',
        'font-family': 'Roboto,Arial,sans-serif',
        'fontSize': '12px',
        'height': '35px',
        'line-height': '35px',
        'padding-left': '25px',
        'padding-right': '25px',
        'background-color': '#fff',
        'border-radius': '3px',
        'box-shadow': '0 2px 6px rgba(0,0,0,.3)',
        'cursor': 'pointer',
        'margin-top': '10px',
        'text-align': 'center'
      })
      .html('Обесцветить карту')
      .hover(function(){
          $(this).css("background-color", "#E5E5E5");
        }, function(){
          $(this).css("background-color", "#fff");
        })
      .on('click', discolorMap);

    $(controlDiv).append(controlUI);
  }
});