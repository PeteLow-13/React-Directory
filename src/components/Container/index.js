import {Component}  from 'react';
import API from '../../utils/API.js';
import EmployeeCards from '../EmployeeCards.js/index.js';
import './style.css';

export default class Container extends Component {
    constructor() {
        super();
        
        this.state = {
            users: [],
            filteredUsers: [],
            genderFilter: 'all',
            sortBy: 'none'
    
        }; 
        
        this.handleGenderFilter = this.handleGenderFilter.bind(this);
        this.filterGender = this.filterGender.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.sort = this.sort.bind(this);
    }
    
    componentDidMount() {
        API.getUsers().then(results => {
            this.setState({ 
                users: results.data.results,
                filteredUsers: results.data.results
             })
        });
    }

    handleGenderFilter(event) {
        this.setState({genderFilter: event.target.value}, ()=>{
            this.sortAndFilterEmployees();
        });
    }

    filterGender(employee) {
        return employee.gender === this.state.genderFilter;
    }

    sortAndFilterEmployees() {
        var employees = this.state.users;
        if (this.state.genderFilter !== 'all'){
            employees = employees.filter(this.filterGender);
        }
        if (this.state.sortBy !== 'none'){
            employees = [].concat(employees).sort(this.sort);
        }
        this.setState({filteredUsers: employees});
    }

    handleSort(event) {
        this.setState({sortBy: event.target.value},()=>{
            this.sortAndFilterEmployees();
        });
    }
    
    sort(e1, e2) {
        if (this.state.sortBy === 'name.last'){
            return( e1.name.last > e2.name.last) ? 1 : -1;
        }

        if (this.state.sortBy === 'login.username'){
            return( e1.login.username > e2.login.username) ? 1 : -1;
        }

        if (this.state.sortBy === 'dob.date'){
            return( new Date(e1.dob.date) > new Date(e2.dob.date)) ? 1 : -1;
        }
    }
    
    render( ) {
        return (
            <div className='container'>
          
                <select id='sort' value={this.state.sortBy} onChange={this.handleSort}>
                    <option value='none' >None</option>
                    <option value='name.last' >Last Name</option>
                    <option value='login.username' >User Name</option>
                    <option value='dob.date' >Birthdate</option>
                </select>

                <select id='filter' value={this.state.genderFilter} onChange={this.handleGenderFilter} >
                    <option value='all'>Any</option>
                    <option value='female'>Female</option>
                    <option value='male'>Male</option>
                </select>
                <EmployeeCards employees={this.state.filteredUsers}/>
            </div> 
            
        );
    }
    
};

