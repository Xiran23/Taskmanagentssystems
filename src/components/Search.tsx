import React, { useState } from 'react';
// import { TaskCard } from '../components/TaskCard';
import { fetchTask } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const Search: React.FC = () => {
  interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
  }

  const navigate = useNavigate();

  // Fetch tasks using React Query
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey : ["posts"],
    queryFn:()=>fetchTask()
  });

  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Task[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter tasks based on title
    if (value) {
      const matches = tasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(matches);
      setShowDropdown(true);
    } else {
      setFilteredItems([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (task: Task) => {
    setQuery(task.title);
    setShowDropdown(false);
    // Navigate to the task details page
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div>
      <form className="flex items-center max-w-sm mx-auto relative">
        <label htmlFor="task-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="task-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search task title..."
            value={query}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
              {filteredItems.length > 0 ? (
                filteredItems.map((task) => (
                  <div
                    key={task.id}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer dark:text-white dark:hover:bg-gray-600"
                    onClick={() => handleSelect(task)}
                  >
                    {task.title}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 italic dark:text-gray-400">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
     
      </form>
    </div>
  );
};
