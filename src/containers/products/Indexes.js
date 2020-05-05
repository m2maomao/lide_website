import {
  useCallback, useState, useEffect, useImperativeHandle,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import _ from 'lodash'
import './Indexes.scss'
import { useFetch } from '@/hooks/useFetch'

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

  // 请求数据
  const { content, marketService } = useFetch('/home/Production/index', {
    content: [],
    marketService: [],
  })

  const [tempListArray, setListArray] = useState([])

  useEffect(() => {
    if (content[0]) {
      console.log('content', content)
      content.map((a) => a.firstChildren.map((b) => b.children.map((c) => c.map((d) => tempListArray.push(d)))))
      console.log('d', tempListArray)
    }
  }, [content])

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
              <th scope="col" width="70">序号</th>
              <th scope="col">系列</th>
              <th scope="col">名称</th>
              <th scope="col">种类</th>
              <th scope="col" width="180">可替代进口同类产品</th>
              <th scope="col">适用工艺</th>
            </tr>
          </thead>
          <tbody>
            {
                tempListArray.length && tempListArray.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.serialtype}</td>
                    <td>{item.title}</td>
                    <td>{item.kind}</td>
                    <td>{item.replaceproduct}</td>
                    <td>{item.adapttech}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </>

  )
}
