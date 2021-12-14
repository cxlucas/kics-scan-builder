import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'
import SelectMult from '../../../components/SelectMult/SelectMult'

const MainStep1 = () => {
  return (
    <>
      <Box title="Kics Source">
        <RadioGroup
          flag="source"
          items={[
            {
              label: 'Local',
              flag: 'source',
              flagAux: 'local',
              children: (
                <Input
                  flag="source"
                  flagAux="local"
                  placeholder={'KICS Binary complete path'}
                  label={'Kics Path'}
                  description={'Example: c:\\kics\\1.4.7\\kics.exe'}
                />
              )
            },
            { label: 'Docker', flag: 'source', flagAux: 'docker' }
          ]}
        />
      </Box>
      <Box title="Target Scan">
        <RadioGroup
          flag="path"
          items={[
            {
              flag: 'path',
              flagAux: 'local',
              label: 'File(s) / Folder(s)',
              children: (
                <SelectMult
                  flag="path"
                  flagAux="local"
                  placeholder={'Add one or more files or folders (complete path)'}
                  label={'Files / Folders'}
                  description={'Example: c:\\scansfile1.tf - c:\\scans\\folder'}
                />
              )
            },
            {
              flag: 'path',
              flagAux: 'git',
              label: 'Git Repository',
              children: (
                <Input
                  flag="path"
                  flagAux="git"
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
                />
              )
            },
            {
              flag: 'path',
              flagAux: 'remote',
              label: 'Remote URL (http/https)',
              children: (
                <Input
                  flag="path"
                  flagAux="remote"
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
          flag="queries-path"
          items={[
            {
              flag: 'queries-path',
              flagAux: 'default',
              label: 'Default (same as Kics source)'
            },
            {
              flag: 'queries-path',
              flagAux: 'local',
              label: 'Custom Location (Local Folder)',
              children: (
                <Input
                  flag={'queries-path'}
                  flagAux={'local'}
                  placeholder={'Queries Assets Complete Path'}
                  label={'Query Assets'}
                  description={'Example: C:\\kics\\1.4.7\\assets'}
                />
              )
            },
            {
              flag: 'queries-path',
              flagAux: 'git',
              label: 'Git Repository',
              children: (
                <Input
                  flag={'queries-path'}
                  flagAux={'git'}
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
                />
              )
            },
            {
              flag: 'queries-path',
              flagAux: 'remote',
              label: 'Remote URL (http/https)',
              children: (
                <Input
                  flag={'queries-path'}
                  flagAux={'remote'}
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
