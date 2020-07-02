import React, { Component } from 'react';
import axios from 'axios'
import '../../assets/css/custom.css'
import numeral from '../../../node_modules/numeral/min/numeral.min' 

export class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary_data: null,
            updated_date: new Date()
        }
    }

    componentDidMount() {
        axios.get('https://disease.sh/v3/covid-19/all', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(resp => {
            this.setState((state, prop) => ({
                summary_data: resp.data,
                updated_date: new Date(resp.data['updated'])
            }))
        }).catch()
    }

    render() {
        if (this.state.summary_data) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="mb-3 update-time">
                            <span className="stats-taken mr-2">Last Update: </span>
                            <strong id="stat-taken" className="text-primary">
                                {
                                    this.state.updated_date.toLocaleDateString() + ' ' + this.state.updated_date.toLocaleTimeString()
                                }
                            </strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="summary-container">
                            <div className="heading-container">
                                <span>World Wide</span>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3 ">
                                    <div className="data-header">
                                        confirmed
                                    </div>
                                    <div className="data-value">
                                        {
                                            numeral(this.state.summary_data["cases"]).format('0,0')
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-3 border-left">
                                    <div className="data-header">
                                        active
                                </div>
                                    <div className="data-value">
                                        {
                                            numeral(this.state.summary_data["active"]).format('0,0')
                                            // this.state.summary_data["active"]
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-3 border-left">
                                    <div className="data-header">
                                        recoverd
                                </div>
                                    <div className="data-value">
                                        {
                                            numeral(this.state.summary_data["recovered"]).format('0,0')
                                            // this.state.summary_data["recovered"]
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-3 border-left" >
                                    <div className="data-header">
                                        deaths
                                </div>
                                    <div className="data-value">
                                        {
                                            numeral(this.state.summary_data["deaths"]).format('0,0')
                                            // this.state.summary_data["deaths"]
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
}