import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import Swal from 'sweetalert2';


function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = 'ba114413';
  const APP_KEY = 'c6d86880f727bb1032e6aba17801c981';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      
      setStateLoader(false);
Swal.fire({
  title: "Attention !",
  text: "Please provide all necessary details in the input area.",
  icon: "warning"
})
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div>
      {stateLoader && <LoaderPage />}

<div className='container-top'>
  <h1>Health is not about the perfect diet it's a balanced approach.</h1>
  </div>
  <div className='container-top'>
      <h2>Nutrition Analysis</h2>
  </div>

      <div className='container-top1'>
      <form onSubmit={finalSearch}>
        <input className='btn'
          placeholder="ex.1 avocado,1 broccoli"
          onChange={myRecipeSearch}/>
        <button type="submit" className='btn'>Search</button>
      </form>
      </div>


      <div className="nutrition">
      {myNutrition && (
        <div > 
        <div className='first-row'>
        <div className='div1'>
          <p><b>Total Protein:</b> {myNutrition.totalNutrients.PROCNT.quantity.toFixed(2)} {myNutrition.totalNutrients.PROCNT.unit}</p>
        </div>
        <div className='div1'>
          <p><b>Total Calories:</b> {myNutrition.calories.toFixed(2)} kcal</p>
        </div>
        <div className='div1'>
          <p><b>Total Fat:</b> {myNutrition.totalNutrients.FAT.quantity.toFixed(2)} {myNutrition.totalNutrients.FAT.unit}</p>
        </div>
        </div>
      <div className="backgr">
        {myNutrition && <p><b>{myNutrition.calories.toFixed(2)}kcal</b></p>}
        {myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit },index) =>
            <Nutrition
              key={index}
                label={label}
                quantity={quantity.toFixed(2)}
                unit={unit}
               />
                )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;