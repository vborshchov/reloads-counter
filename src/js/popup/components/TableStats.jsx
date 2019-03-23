import React, { useState, useEffect } from "react";
import chromeManager from "../../utils/chromeManager";
import statsTransformer from "../../utils/statsTransformer";
import "Styles/tableStats.scss";

const TableStats = () => {
  const [statsData, setStatsData] = useState({ reloadStats: [] });

  useEffect(() => {
    chromeManager.get("reloadStats").then(result => {
      setStatsData(result);
    });
  }, []);

  return (
    <div className="table-stats">
      <div class="table-stats__header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th className="table-stats__header-cell">Host</th>
              <th className="table-stats__header-cell">Avarage load time</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-stats__content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {statsData &&
              statsTransformer
                .avarageLoadTimePerHost(statsData)
                .sort((a, b) => b.value - a.value)
                .map(obj => {
                  return (
                    <tr key={obj.host}>
                      <td className="table-stats__cell">
                        {obj.host}
                      </td>
                      <td className="table-stats__cell">
                        {obj.value.toFixed(2)} ms
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableStats;
