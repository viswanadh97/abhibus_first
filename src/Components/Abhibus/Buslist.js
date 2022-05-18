import React, { Component } from 'react';
import axios from "axios";


export default class Buslist extends Component {
    constructor() {
        super();
        this.state = {
            buslist: [],
            msg: ''
        }
    }

    async componentDidMount() {
        const { source, destination } = this.props.match.params;
        // fetch(`http://localhost:8081/list/${source}/${destination}`) // API calls are async
        //     .then(response => response.json()) // promise
        //     .then(data =>
        //         // this.setState({ buslist: data })
        //     )

        // axios.get(`http://localhost:8081/list/${source}/${destination}`)
        //     .then(response =>
        //         this.setState({ buslist: response.data })
        //     )

        const response = await axios.get(`http://localhost:8081/list/${source}/${destination}`);
        this.setState({ buslist: response.data })

    }

    handleBook = async (busData) => {
        // fetch('http://localhost:8081/book', {
        //     method: 'POST',
        //     body: JSON.stringify(busData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => this.setState({
        //         msg: data.msg
        //     }));

        // axios.post('http://localhost:8081/book', { body: busData }) // async 
        //     .then(response => {
        //         console.log({ response })
        //         this.setState({
        //             msg: response.data.msg
        //         })
        //     })

        const response = await axios.post('http://localhost:8081/book', { body: busData }); // sync 
        console.log({ response })
        this.setState({
            msg: response.data.msg
        })
        console.log('hello')
    }

    render() {
        // console.log(this.props.match.params)
        const { source, destination } = this.props.match.params;
        const { buslist, msg } = this.state;
        console.log({ buslist })
        return (
            <div>
                <h4> Bus list from {source} to {destination}</h4>
                <p className="text-success font-weight-bold">{msg}</p>
                {buslist.length && buslist.map(bus => (
                    <div className="list-item p-4 m-2">
                        <b>{bus.type}</b>
                        <div className="d-flex justify-content-between">
                            <div>
                                <span> Time: {bus.time}</span>
                                <h6 className="mt-2">Price: ₹{bus.price}</h6>
                            </div>
                            <button
                                type="button"
                                className="btn btn-danger h-50"
                                onClick={() => this.handleBook(bus)}
                            >
                                Book Ticket
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        )
    }
}


// export default function Buslist() {
//     console.log(useParams())
//     const { source, destination } = useParams();
//     return (
//         <div>
//             <h4> Bus list from {source} to {destination}</h4>

//             <p>list</p>

//         </div>
//     )
// }

// 'http://localhost:8081/book'
// post


