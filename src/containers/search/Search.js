import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'react-router-dom'
import './search.scss'
import http from '@/axios/http'

export default function Search() {
  const { keyword } = useParams()
  console.log(keyword)


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
    setSearchValue(sv)
    getSearchData()
  }


  useEffect(() => {
    search(searchValue)
  }, [])


  return (
    <Row className="search-container">
      <Col lg={{ span: 6, offset: 3 }}>
        <SearchInput search={search} keyword={keyword} />
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
