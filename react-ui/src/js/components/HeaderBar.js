import React from 'react'
import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar'; // app bar
import Drawer from 'material-ui/Drawer'; // open nav bar on the left
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    // state: {open: handle toggle AppBar}
  }

  handleToggle = () => this.setState({open: !this.state.open})
  
  render() {
    return (
      <div>
        <AppBar title="PriceVN"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<h3></h3>}
        />
        <Drawer width={250} open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
          <AppBar
            title="Store" 
            iconElementLeft={<IconButton><NavigationClose /></IconButton>} 
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Link style={{textDecoration:"none"}} to='/'><MenuItem onClick={this.handleToggle}><strong>Main Page</strong></MenuItem></Link>
          <Link style={{textDecoration:"none"}} to='/store/fpt'><MenuItem onClick={this.handleToggle}><strong>Fpt Shop</strong></MenuItem></Link>
          <Link style={{textDecoration:"none"}} to='/store/tgdd'><MenuItem onClick={this.handleToggle}><strong>The gioi di dong</strong></MenuItem></Link>
          <Link style={{textDecoration:"none"}} to='/about'><MenuItem onClick={this.handleToggle}><strong>About</strong></MenuItem></Link>
          {/*<Link style={{textDecoration:"none"}} to='/contact' ><MenuItem onClick={this.handleToggle}><strong>Contact</strong></MenuItem></Link>*/}
        </Drawer>
      </div>
    );
  }
}
export default HeaderBar