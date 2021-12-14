import React from 'react'
//import styles from './main.module.css'
import { Row, Col } from 'antd'
import Steps from '../../components/Steps/Steps'
import MainStep1 from './MainSteps/MainStep1'
import MainStep2 from './MainSteps/MainStep2'

const Main = () => {
  const stepsList = [
    {
      title: 'Base Scan',
      description: 'Required',
      content: <MainStep1 />
    },
    {
      title: 'Base Scan',
      description: 'Optional',
      content: <MainStep2 step={2} />
    },
    {
      title: 'Output Files',
      description: 'Optional',
      content: <MainStep2 step={3} />
    },
    {
      title: 'Output CLI',
      description: 'Optional',
      content: <MainStep2 step={4} />
    },
    {
      title: 'Scan Features',
      description: 'Optional',
      content: <MainStep2 step={5} />
    },
    {
      title: 'General Features',
      description: 'Optional',
      content: <MainStep2 step={6} />
    },
    {
      title: 'Finish',
      content: <MainStep2 step={7} />
    }
  ]

  return (
    <Row justify="center">
      <Col className="gutter-row" xs={24} sm={24} md={20} lg={16} xl={16} xxl={16}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Steps stepsList={stepsList} />
        </div>
      </Col>
    </Row>
  )
}

export default Main
