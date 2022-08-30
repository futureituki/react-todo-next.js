import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import { useQueryTask, useQueryTasks } from '../hooks/useQueryTasks';
import { format } from 'date-fns';
import { useState } from 'react';
import { Modal, Button, Group, Text, Box, Loader } from '@mantine/core';

export const Calendar = () => {
  const { data: tasks, status } = useQueryTasks()
  const [opened, setOpened] = useState(false);
  const [selectTask, setSelectTask] = useState<any>()
  if(status === 'loading') return <Loader/>
  const taskList = tasks?.map(task => ({
      title:task.title, 
      description:task.description,
      start:String(task.createdAt).slice(0,10)
  }))
  const handleClick = ({ event }:{event: any}) => {
    setSelectTask(event)
    setOpened(!opened)
  }
  return (
    <>
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
      <div className='w-4/5 m-auto'>
        <FullCalendar 
          plugins={[dayGridPlugin]} 
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
          events={taskList}
          eventClick={handleClick}
        />
      </div>
    </>
    )
}
