import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'

const MainStep4 = () => {
  return (
    <>
      <Box title="Log Level">
        <RadioGroup
          flag="log-level"
          defaultIndex={2}
          items={[
            { label: 'TRACE', value: 'TRACE', flagAux: 'TRACE', flag: 'log-level' },
            { label: 'DEBUG', value: 'DEBUG', flagAux: 'DEBUG', flag: 'log-level' },
            { label: 'INFO (default)', value: 'INFO', flagAux: 'INFO', flag: 'log-level' },
            { label: 'WARN', value: 'WARN', flagAux: 'WARN', flag: 'log-level' },
            { label: 'ERROR', value: 'ERROR', flagAux: 'ERROR', flag: 'log-level' },
            { label: 'FATAL', value: 'FATAL', flagAux: 'FATAL', flag: 'log-level' }
          ]}
        />
      </Box>

      <Box title="Log Path (output file)">
        <Input
          flag={'log-path'}
          flagAux={'local'}
          label="Log Output Path"
          placeholder="Complete path (including filename) to store the output log"
          description={'Example: c:\\scans-output\\scan.log'}
        />
      </Box>
    </>
  )
}

export default MainStep4
