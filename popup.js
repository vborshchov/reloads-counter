// function prepareValues(data) {
//     let values = [];
//     for (let key in data) {
//         values.push({host: key, reloads: data[key].length})
//     }
//     return values;
// }

// function renderTable(data) {
//     let options = {
//         data,
//         // layout:"fitColumns", //fit columns to width of table (optional)
//         columns:[ //Define Table Columns
//             {title:"HOST", field:"host", width: "80%"},
//             {title:"Realoads", field:"reloads", width: "20%", align:"left", formatter:"progress"},
//         ],
//     }
//     new Tabulator("#stats", options);
// }

// chrome.storage.local.get(['reloadStats'], function(result) {
//     if (result.reloadStats) {
//         console.table(result.reloadStats)
//         // renderTable(prepareValues(result.reloadStats))
//     }
// })