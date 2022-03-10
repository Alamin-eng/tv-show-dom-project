//You can edit ALL of the code here

// fetched array list
let getList = [];
//get search elements
let searchElm = document.getElementById("search");
let selectEpisode = document.getElementById("selectEpisode");
let selectShows = document.getElementById("selectShows");

// setup funtion for window on load
let setup = function () {
  /*another way of call and manipute the fetch function if we use getShow()
    getShow(83).then((data) => {
      getList = data
      makePageforAll(getList)
      select(getList)
    })  */

  // promise function called and applied anthor .then()
  // logShow(82).then((e) =>{
  // //create all episode and select
  //   makePageforAll(getList)
  //   select(getList)
  // })

  //search
  searchElm.addEventListener("keyup", searchBar);
  //makeShow function called
  makeShows(getAllShows());
  // SelectShows Event handler 
  selectShows.addEventListener("change", function (e) {
    logShow(e.target.value).then((data) => {
      console.log(e.target.value)
      getList = data;
      console.log(getList)
      makePageforAll(getList);
      select(getList);
    });
  });

  selectEpisode.addEventListener("input", function () {
    let getSelect = selectEpisode.value;
    let showId = selectShows.value;

    logShow(showId).then((data) => {
      getList = data;
      console.log(getList)
      let filter = getList.filter((episode) => {
        if (Number(episode.id) === Number(getSelect)) {
          return episode;
        }
      });
      makePageforAll(filter);
    });
  });
};

//make page for all episodes
let makePageforAll = function (allEps) {
  let div = document.getElementById("root");
  div.innerHTML = ""; // very important
  allEps.forEach((episode) => {
    let individualDiv = document.createElement("div");
    let createEpisodeTitle = document.createElement("h2");
    let seasonDetails = document.createElement("h3");
    seasonDetails.className = "season-details";
    let createEpisodeImg = document.createElement("img");
    createEpisodeImg.className = "image"; // img class
    let createEpisodeDetails = document.createElement("p");
    createEpisodeDetails.className = "Eps-details";

    // assigning values to created elements
    createEpisodeTitle.innerText = `${episode.name}`;
    createEpisodeImg.src = [episode.image.original];

    if (episode.season >= 10 || episode.number >= 10) {
      seasonDetails.innerText = `S0${episode.season}E${episode.number}`;
    } else if (episode.season < 10 || episode.number < 10) {
      seasonDetails.innerText = `S0${episode.season}E0${episode.number}`;
    }
    createEpisodeDetails.innerHTML = episode.summary;

    // appending elements
    div.appendChild(individualDiv);
    individualDiv.append(
      createEpisodeTitle,
      createEpisodeImg,
      seasonDetails,
      createEpisodeDetails
    );
  });
};
//searh bar function

let searchBar = function (events) {
  let getSearchValue = events.target.value.toLowerCase();
  let getLabel = document.getElementById("search-count");

  let allEpisode = getList;
  let filterSearch = allEpisode.filter(function (findEpisode) {
    let name = findEpisode.name.toLowerCase();
    let summary = findEpisode.summary.toLowerCase();
    if (name.includes(getSearchValue) || summary.includes(getSearchValue)) {
      return findEpisode;
    }
  });
  getSearchValue === null || getSearchValue === ""
    ? (getLabel.innerText = "")
    : (getLabel.innerText = `Displaying ${filterSearch.length}/${allEpisode.length} episodes`);
  makePageforAll(filterSearch);
};

//select episode -
function select(list) {
  selectEpisode.innerHTML = "";
  list.forEach(function (episode) {
    let createOption = document.createElement("option");
    createOption.innerHTML = "";
    createOption.value = episode.id;
    if (episode.season >= 10 || episode.number >= 10) {
      createOption.innerText = `S0${episode.season}E${episode.number} - ${episode.name}`;
    } else if (episode.season < 10 || episode.number < 10) {
      createOption.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    }
    selectEpisode.append(createOption);
  });
}

// another way of fetch get json

/*function getShow(showNumber){
 const urlForTheRequest = `https://api.tvmaze.com/shows/${showNumber}/episodes`;

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
  } */

//I tried pushing the datas to getList as its logging the all 73 objects, Aluns' way is not logging any objects when I console.log
function logShow(showNumber) {
  return fetch(`https://api.tvmaze.com/shows/${showNumber}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

// select show name
function makeShows(getShows) {
  getShows.forEach(function (e) {
    let createOption = document.createElement("option");
    createOption.value = e.id;
    createOption.innerText = e.name;
    selectShows.append(createOption);
  });
}

window.onload = setup;
