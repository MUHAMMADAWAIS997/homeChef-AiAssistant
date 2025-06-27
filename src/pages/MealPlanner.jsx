import React, { useState } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import foodBg from '../assets/bg2.jpeg'
const times = ['Breakfast', 'Lunch', 'Dinner'];

export default function MealPlanner() {
  const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf('week').add(1, 'day')); // Monday start
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ day: '', time: '', name: '' });

  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  const openModal = (day, time) => {
    setFormData({ day: day.format('YYYY-MM-DD'), time, name: '' });
    setShowModal(true);
  };

  const handleAddMeal = () => {
    if (formData.name && formData.day && formData.time) {
      setMeals(prev => [...prev, { ...formData }]);
      setShowModal(false);
    }
  };

  const getMeal = (day, time) => {
    const meal = meals.find(m => m.day === day.format('YYYY-MM-DD') && m.time === time);
    return meal ? meal.name : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-cover bg-center h-60 relative flex flex-col justify-center items-center"  style={{ backgroundImage: `url(${foodBg})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Meal Planner</h1>
          <p className="text-white text-lg">Plan your weekly  meals and always know what’s for dinner.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-4 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => setStartOfWeek(prev => prev.subtract(7, 'day'))}>
            <ChevronLeft />
          </button>
          <span className="text-lg font-semibold">
            {days[0].format('MMMM D')} - {days[6].format('D, YYYY')}
          </span>
          <button onClick={() => setStartOfWeek(prev => prev.add(7, 'day'))}>
            <ChevronRight />
          </button>
          <button
            onClick={() => setStartOfWeek(dayjs().startOf('week').add(1, 'day'))}
            className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
          >
            Today
          </button>
        </div>

        <div className="space-x-2 hidden sm:flex">
          <button className="px-3 py-1 rounded bg-blue-800 text-white text-lg">Week</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-md m-5">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 text-left font-semibold text-blue-800">Meal</th>
              {days.map(day => (
                <th
                  key={day}
                  className={`p-3 text-center font-semibold text-blue-800 ${
                    day.isSame(dayjs(), 'day') ? 'bg-blue-100' : ''
                  }`}
                >
                  <div>{day.format('ddd')}</div>
                  <div className="text-sm font-normal">{day.format('D')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time} className="text-center">
                <td className="p-2 text-left bg-gray-50 font-medium">{time}</td>
                {days.map(day => (
                  <td key={day} className="p-2 relative">
                    {getMeal(day, time) ? (
                      <span>{getMeal(day, time)}</span>
                    ) : (
                      <button
                        onClick={() => openModal(day, time)}
                        className="text-blue-400 hover:text-blue-600 transition"
                      >
                        <Plus size={18} />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Add Meal</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Meal Time</label>
                <select
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Time</option>
                  {times.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium">Meal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="e.g., Grilled Chicken"
                />
              </div>

              <button
                onClick={handleAddMeal}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
