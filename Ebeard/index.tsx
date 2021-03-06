import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import styles from './index.less';

let breadcrumbNameMap = {};
const readMenuData = (data) => {
  if (data.length && data.length > 0) {
    data.forEach((item, index) => {      
      if (item.sub) {
        readMenuData(item.sub);
      }
      breadcrumbNameMap[item.pathname] = item.title;
    })
  }
  return breadcrumbNameMap
}
const Ebeard = withRouter((props: any) => {
  const { location, menus } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    Object.keys(readMenuData(menus)).forEach((item, index) => {
      const cacheURL = url.split('/');
      const cacheITEM = item.split('/');
      if (cacheURL[cacheURL.length - 1].includes(cacheITEM[cacheITEM.length - 1])) {
        url = item
      }
    });
    const tempObj = readMenuData(menus);
    if (tempObj.hasOwnProperty(url)) {
      return (
        <Breadcrumb.Item key={url} className={`${styles['empty-beard-menu-animate']} animated slideInRight`}>
          {tempObj[url]}
        </Breadcrumb.Item>
      )
    }
  });
  return (
    <div className={`${styles['empty-beard-menu']}`}>
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
});

export default Ebeard