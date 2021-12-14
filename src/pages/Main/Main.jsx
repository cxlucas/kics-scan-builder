import React from 'react'
import { Row, Col } from 'antd'
import Steps from '../../components/Steps/Steps'
import MainStep1 from './MainSteps/MainStep1'
import MainStep2 from './MainSteps/MainStep2'
import MainStep3 from './MainSteps/MainStep3'
import MainStep4 from './MainSteps/MainStep4'
import MainStepFinish from './MainSteps/MainStepFinish'

const Main = () => {
  const stepsList = [
    {
      title: 'Base Scan*',
      content: <MainStep1 />
    },
    {
      title: 'Output Files',
      content: <MainStep2 />
    },
    {
      title: 'Output CLI',
      content: <MainStep3 />
    },
    {
      title: 'Scan Features',
      content: <MainStep4 />
    },
    {
      title: 'Finish',
      content: <MainStepFinish />
    }
  ]

  return (
    <Row justify="center">
      <Col className="gutter-row" xs={24} sm={24} md={22} lg={20} xl={18} xxl={16}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Steps stepsList={stepsList} />
        </div>
      </Col>
    </Row>
  )
}

export default Main
