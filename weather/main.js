const selectCity = document.querySelector("#selectCity")
const selectTime = document.querySelector("#selectTime")

const cityName = document.querySelector("#cityName")
const weather = document.querySelector("#weather")
const temp = document.querySelector("#temp")
const rain = document.querySelector("#rain")

const content = document.querySelector(".content")
console.dir(selectCity)
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-DCCC3299-0DA4-4054-BA67-B0B6B0942484")
    .then(res => res.json())
    .then(data => {
        let cityArr = data.records.location
        console.log(cityArr);
        startSelect(cityArr)

    })

function startSelect(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 不使用 innerHTML 的寫法
        const option = document.createElement("option")
        option.textContent = arr[i].locationName
        option.value = arr[i].locationName
        selectCity.appendChild(option)
        // selectCity.innerHTML += `<option value=${arr[i].locationName}>${arr[i].locationName}</option>`
    }

    for (let j = 0; j < arr[0].weatherElement[0].time.length; j++) {
        const option = document.createElement("option")
        option.textContent = arr[0].weatherElement[0].time[j].startTime
        option.value = j
        selectTime.appendChild(option)

    }
    selectCity.addEventListener('change', () => {
        selectTime.value = "";
        cityName.textContent = ""
        weather.textContent = ""
        temp.textContent = ""
        rain.textContent = ""
    })
    selectTime.addEventListener("change", () => {
        let timeNum = selectTime.value
        for (let i = 0; i < arr.length; i++) {
            if (selectTime.value == "") {
                cityName.textContent = ""
                weather.textContent = ""
                temp.textContent = ""
                rain.textContent = ""
                return
            }
            if (arr[i].locationName == selectCity.value) {
                cityName.textContent = selectCity.value;

                weather.textContent = arr[i].weatherElement[0].time[timeNum].parameter.parameterName;

                temp.textContent = `${arr[i].weatherElement[2].time[timeNum].parameter.parameterName} - ${arr[i].weatherElement[4].time[timeNum].parameter.parameterName} 度`

                rain.textContent = `降雨機率：${arr[i].weatherElement[1].time[timeNum].parameter.parameterName} ％`

                console.dir(content.lastElementChild)
                // 改變天氣 icon
                if (weather.textContent.includes("晴")) {
                    content.lastElementChild.className = `fa-solid fa-sun`
                    return
                }
                if (weather.textContent.includes("雨")) {
                    content.lastElementChild.className = `fa-solid fa-cloud-showers-heavy`
                    return
                }
                if (weather.textContent.includes("多雲")) {
                    content.lastElementChild.className = `fa-solid fa-cloud`
                    return
                }
                return
            }
        }
    })
}

