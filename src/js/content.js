(function() {
  const reloadsStats = {
    storeStatsInfo: function(result) {
      console.log(result);
      let key = window.location.host;
      // set default reloadStats object if needed
      result.reloadStats = result.reloadStats || {};
      // set default value for host's reloads if needed
      result.reloadStats[key] = result.reloadStats[key] || [];
      result.reloadStats[key].push(performance.timing.toJSON());
      chrome.storage.local.set(result);
    },
    collect: function() {
      if (performance && performance.navigation.type === 1) {
        // Reload
        window.addEventListener("load", event => {
          setTimeout(() => {
            chrome.storage.local.get(["reloadStats"], this.storeStatsInfo);
          }, 1000);
        });
      }
    }
  };

  reloadsStats.collect();
})();
