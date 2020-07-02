import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/custom.css'
import numeral from '../../../node_modules/numeral/min/numeral.min'

export class MainPage extends Component {

    constructor(param) {
        super(param)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('https://disease.sh/v2/countries', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(resp => {
            this.setState((state, prop) => ({
                data: resp.data
            }))
        }).catch()
    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <div className="custom-card">
                    <div>
                        <span className="col-8">
                            <span className="heading-container">
                                Countries
                            </span>
                        </span>
                        <span className="col-4">
                            {/* <div className="float-right align-middle">
                                <label className="c-switch c-switch-pill c-switch-primary">
                                    <input type="checkbox" className="c-switch-input" />
                                    <span className="c-switch-slider"></span>
                                </label>
                            </div> */}
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <div className='table-wrapper'>
                            {this.renderTable()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }


    renderTable() {
        let trs = [];
        for (let index = 0; index < this.state.data.length; index++) {
            trs.push(
                <tr key={this.state.data[index]["country"]}>
                    <td>
                        <img  src={this.state.data[index]["countryInfo"]['flag']} alt="" className="hidden-xs flag-thumbnail" />
                        {this.state.data[index]["country"]}
                    </td>
                    <td>
                        {
                            numeral(this.state.data[index]["cases"]).format('0,0')
                        }
                    </td>
                    <td>
                        {
                            // this.state.data[index]["active"]
                            numeral(this.state.data[index]["active"]).format('0,0')
                        }
                    </td>
                    <td>
                        {
                            numeral(this.state.data[index]["recovered"]).format('0,0')
                            // this.state.data[index]["recovered"]
                        }
                    </td>
                    <td>
                        {
                            numeral(this.state.data[index]["deaths"]).format('0,0')
                            // this.state.data[index]["deaths"]
                        }
                    </td>
                </tr>
            )
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Country
                            {/* <span className="">Name</span> */}
                        </th>
                        <th>Cases</th>
                        <th>Active</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        )
    }

}

//export default MainPage
