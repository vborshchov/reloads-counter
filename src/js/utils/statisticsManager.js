import filterManager from "./filterManager";

const START_PAGE_LOAD_TIME = 20000

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
    const { dateRange: {from, to}, maxDuration } = filters
    const result = []
    Object.keys(data).forEach(key => {
      // apply filters
      let hostReloads = data[key]
      if (from && to) {
        hostReloads = filterManager.filterByDateRange(hostReloads, {from, to})
      }
      if (maxDuration) {
        hostReloads = filterManager.filterBelowMaxPageLoadDuration(
          hostReloads,
          maxDuration
        );
      }

      if (hostReloads.length) {
        const avgLoadTime = this.hostAvarageLoadTime(hostReloads);
        const avgResponseTime = this.hostAvarageResponseTime(hostReloads);
        result.push({
          host: key,
          avgLoadTime: avgLoadTime,
          avgResponseTime: avgResponseTime,
          reloadsCount: hostReloads.length
        });
      }
    });

    return result;
  }
};

export default statisticsManager;
