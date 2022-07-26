import { CloseIcon, DeleteIcon } from "@chakra-ui/icons"
import { Button, Flex, HStack, Text } from "@chakra-ui/react"
import dateFormat from "dateformat"
import { useState } from "react"

type ActivityItem = {
  id: string
  date: Date
  Location: {
    name: string
  }
}

type ActivityItemProps = {
  index?: number
  activity: ActivityItem
  onRemove?: (id: string) => void
}

const ActivityItem: React.FC<ActivityItemProps> = ({ index, activity, onRemove }) => {

  const [removeMode, setRemoveMode] = useState(false)

  const { id, date, Location } = activity
  const dateString = dateFormat(date, 'dd/mm/yyyy')

  const handleRemove = () => { 
    onRemove(activity.id)
  }

  return (
    <Flex 
      key={id} 
      w="100%"
      justifyContent="space-between" 
      alignItems="center" 
      borderRadius={4}
    >
      <Flex>
        <Text as="span" color="whiteAlpha.300" mr={1}>{index}</Text>
        <Text> {Location.name}</Text>
      </Flex>
      <HStack>
        {/* TODO: create separate "confirm remove" component */}
        {removeMode == false
          ? (
            <>
              <Text fontSize='xs'>{dateString}</Text>
              <CloseIcon w={3} h={3} ml={2} cursor="pointer" onClick={() => setRemoveMode(true)} />
            </>
          )
          : (
            <HStack spacing={2}>
              <Button size="xs" onClick={handleRemove} colorScheme="red"><DeleteIcon /></Button>
              <Button size="xs" onClick={() => setRemoveMode(false)}>Cancel</Button>
            </HStack>
          )
          }
      </HStack>
    </Flex>
  )
}

export default ActivityItem