import React, { Fragment } from 'react';
import freetool from 'freetool';
import { List, Card, Skeleton, Icon, Button, Spin } from 'antd';

//less
import styles from './index.less';

//clssname 

const cardListClassName = `${styles['empty-card-list-wrapper']}`;
const emptyCardListClassName = `${styles['empty-card-list']}`;
const noMoreListClassName = `${styles['empty-card-list-nomore']}`;
const loadListClassName = `${styles['empty-card-list-load']}`;
//常量
const { GetType } = freetool;

const generatorBtn = (target, btnGroup, RowData) => {
  const resBtn = btnGroup.map((item, index) => {
    const itemType = item.type ? item.type : "undefined";
    const btnEvent = GetType(item.onClick);
    if (btnEvent !== "undefined") {
      return (<Button type={item.type} size="small" onClick={item.onClick.bind(target, RowData)}>{item.text}</Button>)
    }
    return new bindEvent(target, item, RowData)[itemType]();
  })
  return resBtn;
}


class bindEvent {
  target; btn; RowData;
  constructor(target, btn, RowData) {
    this.target = target,
      this.btn = btn,
      this.RowData = RowData
  }
  danger() {
    return (<Button type={this.btn.type} size="small" onClick={this.target.props.method.deleteList.bind(this.target, this.RowData)}>{this.btn.text}</Button>)
  }
  primary() {
    return (<Button type={this.btn.type} size="small" onClick={this.target.props.method.showList.bind(this.target, this.RowData)}>{this.btn.text}</Button>)
  }
  undefined() {
    return (<Button type={this.btn.type || "default"} size="small" onClick={this.target.props.method.editList.bind(this.target, this.RowData)}>{this.btn.text}</Button>)
  }
}

const CardTemplate = (function (this: any) {
  let prevSata:Array<any> = [];
  return function (this: any) {
    let responseList = [];
    let loading = true;
    let dataSource:Array<any> = [];
    let noMoreData = false;
    const { tableConfig, tableColumns, pagination, cardHandleBtn } = this.props.listConfig;
    Object.keys(this.props.State).forEach((item, index) => {
      if (item.endsWith(this.props.listActionName) && !this.props.State[item]["loading"]) {
        const responseData = this.props.State[item]["response"];
        const { totalSize, pageNo, pageSize, totalPage } = responseData;
        loading = this.props.State[item]["loading"];
        responseList = responseData["results"] || responseData;
        if (pageNo == totalPage) { noMoreData = true };
        if (responseData.pageNo == 1 || !(pagination.total)) { prevSata = [] };
        if (Array.prototype.includes.call(prevSata, ...responseList)) { return false };
        Array.prototype.push.call(prevSata, ...responseList);
        pagination.total = totalSize;
        pagination.current = pageNo;
        pagination.pageSize = pageSize;
      }
    })
    if (responseList.length > 0) {
      dataSource = prevSata
    } else {
      dataSource = prevSata
    }
    let pager: any = {}
    pager.current = pagination.current + 1;
    pager.pageSize = pagination.pageSize;
    const loadMore = !loading ? (
      <div className={loadListClassName}>
        {loading && <Spin />}
        {!loading && <Button className={noMoreData ? noMoreListClassName : ""} onClick={noMoreData ? () => { } : () => this.handleTableChange(pager)}>{noMoreData ? '没有更多数据' : '加载更多...'}</Button>}
      </div>
    ) : null;
    return (
      <div style={{minHeight:this.props.minHeight}}>
        <List
          className={emptyCardListClassName}
          itemLayout="horizontal"
          dataSource={dataSource}
          loadMore={pagination.total ? loadMore : false}
          loading={loading}
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
          renderItem={item => (
            <List.Item>
              <Card
                bordered={true}
                hoverable
                actions={generatorBtn(this, cardHandleBtn, item)}
              >
                <ul className={cardListClassName}>
                  {tableColumns.map((items, indexs) => {
                    return (
                      <li key={`${items.dataIndex}${tableConfig["rowKey"]}`}>
                        {typeof items.dataIndex == "undefined" ? null :
                          <Fragment>
                            <span>{items.title}</span>
                            {items.render ? (<span>{items.render(item[items.dataIndex])}</span>) : (<span>{item[items.dataIndex]}</span>)}
                          </Fragment>
                        }
                      </li>
                    )
                  })}
                </ul>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
})()

export default CardTemplate;





