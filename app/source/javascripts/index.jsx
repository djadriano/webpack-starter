import React from 'react';
import ReactDom from 'react-dom';

import AppStyle from '../stylesheets/app';

import AppComponent from './components/app';

ReactDom.render(<AppComponent />, document.getElementById('content'));
