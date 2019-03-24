import React from "react";
import { useChromeStorage } from "../../hooks/chromeStorage";
import statsTransformer from "../../utils/statsTransformer";
import "Styles/tableStats.scss";
import Tooltip from "../../sharedComponents/Tooltip";

const roundToTwo = (num) => +(Math.round(num + "e+2") + "e-2");

const TableStats = () => {
  const [isLoading, statsData] = useChromeStorage("reloadStats", []);

  const tableStatsData = statsData
    ? statsTransformer
      .avarageLoadTimePerHost(statsData)
      .sort((a, b) => b.series[1] - a.series[1])
    : [];

  let content = <p>Loading statistics data...</p>;

  if (!isLoading && tableStatsData && tableStatsData.length > 0) {
    content = (
      <div className="table-stats">
        <div className="table-stats__header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th className="table-stats__header-cell">Host</th>
                <th className="table-stats__header-cell">
                  Avg load time (ms)
                  <Tooltip
                    position="right"
                    message="Time from navigationStart to loadEventEnd"
                  >
                    ?
                  </Tooltip>
                </th>
                <th className="table-stats__header-cell">Reloads</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-stats__content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {tableStatsData.map(obj => {
                return (
                  <tr key={obj.host}>
                    <td className="table-stats__cell">{obj.host}</td>
                    {obj.series.map(value => {
                      return (
                        <td
                          key={obj.host + value}
                          className="table-stats__cell"
                        >
                          {roundToTwo(value)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (!isLoading && (!tableStatsData || tableStatsData.length === 0)) {
    content = <p>Could not get any data.</p>;
  }
  return content;
};

export default TableStats;
