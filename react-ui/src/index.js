import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, IndexRoute} from 'react-router'

import App from './js/components/App'
import Home from './js/components/Home'
import Store from './js/components/Store'
import About from './js/components/About'
import Contact from './js/components/Contact'

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/store/:storeName" component={Store}/>
      {/*<Route path="/about" component={About}/>*/}
      {/*<Route path="/contact" component={Contact}/>*/}


      {/*<Route path="/homeworks" component={HomeWorks}>*/}
        {/*<IndexRoute component={IntroHomeWork}/>*/}
        {/*<Route path=":week" component={HomeWorkPerWeek}/>*/}
      {/*</Route>*/}
    </Route>
  </Router>
  , document.getElementById('root'));