import { Link, Route } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import hot from '@/assets/images/welcome/hot.png'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import MagazineDetail from './MagazineDetail'

// import imgAcquire from '@/assets/images/welcome/imgAcquire.png'

export default function Magazine() {
  const { content } = useFetch('/home/Enterlide/magazine', {
    content: [],
  })

  // 分组总数据
  const listTotal = _.chunk(content, 5)
  // 当前页
  const [page, setPage] = useState(0)
  // 总页数
  const pageTotal = listTotal.length
  // 临时数据
  const [listTemp, setListTemp] = useState([])
  // 是否显示分页
  const [loadMore, setLoadMore] = useState(false)

  const loadMoreData = () => {
    setListTemp([...listTemp, ...listTotal[page + 1]])
    if ((pageTotal !== page + 2) && pageTotal > 1) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
      setPage(0)
    }
  }

  useEffect(() => {
    setListTemp(listTotal[page])
    if (pageTotal > 1) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [content])


  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>《我与立得同行》</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r" id="container">
        <div className="magazine-container">
          <div className="d-flex magazine-lists">
            <CardColumns>
              {
                listTemp && listTemp.length ? listTemp.map((item, index) => <Item key={index} isIcon={item.is_hot} data={item} />) : ''
              }
            </CardColumns>
          </div>
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

      </div>
    </>
  )
}


function Item({ isIcon, data }) {
  const {
    title, image, summary, create_time, id,
  } = data
  return (
    <Card className="magazine-item">
      <Link to={`/welcome/MagazineDetail/${id}`}>
        <div className="inner-container">
          {
            isIcon === 1 && (
            <div className="weekly">
              <span>精选周刊</span>
              <img src={hot} alt="icon" />
            </div>
            )
          }
          <img className="post-image" src={image} alt="图片" />
          <div className="d-flex">
            <h3 className="t">{title}</h3>
          </div>
          <p className="content">{summary}</p>
          <p className="date">{create_time}</p>
        </div>
      </Link>
    </Card>
  )
}
