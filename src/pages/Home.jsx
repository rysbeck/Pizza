// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import qs from 'qs'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router';


import {setCategoryId,setCurrentPage,setFilters} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);

const { categoryId, sort, currentPage, sortList } = useSelector((state) => state.filter);
const sortType = sort.sortProperty;


  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory=(idx)=>{
    dispatch(setCategoryId(idx));
  }

  const onChangePage = page =>{
    dispatch(setCurrentPage(page))
  }



React.useEffect(() => {
  if (sortList) {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }
}, [dispatch, sortList]);

  

  const sortBy = sortType.replace('-',''); 
  const order = sortType.includes('-')?'asc':'desc';
  const category = categoryId>0?`category=${categoryId}`:'';
  const search = searchValue?`&search=${searchValue}`:'';

  React.useEffect(()=>{
    setIsLoading(true);
    fetch(`https://6488ef020e2469c038fe8600.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then((res)=>res.json())
    .then((arr)=>{
      setItems(arr);
    setIsLoading(false);
    });
    window.scrollTo(0,0);


  },[categoryId, sort.sortPropertype, searchValue, currentPage, category, sortBy, order, search])

  React.useEffect(()=>{
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  },[categoryId, sort.sortPropertype, currentPage, sort.sortProperty, navigate])

  const pizzas = items.map((obj)=><PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_,index)=><Skeleton key={index}/>);

  return (
    <div className='container'>
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading?skeletons:pizzas} </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;