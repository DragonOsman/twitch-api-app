"use strict";

function getStreamerData() {
  const streamersArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
  for (const streamer of streamersArray) {
    fetch(`https://wind-bow.glitch.me/helix/streams?user_login=${streamer}`)
      .then(response => {
      return response.json();
    })
      .then(data => {
      showStreamerData(data, streamer);
    })
      .catch(err => {
      console.log(`Error: ${err.message}`);
    });
  }
}

getStreamerData();

const allButton = document.querySelector("#all");
const onlineButton = document.querySelector("#online");
const offlineButton = document.querySelector("#offline");

const onlineStreamsDiv = document.querySelector("#online-streams");
const offlineStreamsDiv = document.querySelector("#offline-streams");

allButton.onclick = () => {
  onlineStreamsDiv.classList.remove("hidden");
  offlineStreamsDiv.classList.remove("hidden");
};
      
onlineButton.onclick = () => {
  onlineStreamsDiv.classList.remove("hidden");
  offlineStreamsDiv.classList.add("hidden");
};
      
offlineButton.onclick = () => {
  onlineStreamsDiv.classList.add("hidden");
  offlineStreamsDiv.classList.remove("hidden");
};

function showStreamerData(data, streamer) {
  const newStreamerDiv = document.createElement("div");
  newStreamerDiv.id = "new-stream";
  const thumbnail = document.createElement("img");
  // online streamers
  if (data.data && data.data.length) {
    for (let [key, value] of Object.entries(data.data[0])) {
      if (key === "thumbnail_url") {
        // value here is the image url
        value = value.replace("-{width}x{height}", "");
        thumbnail.src = value;
        thumbnail.classList.add("thumbnail");
        newStreamerDiv.insertAdjacentElement("afterbegin", thumbnail);
        thumbnail.insertAdjacentHTML("afterend", "<br />");
      } else {
        if (key === "user_name") {
          // value here is the streamer's username
          const originalValue = value;
          value = `<a href="https://www.twitch.tv/${originalValue}" target="_blank">${originalValue}</a>`;
        }
        newStreamerDiv.innerHTML += ` ${key}: ${value}<br />`;
      }
      onlineStreamsDiv.insertAdjacentElement("afterbegin", newStreamerDiv);
    }
    // offline streamers
  } else {
    newStreamerDiv.innerHTML += `<a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a> is offline`;
    offlineStreamsDiv.insertAdjacentElement("afterbegin", newStreamerDiv);
  }
}
