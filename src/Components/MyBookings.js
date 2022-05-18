import React, { Component } from 'react';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap'
import authService from '../authService';


export default class MyBookings extends Component {
    constructor() {
        super();
        this.state = {
            bookings: [],
            msg: '',
            errMsg: ''
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:8081/mybookings`, {
            headers: {
                token: authService.getAccessToken()
            }

        })
            .then(response => {
                console.log({ response })
                if (response.status === 200) {
                    this.setState({
                        bookings: response.data
                    })

                } else {
                    this.setState({
                        msg: response.msg
                    })
                }
            }).catch(err => {
                console.log({ err })
                this.setState({
                    errMsg: err.response.data.msg
                })
            })
    }

    handleUpdate = async (bookingid) => {

        const deleteresp = await axios.put(`http://localhost:8081/ticketupdate/${bookingid}`, {
            number: '8500554432'
        })

        this.setState({
            bookings: deleteresp.data.data
        })

    }

    handleDelete = (bookingid) => {
        console.log({ bookingid })

        axios.delete(`http://localhost:8081/ticketdelete/${bookingid}`)
            .then(deleteresp => {
                console.log({ deleteresp });
                this.setState({
                    bookings: deleteresp.data.data,
                    msg: deleteresp.data.msg
                })
            })
    }

    render() {
        const { bookings, msg, errMsg } = this.state;

        return (
            <div>
                <p className="text-success font-weight-bold">{msg}</p>
                {bookings.map((bus, index) => (
                    <div className="list-item p-4 m-2" key={bus.bookingid}>
                        <h6>Booking ID:{bus.bookingid}</h6>
                        <b>{bus.type}</b>
                        <div className="d-flex justify-content-between">
                            <div>
                                <span> Time: {bus.time}</span>
                                <h6 className="mt-2">Price: ${bus.price}</h6>
                            </div>
                            <div className="logos">
                                <span className="mx-2" onClick={() => this.handleUpdate(bus.bookingid)}>
                                    <i className="fas fa-pen"></i>
                                </span>
                                {/* <span onClick={() => this.handleDelete(bus.bookingid)}>
                                    <i class="far fa-trash-alt"></i>
                                </span> */}
                                <button className="h-75 btn btn-danger" type="button" onClick={() => this.handleDelete(bus.bookingid)}>
                                    Cancel Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {errMsg ?
                    <ToastContainer position="top-end" className="p-3">
                        <Toast bg="danger">
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Error!</strong>
                            </Toast.Header>
                            <Toast.Body>{errMsg}</Toast.Body>
                        </Toast>
                    </ToastContainer> : ''}
            </div>

        )
    }
}
