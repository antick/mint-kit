// import { get } from 'lodash';
import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';
// import routes from '../../../../config/routes';
import MainContainer from '../../../shared/components/MainContainer';

const Container = ({ history }: { history: never }) => (
  <>
    <div className="blob"/>

    <MainContainer>
      <aside className="flex">
        <LeftNavigation/>
      </aside>

      <section className="flex flex-col w-full z-10">
        <header className="flex w-full">
          <TopNavigation history={history}/>
        </header>

        {/* <Routes> */}
        {/*  {routes.filter((route) => !get(route, 'public', false)) */}
        {/*    .map((prop, key) => ( */}
        {/*      <Route */}
        {/*        exact={!!prop.exact} */}
        {/*        path={prop.path} */}
        {/*        element={<prop.component />} // Update here */}
        {/*        key={key} */}
        {/*      /> */}
        {/*    ))} */}
        {/* </Routes> */}
      </section>
    </MainContainer>
  </>
);

export default Container;
