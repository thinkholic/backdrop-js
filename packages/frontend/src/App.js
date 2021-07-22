import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import { fetchInitialConfig as acFetchInitialConfig } from 'store/reducers/configSlice';

import { FullPageLoading as Loading } from 'components/Loading';
import Bootstrap from 'components/Bootstrap';
import ProtectedRoute from 'components/ProtectedRoute';

import Login from 'screens/Login';
import Register from 'screens/Register';
import Home from 'screens/Home';
import Resources from 'screens/Resources';
import ResourceSingle from 'screens/Resources/Single';
import CreateResource from 'screens/Resources/Create';
import Media from 'screens/Media';
import MediaUpload from 'screens/Media/Upload';
import Settings from 'screens/Settings';
import Users from 'screens/Users';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

function App() {
  const { isLoading, bootstrap } = useSelector((state) => state.config);

  const dispatch = useDispatch();

  const fetchConfig = () => dispatch(acFetchInitialConfig());

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  if (bootstrap) return <Bootstrap />;

  return (
    <Wrapper>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <ProtectedRoute exact path="/" component={Home} />

        <ProtectedRoute exact path="/resources" component={Resources} />
        <ProtectedRoute
          exact
          path="/resources/create"
          component={CreateResource}
        />
        <ProtectedRoute
          exact
          path="/resources/ext/:id"
          component={ResourceSingle}
        />

        <ProtectedRoute exact path="/media" component={Media} />
        <ProtectedRoute exact path="/media/upload" component={MediaUpload} />

        <ProtectedRoute exact path="/settings" component={Settings} />

        <ProtectedRoute exact path="/users" component={Users} />
      </Router>
    </Wrapper>
  );
}

export default App;
