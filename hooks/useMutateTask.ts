import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Task } from "@prisma/client";
import useStore from "../store";
import { CreateTask, EditedTask } from "../types";

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask)
  
  const createTaskMutation = useMutation(
    async (task: Omit<CreateTask, 'id'>) => {
      console.log(task)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todo`, task)
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodo = queryClient.getQueryData<Task[]>(['tasks'])
        if(previousTodo) {
          queryClient.setQueryData(['tasks'], [res, ...previousTodo])
        }
        reset()
      },
      onError: (err:any) => {
        reset()
        if(err.response.status === 401 || err.response.status === 403)
        router.push('/')
      }
    }
  )
  const updateTaskMutation = useMutation(
    async(task:EditedTask) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`, task)
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodo = queryClient.getQueryData<Task[]>(['tasks'])
        if(previousTodo) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodo.map((task) => (task.id === res.id ? res : task))
          )
        }
        reset()
      },
      onError: (err:any) => {
        reset()
        if(err.response.status === 401 || err.response.status === 403)
        router.push('/')
      }
    }
  )
  const deleteTaskMutation = useMutation(
    async(id:number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`, )
    },
    {
      onSuccess: (_, variables) => {
        const previousTodo = queryClient.getQueryData<Task[]>(['tasks']);
        if(previousTodo) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodo.filter((task) => task.id !== variables)
          )
        }
        reset()
      },
      onError: (err:any) => {
        if(err.response.status === 401 || err.response.status === 403)
        router.push('/')
      }
    }
  )
  const changeTodoDone = useMutation(
    async(task:Task) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`, task.done )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodo = queryClient.getQueryData<Task[]>(['tasks']);
        if(previousTodo) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodo.map((task) => (task.id === res.id ? res : task))
          )
        }
        reset()
      },
      onError: (err:any) => {
        if(err.response.status === 401 || err.response.status === 403)
        router.push('/')
      }
    }
  )
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation, changeTodoDone}
}