import React from "react";
import { useChromeStorage } from "../../hooks/chromeStorage";
import statsTransformer from "../../utils/statsTransformer";
import "Styles/tableStats.scss";
import MaterialTable, { MTableHeader } from "material-table";

const roundWithPrecision = (num, precision) =>
  +(Math.round(num + `e+${precision}`) + `e-${precision}`);


const columns = [
  {
    title: "Host",
    field: "host",
    export: true,
    render: rowData => {
      const host = rowData.host;
      return (
        <div className="host-cell">
          <span className="host-cell__name">{host}</span>
          <a
            className="host-cell__link"
            href={
              host.indexOf("localhost") > -1
                ? `http://${host}`
                : `https://${host}`
            }
            target="_blank"
          >
            <i className="material-icons">link</i>
          </a>
        </div>
      );
    }
  },
  {
    title: "Duration (ms)",
    field: "avgLoadTime",
    type: "numeric",
    export: true
  },
  {
    title: "Response (ms)",
    field: "avgResponseTime",
    type: "numeric",
    export: true,
    hidden: true
  },
  {
    title: "Realods",
    field: "reloadsCount",
    type: "numeric",
    defaultSort: "desc",
    export: true
  }
];

const options = {
  columnsButton: true,
  exportButton: true,
  selection: true,
  headerStyle: {
    background: "#e8eaf5"
  }
};

const TableStats = () => {
  const [isLoading, statsData] = useChromeStorage("reloadStats", []);

  const tableStatsData = statsData
    ? statsTransformer
        .getStats(statsData)
        .map(el => {
          el.avgLoadTime = roundWithPrecision(el.avgLoadTime, 0);
          el.avgResponseTime = roundWithPrecision(el.avgResponseTime, 0);
          return el;
        })
    :
      [];

  const actions = [
    {
      icon: 'delete',
      tooltip: 'Delete all',
      onClick: (event, rows) => {
        alert('You selected ' + rows.length + ' rows')
      },
    },
  ]

  let content = <p>Loading statistics data...</p>;

  if (!isLoading && tableStatsData && tableStatsData.length > 0) {
    content = (
      <div className="table-stats">
        <MaterialTable
          columns={columns}
          data={tableStatsData}
          title="Realods stats"
          options={options}
          actions={actions}
        />
      </div>
    );
  } else if (!isLoading && (!tableStatsData || tableStatsData.length === 0)) {
    content = <p>Could not get any data.</p>;
  }
  return content;
};

export default TableStats;
