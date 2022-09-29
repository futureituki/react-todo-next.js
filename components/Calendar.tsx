import FullCalendar, { CalendarContentProps, CalendarData, CalendarDataProviderProps, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from '@fullcalendar/core/locales/ja';
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useState } from 'react';
import { Modal, Text, Loader, TextInput, Textarea, Center, Button } from '@mantine/core';
import { parseISO } from 'date-fns';
import { TaskAddForm } from './TaskAddForm';
import { useMutateTask } from '../hooks/useMutateTask';
import { IconDatabase } from '@tabler/icons';
import toast, { Toaster } from 'react-hot-toast';

export const Calendar = () => {
  const { data: tasks, status } = useQueryTasks()
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date,setDate] = useState<string>('')
  const [reserveOpen, setReserveOpened] = useState(false);
  const { createTaskMutation } = useMutateTask()
  const [selectTask, setSelectTask] = useState<any>()
  if(status === 'loading') return <Loader/>
  const taskList = tasks?.map(task => ({
      title:task.title, 
      description:task.description,
      start:String(task.createdAt).slice(0,10)
  }))
  console.log(taskList)
  const handleClick = ({ event }:{event: any}) => {
    setSelectTask(event)
    setOpened(!opened)
  }
  const handleDate = (props:any) => {
    if(props.dateStr < new Date().toISOString().slice(0,10)) {
      toast.error('Todoは作成できません。')
    }else {
      setReserveOpened(!reserveOpen)
      const day = Number(props.date.toISOString().slice(8,10)) + 1
      const date = props.date.toISOString().slice(0,8) + day + props.date.toISOString().slice(10)
      setDate(date)
    }
  }
  const handleSubmit = (e:HTMLFormElement) => {
        e.preventDefault()
        createTaskMutation.mutate({
        title:title,
        description: description,
        createdAt: date as unknown as Date
      })
      console.log(typeof date, date)
      setTitle('')
      setDescription('')
  }
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    error: {
      duration: 3000,
      theme: {
        primary: 'red',
        secondary: 'black',
      },
    },
  }}
/>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Todo Detail!"
      >
          <Text
            size={30}
            weight={700}
            mb={5}
          >{selectTask?.title}
          </Text>
          <Text
            size="xl"
            weight={300}
            mt={5}
            mb={5}
          >
            {selectTask?.extendedProps.description}
          </Text>
      </Modal>
      <Modal
        opened={reserveOpen}
        onClose={() => setReserveOpened(false)}
        title="Todo Detail!"
      >
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={title || ''}
          onChange = {(e) => setTitle(e.target.value)}
        />
        <Textarea
          mt="md"
          placeholder="description"
          value={description || ''}
          onChange = {(e) => setDescription(e.target.value)}
        />
        <Center mt="lg">
          <Button
            disabled={title === ''}
            leftIcon={<IconDatabase size={14}/>}
            color="cyan"
            type="submit"
            // onClick={() => router.push('/dashboard')}
          >
            Create
          </Button>
        </Center>
      </form>      </Modal>
      <div className='w-4/5 m-auto'>
        <FullCalendar 
          plugins={[dayGridPlugin, interactionPlugin]} 
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
          events={taskList}
          eventClick={handleClick}
          dateClick={handleDate}
        />
      </div>
    </>
    )
}
