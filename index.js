// fetchData();

// async function fetchData(){
//     try{
//         const characterName = document.getElementById(character).value.toLowerCase();
//         const response = await fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=08f8ce7f8938918830fbb20c42e224dc")
    
//              if(!response.ok){
//         throw new Error("Could not fetch resource");
//     }
//     const data = await response.json();
//     const 
//     }
//     catch(error){
//         console.error(error);
//     } 
// }
fetch("https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=08f8ce7f8938918830fbb20c42e224dc");
