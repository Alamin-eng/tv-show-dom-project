// //You can edit ALL of the code here

// fetched array list
let getList = [];
//get elements
let div = document.getElementById("root");
let searchElm = document.getElementById("search");
let selectEpisode = document.getElementById("selectEpisode");
let selectShows = document.getElementById("selectShows");

// setup funtion for window on load
let setup = function () {
  //search event listner
  searchElm.addEventListener("keyup", searchTv);

  //makeShow function called
  makeShows(getAllShows());

  // SelectShows Event handler
  selectShows.addEventListener("change", function (e) {
    //makeShow function called
    logShow(e.target.value).then((data) => {
      getList = data;
      console.log(getList);

      makePageforAll(getList);
      select(getList);
    });
  });

  //select episode event listner
  selectEpisode.addEventListener("input", function () {
    let getSelect = selectEpisode.value;
    let showId = selectShows.value;

    logShow(showId).then((data) => {
      getList = data;
      console.log(getList);
      let filter = getList.filter((episode) => {
        if (Number(episode.id) === Number(getSelect)) {
          return episode;
        }
      });
      makePageforAll(filter);
    });
  });
};

//make page for all episodes function
let makePageforAll = function (allEps) {
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

//searh bar function for episode -- not in use
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

//select episode function -
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

// function for fetch data (promise)
function logShow(showNumber) {
  return fetch(`https://api.tvmaze.com/shows/${showNumber}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

// select show name function
function makeShows(getShows) {
  // sorted in alphabetical order
  getShows.sort(function (a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  getShows.forEach(function (e) {
    let createOption = document.createElement("option");
    createOption.value = e.id;
    createOption.innerText = e.name;
    selectShows.append(createOption);
  });
}

// -- 500 search bar for all tv shows

function searchTv(show) {
  let getSearchValue = show.target.value.toLowerCase();
  let getLabel = document.getElementById("search-count");
  let allshow = getAllShows();
  let filterTv = allshow.filter(function (findShow) {
    let name = findShow.name.toLowerCase();
    let summary = findShow.summary.toLowerCase();

    if (name.includes(getSearchValue) || summary.includes(getSearchValue)) {
      return findShow;
    }
  });
  getSearchValue === null || getSearchValue === ""
    ? (getLabel.innerText = "")
    : (getLabel.innerText = `Displaying ${filterTv.length}/${allshow.length} Result`);
  tvShowsPage(filterTv);
}

// --500 search bar for all tv shows

// homepage function -- 400
function tvShowsPage(tvShow) {
  // sorted the shows name is order
  tvShow.sort(function (a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  // created elements
  div.innerHTML = ""; // very important
  tvShow.forEach((tv) => {
    let individualDiv = document.createElement("div");
    let createShowTitle = document.createElement("h2");
    createShowTitle.innerText = `${tv.name}`;
    let createLink = document.createElement("a");
    createLink.href = "#";
    let createShowImg = document.createElement("img");
    createShowImg.className = "image tvImg"; // img class
    createShowImg.src = [tv.image.original];

    let createShowDetails = document.createElement("p");
    createShowDetails.className = "Eps-details";
    createShowDetails.innerHTML = tv.summary;

    let innerFlexDiv = document.createElement("div");
    innerFlexDiv.className = "showInnerFlex";

    let ratingDetails = document.createElement("p");

    let genres = document.createElement("p");
    genres.className = "season-details";
    let runtime = document.createElement("p");
    runtime.className = "season-details";
    let status = document.createElement("p");
    status.className = "season-details";
    let country = document.createElement("p");
    country.className = "season-details";

    ratingDetails.innerHTML = `<strong>Rating:   ${tv.rating.average} </strong>`;
    genres.innerHTML = `Genres : ${tv.genres} `;
    runtime.innerHTML = `Run time : ${tv.runtime}`;
    status.innerHTML = `Status : ${tv.status}`;
    country.innerHTML = `Country : ${tv.network.country.name}`;
    // appending elements
    createLink.append(createShowImg);
    div.appendChild(individualDiv);
    innerFlexDiv.append(genres, runtime, country, status);
    individualDiv.append(
      createShowTitle,
      createLink,
      createShowDetails,
      innerFlexDiv,
      ratingDetails
    );
  });
}

// homePage funciton for Tv Guide icon
function homePage() {
  tvShowsPage(getAllShows());
}

// window onload event
window.onload = function () {
  setup();
  homePage();
};

// Level 400 without sorting the name

// // fetched array list
// let getList = [];
// //get search elements
// let searchElm = document.getElementById("search");
// let selectEpisode = document.getElementById("selectEpisode");
// let selectShows = document.getElementById("selectShows");

// // setup funtion for window on load
// let setup = function () {
//   /*another way of call and manipute the fetch function if we use getShow()
//     getShow(83).then((data) => {
//       getList = data
//       makePageforAll(getList)
//       select(getList)
//     })  */

//   //search event listner
//   searchElm.addEventListener("keyup", searchBar);

//   //makeShow function called
//   makeShows(getAllShows());

//   // SelectShows Event handler
//   selectShows.addEventListener("change", function (e) {
//     //makeShow function called
//     logShow(e.target.value).then((data) => {
//       getList = data;
//       console.log(getList);
//       makePageforAll(getList);
//       select(getList);
//     });
//   });

//   //select episode event listner
//   selectEpisode.addEventListener("input", function () {
//     let getSelect = selectEpisode.value;
//     let showId = selectShows.value;

//     logShow(showId).then((data) => {
//       getList = data;
//       console.log(getList)
//       let filter = getList.filter((episode) => {
//         if (Number(episode.id) === Number(getSelect)) {
//           return episode;
//         }
//       });
//       makePageforAll(filter);
//     });
//   });
// };

// //make page for all episodes function
// let makePageforAll = function (allEps) {
//   let div = document.getElementById("root");
//   div.innerHTML = ""; // very important
//   allEps.forEach((episode) => {
//     let individualDiv = document.createElement("div");
//     let createEpisodeTitle = document.createElement("h2");
//     let seasonDetails = document.createElement("h3");
//     seasonDetails.className = "season-details";
//     let createEpisodeImg = document.createElement("img");
//     createEpisodeImg.className = "image"; // img class
//     let createEpisodeDetails = document.createElement("p");
//     createEpisodeDetails.className = "Eps-details";

//     // assigning values to created elements
//     createEpisodeTitle.innerText = `${episode.name}`;
//     createEpisodeImg.src = [episode.image.original];

//     if (episode.season >= 10 || episode.number >= 10) {
//       seasonDetails.innerText = `S0${episode.season}E${episode.number}`;
//     } else if (episode.season < 10 || episode.number < 10) {
//       seasonDetails.innerText = `S0${episode.season}E0${episode.number}`;
//     }
//     createEpisodeDetails.innerHTML = episode.summary;

//     // appending elements
//     div.appendChild(individualDiv);
//     individualDiv.append(
//       createEpisodeTitle,
//       createEpisodeImg,
//       seasonDetails,
//       createEpisodeDetails
//     );
//   });
// };

// //searh bar function
// let searchBar = function (events) {
//   let getSearchValue = events.target.value.toLowerCase();
//   let getLabel = document.getElementById("search-count");

//   let allEpisode = getList;
//   let filterSearch = allEpisode.filter(function (findEpisode) {
//     let name = findEpisode.name.toLowerCase();
//     let summary = findEpisode.summary.toLowerCase();
//     if (name.includes(getSearchValue) || summary.includes(getSearchValue)) {
//       return findEpisode;
//     }
//   });
//   getSearchValue === null || getSearchValue === ""
//     ? (getLabel.innerText = "")
//     : (getLabel.innerText = `Displaying ${filterSearch.length}/${allEpisode.length} episodes`);
//   makePageforAll(filterSearch);
// };

// //select episode function -
// function select(list) {
//   selectEpisode.innerHTML = "";
//   list.forEach(function (episode) {
//     let createOption = document.createElement("option");
//     createOption.innerHTML = "";
//     createOption.value = episode.id;
//     if (episode.season >= 10 || episode.number >= 10) {
//       createOption.innerText = `S0${episode.season}E${episode.number} - ${episode.name}`;
//     } else if (episode.season < 10 || episode.number < 10) {
//       createOption.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
//     }
//     selectEpisode.append(createOption);
//   });
// }

// // another way of fetch get json

// /*function getShow(showNumber){
//  const urlForTheRequest = `https://api.tvmaze.com/shows/${showNumber}/episodes`;

//   return fetch(urlForTheRequest)
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((e) => console.log(e));
//   } */

// // function for fetch data (promise)
// function logShow(showNumber) {
//   return fetch(`https://api.tvmaze.com/shows/${showNumber}/episodes`)
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     });
// }

// // select show name function
// function makeShows(getShows) {
//   getShows.forEach(function (e) {
//     let createOption = document.createElement("option");
//     createOption.value = e.id;
//     createOption.innerText = e.name;
//     selectShows.append(createOption);
//   });
// }

// // window onload event
// window.onload = setup;
