import React, {Component} from 'react';

// Simple support for adding a To Do
class AddToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.onChange = this.onChange.bind(this); // We need this bind to keep up with 'this'
    }

    // Update the To Do description as we type it
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    // Render or Bender Bending Rodríguez
    render() {
        return (
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
        );
    }
}

// Export our goodness to the masses
export default AddToDo;
