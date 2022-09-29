import { Text } from '@mantine/core'
import React from 'react'

export const TodayDate = () => {
  const month = new Date().getMonth() + 1
  return (
    <Text align='center' size={24} mb={20}>{month}月</Text>
  )
}
