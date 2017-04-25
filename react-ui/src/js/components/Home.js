import React from 'react';
import SearchBar from './SearchBar';
import ResultSearch from './ResultSearch';

// the home page
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {resultSearch: {fptPhones:[], tgddPhones:[]}}
  }
  setResultSearch = (result) => {
    let resultSearch = result;
    this.setState({resultSearch});
  }
  render(){
    return (
      <div>
        <SearchBar fptPhones={this.props.fptPhones} tgddPhones={this.props.tgddPhones} setResultSearch={this.setResultSearch}/>
        <ResultSearch resultSearch={this.state.resultSearch}></ResultSearch>
      </div>
    );
  }
}

export default Home