import { Button, HStack, Input, InputGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

type GradeNumberStepperProps = {
  color: string,
}

const GradeNumberStepper: React.FC<GradeNumberStepperProps> = ({ color }) => {

  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)

  const decrement = () => count > 0 && setCount(count - 1)

  return (
    <InputGroup>
        <Input 
          bgColor={color} color="white" w="42px" p={0} mr={2} textAlign="center" borderRadius={0}
          type="number" 
          value={count}
        />
        <HStack spacing={1}>
          <Button onClick={increment} size="sm" bg="gray.200">+</Button>
          <Button onClick={decrement} size="sm" bg="gray.200">-</Button>
        </HStack>
    </InputGroup>
  )
}

export default GradeNumberStepper
