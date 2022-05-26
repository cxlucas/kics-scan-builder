import Box from '../../../components/Box/Box'
import RadioGroup from '../../../components/RadioGroup/RadioGroup'
import Input from '../../../components/Input/Input'
import SelectMult from '../../../components/SelectMult/SelectMult'
import TipTexts from '../../../utils/TipTexts'

// https://registry.hub.docker.com/v2/repositories/checkmarx/kics/tags?page_size=100
// https://react-query.tanstack.com/overview

const MainStep1 = () => {
  return (
    <>
      <Box title="Kics Source" tooltip={TipTexts.mainStep1.kicsSource}>
        <RadioGroup
          flag="source"
          items={[{ label: 'Docker', flag: 'source', flagAux: 'docker', required: true }]}
        />
      </Box>
      <Box title="Target Scan" tooltip={TipTexts.mainStep1.targetScan}>
        <RadioGroup
          flag="path"
          items={[
            {
              flag: 'path',
              flagAux: 'local',
              label: 'Local File(s) / Folder(s)',
              required: true,
              children: (
                <SelectMult
                  flag="path"
                  flagAux="local"
                  required={true}
                  placeholder={'Add one or more files or folders (complete path)'}
                  label={'Files / Folders'}
                  description={
                    'Example: c:\\sample.tf (single file)  •  c:\\scans\\project-folder (folder)  •  /home/user/project (folder)'
                  }
                />
              )
            },
            {
              flag: 'path',
              flagAux: 'git',
              required: true,
              label: 'Git Repository',
              children: (
                <Input
                  flag="path"
                  flagAux="git"
                  required={true}
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
                />
              )
            }
          ]}
        />
      </Box>

      <Box title="Queries Location" tooltip={TipTexts.mainStep1.queriesLocation}>
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
              required: true,
              label: 'Custom Location (Local Folder)',

              children: (
                <Input
                  flag={'queries-path'}
                  flagAux={'local'}
                  required={true}
                  placeholder={'Queries Assets Complete Path'}
                  label={'Query Assets'}
                  description={'Example: c:\\kics\\1.4.7\\assets'}
                />
              )
            },
            {
              flag: 'queries-path',
              flagAux: 'git',
              required: true,
              label: 'Git Repository',
              children: (
                <Input
                  flag={'queries-path'}
                  flagAux={'git'}
                  required={true}
                  placeholder={'Repository URL'}
                  label={'Repository URL'}
                  description={'Example: https://github.com/Checkmarx/kics'}
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
