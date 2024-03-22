import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";

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
      alert('ingredients entered incorrectly');
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
      <div className="backgr">
        {myNutrition && <p><b>{myNutrition.calories}kcal</b></p>}
        {myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit },index) =>
            <Nutrition
              key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
       )}
      </div>
      
      </div>
      
  );
}

export default App;
