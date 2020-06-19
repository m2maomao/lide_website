import {
  useState, useEffect, useCallback, useRef,
} from 'react'
import {
  Link, Route, useLocation, useHistory, useRouteMatch,
} from 'react-router-dom'
import {
  Row, Col, Accordion, Card, useAccordionToggle,
} from 'react-bootstrap'
import { Cover, Side } from 'com'
import { useFetch } from '@/hooks/useFetch'

import coverImg from '@/assets/images/products/banner.png'
import coverImgEn from '@/assets/images/products/banner_en.png'
import productIndex from '@/assets/images/products/product_index.png'
import productIndexEn from '@/assets/images/products/product_index_en.png'

import http from '@/axios/http'
import '@/axios/config'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import ProductList from './ProductList'
import Detail from './Detail'
import Market from './Market'
import Indexes from './Indexes'

import './products.scss'

export default function Products({ t }) {
  const { pathname } = useLocation()
  const { isExact } = useRouteMatch()
  const history = useHistory()

  const [idx, setIdx] = useState(0)
  const [lists, setLists] = useState([])
  const [changeFirstName, setChangeFirstName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secodeName, setName] = useState('')

  const { content, marketService } = useFetch('/home/Production/index', {
    content: [],
    marketService: [],
  })

  const [searchValue, setSearchValue] = useState(null)
  const search = (sv) => {
    setSearchValue(sv)
    http.get(`/home/Production/search?search=${sv}`).then((res) => {
      if (res.status === 200) {
        setLists(res.data.Product)
      }
    })
  }

  const isInBottomRef = useRef(null)
  const loadMore = () => isInBottomRef.current.loadMore()
  const handleOnDocumentBottom = useCallback(() => {
    console.log(`I am at bottom! ${Math.round(performance.now())}`)
    loadMore()
  }, [])

  /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  useBottomScrollListener(handleOnDocumentBottom)

  useEffect(() => {
    search(searchValue)
  }, [searchValue])

  function changeCls(path) {
    const cls = pathname.includes(path) ? 'arch-item active' : 'arch-item'
    return cls
  }

  function handleClick(eventKey, firstName) {
    setIdx(eventKey)
    setChangeFirstName(firstName)
    if (firstName === t('mservice')) {
      history.push('/products/market')
    }
  }

  function handleOnClick(item) {
    // console.log(item)
    // if (!item.secodeName.includes('系统')) {
    history.push('/products')
    // }
    setFirstName(changeFirstName)
    setName(item.secodeName)
    setLists(item.children)
  }

  function handleClickPreview(download) {
    window.open(download)
  }

  useEffect(() => {
    if (content[0]) {
      console.log('content[0]', content[0])
      setChangeFirstName(content[0].firstName)
      setFirstName(content[0].firstName)
      setName(content[0].firstChildren[0].secodeName)
      setLists(content[0].firstChildren[0].children)
    }
  }, [content])

  useEffect(() => {
    console.log('history::::::', history)
    if (history.location.state) {
      setSearchValue(history.location.state.sv)
    }
  }, [history.location.state])
  return (
    <div className="products-container">
      <Cover src={localStorage.getItem('i18nextLng') !== 'en'
        ? coverImg : coverImgEn}
      />
      <Row style={{ background: '#f7f7f7' }}>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={3}>
              <Side title={t('product')}>
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
              <Link to="/products/indexes">
                <img
                  className="products-index"
                  src={localStorage.getItem('i18nextLng') !== 'en'
                    ? productIndex : productIndexEn}
                  alt=""
                />
              </Link>
            </Col>
            <Col sm={9}>
              <div className="products-main-body">
                {
                  isExact
                    ? <ProductList t={t} search={search} data={lists} secondName={secodeName} firstName={firstName} isInBottomRef={isInBottomRef} />
                    : (
                      <>
                        {
                          pathname.includes('/indexes')
                            ? (
                              <Route
                                path="/products/indexes"
                                render={(prop) => <Indexes t={t} search={search} data={[]} isInBottomRef={isInBottomRef} {...prop} />}
                              />
                            )
                            : (
                              <>
                                {
                                pathname.includes('/market')
                                  ? (
                                    <Route
                                      path="/products/market"
                                      render={(prop) => <Market t={t} data={marketService} {...prop} />}
                                    />
                                  )
                                  : (
                                    <Route
                                      path="/products/:id"
                            // component={Detail}
                                      render={(prop) => <Detail t={t} data={[lists]} {...prop} />}
                                    />
                                  )
                              }
                              </>
                            )
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
