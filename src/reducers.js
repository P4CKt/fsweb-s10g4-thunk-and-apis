import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  GET_FAVS_FROM_IN
} from "./actions";



const initial = {
  favs: [{
    fact: "Geldii mi", length: 180
  }],
  current: null,
  error: null,
  loading: false,
};


function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
 
  if(JSON.parse(localStorage.getItem("s10g4"))) return JSON.parse(localStorage.getItem("s10g4")); localStorage.setItem("s10g4", JSON.stringify(initial.favs));
  
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:{
         if(!state.favs.includes(action.payload)){
          writeFavsToLocalStorage({favs: [...state.favs, action.payload]})
      return {...state, favs: [...state.favs ,action.payload]}}  
      else{
      return state}}
     
     case FAV_REMOVE:
      const removeFav= state.favs.filter((item)=>item.length !== action.payload)
      writeFavsToLocalStorage({favs: [...removeFav]})
      return {
        ...state, favs: [...removeFav]
      }

    case FETCH_SUCCESS:
      return {...state, current: action.payload};

    case FETCH_LOADING:
      return {...state, loading: action.payload}

    case FETCH_ERROR:
      return {...state, error: action.payload}

    case GET_FAVS_FROM_LS:
      return {...state ,favs: readFavsFromLocalStorage()}

    case GET_FAVS_FROM_IN:
      writeFavsToLocalStorage({favs: [initial.favs]})
      return {...state ,favs: initial.favs}

    default:
      return state;
  }
}
