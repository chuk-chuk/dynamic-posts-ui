import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getChartOptions } from "./Graph.config";

function Graph({
  graphData,
  total,
}: {
  graphData: [string, number][];
  total: number;
}) {
  const chartOptions = getChartOptions(graphData, total);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default Graph;
