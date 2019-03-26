import { useState, useEffect } from "react";
import chromeManager from "../utils/chromeManager";

export const useChromeStorage = (name, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("Getting data from Chrome storage by name: " + name);
    chromeManager.get(name)
      .then(data => {
        setTimeout(() => {
          setIsLoading(false);
          setFetchedData(data);
        }, 10)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  const setChromeStorage = (data) => {
    console.log("Setting new data to Chrome storage: ", data);
    chromeManager
      .set(data)
      .then(result => {
          setFetchedData(result.reloadStats);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return [isLoading, fetchedData, setChromeStorage];
};
