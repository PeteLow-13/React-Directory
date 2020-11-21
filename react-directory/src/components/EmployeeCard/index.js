import { Component } from 'react';
import './style.css';

function removeTime(birthday) {
    var birthdayString = birthday.replace('T', ' ');
    var birthDate = birthdayString.split(' ');
    
    return birthDate[0]
}

export default class EmployeeCard extends Component {
    
   

    render( ) {
        return (

            <div className='col-md-3 employee-card' >
                <img src={this.props.employee.picture.medium} alt='not available' />
                <h4>{this.props.employee.name.first} {this.props.employee.name.last}</h4>
               
                <li>UserName: {this.props.employee.login.username}</li>
                <li>DOB: {removeTime(this.props.employee.dob.date)}</li>
                <li>Gender: {this.props.employee.gender}</li>
                
                
            </div>
                
            
 
        );
    }
    
};