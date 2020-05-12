import { Carousel } from 'react-bootstrap'
import { getImage } from '@/assets/js/lib'
import './banner.scss'

export default function Banner({ lists }) {
  return (
    <Carousel interval={3000}>
      {lists.length > 0
        && lists.map((list, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={getImage(list.image)} alt="banner" />
          </Carousel.Item>
        ))}
    </Carousel>
  )
}
