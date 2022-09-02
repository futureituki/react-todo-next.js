import { useQueryTasks } from '../hooks/useQueryTasks'
import { List, ThemeIcon, Loader, Text, Group } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons'
import { TaskItem } from './TaskItem'
import { StarIcon } from '@heroicons/react/solid'
import { useMutateTask } from '../hooks/useMutateTask'
import { Task } from '@prisma/client'

export const TaskList = () => {
  const { data: tasks, status } = useQueryTasks()
  const { changeTodoDone } = useMutateTask()
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  const month = String(new Date().getMonth()).length !== 2 ? '0' + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)
  const today = String(new Date().getFullYear()) + '-' + month + '-' + + '0' + String(new Date().getDate())
  const todayTask = tasks?.filter((task) => String(task.createdAt).slice(0,10) === today && task.done !== true)
  console.log(today)
  const handleChangeTodo = (task:Task) => {
    changeTodoDone.mutate(task)
  }
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
        <Text 
        size={20}
        align="center"
        mb={20}
        >      
          Today TODO
        </Text>
      {todayTask?.map((task) => (
        <Group key={task.id}>
          <StarIcon
          className="h-5 w-5 cursor-pointer text-white-500 hover:text-blue-500"
          onClick={() => handleChangeTodo(task)}
        />
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
          />
        </Group>
      ))}
    </List>
  )
}