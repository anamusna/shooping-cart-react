import React from 'react';

class UserList extends React.Component {
  constructor (props) {
    super (props);

    this.loading = false;
    this.users = [];
    this.state = {
      user: {
        first_name: '',
        last_name: '',
      },
      inputSelect: 'b',
    };
  }

  componentWillMount () {
    this.loadUsers ();
    console.log ('componentWillMount');
  }

  componentDidMount () {
    this.forceUpdate ();
    console.log ('componentDidMount');
  }

  loadUsers = () => {
    this.loading = true;
    this.users = [];
    this.forceUpdate ();
    console.log ('loadUsers');

    fetch ('https://jsonplaceholder.typicode.com/users')
      .then (response => response.json ())
      .then (json => {
        this.setUsers (json);
      });
  };

  setUsers = users => {
    this.users = users;
    console.log ('setUsers', this.users);
    this.loading = false;
    this.forceUpdate ();
  };

  inputHandler = e => {
    console.log (e.target.id);

    let user = this.state.user;
    user[e.target.id] = e.target.value;

    this.setState ({
      user: user,
    });
  };

  inputSelectHandler = e => {
    console.log (e.target.value);
    this.setState ({
      inputSelect: e.target.value,
      user: {
        first_name: 'reseted',
        last_name: 'reseted',
      },
    });
  };

  render () {
    if (this.users.length > 0) {
      return (
        <div style={{backgroundColor: '#ffffff', padding: '20px'}}>
          Users list
          <hr />
          <input
            id="first_name"
            type="text"
            value={this.state.user.first_name}
            onChange={this.inputHandler.bind (this)}
          />
          <input
            id="last_name"
            type="text"
            value={this.state.user.last_name}
            onChange={this.inputHandler.bind (this)}
          />
          <br />
          {this.state.user.first_name}<br />
          {this.state.user.last_name}<br />
          <hr />
          <select
            value={this.state.inputSelect}
            onChange={this.inputSelectHandler.bind (this)}
          >
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
          <hr />
          {this.state.inputSelect}
          <hr />
          {this.users.map ((user, id) => (
            <div key={`user-${id}`}>
              {id} {user.name}
            </div>
          ))}
        </div>
      );
    }

    if (this.loading) {
      return (
        <div style={{backgroundColor: '#ffffff', padding: '20px'}}>
          Users list
          <hr />
          Loading...
        </div>
      );
    }

    return (
      <div style={{backgroundColor: '#ffffff', padding: '20px'}}>
        Users list
        <hr />
        No users
      </div>
    );
  }
}

export default UserList;
