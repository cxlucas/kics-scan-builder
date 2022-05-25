import React from 'react'
import { Row, Col } from 'antd'
import Steps from '../../components/Steps/Steps'
import MainStep1 from './MainSteps/MainStep1'
import MainStep2 from './MainSteps/MainStep2'
import MainStep3 from './MainSteps/MainStep3'
import MainStep4 from './MainSteps/MainStep4'
import MainStep5 from './MainSteps/MainStep5'
import MainStepFinish from './MainSteps/MainStepFinish'
import styles from './main.module.css'

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
      title: 'Log Files',
      content: <MainStep3 />
    },
    {
      title: 'Output CLI',
      content: <MainStep4 />
    },
    {
      title: 'Scan Features',
      content: <MainStep5 />
    },
    {
      title: 'Finish',
      content: <MainStepFinish />
    }
  ]

  return (
    <Row justify="center" className={styles.mainContainer}>
      <Col className="gutter-row" xs={24} sm={24} md={22} lg={20} xl={18} xxl={16}>
        <Steps stepsList={stepsList} />
      </Col>
    </Row>
  )
}

export default Main
