import React from "react";
import { useChromeStorage } from "../../hooks/chromeStorage";
import statsTransformer from "../../utils/statsTransformer";
import "Styles/tableStats.scss";
import MaterialTable from "material-table";

const roundWithPrecision = (num, precision) =>
  +(Math.round(num + `e+${precision}`) + `e-${precision}`);

const TableStats = () => {
  const [isLoading, statsData] = useChromeStorage("reloadStats", []);

  const tableStatsData = statsData
    ? statsTransformer
        .getStats(statsData)
        .map(el => {
          el.avgLoadTime = roundWithPrecision(el.avgLoadTime, 1);
          return el;
        })
    :
      [];

  let content = <p>Loading statistics data...</p>;

  if (!isLoading && tableStatsData && tableStatsData.length > 0) {
    content = (
      <div className="table-stats">
        <MaterialTable
          columns={[
            { title: 'Host', field: 'host' },
            { title: 'Avarage loading time', field: 'avgLoadTime' },
            { title: 'Realods', field: 'reloadsCount' },
          ]}
          data={tableStatsData}
          title="Realods stats"
        />
      </div>
    );
  } else if (!isLoading && (!tableStatsData || tableStatsData.length === 0)) {
    content = <p>Could not get any data.</p>;
  }
  return content;
};

export default TableStats;
