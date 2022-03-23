import './App.css';
import React from 'react';
import UserList from './components/Users.js';
import MenuItem from './components/Menu.js';
import FooterItem from './components/Footer.js'
import {Route, BrowserRouter, Routes, Link} from "react-router-dom";
import axios from 'axios';
import {ProjectList, ProjectDetail} from "./components/Projects";
import TodoList from "./components/TodoList";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo_list': []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://127.0.0.1:8000/api/users/'),
            axios.get('http://127.0.0.1:8000/api/projects'),
            axios.get('http://127.0.0.1:8000/api/todo-list/')
        ]).then(axios.spread((users, projects, todo_list) => {
            this.setState({
                'users': users.data.results,
                'projects': projects.data.results,
                'todo_list': todo_list.data.results,
            })
        })).catch(error => console.log(error))
    }



    render() {
        return (

            <div className="App">

                <MenuItem menu={'Menu'}/>
                <BrowserRouter>
                    <Link style={{padding: "5px"}} to="/">Users</Link>
                    <Link style={{padding: "5px"}} to="/projects">Projects</Link>
                    <Link style={{padding: "5px"}} to="/todo">ToDo_List</Link>
                    <Routes>
                        <Route path="/" element={<UserList users={this.state.users}/>}/>
                        <Route path="/projects" element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path="/todo" element={<TodoList todo_list={this.state.todo_list}/>}/>
                        <Route path="/project/:name" element={<ProjectDetail items={this.state.projects}/>}/>


                    </Routes>
                </BrowserRouter>
                <FooterItem footer={'Footer'}/>
            </div>
        )
    }
}

export default App;
