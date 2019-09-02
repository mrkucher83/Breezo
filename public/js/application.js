


const air = document.getElementById('air');
const pollen = document.getElementById('pollen');

document.addEventListener("click", async (e) => {
  if (e.target.id === 'btn') {
    e.preventDefault();

    const formData = {
      city: document.getElementById('city').value
    }
    const resp = await fetch("/airQuality", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await resp.json();
    air.innerHTML = airTemplate(data);
    console.log(data.data)
  }

  if (e.target.id === 'btn2') {
    e.preventDefault();

    const formData = {
      city: document.getElementById('city').value
    }
    const resp = await fetch("/pollen", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await resp.json();
    const types = data.data[0].types
    pollen.innerHTML = pollenTemplate(types);
    console.log(types)
  }

  const res = document.getElementById('res').innerText;
  const poll = document.getElementsByClassName('poll-content')[0];
  if (e.target.id === "pollutant") {
    if (res === "Dominant pollutant:pm10") {
      e.preventDefault();
      poll.innerHTML = pm10;
    }
    if (res === "Dominant pollutant:pm25") {
      e.preventDefault();
      poll.innerHTML = pm25;
    }
    if (res === "Dominant pollutant:o3") {
      e.preventDefault();
      poll.innerHTML = o3;
    }

  }


  const aqiContent = document.getElementsByClassName('aqi-content')[0];
  if (e.target.id === "aqi") {
    e.preventDefault();
    aqiContent.innerHTML = aqi;
  }

  if (e.target.id === "aqi-close") {
    e.preventDefault();
    aqiContent.innerHTML = '';
  }

  if (e.target.id === "pol-close") {
    e.preventDefault();
    poll.innerHTML = '';
  }

});
