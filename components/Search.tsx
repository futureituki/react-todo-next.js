import { SearchIcon } from "@heroicons/react/solid";
import { Group, Input, Loader, NativeSelect } from "@mantine/core";
import { Task } from "@prisma/client";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQueryTasks } from "../hooks/useQueryTasks";

export const Search: React.FC = () => {
  const { data:tasks, status } = useQueryTasks()
  const [showItems, setShowItems] = useState<Task[] | undefined>(tasks);
  const [orderSortItems, setOrderSortItems] = useState<Task[] | undefined>([])
  const ref = useRef<HTMLSelectElement>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = tasks?.filter((task) => {
      return task.title.toLowerCase().match(e.target.value.toLowerCase());
    });
    console.log(result);
    setShowItems(result);
  };
  const SelectOrder = () => {
    if(ref.current?.value === 'NewOrder') {
      showItems?.sort(function(a, b){
        return (a.createdAt > b.createdAt ? -1 : 1);
      });
      setOrderSortItems([])
    } 
    if(ref.current?.value === 'LatestOrder') {
      const latestorderItem = showItems?.sort(function(a, b){
        return (a.createdAt > b.createdAt ? 1 : -1);
      });
      setOrderSortItems(latestorderItem)
    } 
  }
  return (
    <div>
      <form action='' className='flex justify-center'>
        <Group>
          <SearchIcon
            width={35}
            height={25}
            className="text-inherit absolute"/>
          <Input
            type='text'
            icon={<SearchIcon width={20}/>}
            className='my-8 rounded border border-black'
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </Group>
      </form>
        <NativeSelect 
            ref={ref} 
            data={[{ value: 'NewOrder', label: '新しい順' }, { value: 'LatestOrder', label: '古い順' }]}
            onChange={SelectOrder}
            />
      <div className='mt-6'>
        {
          showItems ? showItems?.map((item, i) => {
            return (
              <Link 
                key={item.id} 
                href={`todo/${item.id}`}
                >
                <a 
                  className="block no-underline text-inherit hover:underline pb-2 pt-2">
                  {item.title}
                </a>
              </Link>
            );
          }) : orderSortItems?.map((item) => {
          return (
            <Link 
              key={item.id} 
              href={`todo/${item.id}`}
              >
              <a 
                className="block no-underline text-inherit hover:underline pb-2 pt-2">
                {item.title}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
