import { useState } from 'react'
import {
  Link, Route, useRouteMatch, useHistory,
} from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'


import arrowLeft from '@/assets/images/responsibility/arrow-left.png'
import arrowRight from '@/assets/images/responsibility/arrow-right.png'
import { getImage } from '@/assets/js/lib'
import Detail from './Detail'

export default function Staff({ t }) {
  const { isExact } = useRouteMatch()
  const history = useHistory()
  const [idx, setIdx] = useState(0)

  const { list } = useFetch('/home/Responsibility/employee', {
    list: [],
  })


  function handleClick(idx) {
    setIdx(idx)
  }

  function handleLeft() {
    if (idx <= 0) return
    setIdx(idx - 1)
  }

  function handleRight() {
    if (idx === list.length - 1) return
    setIdx(idx + 1)
  }

  function handleJump(id) {
    history.push(`/responsibility/staff/${id}`)
    // console.log('id is:', id)
  }

  return (
    <>
      {
        isExact ? (
          <>
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link to="/">{t('home')}</Link>
              </li>
              <li className="breadcrumb-item">{t('positions')}</li>
              <Breadcrumb.Item active>{t('employee')}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="responsibility-main-container">
              <div className="r-main-container">
                <div className="report-lists">
                  <ul>
                    <StaffOpen
                      title={list.length ? list[idx].title : ''}
                      create_time={list.length ? list[idx].create_time : ''}
                      image={list.length ? getImage(list[idx].image) : ''}
                      summary={list.length ? list[idx].summary : ''}
                      leftClick={handleLeft}
                      rightClick={handleRight}
                    />
                    {list.length
                      ? list.map((item, index) => (
                        <ReportItem
                          t={t}
                          key={item.id}
                          data={item}
                          onClick={() => handleClick(index)}
                          jump={() => handleJump(item.id)}
                        />
                      ))
                      : ''}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link to="/">{t('home')}</Link>
              </li>
              <li className="breadcrumb-item">{t('positions')}</li>
              <li className="breadcrumb-item">
                <Link to="/responsibility/staff">{t('employee')}</Link>
              </li>
              <Breadcrumb.Item active>{t('employeedetail')}</Breadcrumb.Item>
            </Breadcrumb>
            <Route path="/responsibility/staff/:id" render={(prop) => <Detail t={t} />} />
          </>
        )
      }
    </>

  )
}


function StaffOpen({
  title, create_time, image, summary, leftClick, rightClick,
}) {
  return (
    <li className="staff-open">
      <img src={image} className="o-cover" alt="封面图" />
      <div className="open-container">
        <div className="o-header">
          <h3 className="o-title">{title}</h3>
          <p className="o-date">{create_time}</p>
          <div className="o-content">
            <div
              dangerouslySetInnerHTML={{
                __html: summary,
              }}
            />
          </div>
          <div className="side-btn">
            <button type="button" onClick={leftClick}>
              <img src={arrowLeft} alt="left" />
            </button>
            <button type="button" onClick={rightClick}>
              <img src={arrowRight} alt="right" />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

function ReportItem({
  data, onClick, jump, t,
}) {
  const { title, create_time } = data
  return (
    <li className="d-flex report-item" onClick={jump}>
      <div className="t">
        <h3 className="t-t">{title}</h3>
        <span className="format">{create_time}</span>
      </div>
      <div className="options">
        <button type="button" className="read-btn">{t('readdetail')}</button>
      </div>
    </li>
  )
}
