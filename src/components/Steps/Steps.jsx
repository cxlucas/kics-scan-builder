import { useState } from 'react'
import { Steps as AntSteps, Button } from 'antd'
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

      <div className={styles.stepsAction}>
        <div className={styles.stepsAction}>
          {current > 0 && (
            <Button className={styles.button} onClick={() => prev()}>
              Previous Step
            </Button>
          )}

          {current < stepsList.length - 1 && (
            <Button className={styles.button} type="primary" onClick={() => next()}>
              Next Step
            </Button>
          )}
        </div>
        <Button
          className={styles.buttonFinish}
          type="primary"
          disabled={current === stepsList.length - 1}
          onClick={() => onChange(stepsList.length - 1)}>
          Finish
        </Button>
      </div>
    </>
  )
}

export default Steps
