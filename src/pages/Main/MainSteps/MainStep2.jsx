import Box from '../../../components/Box/Box'
//import RadioGroup from '../../../components/RadioGroup/RadioGroup'
//import Input from '../../../components/Input/Input'
import CheckGroup from '../../../components/CheckGroup/CheckGroup'

const MainStep2 = () => {
  return (
    <>
      <Box title="Output File(s) / Report Formats">
        <CheckGroup
          flag="report-formats"
          items={[
            { label: 'JSON', value: 'json' },
            { label: 'PDF', value: 'pdf' },
            { label: 'HTML', value: 'html' },
            { label: 'SARIF (JSON)', value: 'sarif' },
            { label: 'JUNIT', value: 'junit' },
            { label: 'SONARQUBE', value: 'sonarqube' },
            { label: 'GLSAST', value: 'glsast' }
          ]}
        />
      </Box>
    </>
  )
}

export default MainStep2
