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
            result.reloadStats[key] = ++result.reloadStats[key] || reloadCount 
            chrome.storage.sync.set(result) 
        } else {
            jsObj.reloadStats[key] = reloadCount
            chrome.storage.sync.set(jsObj)    
        }
    })
}