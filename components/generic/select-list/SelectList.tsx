import { Button, HStack, Select, Text } from '@chakra-ui/react'
import { useState } from 'react'

type SelectListProps = {
  label?: string
  options: string[]
  onOptionAdded?: (o: string[]) => void
  [x:string]: any
}

const SelectList: React.FC<SelectListProps> = ({ label = 'option', options, onOptionAdded, ...styleProps }) => {
  
  const [currentOption, setCurrentOption] = useState('')
  const [optionsSelected, setOptionsSelected ] = useState<string[]>([])

  const addOption = () => {
    const options = optionsSelected
    if (currentOption == '') return 
    if (optionsSelected.includes(currentOption) == false) {
      options.push(currentOption)
      setOptionsSelected([...options])
      setCurrentOption('')
      onOptionAdded(optionsSelected)
    }
  }

  return (
    <>
        <HStack spacing={2} {...styleProps} mb={2} >
          <Select value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}>
            <option value="">Select {label}</option>
            {options.filter(option => optionsSelected.includes(option) == false).map((option, _idx) => {
              return <option key={_idx} value={option}>{option}</option>
            })}
          </Select>
          <Button onClick={addOption}>Add</Button>
        </HStack>
      {optionsSelected.map((option, _idx) => {
        return <Text key={_idx} my={1}>{option}</Text>
      })}
    </>
  )
}

export default SelectList

