
let get2ndSearch = document.getElementById("2ndSearch");


// function setup2() {
//   tvShowsPage(getAllShows);
// }

// // All Tv shows function -
// function tvShowsPage(tvShow) {
//   // sorted the shows name is order
//   tvShow.sort(function (a, b) {
//     const nameA = a.name.toUpperCase();
//     const nameB = b.name.toUpperCase();

//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
//     // names must be equal
//     return 0;
//   });
//   // created elements
//   let get2ndDiv = document.getElementById("root2");
//   get2ndDiv.innerHTML = ""; // very important
//   tvShow.forEach((tv) => {
//     let individualDiv = document.createElement("div");
//     let createShowTitle = document.createElement("h2");
//     createShowTitle.innerText = `${tv.name}`;
//     let createLink = document.createElement("a");
//     createLink.href = "#";
//     let createShowImg = document.createElement("img");
//     createShowImg.className = "image"; // img class
//     createShowImg.src = [tv.image.original];

//     let createShowDetails = document.createElement("p");
//     createShowDetails.className = "Eps-details";
//     createShowDetails.innerHTML = tv.summary;

//     let innerFlexDiv = document.createElement("div");
//     innerFlexDiv.className = "showInnerFlex";

//     let ratingDetails = document.createElement("p");

//     let genres = document.createElement("p");
//     genres.className = "season-details";
//     let runtime = document.createElement("p");
//     runtime.className = "season-details";
//     let status = document.createElement("p");
//     status.className = "season-details";
//     let country = document.createElement("p");
//     country.className = "season-details";

//     ratingDetails.innerHTML = `<strong>Rating:   ${tv.rating.average} </strong>`;
//     genres.innerHTML = `Genres : ${tv.genres} `;
//     runtime.innerHTML = `Run time : ${tv.runtime}`;
//     status.innerHTML = `Status : ${tv.status}`;
//     country.innerHTML = `Country : ${tv.network.country.name}`;
//     // appending elements
//     createLink.append(createShowImg);
//     get2ndDiv.appendChild(individualDiv);
//     innerFlexDiv.append(genres, runtime, country, status);
//     individualDiv.append(
//       createShowTitle,
//       createLink,

//       createShowDetails,
//       innerFlexDiv,
//       ratingDetails
//     );
//   });
// }
// tvShowsPage(getAllShows());





