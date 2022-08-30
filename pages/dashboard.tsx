import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import axios from "axios";
import { LogoutIcon } from "@heroicons/react/solid";
import { UserInfo } from "../components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { TaskList } from "../components/TaskList";
import { Search } from "../components/Search";
import { useEffect } from "react";
import client from "../client/algolia";
import { useQueryTasks } from "../hooks/useQueryTasks";
import { Loader } from "@mantine/core";
import { DoneList } from "../components/DoneList";
import { Tab } from "../components/Tabs";

const Dashboard:NextPage = () => {
  console.log(process.env.ALGOLIA_ADMIN_API_KEY )
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data:tasks, status} = useQueryTasks()
  console.log(tasks)
  const logout = async() => {
    queryClient.removeQueries(['tasks'])
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/')
  }
  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}/>
        <Tab/>
    </Layout>
  )
}

export default Dashboard