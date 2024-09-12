import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from '@components/Navbar/Navbar';
import AppRouter from './AppRouter';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
          <Content className="container">
            <AppRouter />
          </Content>
      </Layout>
    </Router>
  );
};

export default App;
