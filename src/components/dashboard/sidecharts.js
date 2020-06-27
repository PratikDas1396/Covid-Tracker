import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import '../../assets/css/custom.css'

export class Sidecharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: {},
            data_loaded: false,
            config: Highcharts.chart({
                chart: {
                    type: 'pie',
                    renderTo: 'pie_chart'
                },
                title: {
                    verticalAlign: 'end',
                    floating: true,
                    text: '',
                    style: {
                        fontSize: '10px',
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            format: '{point.name}: {point.percentage:.1f} %'
                        },
                        innerSize: '100%'
                    }
                },
                series: [
                    { color: "#3498db", name: "Active", y: 40.8622128084 }
                    , { color: "#9b59b6", name: "Recovered", y: 54.1461024 }
                    , { color: "#f1c40f", name: "Deaths", y: 4.9916846285 }
                ]
            })
        }
    }

    componentDidMount() {
        this._isMounted = true;
        // axios.get('https://disease.sh/v2/all', {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }).then(resp => {
        //     let config_new = this.state.config;
        //     let Dataobj = this.formatData(resp.data)
        //     config_new['series'] = Dataobj;
        //     this.setState((state, prop) => ({
        //         series: Dataobj,
        //         data_loaded: true,
        //         config: config_new
        //     }))
        // }).catch()
    }

    formatData(data) {
        let formatted_data = []
        formatted_data.push({
            name: 'Active',
            y: (data['active'] * 100 / data['cases']),
            color: '#3498db'
        })
        formatted_data.push({
            name: 'Recovered',
            y: (data['recovered'] * 100 / data['cases']),
            color: '#9b59b6'
        })
        formatted_data.push({
            name: 'Deaths',
            y: (data['deaths'] * 100 / data['cases']),
            color: '#f1c40f'
        })
        return formatted_data;
    }

    render() {
        return (<div>
            <div id="pie_chart"></div>
            <div>
                <HighchartsReact allowChartUpdate={true} options={this.state.config} highcharts={Highcharts} />
            </div>
        </div>);
    }
}

export default Sidecharts
