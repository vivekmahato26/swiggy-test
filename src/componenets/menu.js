import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cart";

export default function Menu() {
  const menu = useSelector((state) => state.Menu.value);
  const cart = useSelector((state) => state.Cart.value);
  const restraunt = useSelector((state) => state.Menu.restraunt);
  const dispatch = useDispatch();
  return (
    <div>
      {menu.map((e, index) => {
        const cartProd = cart.items.filter(ce => ce.id == e.id);
        return (
          <div
            key={index}
            style={{ display: "flex", borderBottom: "1px dashed black", justifyContent:"space-between",alignItems:"center" }}
          >
            <div>
              <p>{e.name}</p>
              <p>{e.desc}</p>
              <p>${e.price}</p>
            </div>
            <div>
                <img src={e.img} width={100}/>
                {
                    cartProd.length ? (
                        <div>
                            <button onClick={() => dispatch(removeFromCart({item: e}))}>-</button>
                            {cartProd[0].qty}
                            <button onClick={() => dispatch(addToCart({restraunt,item: e}))}> +</button>
                        </div>
                    ): <button onClick={() => dispatch(addToCart({restraunt,item: e}))}>Add</button>

                }                
            </div>
          </div>
        );
      })}
    </div>
  );
}
