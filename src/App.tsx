import { useQuery } from "@tanstack/react-query";
import { Product } from './types'
import api from './api'
import './App.css'


function App() {

  const getProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  };

  //Queries using constructuring 
  const {data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts //fetching data
  })

  
  if (isLoading) return <p>Loading products...</p>;


  return (
    
    <div className='App'>
      <h1 className='text-2xl uppercase mb-10'>Products</h1>
      
    <ul>
      {data?.map((products)=>(
        
        <li key={products.id}>{products.name}</li>
        
      )
    )
    
  }
    </ul>
    
    {error && <p className='text-red-500'>Error: {error.message}</p>}
    </div>
   
  )
}
export default App
