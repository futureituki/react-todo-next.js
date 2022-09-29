import { FormEvent, useState } from "react"
import { TextInput, Button, Center, Textarea } from "@mantine/core"
import { IconDatabase } from "@tabler/icons"
import { useMutateTask } from "../hooks/useMutateTask"
import { useRouter } from "next/router"
import { Task } from "@prisma/client"
import { useQueryTasks } from "../hooks/useQueryTasks"

export const TaskAddForm = () => {
  const router = useRouter()
  const { data: tasks, status } = useQueryTasks()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const { createTaskMutation } = useMutateTask()
//   const taskList = tasks?.map(task => {
//     return {
//       objectID:task.id, 
//       title:task.title,
//       description: task.description
//     }
// })
const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const dt = new Date;
      const isoStr = dt.toISOString() as unknown as Date;
      console.log(isoStr)
        createTaskMutation.mutate({
        title:title,
        description: description,
        createdAt: isoStr
      })
      router.push('/dashboard')
      // const algoliaIndex = client.initIndex("Todo");
      // await algoliaIndex.saveObjects(taskList as any);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={title || ''}
          onChange = {(e) => setTitle(e.target.value)}
        />
        <Textarea
          mt="md"
          placeholder="description"
          value={description || ''}
          onChange = {(e) => setDescription(e.target.value)}
        />
        <Center mt="lg">
          <Button
            disabled={title === ''}
            leftIcon={<IconDatabase size={14}/>}
            color="cyan"
            type="submit"
            // onClick={() => router.push('/dashboard')}
          >
            Create
          </Button>
        </Center>
      </form>
    </>
  )
}
