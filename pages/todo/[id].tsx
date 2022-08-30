import { Group, Loader, Text } from '@mantine/core'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { TaskButton } from '../../components/TaskButton'
import { useQueryTask } from '../../hooks/useQueryTasks'

const TodoDetail:NextPage = () => {
  const router = useRouter()
  const { data:task, status } = useQueryTask()
  console.log(task)
  if(status === 'loading') return <Loader/>

  return (
    <Layout title='task detail page'>
      <Group>
        <Text size={30}>{task?.title}</Text>
        <Text size={15}>{String(task?.createdAt).slice(0,10)}</Text>
      </Group>
      <Text
      component="span"
      align="center"
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
      size="xl"
      mt={24}
      mb={24}
      weight={700}
      style={{ fontFamily: 'Greycliff CF, sans-serif' }}
    >
      {task?.description}
    </Text>
    <TaskButton 
          id={task?.id as number} 
          description={task?.description as string} 
          title={task?.title as string}
      />
    </Layout>
  )
}

export default TodoDetail