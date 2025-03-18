import React from 'react'
import axios from 'axios';

const loadScript = (src) =>
new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"`)) return resolve()
  const script = document.createElement('script')
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const MyMapComponent = ({center, zoom, marker}) => {
  const ref = React.useRef();
  const src=`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`
  
  loadScript(src)
    .then(() => {
      /*global google*/
      // console.log("Load script google: ", google)
    })
    .catch(console.error)
    React.useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      marker.features.map(selectedData => (
        new google.maps.Marker({
          position: {  
            lat: selectedData.coordinates[0],
            lng: selectedData.coordinates[1]
          },
          map,
          icon: "https://yourlovedIcon.png",
        })
      ))
    });

  return <div ref={ref} id="map" style={{height: '100vh', width: '50vh'}}/>;
}

function Maps() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https:\\YOURAPI.LOAD")
      setData(response.data)
    }
    fetchData();
  },[])
  
  const center = { 
    lat: -15.770,
    lng: -44.233 };
  const zoom = 10
    
  return data && 
          <MyMapComponent 
          center={center}
          zoom={zoom}
          marker={data}
          />
}

export default Maps