chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({reloadStats: {}});
});