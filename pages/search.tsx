import { Loader, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import client from '../client/algolia'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { useQueryTasks } from '../hooks/useQueryTasks'

const SearchTodo = () => {
  const { data:tasks, status} = useQueryTasks()
  if(status === 'loading') return <Loader/>
  const taskList = tasks?.map(task => {
    return {
      objectID:task.id, 
      title:task.title,
      description: task.description
    }
})
  const Alglia = async() => {
    const algoliaIndex = client.initIndex("Todo");
    await algoliaIndex.saveObjects(taskList as any);
  }
  useEffect(() => {
    Alglia()
  },[])
  return (
    <Layout title='todo search'>
      <Text
        size={30}
        align="center"
        >
          Todo Search
        </Text>
      <Search/>
    </Layout>
  )
}

export default SearchTodo