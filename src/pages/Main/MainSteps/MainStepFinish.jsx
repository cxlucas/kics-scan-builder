import { MainContext } from '../../../context/MainContext'
import React, { useState, useContext, useEffect } from 'react'
import styles from './mainstepfinish.module.css'
import { Row, Col, Divider, Input, Collapse, Button, message } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import lodash from 'lodash'
const { TextArea } = Input
const { Panel } = Collapse

const FLAGS_WITH_PATH = ['source', 'path', 'queries-path', 'output-path', 'log-path']
const DOCKER_PATH = '/path'

const MainStepFinish = () => {
  const { state } = useContext(MainContext)
  const [errorList, setErrorList] = useState([])
  const [result, setResult] = useState([])

  const isDocker = state.data.filter(
    (item) => item.flag === 'source' && item.flagAux === 'docker'
  )[0]
    ? true
    : false

  const writeSource = (data, commonPath) => {
    const { value } = data

    if (isDocker) {
      return `docker pull checkmarx/kics:latest && docker run -v "${commonPath}/:${DOCKER_PATH}" checkmarx/kics:latest scan`
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
    sortedData.push(data.find((item) => item.flag === 'log-path'))
    sortedData = sortedData.filter((item) => item)
    sortedData = sortedData.concat(data.filter((item) => !FLAGS_WITH_PATH.includes(item.flag)))
    return sortedData
  }

  // This functions replaces "data" (object) properties by applying docker path pattern to necessary flags
  const replacePathFlagsToDockerPattern = (data, commonPath) => {
    const setPathPattern = (path) => path.replace(/[\\]/g, '/')
    const setDockerPatternToPath = (path) => '"' + path.replace(commonPath, DOCKER_PATH) + '"'

    data.forEach((flag) => {
      if (FLAGS_WITH_PATH.includes(flag.flag) && flag.flagAux === 'local') {
        if (Array.isArray(flag.value))
          flag.value = flag.value
            .map((path) => setPathPattern(path.toLowerCase()))
            .map((path) => setDockerPatternToPath(path))
        else flag.value = setDockerPatternToPath(setPathPattern(flag.value.toLowerCase()))
      }
    })
    return data
  }

  const getCommonPath = (data) => {
    const getPathFlagsValues = data
      .filter(
        (data) => FLAGS_WITH_PATH.includes(data.flag) && data.value && data.flagAux === 'local'
      ) // filter only flags with value
      .map((data) => data.value) // map only value (string or array)
      .flat() // flatten array
      .map((path) => path.toLowerCase().replace(/[\\]/g, '/')) // replace \ to / (to generate the same pattern)

    if (getPathFlagsValues.length === 0) return { isCommonPath: true, commonPath: '' }

    const commonPath = getPathFlagsValues[0].split('/')[0]
    const isCommonPath = getPathFlagsValues.every((path) => path.split('/')[0] === commonPath)
    return { isCommonPath, commonPath }
  }

  const generateKicsOutput = () => {
    const kicsOutput = []

    // Sort flags by pretty order
    const sortedFlags = sortFlags(lodash.cloneDeep(state.data))

    // Check if all provided paths are valid (must have a common root folder, such as c:\ or /home)
    const { isCommonPath, commonPath } = getCommonPath(sortedFlags)
    if (!isCommonPath) {
      setErrorList([
        ...errorList,
        'All the provided flags that target to local path(s) should have a common base root path. Check if the provided paths are valid and have the full path to file/folder. Example: All the provided paths start with "C:\\" or "/home/"'
      ])
    }

    // Replace path flags to docker pattern
    const sortedData = replacePathFlagsToDockerPattern(sortedFlags, commonPath)

    // Generate kics command by iterating over flags
    sortedData.forEach((item) => {
      // 1. Block flag is it's default value or disabled
      if (['default', 'disable'].includes(item.flagAux)) {
        return null
      }

      // 2. Check if the flag is special (custom function)
      const isSpecial = specialFlags.find((specialFlag) => specialFlag.flag === item.flag)
      if (isSpecial) {
        return kicsOutput.push(isSpecial.func(item, commonPath))
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
        return kicsOutput.push(`--${item.flag} "git::${item.value}"`)
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
        {errorList.length === 0 ? (
          <Row gutter={[16, 8]} className={styles.container}>
            <Col xs={24}>
              <h3>Kics Command (Generated Output)</h3>
              <Divider />
            </Col>
            <Col xs={24}>
              <span className={styles.actionTitle}>
                <b>Complete Command</b> (pull latest kics image & run kics scan)
              </span>
              <div className={styles.actionDiv}>
                <TextArea showCount style={{ width: '100%' }} value={result.join(' ')} readOnly />
                <Button
                  type="primary"
                  size="large"
                  style={{ maxWidth: '15em' }}
                  icon={<CopyOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(result.join(' '))
                    message.success('Kics Command copied to clipboard!')
                  }}>
                  Copy to clipboard
                </Button>
              </div>
            </Col>
            <Divider />
            <Col xs={24}>
              <span className={styles.actionTitle}>
                <b>Kics Command Only</b> (when kics image has been pulled previously)
              </span>
              <div className={styles.actionDiv}>
                <TextArea
                  showCount
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  style={{ width: '100%' }}
                  value={result.join(' ').split(' && ')[1]}
                  readOnly
                />
                <Button
                  type="primary"
                  size="large"
                  style={{ maxWidth: '15em' }}
                  icon={<CopyOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(result.join(' ').split(' && ')[1])
                    message.success('Kics Command copied to clipboard!')
                  }}>
                  Copy to clipboard
                </Button>
              </div>
            </Col>
            { /* TODO: Convert flags to JSON and/or YML and export to file */ }
            { /* <Divider />
              <Col xs={24}>
                <div className={styles.actionDiv}>
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
              </Col>
            */ }
          </Row>
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
