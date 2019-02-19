const options = {
    valueNames: [ 'host', 'reloads' ],
    // Since there are no elements in the list, this will be used as template.
    item:  `<tr>
                <td class="host ellipse"></td>
                <td class="reloads"></td>
            </tr>`,
    page: 10,
    pagination: true
};
  
let values = [];
  
chrome.storage.sync.get(['reloadStats'], function(result) {
    if (result.reloadStats) {
        for (let key in result.reloadStats) {
            values.push({host: key, reloads: result.reloadStats[key].length})
        }
    }
    const statsList = new List('stats', options, values);
    statsList.sort("reloads", {
        order: "desc"
    })
})