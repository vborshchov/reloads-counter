if (performance.navigation.type === 1) { // Reload
    const state = history.state || {};
    let reloadCount = state.reloadCount || 0;
    state.reloadCount = ++reloadCount;
    history.replaceState(state, null, document.URL);

    let key = window.location.host
    let jsObj = {
        reloadStats: {}
    }
    chrome.storage.sync.get(['reloadStats'], function(result) {
        if (result.reloadStats) {
            if (result.reloadStats[key]) {
                result.reloadStats[key].push(+new Date())
            } else {
                result.reloadStats[key] = []
            }
            result.reloadStats[key] =  result.reloadStats[key]
            chrome.storage.sync.set(result) 
        } else {
            jsObj.reloadStats[key] = [+new Date()]
            chrome.storage.sync.set(jsObj)
        }
    })
}