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
const ModulePublicationVisits = (props) => {
    const { visitasPrd, dataX, dataY } = props;
    console.log(dataX, dataY);
    let daty = [297800, 395600, 319200, 443400, 293400, 616000]

    const option = {
        title: {
            text: "Ventas brutas ",
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
            left: "90%",
            data: ["Ventas"],
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
                name: "Ventas",
                type: "line",
                stack: "Total",
                data: daty,
            },
        ],
    };

    return (
        <div className="ml-10 ps-product__description ps-document cajagraficasposts">
            <ReactEcharts option={option}/>
        </div>
    );
};

export default ModulePublicationVisits;
