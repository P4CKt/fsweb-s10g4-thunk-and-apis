import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnother , addFav, getFavsFromLocalStorage, initialFav} from "./actions";
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const loading = useSelector((depo)=>depo.loading);
  const current = useSelector((depo)=>depo.current);
  const favs = useSelector((depo)=>depo.favs);
  const dispatch= useDispatch()


  const notify = (message) => {toast(message);
    setTimeout(()=>dispatch(fetchAnother()), 2000);};

  function addToFavs() {
    dispatch(addFav(current));
    notify("Favorilere Eklendii !");
    }

    useEffect(()=> {dispatch(fetchAnother());
     dispatch(getFavsFromLocalStorage())},[]);

  return (
    <div className="wrapper w-[550px] mx-auto p-6 px-4 bg-[#F7EFE5] rounded-4 m-auto ">
      <nav className="text-2xl flex justify-center justify-around pb-6 pt-8 gap-2 ">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-[#C3ACD0] border-solid border-[4px] rounded-xl shadow-sm text-[#674188]"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-[#C3ACD0] border-solid border-[4px] rounded-xl shadow-sm text-[#674188]"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && <div className="bg-[#F7EFE5] p-6 text-center shadow-md">YÜKLENİYOR</div>}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-around py-3">
            <button onClick={()=>dispatch(fetchAnother())}
              className="select-none px-4 py-2  border-solid border-[1px] rounded-xl border-gray-600 text-[#674188] hover:border-[#674188] hover:text-gray-600"
            >
              Başka bir tane
            </button>
            <button onClick={()=>dispatch(initialFav())}
              className="select-none px-4 py-2  border-solid border-[1px] rounded-xl border-gray-600 text-[#674188] hover:border-[#674188] hover:text-gray-600"
            >
              Geçmişini Temizle
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 border-solid border-[1px] rounded-xl border-gray-600 text-[#674188] hover:border-[#674188] hover:text-gray-600"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col   gap-3">
            {favs.length > 0
              ? favs.map((item) => (
                <FavItem key={item.length} title={item} />
              ))
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            }
          </div>
        </Route>
      </Switch>
    </div>
  );
}
