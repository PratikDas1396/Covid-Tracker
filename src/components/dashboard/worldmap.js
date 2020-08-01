import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import axios from 'axios'
import proj4 from 'proj4'
import Country_Map from "@highcharts/map-collection/custom/world-eckert3-highres.geo.json";
highchartsMap(Highcharts);

export class WorldMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overall_data: [],
            showMap: false
        }
    }

    componentDidMount() {
        axios.get('https://disease.sh/v2/countries', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(resp => {
            this.setState((state, prop) => ({
                overall_data: this.getObject(resp.data),
                showMap: true
            }))
        }).catch()
    }

    getObject(response) {
        return response.map((x, i, a) => ({
            'name': x['country'],
            'z': x['cases'],
            'lat': x['countryInfo']['lat'],
            'lon': x['countryInfo']['long'],
            'iso2': x['countryInfo']['iso2'],
            'iso3': x['countryInfo']['iso3'],
            'cases': x['cases'],
            'recovered': x['recovered'],
            'deaths': x['deaths'],

        }))
    }

    getHighChart() {
        let maps = this.getMapObject(this.state.overall_data)
        return <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={maps} />
    }

    getMapObject(param_data) {
        let jsonData = Country_Map;
        jsonData['hc-transform'] = {
            'default': { "crs": '+proj=lcc +lat_1=39.71666666666667 +lat_2=40.78333333333333 +lat_0=39.33333333333334 +lon_0=-105.5 +x_0=914401.8289 +y_0=304800.6096 +ellps=GRS80 +units=m +no_defs' }
        }
        let mapOptions = {
            chart: {
                style: { width: '100%', height: '500px' },
                backgroundColor: "#030f1e",
                map: 'custom/world-eckert3-highres',
                proj4: proj4
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="font-size: 16px; font-weight:bold">{point.name}</span><br/>cases: {point.cases} <br> recovered: {point.recovered} <br> deaths: {point.deaths} ',
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom',
                }
            },
            credits: {
                enabled: false
            },
            title: {
                style: { display: 'none' }
            },
            series: [
                {
                    type: 'mapbubble',
                    borderColor: '#4a7ac3',
                    nullColor: '#142e50',
                    color: 'rgb(247, 247, 247)',
                    enableMouseTracking: true,
                    data: param_data,
                    mapData: jsonData,
                    name: 'Corona affected countries',
                    joinBy: ['iso-a3', 'iso3'],
                    cursor: 'pointer',
                    showInLegend: true,
                    minSize: 4,
                    maxSize: '12%',
                    visible: true,
                    marker: {
                        fillColor: 'rgb(255, 0, 0)',
                        fillOpacity: 0.5,
                        lineColor: null,
                        lineWidth: 1,
                        symbol: "circle"
                    }

                }
            ]
        }
        return mapOptions;
    }

    render() {
        if (this.state.showMap) {
            return this.getHighChart()
        } else {
            return (<div>

            </div>)
        }

    }
}