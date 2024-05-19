//       `https://gateway.marvel.com:443/v1/public/characters?apikey=08f8ce7f8938918830fbb20c42e224dc`



document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("character");
  const submitButton = document.getElementById("search");
  const errorMessage = document.getElementById("error-Message");
  const characterImage = document.getElementById("characterImage");
  const characterDescription = document.getElementById("characterDescription");
  const comicsList = document.getElementById("comicsList");



    // Function to clear the screen
  function clearScreen() {
    characterImage.style.display = "none";
    characterDescription.textContent = "";
    errorMessage.textContent = "";
  }

  submitButton.addEventListener("click", function () {
    const value = inputElement.value.trim().toLowerCase();
    console.log("Search value:", value);

    // Check if input is empty
    if (!value) {
      // Hide the character description box when search input is empty
      characterDescription.style.display = "none";
      characterImage.style.display = "none";
      errorMessage.textContent = ""; // Clear any previous error message
      return;
    }


    // Fetch data from the Marvel API
    fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=08f8ce7f8938918830fbb20c42e224dc`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        // Check if any results are returned
        if (data.data.results.length > 0) {
          const character = data.data.results[0];
          characterDescription.style.display = "flex";
          console.log(`Character found: ${character.name}`);
          console.log(character);

          // Display character image and description
          characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
          characterImage.alt = character.name;
          characterImage.style.display = "block";
          characterDescription.innerHTML = `<h2>${character.name}</h2><p>${character.description || "No description available."}</p>`;

            // Display list of comics
            displayComics(character.comics.items);

          // Clear any previous error message
          errorMessage.textContent = "";



          
           // Display comics list if available
           if (character.comics && character.comics.items.length > 0) {
            displayComics(character.comics.items);
          } else {
            comicsList.textContent = ""; // Clear comics list
          }



        } else {
            errorMessage.textContent = `Character "${value}" not found.`;
          console.log(`Character "${value}" not found.`);
          characterImage.style.display = "none";
          characterDescription.textContent = "";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        errorMessage.textContent = "Error fetching data. Please try again.";
        characterImage.style.display = "none";
        characterDescription.textContent = "";
        errorMessage.style.display = "block";
      });
      });
  

function displayComics(comics) {
    const comicsList = document.getElementById("comicsList");
    comicsList.innerHTML = ""; // Clear previous comics list
    
    const comicsTitle = document.createElement("h3");
    comicsTitle.textContent = "Comics";
    comicsList.appendChild(comicsTitle);
    
    const comicsUL = document.createElement("ul");
    comics.forEach((comic) => {
        const comicLI = document.createElement("li");
        comicLI.textContent = comic.name;
        comicsUL.appendChild(comicLI);
    });
    comicsList.appendChild(comicsUL);
}

});
























// for loop data.data.results. length ; if value ==data.data.results.name then save


// const getData = async (name) => {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   const requestUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=08f8ce7f8938918830fbb20c42e224dc&ts=18&hash=a258b7e67d68816258be8291e9808639`;

//   await fetch(requestUrl, requestOptions)
//     .then((response) => response.text())
//     .then((result) => {
//       JSON.parse(result);
//     })
//     .catch((error) => console.error(error));
// };

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.forms["hero_name"];
//   form.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     // const heroName = event.target.heroName.value;
//     // console.log("heroName ===> ", heroName);
//     // const heroData = await getData("thor)");
// //
//     // const requestOptions = {
//     //   method: "GET",
//     //   redirect: "follow",
//     // };
//     // const requestUrl = `https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=08f8ce7f8938918830fbb20c42e224dc&ts=18&hash=a258b7e67d68816258be8291e9808639`;

//     // const heroData = await fetch(requestUrl, requestOptions)
//     //   .then((response) => response.text())
//     //   .then((result) => {
//     //     JSON.parse(result);
//     //   })
//     //   .catch((error) => console.error(error));
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };

//     const heroData = await fetch(
//       "https://gateway.marvel.com:443/v1/public/characters?apikey=08f8ce7f8938918830fbb20c42e224dc&ts=18&hash=a258b7e67d68816258be8291e9808639",
//       requestOptions
//     )
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(result);
//         const heroDataJson = JSON.parse(result);
//         // console.log(
//         //   "heroDataJson.data.results[0].thumbnail.path ====> ",
//         //   heroDataJson.data.results[1].thumbnail.path
//         // );
//         const heroSection = document.getElementById("hero-Grid");
//         const heroImg = document.createElement("img");
//         heroImg.src = `${heroDataJson.data.results[1].thumbnail.path}.${heroDataJson.data.results[1].thumbnail.extension}`;
//         heroSection.appendChild(heroImg);
//       })
//       .catch((error) => console.error(error));

//     // const heroData = await getData(heroName);
//     setTimeout(() => {
//       console.log("Delayed for 10 second.");
//     }, "10000");
//     console.log("heroData ===> ", heroData.data);

//     if (heroData && heroData.data && heroData.data.results.length > 0) {
//       console.log("heroData ===> ", heroData);
//       console.log(
//         "heroData.data.results[0].thumbnail ===> ",
//         heroData.data.results[0].thumbnail
//       );
//     } else {
//       console.log("No results found.");
//     }
//   });
// });
