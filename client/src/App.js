import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './components/UserList';
import Posts from './components/Posts';

export default () => {

  return (
    <div>
      <Route exact path = '/' component = {UserList} />
      <Route path = '/:id' render = {props => <Posts {...props} />} />
    </div>
  );
};