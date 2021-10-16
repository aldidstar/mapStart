<template>
  <GoogleMap
    api-key=process.env.ACCESS_KEY_ID
    style="width: 100%; height: 850px"
    :center="center"
    :zoom="18"
    
    
  >
   <Polyline :options=" {path: labels,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,}"
      :key="index"
      v-for="(label, index) in labels" />
      
    <Marker
      :options="{ position: { lat: marker.lat , lng: marker.lng  } , title:marker.title, label:marker.label, icon:marker.icon}"
      :key="index"
      v-for="(marker, index) in markers"
      :position="marker"
      :clickable="true"
      :draggable="true"
    />
  </GoogleMap>

  
</template>

<script>
import axios from "axios";

import { GoogleMap, Marker, Polyline } from "vue3-google-map";
import {  ref } from "vue";

export default {
  components: { GoogleMap, Marker, Polyline },

  data() {
    
    return {
      center: { lat: -6.923738, lng: 107.688646 },
      markers: [], labels:[]
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axios
        .get("http://localhost:3000/maps", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data[0])
          var haversine = require("haversine-distance");
          const dist = ref(0);
           for (let i = 0; i < res.data.length; i++) {
             setInterval(() => {
      dist.value += 0.001916;

     this.labels.push({ lat: res.data[i].lat + dist.value, lng: res.data[i].lng})
     console.log(res.data[0].lat + dist.value, res.data[0].lng + dist.value)
    }, 10000);
    }
          res.data.forEach((item) => {
  setInterval(() => {
      dist.value += 0.001916;
        var point1 = { lat: item.lat, lng: item.lng }
        var point2 = { lat: item.lat + dist.value, lng: item.lng + dist.value }
          var haversine_m = haversine(point1, point2); //Results in meters (default)
          console.log(haversine_m + 'm')
            this.markers.push({ lat: item.lat + dist.value , lng: item.lng , title:`60 m/s`,  label: item.title , icon: 'https://maps.google.com/mapfiles/kml/pal4/icon15.png'  })  
    }, 10000);
                  
          });
          
        });
    },
  },
};
</script>