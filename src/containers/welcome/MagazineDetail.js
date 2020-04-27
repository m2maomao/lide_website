import { Link, useParams, useHistory } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

// import imgAcquire from '@/assets/images/welcome/imgAcquire.png'
import hot from '@/assets/images/welcome/hot.png'

export default function MagazineDetail() {
  const { id } = useParams()
  const history = useHistory()
  function handleBack() {
    history.goBack()
  }
  const data = useFetch(`/home/Enterlide/detail?id=${id}`, {
    Detail: {},
  })
  const { title = '', create_time = '', content = '' } = data.Detail
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>我与立得同行</Breadcrumb.Item>
      </Breadcrumb>
      <div className="news-detail-body">
        <div className="d-flex news-header">
          <div className="d-flex">
            <div className="header">
              <h2 className="t">{title}</h2>
              <span className="date">{create_time}</span>
            </div>
            <button type="button" className="return" onClick={handleBack}>
              返回列表
            </button>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </>
  )
}


function Item({ isIcon, data }) {
  const {
    title, image, summary, create_time,
  } = data
  return (
    <Card className="magazine-item">
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
    </Card>
  )
}
