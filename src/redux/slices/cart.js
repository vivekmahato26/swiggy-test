import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    value: {
      items: [],
      totalPrice: 0,
      totalQty: 0,
      restraunt: "",
      discountedPrice:0
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, restraunt } = action.payload;
      if (state.value.restraunt !== restraunt) {
        state.value = {
          items: [],
          totalPrice: 0,
          totalQty: 0,
          discountedPrice:0
        };
      }
      state.value.restraunt = restraunt;
      const temp = state.value.items.filter((e) => e.id == item.id);
      state.value.totalPrice += parseInt(item.price);
      state.value.discountedPrice += parseInt(item.price);
      state.value.totalQty += 1;
      if (temp.length) {
        state.value.items = state.value.items.map((e) => {
          if (e.id == item.id) {
            e.qty += 1;
          }
          return e;
        });
      } else {
        state.value.items.push({ ...item, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { item } = action.payload;
      const temp = state.value.items.filter((e) => e.id == item.id);
      if (temp.length) {
        state.value.totalPrice -= parseInt(item.price);
        state.value.discountedPrice -= parseInt(item.price);
        state.value.totalQty -= 1;
        if (temp[0].qty == 1) {
          state.value.items = state.value.items.filter((e) => e.id !== item.id);
        } else {
          state.value.items = state.value.items.map((e) => {
            if (e.id == item.id) {
              e.qty -= 1;
            }
            return e;
          });
        }
        if ((state.value.totalQty = 0)) state.value.totalPrice = 0;
      }
    },
    deleteCart: (state, action) => {
      state.value = {
        items: [],
        totalPrice: 0,
        totalQty: 0,
        discountedPrice: 0
      };
    },
    applyCoupon: (state,action) => {
        const {minOrder,type,multiplier,maxDiscount} = action.payload;
        if(minOrder <= state.value.totalPrice) {
            if(type == "percentage") {
                let discount = state.value.totalPrice * multiplier;
                if(discount > maxDiscount) {
                    discount = maxDiscount;
                }
                state.value.discountedPrice = state.value.totalPrice -  parseFloat(discount);
            }
            if(type == "flat") {
                state.value.discountedPrice = state.value.totalPrice -  parseInt(multiplier);
            }
        }
    }
  },
});

export const { addToCart, removeFromCart, deleteCart,applyCoupon } = cartSlice.actions;

export default cartSlice.reducer;
