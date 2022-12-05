// console.log("background.js");

// chrome.runtime.onInstalled.addListener(() => {
//     console.log("intalled!");
// });

// try {
//     const filter = {
//       url: [
//         {
//           urlMatches: 'https://www.google.com/',
//         },
//       ],
//     };
    
//     chrome.webNavigation.onCompleted.addListener(() => {
//       console.log("The user has loaded my favorite website!");
//       console.log(document);
//       const a = document.getElementsByClassName("L3eUgb");
//       a.style.backgroundColor = "red";
//     }, filter);
// } catch(e) {
//     console.log(e)
// }