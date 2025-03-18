import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import LineChartVisitsPublicaction from "./StatisticalGraphs/LineChartVisitsPublicaction";
import Moment from "moment";
//import "./styles.css";
import ReactEcharts from "echarts-for-react";

let datmeses = [];

// Change your description content here
const ModuleSoldUnits = (props) => {
    const { visitasPrd, dataX, dataY } = props;
    let daty = [28, 24, 11, 31, 37, 51]

    const option = {
        textStyle: {
          color: "#2D2E83"
        },
        title: {
            text: "Unidades vendidas ",
            textStyle: {
              color: "#2D2E83",   
              fontWeight: 100,
              left: 100
            },
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            left: "88%",
            data: ["Unidades"],
            textStyle: {
                color: "#2D2E83",   
                fontWeight: 100,
                left: 0
              },
        },
        grid: {
            left: "0.5%",
            right: "5%",
            bottom: "25%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: 0,
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: dataX,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Unidades",
                type: "line",
                stack: "Total",
                data: daty,
            },
        ],
    };

    return (
        <div className="ml-10 ps-product__description ps-document cajagraficasposts">
            <ReactEcharts option={option} />
        </div>
    );
};

export default ModuleSoldUnits;
