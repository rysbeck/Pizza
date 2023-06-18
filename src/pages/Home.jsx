import React from 'react';
import {useDispatch, useSelector} from 'react-redux'

import {setCategoryId} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector((state)=>state.filter)
  const sortType = sort.sortProperty


  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory=(id)=>{
    dispatch(setCategoryId(id));
  }
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
  },[categoryId, sortType, searchValue, currentPage, category, sortBy, order, search])

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
        <Pagination onChangePage={number=>setCurrentPage(number)}/>
    </div>
  )
}

export default Home;