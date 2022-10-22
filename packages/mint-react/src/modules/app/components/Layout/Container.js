import React from 'react';
import { get } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';
import routes from '../../../../config/routes';
import MainContainer from '../../../shared/components/MainContainer';

const Container = ({ history }) => (
  <>
    <div className="blob" />

    <MainContainer>
      <aside className="flex">
        <LeftNavigation />
      </aside>

      <section className="flex flex-col w-full z-10">
        <header className="flex w-full">
          <TopNavigation history={history} />
        </header>

        <Switch>
          {routes.filter(route => !get(route, 'public', false))
            .map((prop, key) => (
              <Route
                exact={!!prop.exact}
                path={prop.path}
                component={prop.component}
                key={key}
              />
            ))}
        </Switch>
      </section>
    </MainContainer>
  </>
);

Container.propTypes = {
  history: PropTypes.object
};

export default Container;
