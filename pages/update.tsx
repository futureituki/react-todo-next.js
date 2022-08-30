import { NextPage } from 'next'
import React from 'react'
import { Layout } from '../components/Layout'
import { TaskUpdateForm } from '../components/TaskUpdate'

const Update:NextPage = () => {
  return (
    <Layout title='task update'>
      <TaskUpdateForm/>
    </Layout>
  )
}

export default Update