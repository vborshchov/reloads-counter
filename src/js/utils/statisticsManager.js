import filterManager from "./filterManager";

const statisticsManager = {
  hostAvarageLoadTime: function(data) {
    const count = data.length;
    const loadTime = data.reduce(
      (sum, timing) => sum + timing.loadEventEnd - timing.navigationStart,
      0
    );
    return loadTime / count || 0;
  },
  hostAvarageResponseTime: function(data) {
    const count = data.length;
    const duration = data.reduce(
      (sum, timing) => sum + timing.responseEnd - timing.fetchStart,
      0
    );
    return duration / count || 0;
  },
  getStats: function(data, filters) {
    const {dateRange: {from, to}} = filters
    const result = []
    Object.keys(data).forEach(key => {
      // apply filters
      let hostReloads = data[key]
      if (from && to) {
        hostReloads = filterManager.filterByDateRange(hostReloads, {from, to})
      }
      if (hostReloads.length) {
        result.push({
          host: key,
          avgLoadTime: this.hostAvarageLoadTime(hostReloads),
          avgResponseTime: this.hostAvarageResponseTime(hostReloads),
          reloadsCount: hostReloads.length
        });
      }
    });

    return result;
  }
};

export default statisticsManager;
