// get city and country
fetch('http://ip-api.com/json')
  .then(res => res.json())
  .then(data => {
    return {
      city: data.city,
      countryCode: data.countryCode,
    };
  })
  .then(async data => {
    // get weather by city and country
    let weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${data.city},${
        data.countryCode
      }&appid=5efbb1d45f4b638b0d42db5182b5112f&units=metric`,
    );
    weather = await weather.json();
    const { description, main, icon } = weather.weather[0];
    const weatherData = {
      temp_max: weather.main.temp_max,
      temp_min: weather.main.temp_min,
      description,
      main,
      city: weather.name,
      icon: 'http://openweathermap.org/img/w/' + icon + '.png',
    };
    return weatherData;
  })
  .then(data => {
    // input data into DOM
    const temp_max = document.getElementById('temp_max');
    const temp_min = document.getElementById('temp_min');
    const description = document.getElementById('description');
    const city = document.getElementById('city');
    const iconImage = document.querySelector('#icon');
    iconImage.src = data.icon;
    if (data.icon.slice(-7, -4) !== '01d') {
      iconImage.style.animation = 'none';
    }

    temp_max.textContent = `${data.temp_max} C`;
    temp_min.textContent = `${data.temp_min} C`;
    description.textContent = data.description;
    city.textContent = data.city;
  });
