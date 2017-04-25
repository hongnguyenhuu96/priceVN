import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

// component show to show each phone
// props : { phone : {name, link, price, img}}
class Phone extends React.Component{
  render(){
    // if phone dont have price -> not available to buy
    let price = this.props.phone.price;
    if(this.props.phone.price == null){
      price = 'Not available!';
    }
    return(
      <Card>
        <a href={this.props.phone.link} target="_blank">
          <CardMedia overlay={<CardTitle title={this.props.phone.name} subtitle={`Price: ${price}`} />}>
            <img src={this.props.phone.img} style={{height:"350px", width:"auto"}} alt={this.props.phone.name}/>
          </CardMedia>
        </a>
      </Card>
    );
  }
}

export default Phone;