import { Box, Button, HStack, Input, InputGroup, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react'
import React, { useState } from 'react'

type GradeNumberStepperProps = {
  color: string,
}

const GradeNumberStepper: React.FC<GradeNumberStepperProps> = ({ color }) => {

  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => count > 0 && setCount(count - 1)
  const maxValue = 25

  return (
    <InputGroup>
        <Input 
          bgColor={color} color="white" w="42px" p={0} mr={2} textAlign="center" borderRadius={4}
          type="number" 
          value={count}
          onChange={e => setCount(e.target.value)}
        />
        <Slider
          mx={2}
          flex='1'
          focusThumbOnChange={false}
          value={count}
          onChange={setCount}
          max={maxValue}
        >
          <SliderTrack>
            <SliderFilledTrack />
            {count > maxValue && (
              <SliderThumb w="32px">
                <Box>
                🔥
                </Box>
              </SliderThumb>
            )}
          </SliderTrack>
        </Slider>
        <HStack spacing={1}>
          <Button onClick={decrement} size="sm" bg="gray.200">-</Button>
          <Button onClick={increment} size="sm" bg="gray.200">+</Button>
        </HStack>
    </InputGroup>
  )
}

export default GradeNumberStepper
