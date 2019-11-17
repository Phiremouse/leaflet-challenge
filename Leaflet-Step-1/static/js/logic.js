function createmap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var basemaps = {
        "light Map": lightmap
    }

    var overlays = {
        "Earthquakes": earthquakes
    };

    var map = L.map("map-id", {
        center: [36.0858, -117.4684],
        zoom: 10,
        layers: [lightmap, earthquakes]
    });

    L.control.layers(basemaps, overlays, {
        collapsed: false
    }).addTo(map);

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ['0-1','1-2','2-3','3-4','4-5','5+']
        var colors = ['#17ae00','#6dff32','#fdff32','#f29219','#ff6700','#ff0035']
        var labels = [];
    
        // Add min & max
        var legendInfo = "<h1>Magnitude</h1>" +
          "<div class=\"labels\"></div>";
       
    
        div.innerHTML = legendInfo;
           
        limits.forEach(function(limit, index) {
          labels.push("<p style=\"background-color: " + colors[index] + "\">" + limits[index] + "</p>");
        });
    
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
    
      // Adding legend to the map
      legend.addTo(map);

   // updateLegend()

}




function createMarkers(response) {
    var equake = response.features;
    var eqMarkers = [];

    for (var index = 0; index < equake.length; index++) {
        var temp_loc = equake[index];
        var xx = temp_loc.properties.mag
        var color = "";
        if (xx < 1) {

            color = "#17ae00";
        }
        else if (xx < 2 & xx > 1) {
            color = "#6dff32";
        }
        else if (xx < 3 & xx > 2) {
            color = "#fdff32";
        }
        else if (xx < 4 & xx > 3) {
            color = "#f29219";
        }
        else if (xx < 5 & xx > 4) {
            color = "#ff6700";
        }
        else {
            color = "#ff0035";
        }

        var ebind = L.circle([temp_loc.geometry.coordinates[1], temp_loc.geometry.coordinates[0]], {
            fillOpacity: 0.5,
            color: "color",
            fillColor: color,
            // Adjust radius
            radius: temp_loc.properties.mag * 2000
        })
            .bindPopup("<h3>" + temp_loc.properties.title + "<h3><h3>Mag: " + temp_loc.properties.mag + "<h3>");

        eqMarkers.push(ebind);
    }
    createmap(L.layerGroup(eqMarkers));

}


















d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);

function updateLegend() {
    var layers = ['0-1', '1-2', '2-3', '3-4','4-5', '5-5+'];
    var colors = ["#17ae00", "#6dff32", "#fdff32" , "#f29219", "#ff6700","#ff0035" ];
    for( var i = 0 ; i < layers.length; i++){
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;      
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }

  }








