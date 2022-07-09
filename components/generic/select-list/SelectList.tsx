import { Button, HStack, Select, StackProps } from '@chakra-ui/react'
import { useState } from 'react'

type SelectListProps = {
  options: string[]
  [x:string]: any
}

const SelectList: React.FC<SelectListProps> = ({ options, ...styleProps }) => {
  
  const [currentOption, setCurrentOption] = useState('')
  const [optionsSelected, setOptionsSelected ] = useState<any[]>([])

  const onAddOption = () => {
    const options = optionsSelected
    if (currentOption == '') return 
    if (optionsSelected.includes(currentOption) == false) {
      options.push(currentOption)
      setOptionsSelected([...options])
      setCurrentOption('')
    }
  }

  return (
    <>
        <HStack spacing={2} {...styleProps} >
          <Select value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}>
            <option value="">Select option</option>
            {options.filter(option => optionsSelected.includes(option) == false).map((option, _idx) => {
              return <option key={_idx} value={option}>{option}</option>
            })}
          </Select>
          <Button onClick={onAddOption}>Add facility</Button>
        </HStack>
      {optionsSelected.map((option, _idx) => {
        return <p key={_idx}>{option}</p>
      })}
    </>
  )
}

export default SelectList

