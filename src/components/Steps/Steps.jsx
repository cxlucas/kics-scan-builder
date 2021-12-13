import { Steps as AntSteps } from 'antd'

const { Step } = AntSteps

const Steps = () => {
  return (
    <AntSteps direction="horizontal" current={0}>
      <Step title="Base Scan" description="Required" />
      <Step title="Output Files" description="Optional" />
      <Step title="Output CLI" description="Optional" />
      <Step title="Scan Features" description="Optional" />
      <Step title="General Features" description="Optional" />
      <Step title="Finish" />
    </AntSteps>
  )
}

export default Steps
