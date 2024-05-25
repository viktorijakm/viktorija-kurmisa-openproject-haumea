// //       `https://gateway.marvel.com:443/v1/public/characters?apikey=08f8ce7f8938918830fbb20c42e224dc`



// document.addEventListener("DOMContentLoaded", function () {
//   const inputElement = document.getElementById("character");
//   const submitButton = document.getElementById("search");
//   const errorMessage = document.getElementById("error-Message");
//   const characterImage = document.getElementById("characterImage");
//   const characterDescription = document.getElementById("characterDescription");
//   const comicsList = document.getElementById("comicsList");
//   const resetButton = document.getElementById("reset");
//   const attributionFooter = document.getElementById("attributionFooter"); 



//     // Function to clear the screen
//   function clearScreen() {
//     characterImage.style.display = "none";
//     characterDescription.style.display = "none"; // Hide character description
//     characterImage.src = ""; //clear the image source
//     characterDescription.textContent = "";
//     errorMessage.textContent = "";
//     comicsList.innerHTML = ""; // Clear the comics list
//     inputElement.value = ""; // Clear the input field
//   }

//   // Add event listener for the reset button
//   resetButton.addEventListener("click", function () { 
//     clearScreen();
//   });
  

//   submitButton.addEventListener("click", function () {
//     const value = inputElement.value.trim().toLowerCase();
//     console.log("Search value:", value);

//     // Check if input is empty
//     if (!value) {
//       // Hide the character description box when search input is empty
//       characterDescription.style.display = "none";
//       characterImage.style.display = "none";
//       comicsList.style.display = "none";
//       errorMessage.textContent = ""; // Clear any previous error message
//       return;
//     }

//     // Fetch data from the Marvel API
//     fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=08f8ce7f8938918830fbb20c42e224dc`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data);

//         // Check if any results are returned
//         if (data.data.results.length > 0) {
//           const character = data.data.results[0];
//           characterDescription.style.display = "flex";
//           console.log(`Character found: ${character.name}`);
//           console.log(character);

//           // Display character image and description
//           characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
//           characterImage.alt = character.name;
//           characterImage.style.display = "block";
//           characterDescription.innerHTML = `<h2>${character.name}</h2><p>${character.description || "No description available."}</p>`;

//             // Display list of comics
//             displayComics(character.comics.items);

//           // Clear any previous error message
//           errorMessage.textContent = "";



          
//            // Display comics list if available
//            if (character.comics && character.comics.items.length > 0) {
//             displayComics(character.comics.items);
//           } else {
//             comicsList.textContent = ""; // Clear comics list
//           }



//         } else {
//             errorMessage.textContent = `Character "${value}" not found.`;
//           console.log(`Character "${value}" not found.`);
//           characterImage.style.display = "none";
//           characterDescription.textContent = "";
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         errorMessage.textContent = "Error fetching data. Please try again.";
//         characterImage.style.display = "none";
//         characterDescription.textContent = "";
//         errorMessage.style.display = "block";
//       });
//       });
  

// function displayComics(comics) {
//     const comicsList = document.getElementById("comicsList");
//     comicsList.innerHTML = ""; // Clear previous comics list
    
//     const comicsTitle = document.createElement("h3");
//     comicsTitle.textContent = "Comics";
//     comicsList.appendChild(comicsTitle);
    
//     const comicsUL = document.createElement("ul");
//     comics.forEach((comic) => {
//         const comicLI = document.createElement("li");
//         comicLI.textContent = comic.name;
//         comicsUL.appendChild(comicLI);
//     });
//     comicsList.appendChild(comicsUL);
// }

// attributionFooter.id = "attributionFooter";
// attributionFooter.innerHTML = '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>';
// document.body.appendChild(attributionFooter);
// });





document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("character");
  const submitButton = document.getElementById("search");
  const errorMessage = document.getElementById("error-Message");
  const characterImage = document.getElementById("characterImage");
  const characterDescription = document.getElementById("characterDescription");
  const comicsList = document.getElementById("comicsList");
  const resetButton = document.getElementById("reset");
  const attributionFooter = document.getElementById("attributionFooter");
  const characterListContainer = document.getElementById("characterList");


  // Function to clear the screen
  function clearScreen() {
    characterImage.style.display = "none";
    characterDescription.style.display = "none";
    characterImage.src = "";
    characterDescription.textContent = "";
    errorMessage.textContent = "";
    comicsList.innerHTML = "";
    inputElement.value = "";
    characterListContainer.innerHTML = ""; 
  }

  // Add event listener for the reset button
  resetButton.addEventListener("click", clearScreen);

  // Function to fetch data from Marvel API based on character name
  function fetchData(characterName) {
    // Fetch data from the Marvel API
    fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&apikey=08f8ce7f8938918830fbb20c42e224dc`)
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
            comicsList.textContent = ""; 
          }
        } else {
          errorMessage.textContent = `Character "${characterName}" not found.`;
          console.log(`Character "${characterName}" not found.`);
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
  }

  // Add event listener for the submit button
  submitButton.addEventListener("click", function () {
    const value = inputElement.value.trim().toLowerCase();
    console.log("Search value:", value);


    // Check if input is empty
    if (!value) {
      // Hide the character description box when search input is empty
      characterDescription.style.display = "none";
      characterImage.style.display = "none";
      comicsList.style.display = "none";
      errorMessage.textContent = ""; // Clear any previous error message
      return;
    }

    // Check if the input is "name"
    if (value === "name") {
      // Fetch all character names
      fetchAllCharactersByIds();
    } else {
      // Fetch data based on character name
      fetchData(value);
    }
  });

  // Function to fetch all character names using pagination
  async function fetchAllCharactersByIds() {
    let allCharacters = [];
    const limit = 100; // Maximum limit per request
    let offset = 0;

    try {
      while (true) {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=08f8ce7f8938918830fbb20c42e224dc&limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const characters = data.data.results;
        allCharacters = allCharacters.concat(characters);

        if (characters.length < limit) {
          break; // No more characters to fetch
        }

        offset += limit; // Move to the next page
      }

      displayCharacterNames(allCharacters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  // Function to display list of character names as links
  function displayCharacterNames(characters) {
    characterListContainer.innerHTML = ""; 
    characters.forEach(character => {
      const characterLink = document.createElement("a");
      characterLink.textContent = character.name;
      characterLink.href = "#"; // Set the href attribute to "#" for now
      characterLink.style.color = "black"; 
      characterLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        fetchData(character.name); // Fetch data for the clicked character
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
      const characterItem = document.createElement("div");
      characterItem.appendChild(characterLink);
      characterListContainer.appendChild(characterItem);
    });
  }

  // Function to display list of comics
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

  // Call fetchAllCharactersByIds function when the DOM content is loaded
  fetchAllCharactersByIds();

  // Add attribution footer
  attributionFooter.id = "attributionFooter";
  attributionFooter.innerHTML = '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>';
  document.body.appendChild(attributionFooter);
});
