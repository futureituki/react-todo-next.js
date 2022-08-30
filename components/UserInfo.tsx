import { useQueryUser } from "../hooks/useQueryUser";
import { Loader } from "@mantine/core";

export const UserInfo = () => {
  const { data: user, status} = useQueryUser()
  console.log(user)
  if(status === 'loading') return <Loader/>
  return <p className="text-white">{user?.email}</p>
}