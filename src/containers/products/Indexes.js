import {
  useCallback, useState, useEffect, useImperativeHandle,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import _ from 'lodash'
import './Indexes.scss'

export default function Indexes({
  data, isInBottomRef,
}) {
  // 父组件传入数据
  const lists = Array.isArray(data[0]) ? data[0] : data
  // 分组总数据
  const listTotal = _.chunk(lists, 9)
  // 当前页
  const [page, setPage] = useState(0)
  // 总页数
  const pageTotal = listTotal.length
  // 临时数据
  const [listTemp, setListTemp] = useState([])
  // 是否显示分页
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    setListTemp(listTotal[page])
    if (pageTotal > 1) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [lists])
  const loadMoreData = () => {
    if (!loadMore) return
    setListTemp([...listTemp, ...listTotal[page + 1]])
    if ((pageTotal !== page + 2) && pageTotal > 1) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
      setPage(0)
    }
  }

  useImperativeHandle(isInBottomRef, () => ({
    loadMore: () => loadMoreData(),
  }))

  const history = useHistory()

  const search = (sv) => {
    history.push({
      pathname: '/products',
      state: { sv },
    })
  }

  const tempList = [
    {
      id: 1,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
    {
      id: 2,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
    {
      id: 3,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
    {
      id: 4,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
    {
      id: 5,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
    {
      id: 6,
      type: 'SCG',
      name1: 'SCG-1(I)',
      name2: '干粉催化剂',
      name3: 'UCAT A-4520',
      name4: 'Univcation、GPE',
    },
  ]

  return (
    <>
      <SearchInput search={search} searchbtnvalue="产品搜索" />
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <Breadcrumb.Item active>产品索引</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <table className="table table-striped table-borderless">
          <thead className="thead-dark">
            <tr>
              <th scope="col">序号</th>
              <th scope="col">系列</th>
              <th scope="col">名称</th>
              <th scope="col">种类</th>
              <th scope="col">可替代进口同类产品</th>
              <th scope="col">适用工艺</th>
            </tr>
          </thead>
          <tbody>
            {
                tempList.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.type}</td>
                    <td>{item.name1}</td>
                    <td>{item.name2}</td>
                    <td>{item.name3}</td>
                    <td>{item.name4}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </>

  )
}
