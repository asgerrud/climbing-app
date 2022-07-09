import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Select, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'

type SelectListProps = {
  label?: string
  options: string[]
  onOptionsChanged?: (o: string[]) => void
  [x:string]: any
}

const SelectList: React.FC<SelectListProps> = ({ label = 'option', options, onOptionsChanged, ...styleProps }) => {
  
  const [currentOption, setCurrentOption] = useState('')
  const [optionsSelected, setOptionsSelected ] = useState<string[]>([])

  const addOption = () => {
    const options = optionsSelected
    if (currentOption == '') return 
    if (optionsSelected.includes(currentOption) == false) {
      options.push(currentOption)
      setOptionsSelected(options)
      setCurrentOption('')
      onOptionsChanged(optionsSelected)
    }
  }

  const removeOption = (option: string) => { 
    const options = optionsSelected.filter(o => o !== option)
    setOptionsSelected(options) 
    onOptionsChanged(options)
  }

  return (
    <>
        <HStack spacing={2} {...styleProps} >
          <Select value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}>
            <option value="">Select {label}</option>
            {options.filter(option => optionsSelected.includes(option) == false).map((option, _idx) => {
              return <option key={_idx} value={option}>{option}</option>
            })}
          </Select>
          <Button onClick={addOption}>Add</Button>
        </HStack>
        <Stack>
          {optionsSelected.map((option, _idx) =>
            <Flex key={_idx} w="100%" px={3} py={0.25} alignItems="center" justifyContent="space-between" bgColor="whiteAlpha.100">
              <Text my={1}>{option}</Text>
              <CloseIcon w={3} h={3} cursor="pointer" onClick={() => removeOption(option)}/>
            </Flex>
          )}
        </Stack>
    </>
  )
}

export default SelectList

