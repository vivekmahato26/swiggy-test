import { configureStore } from "@reduxjs/toolkit";
import menu from "./slices/menu";
import cart from "./slices/cart";

export default configureStore({
    reducer: {
        Menu: menu,
        Cart: cart
    }
})