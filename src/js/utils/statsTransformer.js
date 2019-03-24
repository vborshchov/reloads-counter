const statsTransformer = {
  hostAvarageLoadTime: function(data) {
    const count = data.length;
    const loadTime = data.reduce(
      (sum, timing) => sum + timing.loadEventEnd - timing.navigationStart,
      0
    );
    return loadTime / count;
  },
  hostAvarageResponseTime: function (data) {
    const count = data.length;
    const loadTime = data.reduce(
      (sum, timing) => sum + timing.loadEventEnd - timing.navigationStart,
      0
    );
    return loadTime / count;
  },
  getStats: function(data) {
    return Object.keys(data).map(key => {
      return {
        host: key,
        avgLoadTime: this.hostAvarageLoadTime(data[key]),
        reloadsCount: data[key].length
      };
    });
  }
};

export default statsTransformer;
