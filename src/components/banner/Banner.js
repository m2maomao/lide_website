import { Carousel } from 'react-bootstrap'
import './banner.scss'

export default function Banner({ lists }) {
  return (
    <Carousel interval={3000} nextIcon={() => (<span aria-hidden="true" className="carousel-control-next-icon" />)}>
      {lists.length
        && lists.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={list.image} alt="banner" />
          </Carousel.Item>
        ))}
    </Carousel>
  )
}
