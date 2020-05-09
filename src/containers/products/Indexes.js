import {
  useCallback, useState, useEffect, useImperativeHandle,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import './Indexes.scss'
import { useFetch } from '@/hooks/useFetch'
import _ from 'lodash'

export default function Indexes({
  data, isInBottomRef,
}) {
  const [lists, setLists] = useState([])
  // 请求数据
  const { content, marketService } = useFetch('/home/Production/index', {
    content: [],
    marketService: [],
  })
  // 分组总数据
  const [listTotal, setListTotal] = useState([])
  // 当前页
  const [page, setPage] = useState(0)
  // 总页数
  const pageTotal = listTotal.length
  // 临时数据
  const [listTemp, setListTemp] = useState([])
  // 是否显示分页
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    console.log('1111111')
    if (content[0]) {
      const tempData = []
      content.map((a) => a.firstChildren.map((b) => b.children.map((c) => c.map((d) => tempData.push(d)))))
      setLists(tempData)
      console.log('tempData', tempData)
    }
  }, [content])

  useEffect(() => {
    console.log('2222222')
    console.log('lists', lists)
    setListTotal(_.chunk(lists, 20))
  }, [lists])

  useEffect(() => {
    console.log('listTotal', listTotal)
    setListTemp(listTotal[page])
    if (pageTotal > 1) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [listTotal])

  const loadMoreData = () => {
    console.log(1)
    if (!loadMore) return
    console.log(1)
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

  function goto(url) {
    console.log('url', url)
    history.push({
      pathname: url,
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
              <th scope="col">系列</th>
              <th scope="col">名称</th>
              <th scope="col">种类</th>
              <th scope="col" width="180">可替代进口同类产品</th>
              <th scope="col">适用工艺</th>
            </tr>
          </thead>
          <tbody>
            {
              listTemp && listTemp.map((item, index) => (
                <tr key={index} onClick={() => goto(`/products/${item.id}`)}>
                  <td>{item.serialtype}</td>
                  <td>
                    {item.title}
                    {' '}
                    {item.keywords}
                  </td>
                  <td>{item.kind}</td>
                  <td>{item.replaceproduct}</td>
                  <td>{item.adapttech}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
        {
          loadMore
            ? (
              <div className="load-more" onClick={loadMoreData}>
                <span>加载更多</span>
              </div>
            )
            : ''
        }
      </div>
    </>

  )
}
