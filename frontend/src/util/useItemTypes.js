import { useEffect, useState } from 'react';
import { getRequest } from './api-requests';

const useItemTypes = () => {
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items`);
      if (json.success) {
        setItemTypes(json.data.itemTypes);
      }
    })();
  }, []);

  return { itemTypes };
};

export default useItemTypes;
