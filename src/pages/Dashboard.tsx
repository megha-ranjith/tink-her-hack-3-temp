import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Music, Sun, Scissors, Heart, CheckSquare, Calendar } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase imports
import axios from 'axios'; // Import axios for API calls
import type { Task } from '../types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState<string | null>(null); // To hold the user's display name
  const [selectedSong, setSelectedSong] = useState<string | null>(null); // State for the popup
  const [accessToken, setAccessToken] = useState<string | null>(null); // State to store the Spotify access token

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
    },
    {
      title: 'Calendar',
      icon: <Calendar className="w-6 h-6" />,
      items: ['Upcoming Tasks', 'Important Dates', 'Events']
    }
  ];

  useEffect(() => {
    // Initialize Firebase Auth and listen for changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'User'); // Set display name or fallback to 'User'
      } else {
        setUserName(null); // User is logged out
      }
    });

    // Check for Spotify access token in localStorage
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }

    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: 'medium'
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    setNewTask('');

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    setTasks(updatedTasks);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleMoodClick = (song: string) => {
    setSelectedSong(song);
    playMusicOnSpotify(song);
  };

  const closeModal = () => {
    setSelectedSong(null);
  };

  // Function to play music on Spotify
  const playMusicOnSpotify = (song: string) => {
    if (!accessToken) {
      alert('Please log in to Spotify!');
      return;
    }

    // Example of predefined playlists based on the song selection
    const playlists: { [key: string]: string } = {
      'Calming Playlist': 'spotify:playlist:37i9dQZF1DX6ziJ3V5f5G0', // Example playlist URI
      'Energetic Beats': 'spotify:playlist:37i9dQZF1DX0XUsuxWHRQd',
      'Meditation Sounds': 'spotify:playlist:37i9dQZF1DWYJStXbtxVt3',
      'Workout Mix': 'spotify:playlist:37i9dQZF1DXc7J1J8rHg0p',
      'Focus Music': 'spotify:playlist:37i9dQZF1DX8UsVj5oXqcx'
    };

    const playlistUri = playlists[song];
    if (playlistUri) {
      axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: playlistUri
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        console.log('Music is playing!');
      })
      .catch(error => {
        console.error('Error playing music:', error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Hi, {userName ? userName : 'Guest'}! 👋
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
                  <li
                    key={item}
                    className="text-gray-600 hover:text-pink-500 cursor-pointer"
                    onClick={() => handleMoodClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-semibold ml-2">Calendar</h2>
          </div>
          <div className="text-gray-600">
            <p className="mb-2">Here you can track your upcoming tasks and events!</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold">Upcoming Tasks</h3>
                <ul className="space-y-2">
                  {tasks.slice(0, 3).map((task) => (
                    <li key={task.id} className="text-sm">{task.title}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold">Important Dates</h3>
                <ul className="space-y-2">
                  <li className="text-sm">2025-02-01: Project Deadline</li>
                  <li className="text-sm">2025-02-14: Valentine's Day</li>
                </ul>
              </div>
            </div>
          </div>
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-5 w-5 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedSong && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">Now Playing: {selectedSong}</h3>
              <button
                onClick={closeModal}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
