import { FC } from "react"
import { List } from "@mantine/core"
import { Task } from "@prisma/client"
import Link from "next/link"
import { TaskButton } from "./TaskButton"

export const TaskItem:FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId' | 'done'>> = ({
      id, 
      title, 
      description
    }) => {
  return (
    <List.Item>
      <div className="float-left mr-10">
        <TaskButton id={id} description={description} title={title}/>
      </div>
      <Link href={`todo/${id}`}>
        <a className="text-inherit no-underline hover:underline ">
          {title}
        </a>
      </Link>
    </List.Item>
  )
}
