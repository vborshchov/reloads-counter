(function() {
  const reloadsStats = {
    storeStatsInfo: function(result) {
      console.log({ result })
      let key = window.location.host;
      // set default reloadStats object if needed
      result.reloadStats = result.reloadStats || {};
      // set default value for host's reloads if needed
      result.reloadStats[key] = result.reloadStats[key] || [];
      result.reloadStats[key].push(performance.timing.toJSON());
      chrome.storage.local.set(result);
    },
    storeToStatsDB: function (result) {
      console.log({result})
      // set default reloadStats array if needed
      result.reloadStatsDB = result.reloadStatsDB || [];
      const navigation = performance.getEntriesByType('navigation')[0].toJSON()
      navigation.host = window.location.host;
      navigation.createdAt = +new Date()
      result.reloadStatsDB.push(navigation);
      chrome.storage.local.set(result);
    },
    collect: function() {
      if (performance && performance.navigation.type === 1) {
        // Reload
        window.addEventListener("load", () => {
          setTimeout(() => {
            chrome.storage.local.get(["reloadStats"], this.storeStatsInfo);
            chrome.storage.local.get(["reloadStatsDB"], this.storeToStatsDB);
          }, 1000);
        });
      }
    }
  };

  reloadsStats.collect();
})();
