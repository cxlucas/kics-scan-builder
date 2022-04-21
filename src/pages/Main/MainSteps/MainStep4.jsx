import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'

const MainStep3 = () => {
  return (
    <>
      <Box title="Minimal UI">
        <RadioGroup
          flag="minimal-ui"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'minimal-ui',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'minimal-ui', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="No Progress">
        <RadioGroup
          flag="no-progress"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'no-progress',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'no-progress', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Preview Lines">
        <RadioGroup
          flag="preview-lines"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'preview-lines',
              flagAux: null,
              children: (
                <Input
                  flag="preview-lines"
                  flagAux={null}
                  placeholder={'Number of lines to be display in CLI results (min: 1, max: 30)'}
                  label={'Nº of Lines'}
                  description={'Number of lines to be display in CLI results (min: 1, max: 30)'}
                  defaultValue={'3'}
                />
              )
            },
            { label: 'Disable', flag: 'preview-lines', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="No Color">
        <RadioGroup
          flag="no-color"
          defaultIndex={1}
          items={[
            {
              label: 'Enable',
              flag: 'no-color',
              flagAux: 'enable'
            },
            { label: 'Disable', flag: 'no-color', flagAux: 'disable' }
          ]}
        />
      </Box>
      <Box title="Output Style">
        <RadioGroup
          flag="custom-cli-01"
          defaultIndex={0}
          items={[
            {
              flag: 'custom-cli-01',
              flagAux: 'default',
              label: 'Default'
            },
            {
              flag: 'custom-cli-01',
              flagAux: 'silent',
              label: 'Silent'
            },
            {
              flag: 'custom-cli-01',
              flagAux: 'verbose',
              label: 'Verbose'
            }
          ]}
        />
      </Box>
    </>
  )
}

export default MainStep3
