import React from 'react'
import styles from './main.module.css'
import { Row, Col } from 'antd'
import Steps from '../../components/Steps/Steps'

const Main = () => {
  return (
    <Row gutter={[16, 24]} justify="center">
      <Col className="gutter-row" xs={24} sm={24} md={20} lg={16} xl={16} xxl={16}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Steps />
          <div className={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Main
