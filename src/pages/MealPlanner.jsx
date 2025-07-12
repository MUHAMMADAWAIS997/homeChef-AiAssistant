import React, { useState, useEffect, useContext } from 'react';
import {
  Plus, X, ChevronLeft, ChevronRight, Trash2, Edit, Edit3,
} from 'lucide-react';
import foodBg from '../assets/bg2.jpeg';
import { addPlan, getPlan, updatePlan, deletePlan } from '../api/plannerapi';
import { toast } from 'react-toastify';
import AuthContext from '../context/Auth context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getWeekDates = (baseDate) => {
  const start = new Date(baseDate);
  const day = start.getDay();
  start.setDate(start.getDate() - day);
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d);
  }
  return week;
};

export default function MealPlanner() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [planner, setPlanner] = useState({});
  const [modalData, setModalData] = useState(null);
  const [mealInput, setMealInput] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const currentWeek = getWeekDates(currentDate);
  const navigate=useNavigate('/')
  const today = new Date().toDateString();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMealPlans();
    } else {
      setPlanner({}); 
      toast.info('Please log in to view your meal plans.');
    }
  }, [isAuthenticated]);

  const fetchMealPlans = async () => {
    try {
      const data = await getPlan();
      const plannerData = {};
      data.forEach(item => {
        const key = `${new Date(item.date).toDateString()}-${item.time}`;
        plannerData[key] = { meal: item.meal, _id: item._id };
      });
      setPlanner(plannerData);
    } catch (err) {
      console.error('Failed to fetch meal plans:', err);
      toast.error('Failed to load meal plans');
    }
  };

  const exportAsCSV = () => {
    const csvRows = [['Date', 'Day', 'Time', 'Meal']];
    Object.entries(planner).forEach(([key, value]) => {
      const splitIndex = key.lastIndexOf('-');
      const dateStr = key.substring(0, splitIndex);
      const time = key.substring(splitIndex + 1);
      const date = new Date(dateStr);
      const row = [
        date.toLocaleDateString('en-GB'),
        date.toLocaleDateString('en-US', { weekday: 'long' }),
        time,
        value.meal
      ];
      csvRows.push(row);
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'meal_plan.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  const setModal = (cdate, cday, ctime, cid = null) => {
    const key = `${cdate.toDateString()}-${ctime}`;
    setModalData({
      date: cdate,
      day: cday,
      time: ctime,
      id: cid,
      key,
      mealType: ctime,
    });
    setMealInput(planner[key]?.meal || '');
    setOpenModal(true);
  };

  const closeModal = () => {
    setModalData(null);
    setMealInput('');
    setOpenModal(false);
  };

  const deleteMeal = async (key) => {
    const updated = { ...planner };
    if (updated[key]?._id) {
      try {
        await deletePlan(updated[key]._id);
        toast.success('Meal deleted');
      } catch (err) {
        toast.error('Failed to delete meal');
      }
    }
    delete updated[key];
    setPlanner(updated);
  };

  const handleAddMeal = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage meals');
      return;
    }

    if (!mealInput.trim()) {
      toast.warn('Please enter a meal name');
      return;
    }

    const updatedPlanner = { ...planner };
    const { key, date, mealType, id } = modalData;
    const payload = {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      time: mealType,
      meal: mealInput,
    };

    try {
      let result;
      if (id) {
        result = await updatePlan(id, payload);
        toast.success('Meal updated');
      } else {
        result = await addPlan(payload);
        toast.success('Meal added');
      }
      updatedPlanner[key] = { meal: payload.meal, _id: result._id || id };
      setPlanner(updatedPlanner);
    } catch (err) {
      toast.error('Failed to save meal');
    }
    closeModal();
  };

  const goToNextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 7);
    setCurrentDate(next);
  };

  const goToPreviousWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 7);
    setCurrentDate(prev);
  };
  useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen font-sans bg-gray-50">
      <div className="bg-cover bg-center h-60 relative flex justify-center items-center" style={{ backgroundImage: `url(${foodBg})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Meal Planner</h1>
          <p className="text-white text-lg">Plan your weekly meals and always know what’s for dinner.</p>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-2xl font-bold  text-blue-700">Your Weekly Meal Plan</h2>
          <div className="flex items-center gap-2">
            <button onClick={goToPreviousWeek} className="px-2 py-1 rounded-l-md text-blue-600 bg-blue-100">
              <ChevronLeft />
            </button>
            <span className="font-medium text-blue-700">
              {currentWeek[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
              {currentWeek[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <button onClick={goToNextWeek} className="px-2 py-1 rounded-r-md text-blue-600 bg-blue-100">
              <ChevronRight />
            </button>
            <button onClick={exportAsCSV} className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              Export as CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-blue-300 rounded-lg">
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="border border-blue-300 p-2 bg-blue-100">Meal</th>
                {currentWeek.map((date) => {
                  const isToday = date.toDateString() === today;
                  return (
                    <th key={date.toDateString()} className={`border border-blue-300 p-2 ${isToday ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 bg-blue-100'}`}>
                      <div>{dayNames[date.getDay()]}</div>
                      <div className="text-sm">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {mealTypes.map((mealType) => (
                <tr key={mealType}>
                  <td className="border border-blue-300 p-2 font-medium bg-blue-50">{mealType}</td>
                  {currentWeek.map((date) => {
                    const key = `${date.toDateString()}-${mealType}`;
                    const mealObj = planner[key];
                    const meal = mealObj?.meal;
                    return (
                      <td key={key} className="border border-blue-300 w-40 h-20 p-1">
                        {meal ? (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800 pr-3">{meal}</span>
                            {isAuthenticated && (
                              <div className="flex flex-col gap-2">
                                <button onClick={() => setModal(date, dayNames[date.getDay()], mealType, mealObj._id)} className="text-blue-500 hover:text-blue-700">
                                  <Edit size={18} />
                                </button>
                                <button onClick={() => deleteMeal(key)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          isAuthenticated && (
                            <button onClick={() => setModal(date, dayNames[date.getDay()], mealType)} className="text-gray-500 hover:text-blue-600 justify-self-center flex flex-col items-center">
                              <Plus size={22} />
                              <span className="text-xs">Add meal</span>
                            </button>
                          )
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700 hover:text-red-500">
              <X />
            </button>
            <h3 className="text-xl text-center m-2 font-bold text-blue-700 mb-2">
              {modalData.id ? 'Edit Meal Plan' : 'Add Meal Plan'}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Date:</strong> {modalData.date.toDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Meal:</strong> {modalData.mealType}
            </p>
            <input
              type="text"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              placeholder="Enter meal name"
              className="w-full border border-blue-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddMeal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded flex justify-center items-center gap-2"
            >
              {modalData.id ? <><Edit3 size={18} /> Update Plan</> : <><Plus size={18} /> Add Meal Plan</>}
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
