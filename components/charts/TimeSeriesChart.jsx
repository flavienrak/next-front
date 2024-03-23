"use client";
import ReactApexChart from "react-apexcharts";

export default function TimeSeriesChart() {
  const state = {
    series: [
      {
        name: "PRODUCT A",
        data: [
          {
            x: 1996,
            y: 162,
          },
          {
            x: 1997,
            y: 90,
          },
          {
            x: 1998,
            y: 50,
          },
          {
            x: 1999,
            y: 77,
          },
          {
            x: 2000,
            y: 35,
          },
          {
            x: 2001,
            y: -45,
          },
          {
            x: 2002,
            y: -88,
          },
          {
            x: 2003,
            y: -120,
          },
          {
            x: 2004,
            y: -156,
          },
          {
            x: 2005,
            y: -123,
          },
          {
            x: 2006,
            y: -88,
          },
          {
            x: 2007,
            y: -66,
          },
          {
            x: 2008,
            y: -45,
          },
          {
            x: 2009,
            y: -29,
          },
          {
            x: 2010,
            y: -45,
          },
          {
            x: 2011,
            y: -88,
          },
          {
            x: 2012,
            y: -132,
          },
          {
            x: 2013,
            y: -146,
          },
          {
            x: 2014,
            y: -169,
          },
          {
            x: 2015,
            y: -184,
          },
        ],
      },
      {
        name: "PRODUCT B",
        data: [
          {
            x: 1996,
            y: 162,
          },
          {
            x: 1997,
            y: 90,
          },
          {
            x: 1998,
            y: 50,
          },
          {
            x: 1999,
            y: 77,
          },
          {
            x: 2000,
            y: 35,
          },
          {
            x: 2001,
            y: -45,
          },
          {
            x: 2002,
            y: -88,
          },
          {
            x: 2003,
            y: -120,
          },
          {
            x: 2004,
            y: -156,
          },
          {
            x: 2005,
            y: -123,
          },
          {
            x: 2006,
            y: -88,
          },
          {
            x: 2007,
            y: -66,
          },
          {
            x: 2008,
            y: -45,
          },
          {
            x: 2009,
            y: -29,
          },
          {
            x: 2010,
            y: -45,
          },
          {
            x: 2011,
            y: -88,
          },
          {
            x: 2012,
            y: -132,
          },
          {
            x: 2013,
            y: -146,
          },
          {
            x: 2014,
            y: -169,
          },
          {
            x: 2015,
            y: -184,
          },
        ],
      },
      {
        name: "PRODUCT C",
        data: [
          {
            x: 1996,
            y: 162,
          },
          {
            x: 1997,
            y: 90,
          },
          {
            x: 1998,
            y: 50,
          },
          {
            x: 1999,
            y: 77,
          },
          {
            x: 2000,
            y: 35,
          },
          {
            x: 2001,
            y: -45,
          },
          {
            x: 2002,
            y: -88,
          },
          {
            x: 2003,
            y: -120,
          },
          {
            x: 2004,
            y: -156,
          },
          {
            x: 2005,
            y: -123,
          },
          {
            x: 2006,
            y: -88,
          },
          {
            x: 2007,
            y: -66,
          },
          {
            x: 2008,
            y: -45,
          },
          {
            x: 2009,
            y: -29,
          },
          {
            x: 2010,
            y: -45,
          },
          {
            x: 2011,
            y: -88,
          },
          {
            x: 2012,
            y: -132,
          },
          {
            x: 2013,
            y: -146,
          },
          {
            x: 2014,
            y: -169,
          },
          {
            x: 2015,
            y: -184,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return (val / 1000000).toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 8,
        min: new Date("01/01/2014").getTime(),
        max: new Date("01/20/2014").getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format("DD MMM YYYY");
          },
        },
      },
      title: {
        text: "Irregular Data in Time Series",
        align: "left",
        offsetX: 14,
      },
      tooltip: {
        shared: true,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
