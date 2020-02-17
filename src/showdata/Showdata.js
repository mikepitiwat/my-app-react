import React, {Component} from "react";
import axios from "axios";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:"",
            firstname:"",
            lastname:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
    }
    onDelete=(user)=>{
        let url = 'http://35.185.186.61:3000/delete';
        let data = {
            idkey:user.id
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    call=(user)=>{
        this.setState({
            idkey:user.id,
            firstname:user.firstname,
            lastname:user.lastname
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        let url = 'http://35.185.186.61:3000/data';
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname
        }
        axios.put(url,data)
    }

    handleClicked(){
        let url = 'http://35.185.186.61:3000/data';
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname
        }
        axios.put(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:""
        });
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2>Users Information</h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delet</button></td>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>

            <table align = 'center' border="2">
                <thead>
                <th>EDIT</th>
                </thead>
                    id: {this.state.idkey}<br/>
                    firstname: <input type="text" id="firstname" onChange={this.handleChang} value={this.state.firstname} /><br/><br/>
                    lastname: <input type="text" id="lastname"onChange={this.handleChang} value={this.state.lastname}/><br/><br/>
                    <button onClick={this.handleClicked} >send</button>
            </table>
            </div>
        );
    }
}