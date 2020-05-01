import React, {
  useState, useEffect, useImperativeHandle, useCallback, useRef,
} from 'react'
import { Row, Col } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'react-router-dom'
import './search.scss'
import http from '@/axios/http'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

export default function Search() {
  const { keyword } = useParams()


  // 声明状态
  const [searchData, setSearchData] = useState([])
  const [searchValue, setSearchValue] = useState(keyword === undefined ? null : keyword)
  // 入参
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loadMore, setLoadMore] = useState(false)
  const getSearchData = () => {
    http.get(`/home/Index/search?search=${searchValue}&page=${page}&page_size=${pageSize}`).then((res) => {
      if (res.status === 200) {
        setSearchData(searchData.concat(res.data.data))
        setPage(page + 1)
        if (res.data.count / pageSize > page) {
          setLoadMore(true)
        } else {
          setLoadMore(false)
        }
      }
    })
  }
  const search = (sv) => {
    console.log('page before:', page)
    setPage(1)
    console.log('page after:', page)

    setSearchValue(sv)
    getSearchData()
  }


  useEffect(() => {
    search(searchValue)
  }, [searchValue])

  // const isInBottomRef = useRef(null)
  // // const loadMore = () => isInBottomRef.current.loadMore()
  // const handleOnDocumentBottom = useCallback(() => {
  //   console.log(`Magazine I am at bottom! ${Math.round(performance.now())}`)
  //   if (!loadMore) isInBottomRef.current.loadMore()
  // }, [])

  // /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  // useBottomScrollListener(handleOnDocumentBottom)

  // useImperativeHandle(isInBottomRef, () => ({
  //   loadMore: () => getSearchData(),
  // }))


  return (
    <Row className="search-container">
      <Col lg={{ span: 6, offset: 3 }}>
        <SearchInput search={search} keyword={searchValue} />
        {/* 有数据遍历 */}
        <div className="search-list">
          {
            searchValue && searchData.length
              ? searchData.map((item, index) => (
                <SearchItem
                  key={`${item.id}${index}`}
                  id={item.id}
                  title={item.title}
                  catid={item.catid}
                  create_time={item.create_time}
                  firstColumn={item.firstColumn}
                  secondColumn={item.secondColumn}
                />
              )) : ''
          }
          {
            loadMore
              ? (
                <div className="load-more" onClick={getSearchData}>
                  <span>加载更多</span>
                </div>
              )
              : ''
          }
        </div>
        {/* 无数据 */}
        {
          searchValue && !searchData.length
            ? (
              <div className="n-result">
                <h4 className="t">没有找到数据</h4>
                <p>没有搜索到相关数据，试一试搜索其他关键字</p>
              </div>
            ) : ''
        }
      </Col>
    </Row>
  )
}
