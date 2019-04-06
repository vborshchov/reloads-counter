import React, { Fragment, useState, useEffect } from "react";
import { useChromeStorage } from "../../hooks/chromeStorage";
import statisticsManager from "../../utils/statisticsManager";
import "Styles/tableStats.scss";
import MaterialTable from "material-table";
import { DateRangePicker } from "material-date-range-picker";
import TextField from "@material-ui/core/TextField";

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
  const [isLoading, statsData, setStatsData] = useChromeStorage("reloadStats", []);
  const [dateRange, setDateRange] = useState({
    fromDate: null,
    toDate: null,
  });
  const [maxDuration, setMaxDuration] = useState(0);

  const tableStatsData = statsData
    ? statisticsManager
        .getStats(statsData, {
          dateRange: { from: dateRange.fromDate, to: dateRange.toDate },
          maxDuration
        })
        .map(el => {
          el.avgLoadTime = roundWithPrecision(el.avgLoadTime, 0);
          el.avgResponseTime = roundWithPrecision(el.avgResponseTime, 0);
          return el;
        })
    : [];

  const batchDeleteStats = rows => {
    const newStatsData = {...statsData};
    rows.forEach(row => {
      delete newStatsData[row.host]
    })
    setStatsData({reloadStats: newStatsData})
  };

  const _handleDateRangeChange = selectedDate => {
    if (typeof selectedDate === 'object' && selectedDate !== null && !(selectedDate instanceof Date)) {
      setDateRange({...dateRange, ...selectedDate})
    }
  };

  const _handleMaxDurationChange = event => {
    console.log({maxDuration: event.target.value})
    setMaxDuration(event.target.value);
  }

  const actions = [
    {
      icon: 'delete',
      tooltip: 'Delete all',
      onClick: (event, rows) => {
        batchDeleteStats(rows);
      },
    },
  ]

  return (
    <Fragment>
      <div className="filters-wrapper">
        <TextField
          select
          label="Page load duration limit"
          value={maxDuration}
          onChange={_handleMaxDurationChange}
          className="filter max-page-load-limit"
          SelectProps={{
            native: true,
            MenuProps: {
              className: "menu"
            }
          }}
          margin="normal"
        >
          <option value="" />
          <option value="5000">5s</option>
          <option value="10000">10s</option>
          <option value="20000">20s</option>
          <option value="30000">30s</option>
          <option value="60000">60s</option>
        </TextField>
        <DateRangePicker
          className="filter date-range-picker"
          fromDate={dateRange.fromDate} //from date
          toDate={dateRange.toDate} //to date
          onChange={_handleDateRangeChange}
          closeDialogOnSelection // close date dialog after selecting both from and to date
        />
      </div>
      <div className="table-stats">
        <MaterialTable
          columns={columns}
          data={tableStatsData}
          title="Realods stats"
          options={options}
          actions={actions}
        />
      </div>
    </Fragment>
  );
};

export default TableStats;
