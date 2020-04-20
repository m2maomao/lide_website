import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle, Timeline } from 'com'
import { useFetch } from '@/hooks/useFetch'


export default function History() {
  const { content } = useFetch('/home/Enterlide/devlopment', {
    content: [],
  })

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>发展历程</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content history-1r-content">
          <WTitle title="发展历程" enTitle="developmenthistory" />
          <div className="timeline">
            {/* <TimelineItem /> */}
            {/* <Timeline list={content} /> */}
            {
              content.length
                ? content.map((item, index) => <TimelineItem key={index} data={item} />) : null
            }
          </div>
        </div>
      </div>
    </>
  )
}

function TimelineItem({ data }) {
  const { year, context, img } = data
  return (
    <div className="d-flex time-line-item">
      <div className="d-flex content">
        <div className="icon" />
        <div className="year-image">
          <h3 className="year">{year}</h3>
          <img src={img} alt="images" />
        </div>
        <div className="event">
          <p>{context}</p>
        </div>
      </div>
    </div>
  )
}

// function TimelineItem() {
//   return (
//     <div className="d-flex time-line-item">
//       <div className="d-flex content">
//         <div className="icon" />
//         <div className="year-image">
//           <h3 className="year">year</h3>
//           <img alt="images" />
//         </div>
//         <div className="event">
//           <p>kafkhakfhak</p>
//         </div>
//       </div>

//     </div>
//   )
// }
