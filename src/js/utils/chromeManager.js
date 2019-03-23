const chromeManager = {
  get(sKey) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(sKey, (items) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(items[sKey]);
        }
      });
    });
  },

  set(obj) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(obj, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(obj);
        }
      });
    });
  },
};

export default chromeManager;