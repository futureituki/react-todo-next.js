import { Text } from '@mantine/core'
import React from 'react'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { UserInfo } from '../components/UserInfo'

const SearchTodo = () => {

  return (
    <Layout title='todo search'>
      <UserInfo/>
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