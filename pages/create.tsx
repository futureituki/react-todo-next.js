import { Text } from "@mantine/core"
import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { TaskAddForm } from "../components/TaskAddForm"
import { UserInfo } from "../components/UserInfo"

const Create:NextPage = () => {
  return (
    <Layout title="create task">
      <Text 
        size={24}
        mb={20}
      >Create Add TODO</Text>
      <TaskAddForm/>
    </Layout>
  )
}

export default Create