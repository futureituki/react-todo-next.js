import { Group, Text } from '@mantine/core'
import React from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { IconArrowBack } from '@tabler/icons'
import { useMutateTask } from '../hooks/useMutateTask'
import { Task } from '@prisma/client'

export const DoneList = () => {
  const { data:tasks, status } = useQueryTasks() 
  const { changeTodoDone } = useMutateTask()
  const doneTask = tasks?.filter((task) => task.done !== false)
  console.log(doneTask)
  const handleChangeTodo = (task:Task) => {
    changeTodoDone.mutate(task);
  }
  return (
    <div>
      <Text
        size={24}
        mt={20}
        >
          Done Todo
        </Text>
      {doneTask?.map((task) => (
        <Group>
          <IconArrowBack 
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => handleChangeTodo(task)}
            />
          <p>{task.title}</p>
        </Group>
      ))}
    </div>
  )
}
