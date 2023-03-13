import { useEffect, useState } from 'react';

function useFetch(initialUrl, initialOptions) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const reRender= () =>{
      setRefresh(!refresh);
  }
  async function fetchData() {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setData(json.data);
      console.log(data)
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetchData();
  }, [url, options,refresh]);

  return { data, error, loading, setUrl, setOptions,reRender };
}

export default useFetch;