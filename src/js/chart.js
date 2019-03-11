(function(el){
   const reloadsChart = {
        chart: echarts.init(el),
        options: {
            bar: {},
            pie: {}
        },
        init: function() {
            chrome.storage.local.get(['reloadStats'], function(result) {
                this.chart.setOption(this.options.bar)
            })
        },
        calcStatsPerDay: function(reloadStats) {
            let result = {}
            let days = new Set()
            for (let key in reloadStats) {
                if (reloadStats.hasOwnProperty(key)) {
                    for (let timing of reloadStats[key]) {
                        const day = Math.floor(new Date(timing.navigationStart).getTime()/(1000*60*60*24));
                        const beginingOfDay = day*1000*60*60*24
                        days.add(beginingOfDay)
                        const defaultObj = {}
                        defaultObj[beginingOfDay] = 0
                        result[key] = result[key] || defaultObj
                        result[key][beginingOfDay] = ++result[key][beginingOfDay] || 1
                    }
                }
            }
            let usedDays = Array.from(days).sort()
            usedDays.forEach(day => {
                for (let key in reloadStats) {
                    if (reloadStats.hasOwnProperty(key)) {
                        if (result[key]) {
                            result[key][day] = result[key][day] || 0
                        }
                    }
                } 
            })
            return result;
        },
        prepareValues: function(data) {
            let values = {
                legendData: [],
                seriesData: [],
                selected: {}
            };
            let totalReloads = 0
            for (let key in data) {
                totalReloads += data[key].length
            }
            for (let key in data) {
                values.legendData.push(key)
                values.seriesData.push({name: key, value: data[key].length})
                values.selected[key] = ((data[key].length / totalReloads) * 100) > 1
            }
        
        
            return values;
        }
   }

//    reloadStats.init()
})(document.getElementById('chart'))

function calcStatsPerDay(reloadStats) {
    let result = {}
    let days = new Set()
    for (let key in reloadStats) {
        if (reloadStats.hasOwnProperty(key)) {
            for (let timing of reloadStats[key]) {
                const day = Math.floor(
                    new Date(timing.navigationStart).getTime() /
                        (1000 * 60 * 60 * 24)
                );
                const beginingOfDay = day*1000*60*60*24
                days.add(beginingOfDay)
                const defaultObj = {}
                defaultObj[beginingOfDay] = 0
                result[key] = result[key] || defaultObj
                result[key][beginingOfDay] = ++result[key][beginingOfDay] || 1
            }
        }
    }
    let usedDays = Array.from(days).sort()
    usedDays.forEach(day => {
        // for (let key in reloadStats) {
        Object.keys(reloadStats).forEach( key => {
            if (reloadStats.hasOwnProperty(key)) {
                if (result[key]) {
                    result[key][day] = result[key][day] || 0
                }
            }
        })
    })
    return result;
}

function prepareValues(data) {
    let values = {
        legendData: [],
        seriesData: [],
        selected: {}
    };
    let totalReloads = 0
    for (let key in data) {
        totalReloads += data[key].length
    }
    for (let key in data) {
        values.legendData.push(key)
        values.seriesData.push({name: key, value: data[key].length})
        values.selected[key] = ((data[key].length / totalReloads) * 100) > 1
    }


    return values;
}
// function groupweek(date, index, array) {
//     d = new Date(date);
//     d = Math.floor(d.getTime()/(1000*60*60*24*7));
//     byWeek[d]=byWeek[d]||[];
//     byWeek[d].push(date);
// }

// function groupmonth(date, index, array) {
//     d = new Date(date);
//     d = (d.getFullYear()-1970)*12 + d.getMonth();
//     bymonth[d]=bymonth[d]||[];
//     bymonth[d].push(date);
// }

  
chrome.storage.local.get(['reloadStats'], function(result) {
    // Chart

    const myChart = echarts.init(document.getElementById('chart'));

    const statsPerDay = calcStatsPerDay(result.reloadStats)
    const dataLegend = Object.keys(statsPerDay).sort()
    const xAxisData = new Set()

    const series = dataLegend.map((host) => {
        Object.keys(statsPerDay[host])
            .sort()
            .forEach(day => {
                xAxisData.add(
                    echarts.format.formatTime(
                        "MM/dd/yyyy",
                        new Date(+day)
                    )
                );
            });
        let keys = Object.keys(statsPerDay[host]).sort()
        let data = keys.map(k => statsPerDay[host][k])
        return {
            name: host,
            type: 'bar',
            data,
        };
    })

    const xAxis = [
        {
            type: 'category',
            axisTick: {show: false},
            data: [...xAxisData]
        }
    ]

    const legend = {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        data: dataLegend,
        itemGap: 1,
        itemHeight: 10,
        itemWidth: 10,
        bottom: 70
    }

    const toolbox = {
        right: 5,
        bottom: 20,
        show : true,
        feature : {
            mark : {
                show: true
            },
            dataView : {
                show: true,
                readOnly: false,
                title: 'data view',
                lang: ['data view', 'cancel', 'save']
            },
            magicType : {
                show: false,
                type: ['pie', 'bar', 'stack', 'tiled']
            },
            restore : {
                show: true,
                title: 'restore'
            },
            saveAsImage : {
                show: true,
                title: 'save'
            },
            dataZoom: {
                show: false,
                yAxisIndex: false,
                title: {
                    back: 'back',
                    zoom: 'zoom'
                }
            },
            saveAsImage: {
                title: 'export',
                pixelRatio: 2
            }
        }
    }

    const optionsBar = {
        title: {
            text: 'Reload Counts per page'
        },
        grid: {
            right: 200
        },
        legend,
        toolbox,
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                filterMode: 'filter',
                throttle: 60,
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter',
                throttle: 60,
            },
        ],
        tooltip: {},
        xAxis,
        yAxis: {},
        series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

    const barData = prepareValues(result.reloadStats)

    const optionsPie = {
        title : {
            text: 'Reload Counts per page',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {...legend, selected: barData.selected},
        series : [
            {
                name: 'Reloads',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: barData.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        toolbox,
    };
    const options = {
        bar: optionsBar,
        pie: optionsPie
    };

    let currentOption = 'bar'
    // use configuration item and data specified to show chart
    myChart.setOption(options[currentOption]);
    function toggleChart() {
        if (currentOption == 'bar') {
            currentOption = 'pie'
        } else if (currentOption == 'pie') {
            currentOption = 'bar'
        }
        myChart.clear();
        myChart.setOption(options[currentOption]);
    }
    document.getElementById('toggle-chart').addEventListener('click', toggleChart)
})