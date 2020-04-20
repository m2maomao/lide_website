import { Row } from 'react-bootstrap'

import './cover.scss'

export default function Cover({ src }) {
  return (
    <Row className="m-cover">
      <img src={src} alt="cover" />
    </Row>
  )
}
