import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { Banner } from 'com'
import './market.scss'

export default function Market({ data = [] }) {
  console.log('data is:', data)

  const [topData, midData, bottomData] = data
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">产品与服务</li>
        <Breadcrumb.Item active>市场服务</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div className="market-container">
          {
            topData
              ? (
                <div className="bottom top">
                  <Title
                    title={bottomData.title}
                    enTitle="Major technical service projects include"
                  />
                  <div className="d-flex">
                    <div className="inner-carousel">
                      <Banner lists={topData.images} />
                    </div>
                    <div className="sum">
                      <Title
                        isCenter={false}
                        title={topData.title}
                        enTitle="Market Technology Services"
                      />
                      <p>{topData.summary}</p>
                    </div>
                  </div>
                </div>
              )
              : ''
          }
          <div className="borders" />
          <div className="middle">
            {
              midData ? (
                <>
                  <Title
                    title={midData.title}
                    enTitle="Professional team with Best PE Experts"
                  />
                  <div className="d-flex experts">
                    <div className="experts-items">
                      <img src={midData.images[0].image} alt={midData.title} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[0]}
                      </h3>
                    </div>
                    <div className="experts-items">
                      <img src={midData.images[1].image} alt={midData.title} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[1]}
                      </h3>
                    </div>
                    <div className="experts-items">
                      <img src={midData.images[2].image} alt={midData.title} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[2]}
                      </h3>
                    </div>
                  </div>
                </>
              ) : ''
            }
          </div>
          <div className="borders" />
          {
            bottomData
              ? (
                <div className="bottom">
                  <Title
                    title={bottomData.title}
                    enTitle="Major technical service projects include"
                  />
                  <div className="d-flex">
                    <ul className="ul">
                      {
                        bottomData.summary.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      }
                    </ul>
                    <div className="inner-carousel">
                      <Banner lists={bottomData.images} />
                    </div>
                  </div>
                </div>
              )
              : ''
          }

        </div>
      </div>
    </>
  )
}


function Title({ title = '', enTitle = '', isCenter = true }) {
  return (
    <div className="t-t">
      <h3
        className="ch"
        style={{ textAlign: `${isCenter ? 'center' : 'left'}` }}
      >
        {title}
      </h3>
      <p
        className="en"
        style={{ textAlign: `${isCenter ? 'center' : 'left'}` }}
      >
        {enTitle.toUpperCase()}
      </p>
    </div>
  )
}
