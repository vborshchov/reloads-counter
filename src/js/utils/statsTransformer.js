const statsTransformer = {
  hostAvarageLoadTime: function(data) {
    const count = data.length;
    const loadTime = data.reduce(
      (sum, timing) => sum + timing.loadEventEnd - timing.navigationStart,
      0
    );
    return loadTime / count;
  },
  avarageLoadTimePerHost: function(data) {
    return Object.keys(data).map(key => {
      return {
        host: key,
        value: this.hostAvarageLoadTime(data[key])
      };
    });
  }
};

export default statsTransformer;
