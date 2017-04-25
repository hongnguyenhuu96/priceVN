import React from 'react';
import Phone from './Phone';

// show all phone for each store
export default class Store extends React.Component{
  render(){
    let storeName = this.props.params.storeName;
    let phones =[];
    if(storeName==='fpt'){
      phones = this.props.fptPhones;
    }
    if(storeName==='tgdd'){
      phones = this.props.tgddPhones;
    }
    return (
    <div className="container row">
      {phones.map((phone, index) => 
        <div className="col-sm-3 col-xs-12" key={index} >
          <Phone phone={phone}></Phone>
        </div>
      )}
    </div>
    );
  }
}