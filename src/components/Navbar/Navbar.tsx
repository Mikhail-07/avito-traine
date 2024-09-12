import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './Navbar.module.less';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    // Automatically handle any side effects for route changes if needed
  }, [location.pathname]);

  const getSelectedKey = () => {
    if (location.pathname === '/orders') {
      return '2';
    }
    if (location.pathname === '/favorites') {
      return '3';
    }
    return '1';
  };

  const menuItems = [
    {
      key: '1',
      icon: <AppstoreOutlined />,
      label: <span onClick={() => handleNavigation('/')}>Все объявления</span>,
    },
    {
      key: '2',
      icon: <ShoppingCartOutlined />,
      label: <span onClick={() => handleNavigation('/orders')}>Заказы</span>,
    },
    {
      key: '3',
      icon: <HeartOutlined />,
      label: <span onClick={() => handleNavigation('/favorites')}>Мои любимые</span>,
    },
  ];

  return (
    <Header className={styles.headerNavbar}>
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[getSelectedKey()]}
        className={styles.menu}
        items={menuItems}
      />
    </Header>
  );
};

export default Navbar;
