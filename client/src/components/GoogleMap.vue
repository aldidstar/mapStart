<template>
  <GoogleMap
    api-key="AIzaSyD_6C2ZVuqj91c5-3Rm_V1nmD21gUYRC-c"
    style="width: 100%; height: 850px"
    :center="center"
    :zoom="18"
  >
    <Polyline
      :options="{
        path: labels,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }"
      :key="index"
      v-for="(label, index) in labels"
    />

    <Marker
      :options="{
        position: { lat: marker.lat, lng: marker.lng },
        title: marker.title,
        label: marker.label,
        icon: marker.icon,
      }"
      :key="index"
      v-for="(marker, index) in markers"
      :position="marker"
      :clickable="true"
      :draggable="true"
    />
    <CustomControl position="BOTTOM_CENTER">
      <button id="custom-stop" @click="stop">
        <i class="fas fa-stop"></i>
      </button>
    </CustomControl>
    <CustomControl position="BOTTOM_CENTER">
      <button id="custom-play" @click="play">
        <i class="fas fa-play"></i>
      </button>
    </CustomControl>
    <CustomControl position="BOTTOM_CENTER">
      <button id="custom-pause" @click="pause">
        <i class="fas fa-pause"></i>
      </button>
    </CustomControl>
  </GoogleMap>
</template>

<script>
import axios from "axios";

import { GoogleMap, Marker, Polyline, CustomControl } from "vue3-google-map";
import { ref } from "vue";

export default {
  components: { GoogleMap, Marker, Polyline, CustomControl },

  data() {
    const pause = () => alert("pause");
    const stop = () => ((this.markers = []), (this.labels = []));
    const play = () => this.load();
    return {
      center: { lat: -6.923738, lng: 107.688646 },
      markers: [],
      labels: [],
      stop,
      play,
      pause,
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
          console.log(res.data[0]);
          var haversine = require("haversine-distance");
          const dist = ref(0);
          for (let i = 0; i < res.data.length; i++) {
            setInterval(() => {
              dist.value += 0.001916;

              this.labels.push({
                lat: res.data[i].lat + dist.value,
                lng: res.data[i].lng,
              });
            }, 10000);
          }
          // document.getElementByClass("custom-pause").click(function() {
          //   alert("Handler for .click() called.");
          // });
          res.data.forEach((item) => {
            setInterval(() => {
              dist.value += 0.001916;
              var point1 = { lat: item.lat, lng: item.lng };
              var point2 = {
                lat: item.lat + dist.value,
                lng: item.lng + dist.value,
              };
              var haversine_m = haversine(point1, point2); //Results in meters (default)
              console.log(haversine_m + "m");
              this.markers.push({
                lat: item.lat + dist.value,
                lng: item.lng,
                title: `60 m/s`,
                label: item.title,
                icon: "https://maps.google.com/mapfiles/kml/pal4/icon15.png",
              });
            }, 10000);
          });
        });
    },
  },
};
</script>

<style scoped>
#custom-stop {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

#custom-play {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

#custom-pause {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style>
