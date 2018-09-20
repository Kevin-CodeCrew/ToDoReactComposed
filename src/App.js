import React, {Component} from 'react';
// import logo from './logo.svg';
import logo from './todopostit.png';
import './App.css';

import AddToDo from "./AddTodo";
import ListToDoV2 from './ListToDoV2.js';
import Moment from "react-moment";

// Setup a couple vars for the API. Not the best way but works for this example
const todoListEndpoint = "http://localhost:3001/api/todos/";
const todoBasicEndpoint = "http://localhost:3001/api/todo/";
const todoUser = "testuser";

// Define the base application
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            appTitle: "To Do List Ninja", // My Application Title
            requestFailed: false,
            todos: [] // This will hold my list of ToDos
        };

        this.onChange = this.onChange.bind(this); // We need this bind to keep up with 'this'
    }

    // Update the To Do description as we type it
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    // Lets load up our current list once component mounted
    componentDidMount() {
        this.fetchToDos();
    }

    // Grab those to dos
    fetchToDos() {
        console.log("Fetching To Do List: " + todoListEndpoint + todoUser);
        fetch(todoListEndpoint + todoUser)
            .then(response => {
                if (!response.ok) {
                    throw Error("Failed connection to the API")
                }
                return response
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    todos: response
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }

    // Process a Delete To Do Request
    clickDelete = (id) => {
        console.log('Clicked Delete Item:', id);
        const choice = window.confirm('Delete Item?');
        console.log(choice);
        if (choice) {
            console.log('Removing To Do ' + JSON.stringify({"id": id}));
            // Delete the item
            fetch(todoBasicEndpoint,
                {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"id": id})
                })
                .then((res) => {
                    if (!res.success) this.setState.requestFailed = true;
                }
                );
            // Re-load our list/refresh
            this.fetchToDos();
            window.location.reload();
        }
    };

    // Process a Complete To do Request
    clickComplete = (id) => {
        console.log('Clicked Update Item:', id);
    };

    // Process a Create To Do Request
    clickAdd = (newTodo) => {
        if (!newTodo) {
            window.alert('No Entry was Made');
        }
        else {
            console.log('Clicked Add Item:' + newTodo);
        }
    };

    // Render or Bender Bending Rodríguez
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.state.appTitle}</h1>
                </header>
                <div>
                    <div>
                        <label>New To Do: </label>
                        <br/>
                        <input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title}
                        />
                    </div>
                    <button onClick={() => this.props.clicked(this.state.title)}>Add</button>
                    <hr/>
                </div>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Due Date
                            </th>
                            <th>
                                To Do?
                            </th>
                            <th>
                                Status
                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.props.todos.map((item, index) => {
                            return (
                                <tr key={item._id}>

                                    <td><Moment format="YYYY/MM/DD">{item.dueDate}</Moment></td>
                                    <td>{item.todo}</td>
                                    <td>{item.isDone ? 'Complete' : 'Incomplete'}</td>
                                    <td>
                                        <button id={item._id} onClick={() => this.props.clickedComplete(item._id)}>Mark
                                            Complete
                                        </button>
                                    </td>
                                    <td>
                                        <button id={item._id} onClick={() => this.props.clickedDelete(item._id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>)
            </div>

        );
    }
}

// Export our goodness to the masses
export default App;
