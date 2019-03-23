import React, { useState, useEffect } from "react";
import chromeManager from "../../utils/chromeManager";
import statsTransformer from "../../utils/statsTransformer";

const TableStats = () => {
  const [statsData, setStatsData] = useState({ reloadStats: [] });

  useEffect(() => {
    chromeManager.get("reloadStats").then(result => {
      setStatsData(result);
    });
  }, []);

  return (
    <div className="table-stats">
      <table>
        <thead>
          <tr>
            <td>Host</td>
            <td>Avarage load time</td>
          </tr>
        </thead>
        <tbody>
          {statsData &&
            statsTransformer
              .avarageLoadTimePerHost(statsData)
              .sort((a, b) => b.value - a.value)
              .map(obj => {
                return (
                  <tr key={obj.host}>
                    <td>{obj.host}</td>
                    <td>{obj.value.toFixed(2)} ms</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
};

export default TableStats;
