import React from 'react'
import { Group, Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import { TaskList } from './TaskList';
import { DoneList } from './DoneList';
import { ToggleColor } from './ToggleColor';

export const Tab = () => {
  return (
    <Tabs defaultValue="todo">
    <Tabs.List>
      <Tabs.Tab value="todo" icon={<IconPhoto size={14} />}>Todo</Tabs.Tab>
      <Tabs.Tab value="done-todo" icon={<IconMessageCircle size={14} />}>Done Todo</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>Settings</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="todo" pt="xs">
      <TaskList/>
    </Tabs.Panel>

    <Tabs.Panel value="done-todo" pt="xs">
      <DoneList/>
    </Tabs.Panel>

    <Tabs.Panel value="settings" pt="xs">
      Settings tab content
      <Group>
        <ToggleColor/>
        <p>dark or light</p>
      </Group>
    </Tabs.Panel>
  </Tabs>  )
}
