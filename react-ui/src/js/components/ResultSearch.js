import React from 'react'
import Phone from './Phone'
import RaisedButton from 'material-ui/RaisedButton';

// props: {resultSearch:{fpt: [], tgdd: []}}
export default class ResultSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fpt:true,
      tgdd:true,
    }
  }
  render(){
    if(this.props.resultSearch.fptPhones.length !== 0 || this.props.resultSearch.tgddPhones.length !== 0){
      let fptLable = `FPT (${this.props.resultSearch.fptPhones.length})`;
      let tgddLable = `TGDD (${this.props.resultSearch.tgddPhones.length})`;
      return (
        <div className="container">
          <br/>
          <br/>
          <RaisedButton label={fptLable} fullWidth={true} backgroundColor="#a4c639" onClick={() => this.setState({ fpt: !this.state.fpt })}/>
          <div className="row" style={{display: this.state.fpt ? '' : 'none'}}>
            {this.props.resultSearch.fptPhones.map((phone, index) =>
              <div className="col-sm-3 col-xs-12" key={index} >
                <Phone phone={phone}></Phone>
              </div>
            )}
          </div>
          <RaisedButton label={tgddLable} fullWidth={true} backgroundColor="#a4c639" onClick={() => this.setState({tgdd: !this.state.tgdd })}/>
          <div className="row" style={{ display: this.state.tgdd ? '' : 'none' }}>
            {this.props.resultSearch.tgddPhones.map((phone, index) =>
              <div className="col-sm-3 col-xs-12" key={index}>
                <Phone phone={phone}></Phone>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
    
  }
}