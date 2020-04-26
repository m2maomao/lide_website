import { useState } from 'react'
import {
  Link, Route, useLocation, useHistory, useRouteMatch,
} from 'react-router-dom'
import {
  Row, Col, Accordion, Card, useAccordionToggle,
} from 'react-bootstrap'
import { Cover, Side } from 'com'
import { useFetch } from '@/hooks/useFetch'

import coverImg from '@/assets/images/products/banner.png'
import productIndex from '@/assets/images/products/product_index.png'

import ProductList from './ProductList'
import Detail from './Detail'
import Market from './Market'

import './products.scss'

export default function Products() {
  const { pathname } = useLocation()
  const { isExact } = useRouteMatch()
  const history = useHistory()

  const [idx, setIdx] = useState(0)
  const [lists, setLists] = useState([])
  const [secodeName, setName] = useState('')

  const { content, marketService } = useFetch('/home/Production/index', {
    content: [],
    marketService: [],
  })

  function changeCls(path) {
    const cls = pathname.includes(path) ? 'arch-item active' : 'arch-item'
    return cls
  }

  function handleClick(eventKey, firstName) {
    setIdx(eventKey)
    if (firstName === '市场服务') {
      history.push('/products/market')
    }
  }

  function handleOnClick(item) {
    // console.log(item)
    if (!item.secodeName.includes('系统')) {
      history.push('/products')
    }
    setName(item.secodeName)
    setLists(item.children)
  }

  return (
    <div className="products-container">
      <Cover src={coverImg} />
      <Row style={{ background: '#f7f7f7' }}>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={3}>
              <Side title="产品与服务">
                <Accordion defaultActiveKey="0">
                  {
                    content.length ? content.map((item, index) => (
                      <div key={index}>
                        <Accordion.Toggle
                          as={Card.Header}
                          className={`${index === idx ? 'active' : ''}`}
                          eventKey={`${index}`}
                        >
                          <div
                            onClick={() => handleClick(index, item.firstName)}
                          >
                            {item.firstName}
                          </div>
                        </Accordion.Toggle>
                        {
                          item.firstChildren
                            ? item.firstChildren.map((item, idx) => (
                              <Accordion.Collapse key={idx} eventKey={`${index}`}>
                                <Card.Body>
                                  <div
                                    className={`${item.secodeName === secodeName ? 'active' : ''}`}
                                    onClick={() => handleOnClick(item)}
                                  >
                                    {item.secodeName}
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            )) : ''
                        }

                      </div>
                    )) : ''
                  }
                </Accordion>
              </Side>
              <img className="products-index" src={productIndex} alt="" />
            </Col>
            <Col sm={9}>
              <div className="products-main-body">
                {
                  isExact
                    ? <ProductList data={lists} />
                    : (
                      <>
                        {
                          pathname.includes('/market')
                            ? (
                              <Route
                                path="/products/market"
                                render={(prop) => <Market data={marketService} {...prop} />}
                              />
                            )
                            : <Route path="/products/:id" component={Detail} />
                        }
                      </>
                    )
                }
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
