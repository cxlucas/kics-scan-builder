import { MainContext } from '../../../context/MainContext'
import { useContext } from 'react'
import { Input, Collapse } from 'antd'
const { TextArea } = Input
const { Panel } = Collapse

const MainStepFinish = () => {
  const { state } = useContext(MainContext)
  const isDocker = state.data.filter(
    (item) => item.flag === 'source' && item.flagAux === 'docker'
  )[0]
    ? true
    : false

  const writeSource = (data) => {
    const { value } = data

    if (isDocker) {
      return `docker pull checkmarx/kics:latest && docker run -v ${'c:/:/path'} checkmarx/kics:latest scan`
    } else {
      return `${value} scan`
    }
  }

  const specialFlags = [{ flag: 'source', func: writeSource }]

  const sortFlags = (data) => {
    let sortedData = []
    sortedData.push(data.find((item) => item.flag === 'source'))
    sortedData.push(data.find((item) => item.flag === 'path'))
    sortedData.push(data.find((item) => item.flag === 'queries-path'))
    sortedData.push(data.find((item) => item.flag === 'output-path'))
    sortedData = sortedData.filter((item) => item)
    sortedData = sortedData.concat(
      data.filter((item) => !['source', 'path', 'queries-path', 'output-path'].includes(item.flag))
    )
    return sortedData
  }

  const generateKicsOutput = () => {
    const kicsOutput = []
    const sortedData = sortFlags(state.data)

    sortedData.forEach((item) => {
      const isSpecial = specialFlags.find((specialFlag) => specialFlag.flag === item.flag)
      // 1. Check if the flag is special (custom function)
      if (isSpecial) {
        kicsOutput.push(isSpecial.func(item))
        // 2. Check if the flag is a enabled flag (not default or disabled)
      } else if (item.flagAux !== 'default' && item.flagAux !== 'disable') {
        // 3. Check if the flag is a binary flag (doesn't needs a value)
        if (item.flagAux === 'enable') {
          kicsOutput.push(`--${item.flag}`)
          // 4. Check if the flag is a normal flag (needs a value)
        } else {
          if (item.value === '' || item.value === []) {
            console.log('Flag needs a value: ', item.flag)
          }
          // 5. Check if the flag is an URL (git or http)
          if (item.flagAux === 'git') {
            kicsOutput.push(`--${item.flag} git::${item.value}`)
          } else if (item.flagAux === 'remote') {
            kicsOutput.push(`--${item.flag} ${item.value}`)
          } else {
            // 6. Check if the flag is a list of values
            if (Array.isArray(item.value)) {
              kicsOutput.push(`--${item.flag} ${item.value.join(',')}`)
            } else {
              kicsOutput.push(`--${item.flag} ${item.value}`)
            }
          }
        }
      }
    })
    return kicsOutput
  }

  const result = generateKicsOutput()

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <div>
        <h3>Generated Output (Flags):</h3>
        <TextArea
          showCount
          style={{ width: '100%' }}
          defaultValue={result ? result.join(' ') : ''}
          readOnly
        />
      </div>
      <Collapse defaultActiveKey={['0']} style={{ width: '100%' }}>
        <Panel header="View Kics Command Flags as List" key="1">
          <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '1em' }}>
            {state.data.length > 0 &&
              state.data.map((item) => (
                <div key={item.flag}>
                  <b>{item.flag}</b>:{' '}
                  {Array.isArray(item.value) ? item.value.join(',') : item.value}{' '}
                  <i>{item.flagAux && `(${item.flagAux})`}</i>
                </div>
              ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default MainStepFinish
