import React, { Fragment, useState } from "react";
import { useChromeStorage } from "../../hooks/chromeStorage";
import statisticsManager from "../../utils/statisticsManager";
import "Styles/tableStats.scss";
import MaterialTable from "material-table";
import { DateRangePicker } from "material-date-range-picker";
import { isAfter, isBefore, differenceInDays } from 'date-fns';

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
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const tableStatsData = statsData
    ? statisticsManager
        .getStats(statsData, {dateRange: {from: fromDate, to: toDate}})
        .map(el => {
          el.avgLoadTime = roundWithPrecision(el.avgLoadTime, 0);
          el.avgResponseTime = roundWithPrecision(el.avgResponseTime, 0);
          return el;
        })
    :
      [];

  const batchDeleteStats = rows => {
    const newStatsData = Object.assign({}, statsData);
    rows.forEach(row => {
      delete newStatsData[row.host]
    })
    setStatsData({reloadStats: newStatsData})
  };

  const _handleDateRangeChange = selectedDate => {
    if (typeof selectedDate === 'object' && selectedDate !== null && !(selectedDate instanceof Date)) {
      const startDate = selectedDate.fromDate;
      const endDate = selectedDate.toDate;
      if (startDate === null && endDate === null) {
        setFromDate(null);
        setToDate(null);
      }
    } else {
      // Warn and noop if the selected date is after the end date
      if (!fromDate && toDate && isAfter(selectedDate, toDate)) {
        console.error('Start date should not be after end date')
        return
      }

      // Reset the state if the selected date is equal
      // to the end date
      if (!fromDate && toDate && differenceInDays(selectedDate, toDate) === 0) {
        setToDate(null);
        return
      }

      // Set the starting date to the selected date
      // if the starting date is empty
      if (!fromDate) {
        setFromDate(selectedDate)
        return
      }

      // Set the ending date to the selected date if the start date
      // is given and the selected date is after the start date
      if (fromDate && isAfter(selectedDate, fromDate)) {
        setToDate(selectedDate)
        return
      }

      // Set the starting date to the selected date if the
      // starting date is given and the selected date is
      // before the selected date
      if (fromDate && isBefore(selectedDate, fromDate)) {
        setFromDate(selectedDate)
        return
      }

      // Empty the starting date if the selected date and starting
      // date are equal
      if (fromDate && differenceInDays(fromDate, selectedDate) === 0) {
        setFromDate(null)
      }
    }
  };

  const actions = [
    {
      icon: 'delete',
      tooltip: 'Delete all',
      onClick: (event, rows) => {
        batchDeleteStats(rows);
      },
    },
  ]

  let content = <p>Loading statistics data...</p>;

  if (!isLoading && tableStatsData && tableStatsData.length > 0) {
    content = (
      <Fragment>
        <div className="date-range-picker-wrapper">
          <DateRangePicker
            className="date-range-picker"
            fromDate={fromDate} //from date
            toDate={toDate} //to Date
            onChange={_handleDateRangeChange}
            closeDialogOnSelection={false} //close date dialog after selecting both from and to date
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
  } else if (!isLoading && (!tableStatsData || tableStatsData.length === 0)) {
    content = <p>Could not get any data.</p>;
  }
  return content;
};

export default TableStats;
