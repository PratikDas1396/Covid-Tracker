import React, { Component } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from 'axios'
import numeral from '../../../node_modules/numeral/min/numeral.min' 
import '../../assets/css/custom.css'

export class Sidecharts extends Component {
    constructor(props) {
        super(props);

        Highcharts.setOptions({
            lang:{
                loading: 'Loading....',
                thousandsSep: ','
            }
        })
        
        this.state =
        {
            pie_loaded: false,
            bar_loaded: false,
            pie_config_obj: {
                chart: {
                    type: 'pie',
                    marginTop: 75
                },
                title: {
                    verticalAlign: 'end',
                    floating: true,
                    text: 'Cases Comparison',
                    style: {
                        fontSize: '26px',
                        lineHeight: 0.8,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    }
                },
                tooltip: {
                    pointFormat: '<b> {point.values} cases </b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        dataLabels: {
                            format: '{point.name}: {point.y:.2f} %',
                            enabled: true,
                            clip: true,
                            connectorWidth: 1,
                            distance: 50,
                            alignTo: 'plotEdges',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                    }
                },
                series: [{
                    data: []
                }]
            },
            bar_config_obj: {
                chart: {
                    type: 'column',
                    marginTop: 75
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '(In millions)'
                    },
                },
                legend: {
                    enabled: false
                },
                title: {
                    verticalAlign: 'end',
                    floating: true,
                    text: '15 Day Comparison',
                    style: {
                        fontSize: '26px',
                        lineHeight: 0.8,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    }
                },
                tooltip: {
                    pointFormat: '<b>{point.y} Cases</b>'
                },
                series: [{
                    name: 'Last 30 Days',
                    data: []
                }]
            }
        };
    }

    componentDidMount() {
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=15', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(resp => {
            let bar_config_obj = this.state.bar_config_obj;
            bar_config_obj['series'] = []
            bar_config_obj['series'].push({ 'data': this.get_bar_object(resp.data) })
            this.setState((state, prop) => ({
                bar_loaded: true,
                bar_config_obj: bar_config_obj
            }))
        }).catch()

        axios.get('https://disease.sh/v2/all', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(resp => {
            let pie_config_obj = this.state.pie_config_obj;
            pie_config_obj['series'] = []
            pie_config_obj['series'].push({ 'data': this.get_pie_object(resp.data) })
            this.setState((state, prop) => ({
                pie_loaded: true,
                pie_config_obj: pie_config_obj
            }))
        }).catch()
    }

    get_bar_object(data) {
        let formatted_array = []
        let cases = data['cases'];
        let recovered = data['recovered'];
        let deaths = data['deaths'];
        formatted_array = Object.keys(cases).map((x, i) => {
            let data_new = {
                "recovered": recovered[x],
                "deaths": deaths[x]
            }
            return [x, cases[x], data_new]
        })
        return formatted_array;
    }

    get_pie_object(data) {
        let formatted_data = []
        formatted_data.push({
            name: 'Active',
            y: parseInt((data['active'] * 100 / data['cases']).toFixed(2)),
            color: '#3498db',
            values: numeral(data['active']).format('0,0')
        })
        formatted_data.push({
            name: 'Recovered',
            y: parseInt((data['recovered'] * 100 / data['cases']).toFixed(2)),
            color: '#9b59b6',
            values: numeral(data['recovered']).format('0,0'),
            // sliced: true,
            selected: true
        })
        formatted_data.push({
            name: 'Deaths',
            y: parseInt((data['deaths'] * 100 / data['cases']).toFixed(2)),
            color: '#f1c40f',
            values: numeral(data['deaths']).format('0,0'),
        })
        return formatted_data;
    }

    render() {
        if (this.state.pie_loaded && this.state.bar_loaded) {
            return (
                <div id="sidechart">
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-12">
                                <HighchartsReact options={this.state.pie_config_obj} highcharts={Highcharts}></HighchartsReact >
                            </div>
                        </div>
                    </div>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-12">
                                <HighchartsReact options={this.state.bar_config_obj} highcharts={Highcharts}></HighchartsReact >
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                </div>
            );
        }

    }
}