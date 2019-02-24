function calcStatsPerDay(reloadStats) {
    let result = {}
    let days = new Set()
    for (let key in reloadStats) {
        if (reloadStats.hasOwnProperty(key)) {
            for (let date of reloadStats[key]) {
                const day = Math.floor(new Date(date).getTime()/(1000*60*60*24));
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
        Object.keys(statsPerDay[host]).forEach((day) => {
            xAxisData.add(echarts.format.formatTime('MM/dd/yyyy', +day))
        })
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

    const option = {
        title: {
            text: 'Reload Counts per page'
        },
        grid: {
            right: 200
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 0,
            data: dataLegend,
            itemGap: 1,
            itemHeight: 10,
            itemWidth: 10,
            bottom: 50
        },
        // toolbox: {
        //     y: 'bottom',
        //     right: 60,
        //     feature: {
        //         magicType: {
        //             type: ['stack', 'tiled']
        //         },
        //         dataView: {},
        //         saveAsImage: {
        //             pixelRatio: 2
        //         }
        //     }
        // },
        toolbox: {
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
        },
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

    // use configuration item and data specified to show chart
    myChart.setOption(option);
})