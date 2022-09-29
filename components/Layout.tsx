import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Nav } from './Nav';
import { FooterCentered } from './Footers';

type Props = {
  title:string,
  children: ReactNode
}

const links = [
  {link:"https://google.com", label:"Google"},
  {link:"https://google.com", label:"Google"},
]

export const Layout: FC<Props> = ({
  title = 'Next js',
  children
}) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Head>
        <title>{ title }</title>
      </Head>
      <Nav/>
      <main className='flex w-screen flex-1 flex-col items-center justify-center'>
        { children }
      </main>
      <FooterCentered links={links}/>
    </div>
  )
}
