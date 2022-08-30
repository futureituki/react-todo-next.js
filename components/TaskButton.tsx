import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Button, Group, Modal } from '@mantine/core'
import { Task } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useMutateTask } from '../hooks/useMutateTask'
import useStore from '../store'

export const TaskButton:FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId' | 'done'>>  = (
    { id,
      title,
      description,
    }
) => {
  const [opened, setOpened] = useState(false);
  const { deleteTaskMutation } = useMutateTask()
  const update = useStore((state) => state.updateEditedTask)
  const router = useRouter()
  const handleUpdate = () => {
    update({id, title, description})
    router.push('/update')
  }
  const handleDelete = () => {
    setOpened(false)
    deleteTaskMutation.mutate(id)
    router.push('/dashboard')
  }
  return (
    <div>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="本当に削除してもよろしいでしょうか？"
      >
        二度と修復できません。
        <Group mt={14} spacing={200}>
          <Button
            radius="md"
            onClick={() => setOpened(!opened)}
          >
            キャンセル
          </Button>
          <Button 
            onClick={handleDelete}
            color="red" radius="md"
          >
            削除
          </Button>
        </Group>
      </Modal>
        <PencilAltIcon
        className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
        onClick={handleUpdate}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => setOpened(!opened)}
        />
    </div>
  )
}
