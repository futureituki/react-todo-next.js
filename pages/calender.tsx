import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { UserInfo } from '../components/UserInfo'
import { Calendar } from '../components/Calendar'
const Calender:NextPage = () => {
  return (
    <>
    <Layout title="Task Board">
      <h1>Calender</h1>
      <UserInfo/>
    </Layout>
    <Calendar/>
    </>
  )
}

export default Calender
