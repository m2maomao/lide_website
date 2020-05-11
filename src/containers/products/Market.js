import { Link } from 'react-router-dom'
import { Breadcrumb, Carousel } from 'react-bootstrap'
import { Banner } from 'com'
import './market.scss'
import { useState, useEffect } from 'react'
import { getImage } from '@/assets/js/lib'

export default function Market({ data = [], t }) {
  console.log('data is:', data)

  const [topData, midData, bottomData] = data

  const [listCurrentIndex, setListCurrentIndex] = useState(0)

  // useEffect(() => {
  //   setListTotalIndex([])
  //   if (midData && midData.images.length) {
  //     midData.images.map((list, index) => (
  //       // index % 3 === 0 ? setListTotalIndex(listTotalIndex.concat(index)) : ''
  //       index % 3 === 0 ? (
  //         setListTotalIndex(listTotalIndex.concat(index)),
  //         setMiddle1Images(middle1.concat(list.image))
  //         // index % 3 === 1 ? setMiddle2Images(middle2.concat(list)) : '',
  //         // index % 3 === 2 ? setMiddle3Images(middle3.concat(list)) : ''
  //       ) : ''
  //       // (index % 3 === 1 ? setMiddle2Images(middle2.concat(list)) : '')
  //       // (index % 3 === 2 ? setMiddle3Images(middle3.concat(list)) : '')
  //     ))
  //   }
  // }, [midData])

  const handleSelect = (selectedIndex) => {
    setListCurrentIndex(selectedIndex)
  }

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('product')}</li>
        <Breadcrumb.Item active>{t('mservice')}</Breadcrumb.Item>
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
                      {/* <Carousel interval={3000} indicators={false}>
                        {topData.images.length
        && topData.images.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-80" src={list.image} alt="banner" />
          </Carousel.Item>
        ))}
                      </Carousel> */}
                      <TopBottomBanner lists={topData.images} />
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
                      {/* <MiddleBanner lists={middle1} listCurrentIndex={listCurrentIndex} /> */}
                      <MiddleBanner lists={midData.images[0]} alt={midData.title} listCurrentIndex={listCurrentIndex} setListCurrentIndex={setListCurrentIndex} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[0]}
                      </h3>
                    </div>
                    <div className="experts-items">
                      <MiddleBanner lists={midData.images[1]} alt={midData.title} listCurrentIndex={listCurrentIndex} setListCurrentIndex={setListCurrentIndex} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[1]}
                      </h3>
                    </div>
                    <div className="experts-items">
                      <MiddleBanner lists={midData.images[2]} listCurrentIndex={listCurrentIndex} setListCurrentIndex={setListCurrentIndex} />
                    </div>
                    <div className="experts-items">
                      <h3 className="exports-text">
                        {midData.summary[2]}
                      </h3>
                    </div>
                  </div>
                  <div className="d-flex">
                    <ol className="indicators">
                      {
                         midData.images.map((list, index) => (
                           index === 0 ? list.map((list, index) => (
                             <li className={index === listCurrentIndex ? 'banner-circle active' : 'banner-circle'} onClick={() => handleSelect(index)} />
                           )) : ''
                         ))
                      }
                      {/* <li className="banner-circle active" />
                      <li className="banner-circle" />
                      <li className="banner-circle" />
                      <li className="banner-circle" /> */}
                    </ol>
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
                      {/* <Carousel interval={3000} indicators={false}>
                        {bottomData.images.length
        && bottomData.images.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-80" src={list.image} alt="banner" />
          </Carousel.Item>
        ))}
                      </Carousel> */}
                      <TopBottomBanner lists={bottomData.images} />
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

function MiddleBanner({ lists, listCurrentIndex, setListCurrentIndex }) {
  return (
    <Carousel activeIndex={listCurrentIndex} onSelect={setListCurrentIndex} interval={3000} indicators={false} nextIcon={<span aria-hidden="true" />} prevIcon={<span aria-hidden="true" />}>
      {lists.length
        && lists.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-80" src={getImage(list.image)} alt="banner" />
          </Carousel.Item>
        ))}
    </Carousel>
  )
}


function TopBottomBanner({ lists }) {
  return (
    <Carousel interval={null} indicators={false}>
      {lists.length
        && lists.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-80" src={getImage(list.image)} alt="banner" />
          </Carousel.Item>
        ))}
    </Carousel>
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
