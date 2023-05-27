import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes/index';
import { DefaultLayout } from './components/AppLayout';
import Meta from './components/Meta';



function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Meta title={route.title} />
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
