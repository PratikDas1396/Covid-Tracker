import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import axios from 'axios'
import proj4 from 'proj4'
import Country_Map from "@highcharts/map-collection/custom/world.geo.json";

Highcharts.setOptions({
    lang: {
        loading: "Loading...",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        resetZoom:"Reset zoom"
    }
})

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
            'deaths': x['deaths']
        }))
    }

    getHighChart() {
        let maps = this.getMapObject(this.state.overall_data)
        return <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={maps} />
    }

    getMapObject(param_data) {
        let mapOptions = {
            chart: {
                style: { width: '100%', height: '500px' },
                backgroundColor: "#030f1e",
                proj4: proj4,
                map: 'custom/world'
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
                    type: 'map',
                    enableMouseTracking: false,
                    mapData: Country_Map,
                    showInLegend: false,
                    data: param_data,
                    color:"rgb(0, 255, 0)",
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        style: {
                            fontSize : '8px',
                            zIndex:'-1'
                        },
                        formatter: function () {
                            if (this.point.properties) {
                                return this.point.properties['name'];
                            }
                        }
                    },
                },
                {
                    type: 'mapbubble',
                    border: '2px solid rgba(26,115,232,0.878)',
                    nullColor: '#142e50',
                    enableMouseTracking: true,
                    mapData: Country_Map,
                    data: param_data,
                    name: 'Corona affected countries',
                    joinBy: ['iso-a3', 'iso3'],
                    cursor: 'pointer',
                    showInLegend: false,
                    maxSize: '20%',
                    visible: true,
                    marker: {
                        fillColor: 'rgba(26,115,232,0.659)',
                        fillOpacity: 0.5,
                        lineColor: null,
                        lineWidth: 1,
                        symbol: "circle"
                    },
                }
            ]
        }
        return mapOptions;
    }

    render() {
          return this.getHighChart()
        // if (this.state.showMap) {
          
        // } else {
        //     return (<div>

        //     </div>)
        // }

    }
}