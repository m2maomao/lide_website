import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import videoImg from '@/assets/images/home/video.png'

import './player.scss'

export default function Player({ mp4 }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="player-container">
      <div className="player-cover" onClick={handleShow}>
        <img src={videoImg} alt="" />
        {/* <video id="video"> */}
        {/* https://www.w3schools.com/html/mov_bbb.mp4 */}
        {/* http://120.76.157.227:10001/uploads/20200409/deb5349699cc05dc7321a627989c396f.mp4 */}
        {/* <source
            src="http://120.76.157.227:10001/uploads/20200409/deb5349699cc05dc7321a627989c396f.mp4"
            type="video/mp4"
          /> */}
        {/* <source src={mp4} type="video/mp4" /> */}
        {/* </video> */}
        {/* {!show && <i className="pause-btn" />} */}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {/* <ReactPlayer url={mp4} width="100%" height="200" playing controls /> */}
          <video src={mp4} width="100%" height="260" preload="auto" autoPlay controls controlsList="nodownload" />
        </Modal.Body>
      </Modal>
    </div>
  )
}
