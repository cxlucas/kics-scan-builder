import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'

const MainStep4 = () => {
  return (
    <>
      <Box title="Exclude Severities">
        <RadioGroup
          flag="exclude-severities"
          defaultIndex={0}
          items={[
            {
              label: 'Info',
              flag: 'exclude-severities',
              flagAux: 'info'
            },
            { label: 'Low', flag: 'exclude-severities', flagAux: 'low' },
            { label: 'Medium', flag: 'exclude-severities', flagAux: 'medium' },
            { label: 'High', flag: 'exclude-severities', flagAux: 'high' }
          ]}
        />
      </Box>
      <Box title="Include Bill of Materials">
        <RadioGroup
          flag="bom"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'bom',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'bom', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Custom Query Timeout">
        <RadioGroup
          flag="timeout"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'timeout',
              flagAux: 'enable',
              children: (
                <Input
                  flag="preview-lines"
                  flagAux={null}
                  placeholder={'number of seconds the query has to execute before being canceled'}
                  label={'Nº of Seconds'}
                  description={'Number of seconds the query has to execute before being canceled)'}
                  defaultValue={'60'}
                />
              )
            },
            { label: 'Disable', flag: 'timeout', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Disable Secrets">
        <RadioGroup
          flag="disable-secrets"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'disable-secrets',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'disable-secrets', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Disable Full Description">
        <RadioGroup
          flag="disable-full-descriptions"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'disable-full-descriptions',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'disable-full-descriptions', flagAux: 'disable' }
          ]}
        />
      </Box>
    </>
  )
}

export default MainStep4
