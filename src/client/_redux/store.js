import { createStore, combineReducers, applyMiddleware } from "redux";


import auth from "../_reducers/auth";
import auth_reload from "../_reducers/auth_reload";
import ticket from "../_reducers/ticket";
import user from "../_reducers/user";
import Tambah_train from "../_reducers/tambah_train";
import Beli_ticket from "../_reducers/beli_ticket";
import Hapus_payment from "../_reducers/hapus_payment";
import update_payment from "../_reducers/update_payment";
import Type_train from "../_reducers/type_train";
import Cari_ticket from "../_reducers/cari_ticket";
import payment from "../_reducers/payment";
// import getOne_ticket from "../_reducers/modal_beli";
import { logger, promise } from "../middleware";

// Global state
const rootReducers = combineReducers({
  auth,
  auth_reload,
  ticket,
  user,
  payment,
  Tambah_train,
  Type_train,
  Cari_ticket,
  Hapus_payment,
  Beli_ticket,
  update_payment


});

// Setup store for Redux
const store = createStore(rootReducers, applyMiddleware(logger, promise));

export default store;
