import React from 'react'
import { Group } from '@mantine/core'
import Link from 'next/link'

type Prop = {
  name:string,
  url:string
}

const links:Prop[] = [
  { name:'dashboard', url:'/dashboard'},
  { name:'calender', url:'/calender'},
  { name:'create', url:'/create'},
  { name:'search', url:'/search'},
]

export const Nav = () => {
  return (
      <header className='m-5'>
        <Group spacing="lg">
          {links.map((link:Prop) => (
            <Link href={link.url} key={link.name}>
              <a className='no-underline text-white text-lg hover:underline'>{link.name}</a>
            </Link>
          ))}
        </Group>
      </header>  )
}
