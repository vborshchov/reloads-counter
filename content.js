(function() {
    function storeReload(result) {
        let key = window.location.host
         // set default reloadStats object if needed
        result.reloadStats = result.reloadStats || {}
         // set default value for host's reloads if needed
        result.reloadStats[key] = result.reloadStats[key] || [] 
        result.reloadStats[key].push(+new Date())
        chrome.storage.local.set(result)
    }

    if (performance.navigation.type === 1) { // Reload
        chrome.storage.local.get(['reloadStats'], storeReload)
    }
})()
