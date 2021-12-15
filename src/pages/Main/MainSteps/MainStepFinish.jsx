import { MainContext } from '../../../context/MainContext'
import React, { useState, useContext, useEffect } from 'react'
import styles from './mainstepfinish.module.css'
import { Input, Collapse, Button, message } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'
const { TextArea } = Input
const { Panel } = Collapse

const MainStepFinish = () => {
  const { state } = useContext(MainContext)
  const [errorList, setErrorList] = useState([])
  const [result, setResult] = useState([])

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
      if (!value) {
        setErrorList([
          ...errorList,
          'The field "Source" needs a value to build kics command. Please, fill it on "Base Scan" tab.'
        ])
        return null
      }
      return `${value} scan`
    }
  }

  const writeCustomCLI01 = (data) => {
    const { flagAux } = data

    switch (flagAux) {
      case 'verbose':
        return `--verbose`
      case 'silent':
        return `--silent`
      default:
        return null
    }
  }

  const specialFlags = [
    { flag: 'source', func: writeSource },
    { flag: 'custom-cli-01', func: writeCustomCLI01 }
  ]

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
      // 1. Block flag is it's default value or disabled
      if (['default', 'disable'].includes(item.flagAux)) {
        return null
      }

      // 2. Check if the flag is special (custom function)
      const isSpecial = specialFlags.find((specialFlag) => specialFlag.flag === item.flag)
      if (isSpecial) {
        return kicsOutput.push(isSpecial.func(item))
      }

      // 3. Check if the flag is a binary flag (doesn't needs a value)
      if (item.flagAux === 'enable') {
        return kicsOutput.push(`--${item.flag}`)
      }

      // 4. Check if the flag is a normal flag (needs a value)
      if (item.value === '' || (Array.isArray(item.value) && item.value.length === 0)) {
        if (item.required) {
          setErrorList([
            ...errorList,
            `The flag "${item.flag}" needs a value to build kics command. Please, fill it on "Base Scan" tab.`
          ])
        }
        return null
      }

      // 5. Check if the flag is an URL (git)
      if (item.flagAux === 'git') {
        return kicsOutput.push(`--${item.flag} git::${item.value}`)
      }

      // 6. Check if the flag is an array or string
      if (Array.isArray(item.value)) {
        return kicsOutput.push(`--${item.flag} ${item.value.join(',')}`)
      } else {
        return kicsOutput.push(`--${item.flag} ${item.value}`)
      }
    })
    return kicsOutput
  }

  useEffect(() => {
    setResult(generateKicsOutput())
  }, [])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <div>
        <h3>Kics Command (Generated Output):</h3>
        {errorList.length === 0 ? (
          <>
            <TextArea
              showCount
              style={{ width: '100%' }}
              value={result.join(' ')}
              autoSize={{ minRows: 4 }}
              readOnly
            />
            <div className={styles.actionDiv}>
              <Button
                className={styles.buttonCopy}
                type="primary"
                size="large"
                icon={<CopyOutlined />}
                onClick={() => {
                  navigator.clipboard.writeText(result.join(' '))
                  message.success('Kics Command copied to clipboard!')
                }}>
                Copy to clipboard
              </Button>
              <Button
                className={styles.buttonDownload}
                type="outline"
                icon={<DownloadOutlined />}
                size="large"
                onClick={() => {
                  message.loading('Starting download...')
                }}>
                Download Scan Config
              </Button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            {errorList.map((error, index) => (
              <span key={index}>
                <span className={styles.errorTag}>[Required Field] </span>
                {error}
              </span>
            ))}
          </div>
        )}
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
