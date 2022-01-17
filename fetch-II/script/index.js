async function getData() {

    try {
        let city = document.querySelector('#city').value;
        console.log(city);
        document.querySelector('.mapouter').innerHTML = `<div class="gmap_canvas"><iframe width="600" height="610" id="gmap_canvas"
            src="https://maps.google.com/maps?q=${city}i&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe><br>
    </div>`

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a8b690facadc7ea677c0ffe806dd3c6&units=metric`);
        let data = await res.json();
        display(data);
        lat=data.coord.lat;
        lon=data.coord.log;
        console.log("data", data);
        sevenday(data.coord.lat,data.coord.lon);
    } catch (error) {
        console.log(error);
    }
    var div = document.querySelector("#info");
    function display(arr) {
        var div = document.querySelector("#info");
        div.innerHTML = "";
        let min = document.createElement('h2');
        let img = document.createElement('img');
        img.src = "https://thumbs.dreamstime.com/b/cold-icon-vector-winter-illustration-sign-thermometer-symbol-temperature-logo-cold-icon-vector-winter-illustration-sign-234317970.jpg";
        min.textContent = `Min Temp:${arr.main.temp_min}`;
        let max = document.createElement('h2');
        let max_img = document.createElement('img');
        max_img.src = "https://www.chinimandi.com/wp-content/uploads/2019/04/935a1902-hot-temperature-1.jpg";
        max.textContent = `Max Temp:${arr.main.temp_max}`;
        let wind = document.createElement('h2');
        let wind_img = document.createElement('img');
        wind_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhexg9XJXo13Aa4h9fxr85wR3yZL7QYCFUhA&usqp=CAU";
        wind.textContent = `Wind Speed:${arr.wind.speed}`;
        let cloud = document.createElement('h2');
        let cloud_img = document.createElement('img');
        cloud.textContent = `Cloud:${arr.clouds.all}`;
        cloud_img.src = "https://www.thoughtco.com/thmb/9-iCj7lj21Dd8zFGWnbiVzhi5n8=/1333x1000/smart/filters:no_upscale()/clouds-5b6b4e50c9e77c0050491212.jpg";
        div.append(min, img, max, max_img, wind, wind_img, cloud, cloud_img);
        document.querySelector('#container').append(div);
    }

}
async function sevenday(lat,lon){
    let week=['Thu','Fri','Sat','Sun','Mon','Tue','Web','Thu']
    // console.log("In the sevenday",lat,lon);
    try{
        let arr1=[];
        let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=4a8b690facadc7ea677c0ffe806dd3c6&units=metric&lang=en`;
        let res= await fetch(url)
        let data= await res.json();
        console.log("The seven day data is",data);
        arr1.push(data.daily);
        console.log("The array is",arr1);
        console.log(arr1[0][1])
        for(let i=0; i<8; i++){
            let div=document.createElement('div');
            div.style.color="white";
            div.style.fontSize="20px";
            let h3=document.createElement('h4');
            h3.textContent=`${arr1[0][i].temp.min}`;
            let max=document.createElement('h4');
            max.textContent=arr1[0][i].temp.max;
            let img=document.createElement('img');
            let icon=arr1[0][i].weather[0].icon;
            img.src=`http://openweathermap.org/img/wn/${icon}@2x.png `;
            img.style.width="70%";
            div.append(week[i],h3,max,img);
            document.querySelector('#seven').append(div);
        }
    }
    catch(E){
        console.log(E);
    }
}