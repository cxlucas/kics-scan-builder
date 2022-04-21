import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'
import CheckGroup from '../../../components/CheckGroup/CheckGroup'
import { platforms } from '../../../constants/constants'

const MainStep4 = () => {
  const platformList = platforms.map((platform) => {
    return { label: platform, value: platform }
  })
  return (
    <>
      <Box title="Scan Platforms">
        <CheckGroup flag="type" items={platformList} />
      </Box>
      <Box title="Exclude Severities">
        <CheckGroup
          flag="exclude-severities"
          items={[
            { label: 'Info', value: 'info' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' }
          ]}
        />
      </Box>
      <Box title="Include Bill of Materials (BoM)">
        <RadioGroup
          flag="bom"
          defaultIndex={1}
          items={[
            {
              label: 'Yes',
              flag: 'bom',
              flagAux: 'enable'
            },
            { label: 'No', flag: 'bom', flagAux: 'disable' }
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
                  flag="timeout"
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
              label: 'Yes',
              flag: 'disable-secrets',
              flagAux: 'enable'
            },
            { label: 'No', flag: 'disable-secrets', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Disable Full Description">
        <RadioGroup
          flag="disable-full-descriptions"
          defaultIndex={1}
          items={[
            {
              label: 'Yes',
              flag: 'disable-full-descriptions',
              flagAux: 'enable'
            },
            { label: 'No', flag: 'disable-full-descriptions', flagAux: 'disable' }
          ]}
        />
      </Box>
    </>
  )
}

export default MainStep4
