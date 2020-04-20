import './timeline.scss'

export default function Timeline({ list = [] }) {
  return (
    <div className="container">
      <div id="timeline">
        {/* {
          list.length ? list.map((item, index) => (
            <div className="timeline-item">
              <div className="timeline-icon" />
              <div className="timeline-content">
                <h2>LOREM IPSUM DOLOR</h2>
              </div>
            </div>
          )) : null
        } */}
        <div className="timeline-item">
          <div className="timeline-icon" />
          <div className="timeline-content">
            <h2>LOREM IPSUM DOLOR</h2>
            <p>fafafafjafjlajlaj</p>
          </div>
        </div>

        {/* <div className="timeline-item">
          <div className="timeline-icon" />
          <div className="timeline-content right">
            <h2>LOREM IPSUM DOLOR</h2>
          </div>
        </div> */}
      </div>
    </div>
  )
}
