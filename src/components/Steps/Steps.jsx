import { useState } from 'react'
import { Steps as AntSteps, Button, message } from 'antd'
import styles from './steps.module.css'
import { Row } from 'antd'

const { Step } = AntSteps

const Steps = ({ stepsList }) => {
  const [current, setCurrent] = useState(0)

  const onChange = (selected) => {
    setCurrent(selected)
  }

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  return (
    <>
      <AntSteps current={current} onChange={onChange}>
        {stepsList.map((item) => (
          <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </AntSteps>

      <div className={styles.container}>
        <Row gutter={[16, 40]} className={styles.container}>
          {stepsList[current].content}
        </Row>
      </div>

      <div className="steps-action">
        {current < stepsList.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === stepsList.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  )
}

export default Steps
