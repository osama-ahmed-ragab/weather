const form = document.querySelector('.appForm');
const icon = document.querySelectorAll('.recentEntery__icon');
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api_key = '&appid=5beb43e13dc3fa8be428191e6e50a00c';
let dta = new Date();
let nData = dta.getMonth() + '.' + dta.getDate() + '.' + dta.getFullYear();

document.getElementById('submit').addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault();
  const newZip = document.getElementById('zipCode').value;
  const content = document.getElementById('howUFellings').value;

  get_weth(url, newZip, api_key)
    .then(function (userData) {
      post_data_fun('/add', { date: nData, temp: userData.main.temp, content })
    }).then(function (newData) {
      update_ui()
    })
  form.reset();
}

const get_weth = async (url, newZip, api_key) => {
  const res = await fetch(url + newZip + api_key);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

const post = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const update_ui = async () => {
  const request = await fetch('/all');
  try {
    const all_data = await request.json()
    icon.forEach(icon => icon.style.opacity = '1');
    document.getElementById('date').innerHTML = all_data.date;
    document.getElementById('temp').innerHTML = all_data.temp;
    document.getElementById('content').innerHTML = all_data.content;
  }
  catch (e) {
    console.log("error", e);
  }
};
