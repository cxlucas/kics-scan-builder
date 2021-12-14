import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'

const MainStep1 = () => {
  return (
    <>
      <Box title="Kics Source">
        <RadioGroup
          items={[
            {
              label: 'Local',
              value: 'local',
              children: (
                <Input
                  placeholder={'KICS Binary complete path'}
                  label={'Kics Path'}
                  description={'Example: c:\\kics\\1.4.7\\kics.exe'}
                />
              )
            },
            { label: 'Docker', value: 'docker' }
          ]}
        />
      </Box>
      <Box title="Target Scan">
        <RadioGroup
          defaultIndex={1}
          items={[
            {
              label: 'File(s) / Folder(s)',
              value: 'files'
            },
            {
              label: 'Git Repository',
              value: 'git',
              children: (
                <Input
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
                />
              )
            },
            {
              label: 'Remote URL (http/https)',
              value: 'remote',
              children: (
                <Input
                  placeholder={'File URL'}
                  label={'File URL'}
                  description={'Example: https://example.com/project-source.zip'}
                />
              )
            }
          ]}
        />
      </Box>

      <Box title="Queries Location">
        <RadioGroup
          items={[
            {
              label: 'Default (same as Kics source)',
              value: 'default'
            },
            {
              label: 'Custom Location (Local Folder)',
              value: 'folder',
              children: (
                <Input
                  placeholder={'Queries Assets Complete Path'}
                  label={'Query Assets'}
                  description={'Example: C:\\kics\\1.4.7\\assets'}
                />
              )
            },
            {
              label: 'Git Repository',
              value: 'git',
              children: (
                <Input
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
                />
              )
            },
            {
              label: 'Remote URL (http/https)',
              value: 'remote',
              children: (
                <Input
                  placeholder={'File URL'}
                  label={'File URL'}
                  description={'Example: https://example.com/project-source.zip'}
                />
              )
            }
          ]}
        />
      </Box>
    </>
  )
}

export default MainStep1
