import React, {Component} from 'react';
import Moment from 'react-moment'; // What can I say, u need date/time stuff? then u need this

// A second version of the ToDo list display
class ListToDoV2 extends Component {
    // Render or Bender Bending Rodríguez
    render() {

        if (!this.props.todos.length) {
            return <h3>No To Dos</h3>
        }
        // Giving it back to the People
        return (
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
    }
}

// Export our goodness to the masses
export default ListToDoV2;