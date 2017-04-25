import React from 'react'
import HeaderBar from './HeaderBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';

require('../../css/flexboxgrid.css');
// require('../../css/font-awesome/css/font-awesome.css');

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {fptPhones: [], tgddPhones: []}
  }
  componentDidMount() {
    this.sendRequest();
  }

  sendRequest = () => {
    axios.get('/allFptPhones')
      .then(response => {
        // console.log(response);
        this.setState({ fptPhones: response.data });
      })
      .catch(err => console.log(err));

    axios.get('/allTgddPhones')
      .then(response => {
        // console.log(response);
        this.setState({ tgddPhones: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    let needWait = null;
    // if phone not set (wait for request get from from server to set data)
    if(this.state.fptPhones.length === 0 || this.state.tgddPhones.length === 0){
      needWait = <div className="col-xs-offset-5 col-xs-2"><CircularProgress size={80} thickness={20} /></div>
    }
    // if need waiting for data -> show waiting page
    if(needWait) return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        {needWait}
      </MuiThemeProvider>
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <HeaderBar/>
          {/*pass all phone data to child body components*/}
          {React.cloneElement(this.props.children, {fptPhones:this.state.fptPhones, tgddPhones:this.state.tgddPhones})}
        </div>
      </MuiThemeProvider>
    );
  }
}