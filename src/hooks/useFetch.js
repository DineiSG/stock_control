import { useState, useEffect } from "react"


export const useFetch = (urlLojas, urlVeiculos) => {
    const [data, setData] = useState(null);
   
    // 5 - refatorando post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
   
    // 6 - loading
    const [loading, setLoading] = useState(false);
   
    // 8 - tratando erros
    const [error, setError] = useState(null);
   
    // 9 - desafio 6
    const [itemId, setItemId] = useState(null);
  
   
    const httpConfig = (data, method) => {
      if (method === "POST") {
        setConfig({
          method,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
   
        setMethod(method);
      } else if (method === "DELETE") {
        setConfig({
          method,
          headers: {
            "Content-type": "application/json",
          },
        });
   
        setMethod(method);
        setItemId(data);
      }
    };
   
    useEffect(() => {
      const fetchData = async () => {
        // 6 - loading
        setLoading(true);
   
        try {
          const res = await fetch(urlLojas);
   
          const json = await res.json();
   
          setData(json);
        } catch (error) {
          console.log(error.message);
   
          setError("Houve algum erro ao carregar os dados!");
        }
   
        setLoading(false);
      };
   
      fetchData();
    }, [urlLojas, callFetch]);
   
    // 5 - refatorando post
    useEffect(() => {
      const httpRequest = async () => {
        let json;
   
        if (method === "POST") {
          let fetchOptions = [urlLojas,  config];
   
          const res = await fetch(...fetchOptions);
   
          json = await res.json();
        } else if (method === "DELETE") {
          const deleteUrl = `http://localhost:3000/products/${itemId}`;
   
          const res = await fetch(deleteUrl, config);
   
          json = await res.json();
        }
   
        setCallFetch(json);
      };
   
      httpRequest();
    }, [config, method, urlLojas, itemId]);
   
    return { data, httpConfig, loading, error };
  };

export default useFetch
