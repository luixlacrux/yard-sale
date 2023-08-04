import {useEffect, useState} from 'react';
import axios from 'axios';

const API = process.env.API;

const useGetCategory = ()  => {
    const [category, setCategory] = useState([]);

	useEffect(() => {
		const getCategory = async () => {
			const response = await axios(`${API}/categories`);
			const data = response.data.slice(0, 4);
            data.push(
             {id: 6, name: 'All',}
            );
            
            setCategory(data.reverse());
            
		};
		getCategory();
		
}, []);


return category;
};

export default useGetCategory