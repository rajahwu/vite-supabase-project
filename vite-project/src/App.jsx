import Calendar from "./components/Calendar";
import { useEffect, useState } from "react";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);


  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }


  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
      <div className="flex items-center justify-center min-h-screen from-red-100 via-red-300 to-red-500 bg-gradient-to-br">
        <Calendar />
      </div>
    </>
  );
}

export default App;
