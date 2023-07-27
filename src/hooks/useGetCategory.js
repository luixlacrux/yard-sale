import {useEffect, useState} from 'react';
import axios from 'axios';


const useGetCategory = ()  => {
    const [category, setCategory] = useState([]);

	useEffect(() => {
		const getCategory = async () => {
			const response = await axios("https://api.escuelajs.co/api/v1/categories");
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