import React from 'react'
import client from '../client/algolia';
import { useQueryTasks } from '../hooks/useQueryTasks'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, HitsProps, Configure, Pagination } from 'react-instantsearch-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { debounce } from 'debounce'
import { Task } from '@prisma/client';
import Link from 'next/link';
import 'instantsearch.css/themes/satellite-min.css';

type Props = {
  objectID:string,
  title:string,
  description:string
}

const Hit:HitsProps<Props>['hitComponent'] = ({hit}:{hit:Props}) => {
  console.log(hit)
  return ( 
    <>
  <div className='rounded-md shadow p-4'>
      <h2 className='line-clamp-2'>
        <Link href={`todo/${hit.objectID}`}>
          <a>{hit.title}</a>
        </Link>
        <p>{hit.description}</p>
        </h2>
    </div>
    </>
  )
}

export const Search = () => {
//   const { data: tasks, status } = useQueryTasks();
//   const taskList = tasks?.map(task => ({
//     objectID:task.id, 
//     title:task.description,
//     start:String(task.createdAt).slice(0,10)
// }))
//   const algoliaIndex = client.initIndex("Todo");
//   const algoliaRecord= [
//     tasks?.map((task) => {
//       {
//         objectID: todo.id,
//         title: todo.title,
//         content: todo.description,
//       }
//     })
// ];

// const res = await algoliaIndex.saveObjects(algoliaRecord);
return (
  <div>
        <InstantSearch indexName="Todo" searchClient={client}>
        <SearchBox />
        <Configure hitsPerPage={2}/>
        <Hits<Props>  
        hitComponent={Hit}/>      
        <Pagination/>
        </InstantSearch>
  </div>
);
}
