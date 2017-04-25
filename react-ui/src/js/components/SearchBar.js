import AutoComplete from 'material-ui/AutoComplete';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      queryString: ''
    };
  }

  handleUpdateInput = (value) => {
    let dataSource = this.props.fptPhones.map(phone => phone.name.toLowerCase());
    let queryString = value;
    this.setState({ dataSource, queryString });
  }

  doSearchName = (queryString) => {
    let result = {};
    result.fptPhones = findPhoneByName(this.props.fptPhones, queryString);
    result.tgddPhones = findPhoneByName(this.props.tgddPhones, queryString);
    this.props.setResultSearch(result);
  }

  // >3000000 <3000000 ~3000000 3000000-5000000
  doSearchPrice = (queryString) => {
    let result = {};
    if (queryString.includes('-')) {
      console.log('-')
      let [minPrice, maxPrice] = queryString.split('-');
      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return false;
      }
      else {
        let min = parseInt(minPrice, 10);
        let max = parseInt(maxPrice, 10);
        result.fptPhones = findPhoneByPrice(this.props.fptPhones, min, max);
        result.tgddPhones = findPhoneByPrice(this.props.tgddPhones, min, max);
        this.props.setResultSearch(result);
        return true;
      }
    } else if (queryString.includes('>')) {
      let minPrice = queryString.split('>').join('');
      // console.log(minPrice);
      if (isNaN(minPrice)) {
        return false;
      } else {
        let min = parseInt(minPrice, 10);
        result.fptPhones = findPhoneByPrice(this.props.fptPhones, min, 50000000);
        result.tgddPhones = findPhoneByPrice(this.props.tgddPhones, min, 50000000);
        this.props.setResultSearch(result);
        return true;
      }
    } else if (queryString.includes('<')) {
      let maxPrice = queryString.split('<').join('');
      if (isNaN(maxPrice)) {
        return false;
      } else {
        let max = parseInt(maxPrice, 10);
        result.fptPhones = findPhoneByPrice(this.props.fptPhones, 0, max);
        result.tgddPhones = findPhoneByPrice(this.props.tgddPhones, 0, max);
        this.props.setResultSearch(result);
        return true;
      }
    } else if (queryString.includes('~')) {
      let price = queryString.split('~').join('');
      if (isNaN(price)) {
        return false;
      } else {
        let prc = parseInt(price, 10);
        result.fptPhones = findPhoneByPrice(this.props.fptPhones, prc - 500000, prc + 500000);
        result.tgddPhones = findPhoneByPrice(this.props.tgddPhones, prc - 500000, prc + 500000);
        this.props.setResultSearch(result);
        return true;
      }
    } else {
      return false;
    }
  }

  findPhone = () => {
    let queryString = this.state.queryString;
    if(isSearchByPrice(queryString)){
      this.doSearchPrice(queryString);
    }else{
      // searchByName
      this.doSearchName(queryString);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10">
          <AutoComplete
            hintText="Find By Price (ex: >3000000, ~3000000, 1500000-2000000) Or Name (ex:iphone 6s)"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Search Mobile Phone"
            fullWidth={true}
            onNewRequest={this.findPhone}
          />
        </div>
        <div className="col-xs-offset-5 col-xs-2">
          <RaisedButton label="Search" fullWidth={true} primary={true} onClick={this.findPhone} />
        </div>
      </div>
    );
  }
};

// search phone by name
function findPhoneByName(phones = [], queryName) {
  let partNames = queryName.toLowerCase().split(' ');

  return phones.filter((phone) => {
    let resultSearch = true;
    for (let i = 0; i < partNames.length; i++) {
      // if (partNames[i].length > 1){
      if (!phone.name.toLowerCase().includes(partNames[i])) resultSearch = false;
      // } 
    }
    return resultSearch;
  });
}

// return the phone has price lower than the given price
function findPhoneByPrice([...phones], minPrice, maxPrice){
  minPrice = parseInt(minPrice, 10);
  maxPrice = parseInt(maxPrice, 10);
  return phones.filter(phone => {
    if(!phone.price) return false;
    let price = parseInt(phone.price.split('.').join(''), 10);
    if(price >= minPrice && price <= maxPrice) return true;
    return false;
  })
}


function isSearchByPrice(queryString) {
  let priceDictionary = [
    'gia',
    'dong',
    'trieu',
    'tu',
    'den',
    'price',
    'vnd',
    'tren',
    'duoi',
    'khoang',
    'tram',
    'nghin',
    'canh',
    'cu',
    'sic',
    'loet',
    'nghin',
    'ngan',
    'gia re',
    'cuc re',
    'dat',
    '>',
    '<',
    '~',
    '-'
  ]
  for (let i = 0; i < priceDictionary.length; i++) {
    if (queryString.toLowerCase().includes(priceDictionary[i])) return true;
  }
  return false;
}
