import { FormEvent } from "react"
import { TextInput, Button, Center } from "@mantine/core"
import { IconDatabase } from "@tabler/icons"
import useStore from "../store"
import { useMutateTask } from "../hooks/useMutateTask"
import { useRouter } from "next/router"
export const TaskUpdateForm = () => {
  const { editedTask } = useStore();
  const router = useRouter()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      updateTaskMutation.mutate({
        id:editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={editedTask.title || ''}
          onChange = {(e) => update({...editedTask, title:e.target.value})}
        />
        <TextInput
          mt="md"
          placeholder="description"
          value={editedTask.description || ''}
          onChange = {(e) => update({...editedTask, description:e.target.value})}
        />
        <Center mt="lg">
          <Button
            disabled={editedTask.title === ''}
            leftIcon={<IconDatabase size={14}/>}
            color="cyan"
            type="submit"
            onClick={() => router.push('/dashboard')}
          >
            Update
          </Button>
        </Center>
      </form>
    </>
  )
}
