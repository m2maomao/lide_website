import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

// import imgAcquire from '@/assets/images/welcome/imgAcquire.png'

export default function Magazine() {
  const { content } = useFetch('/home/Enterlide/magazine', {
    content: [],
  })

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>我与立得同行</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="magazine-container">
          <div className="d-flex magazine-lists">
            <CardColumns>
              {
                content.length ? content.map((item, index) => <Item key={index} data={item} />) : ''
              }
            </CardColumns>
          </div>
        </div>

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
        <img className="post-image" src={image} alt="图片" />
        <div className="d-flex">
          <h3 className="t">{title}</h3>
          {
            isIcon && <img alt="icon" />
          }
        </div>
        <p className="content">{summary}</p>
        <p className="date">{create_time}</p>
      </div>
    </Card>
  )
}
