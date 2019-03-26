const statsTransformer = {
  hostAvarageLoadTime: function(data) {
    const count = data.length;
    const loadTime = data.reduce(
      (sum, timing) => sum + timing.loadEventEnd - timing.navigationStart,
      0
    );
    return loadTime / count;
  },
  hostAvarageResponseTime: function(data) {
    const count = data.length;
    const duration = data.reduce(
      (sum, timing) => sum + timing.responseEnd - timing.fetchStart,
      0
    );
    return duration / count;
  },
  getStats: function(data) {
    return Object.keys(data).map(key => {
      return {
        host: key,
        avgLoadTime: this.hostAvarageLoadTime(data[key]),
        avgResponseTime: this.hostAvarageResponseTime(data[key]),
        reloadsCount: data[key].length
      };
    });
  }
};

export default statsTransformer;
