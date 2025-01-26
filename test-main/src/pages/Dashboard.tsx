import React, { useState } from 'react';
import { format } from 'date-fns';
import { Music, Sun, Scissors, Heart, CheckSquare, Calendar } from 'lucide-react';
import type { Task } from '../types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const user = { displayName: 'Sarah' }; // Replace with actual user data

  const sections = [
    {
      title: 'Music for Your Mood',
      icon: <Music className="w-6 h-6" />,
      items: ['Calming Playlist', 'Energetic Beats', 'Meditation Sounds', 'Workout Mix', 'Focus Music']
    },
    {
      title: 'Skin Care',
      icon: <Sun className="w-6 h-6" />,
      items: ['Morning Routine', 'Night Routine', 'Face Masks', 'Sun Protection', 'Anti-aging Tips']
    },
    {
      title: 'Hair Care',
      icon: <Scissors className="w-6 h-6" />,
      items: ['Hair Masks', 'Styling Tips', 'Natural Remedies', 'Hair Growth', 'Color Protection']
    },
    {
      title: 'Health Care',
      icon: <Heart className="w-6 h-6" />,
      items: ['Nutrition Guide', 'Exercise Routines', 'Mental Wellness', 'Sleep Tips', 'Stress Relief']
    }
  ];

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: 'medium'
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Hi, {user.displayName}! 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold ml-2">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-gray-600 hover:text-pink-500 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <CheckSquare className="w-6 h-6" />
            <h2 className="text-xl font-semibold ml-2">To-Do List</h2>
          </div>
          
          <form onSubmit={addTask} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                Add
              </button>
            </div>
          </form>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.title}
                </span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className="h-5 w-5 text-pink-500 rounded focus:ring-pink-500"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-semibold ml-2">Calendar</h2>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {Array.from({ length: 7 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-20 h-24 bg-gray-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50"
                >
                  <span className="text-sm text-gray-500">{format(date, 'EEE')}</span>
                  <span className="text-2xl font-semibold">{format(date, 'd')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}