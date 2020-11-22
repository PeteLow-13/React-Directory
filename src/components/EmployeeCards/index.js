import { Component } from 'react';
import EmployeeCard from '../EmployeeCard/index.js';
import './style.css';


export default class EmployeeCards extends Component {
    
   

    render( ) {
        return (
            <div className='row' id='employee-cards'>
                {this.props.employees.map(employee => <EmployeeCard employee={employee} key={employee.login.uuid}/>)}
            </div>
 
        );
    }
    
};