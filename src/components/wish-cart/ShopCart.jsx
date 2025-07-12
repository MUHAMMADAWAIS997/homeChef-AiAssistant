import React, {useState, useContext, useEffect } from 'react';
import bgHero from '../../assets/bg3.jpg'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, Plus, Minus, Trash2, Save } from 'lucide-react';
import { getShoplist,updateShoplist,deleteShoplist } from '../../api/shoplistApi';
import { shoplistContext } from '../../context/shoplist/ShoplistContext';
import AuthContext from '../../context/Auth context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
export default function ShopCart() {
  const { shopList, setShoplist } = useContext(shoplistContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [quantities, setQuantities] = useState({});
 const navigate=useNavigate()
  const fetchShopList = async () => {
    try {
      const res = await getShoplist()
      console.log(res)
      setShoplist(res)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {

    if (isAuthenticated) {
      fetchShopList()
    }
  }, [isAuthenticated])
   useEffect(() => {
  const q = {};
  shopList.forEach(item => {
    q[item._id] = item.quantity;
  });
  setQuantities(q);
}, [shopList]);
const handleAdd = (id) => {
  setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
};

const handleMinus = (id) => {
  setQuantities(prev => {
    const newQty = Math.max((prev[id] || 1) - 1, 1); 
    return { ...prev, [id]: newQty };
  });
};
const handleSave = async (item) => {
  try {
    const updatedItem = { ...item, quantity: quantities[item._id] };
    await updateShoplist(item._id, updatedItem);
    toast.success("Quantity updated successfully");
    fetchShopList(); 
  } catch (err) {
    console.error(err);
    toast.error("Failed to update item");
  }
};
const handleRemove = async (id) => {
  try {
    await deleteShoplist(id);
    toast.success("Item deleted");
    setShoplist(prev => prev.filter(item => item._id !== id));
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete item");
  }
};
const exportPDF = () => {
  if (!shopList || shopList.length === 0) {
    toast.warn("Shop list is empty");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Shopping List", 14, 22);
const sortedShopList = [...shopList].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  const headers = [["Title", "Quantity", "Category"]];
  const data = sortedShopList.map(item => [
    item.title,
    item.quantity,
    item.category
  ]);

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save("shoplist.pdf");
};
  if (!isAuthenticated){
    return navigate('/')
  }
  return (
    <>
      <Navbar/>
      <div className='min-h-[150px] bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${bgHero})` }}>
        <div className='bg-black/50 p-10 text-white text-center' >
          <p className='text-4xl mb-1 font-extrabold '>Shopping Cart</p>
          <p className='text-lg italic'>You can always manage and export your list of ingredients and items as pdf file</p>
        </div>
      </div>
      <div className='relative flex text-lg items-center justify-between py-3 px-5'>
        <h1 className=' text-blue-500 font-semibold'>Total Items: {shopList.length}</h1>
        <button onClick={exportPDF} 
        className='flex bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded-lg hover:italic'
        >
          <Download className='mr-2' />Export as PDF
        </button>
      </div>
      <div className='container'>
        <h3 className='px-4 text-red-500 font-mono'>Note: After updating quantities of each item click on Save Icon to save record</h3>
      </div>
      <div className='min-h-screen'>
        <div className='grid grid-cols-5 items-center font-serif text-center border-b border-gray-600 gap-2 text-normal sm:text-lg font-bold text-blue-700 py-2  mx-3'>
          <div >Title</div>
          <div >Image</div>
          <div >Category</div>
          <div >Quantity</div>
          <div >Action</div>
        </div>
        { Array.isArray(shopList) && shopList.map((item) => (
          <div key={item._id} className='grid grid-cols-5 items-center text-center border-b border-gray-600 gap-2 py-1 text-gray-900 mx-3'>
            <div className='italic'>{item.title}</div>
            <div>
              <img src={item.image} className='h-10 w-15 overflow-hidden justify-self-center' alt={item.title} />
            </div>
            <div className='text-orange-400'>{item.category}</div>
            <div className='relative flex text-center h-6 justify-self-center sm:space-x-5 items-center'>
              <button className="bg-gray-300 rounded-full p-2 hover:bg-gray-600 transition"
                onClick={() => handleMinus(item._id)}>
                <Minus className='w-2 h-2 sm:w-4 sm:h-4' />
              </button>
              <span className="w-5 text-sm">{quantities[item._id]}</span>
              <button className="bg-gray-300 rounded-full p-2 hover:bg-gray-600 transition"
                onClick={() => handleAdd(item._id)}>
                <Plus className='w-2 h-2 sm:w-4 sm:h-4' />
              </button>
            </div>
            <div className='flex justify-self-center space-x-2'>
              <Trash2 onClick={() => handleRemove(item._id)} className='text-red-500 hover:text-red-700 w-4 h-4 sm:w-6 sm:h-6 cursor-pointer' />
              <Save onClick={() => handleSave(item)} className='text-gray-500 hover:text-gray-700 w-4 h-4 sm:w-6 sm:h-6 cursor-pointer' />
            </div>
          </div>
        ))}

      </div>

    </>
  );
}
