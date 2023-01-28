/* 
App Clima
*/
function mostrar(){
  document.getElementById('contenedor').style.display = 'grid';
}
function ocultar(){
  document.getElementById('contenedor').style.display = 'none';
}
window.addEventListener('load', ()=>{
    /* Usar Geolocalizador del navegador */
    let lat;
    let lon;

    let temperaturaValor = document.getElementById('temperatura-valor')


    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
           // console.log(posicion)
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
            
           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=a6608bde976702157483b4751222876e
           `

           console.log(url)
           //Peticiones a la API usando Fetch
           fetch(url)
            .then(response =>{return response.json()})
            .then(data =>{
                console.log(data.main.temp)
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                

                //Usar iconos animados en formato svg, y elegimos el clima segun el data.weather[0].main, nos viene a decir cielo claro, cielo despejado etc..
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
                
            })
            .catch(error =>{
                console.log(error)
            })
        })
    }
})