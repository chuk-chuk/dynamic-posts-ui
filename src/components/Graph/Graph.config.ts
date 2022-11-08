export const getChartOptions = (series: [string, number][], total: number) => {
  return {
    chart: {
      marginRight: 50,
      height: 250,
    },
    credits: { enabled: false },
    title: {
      text: "Top Five Frequent Words",
      style: { color: "black", fontSize: "24px" },
      align: "left",
    },
    subtitle: {
      useHTML: true,
      text: "Total Word Count: 2385",
      floating: true,
      align: "right",
      verticalAlign: "middle",
      style: { color: "black", fontSize: "18px" },
      y: 115,
      x: -120,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      labels: {
        style: { color: "black", fontWeight: "bold", fontSize: "18px" },
      },
    },
    yAxis: {
      opposite: true,
      tickPixelInterval: 150,
      labels: {
        style: { color: "gray", fontWeight: "bold", fontSize: "12px" },
      },
      title: {
        text: null,
      },
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "bar",
        data: series,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 550,
          },
          chartOptions: {
            xAxis: {
              visible: false,
            },
            subtitle: {
              x: 0,
            },
            plotOptions: {
              series: {
                dataLabels: [
                  {
                    enabled: true,
                    y: 8,
                  },
                  {
                    enabled: true,
                    format: "{point.name}",
                    y: -8,
                    style: {
                      fontWeight: "normal",
                      opacity: 0.7,
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  };
};
