import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/slices/menu";
import { addToCart, applyCoupon, removeFromCart } from "../redux/slices/cart";

export default function Restraunts() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart.value);
  const coupons = [
    {
      title: "60% max 120",
      maxDiscount: 120,
      multiplier: 0.6,
      type: "percentage",
      minOrder: 249,
    },
    {
      title: "flat 100 off",
      maxDiscount: 100,
      multiplier: 100,
      type: "flat",
      minOrder: 249,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onClick={() =>
            dispatch(
              fetchMenu({
                url: "https://res.cloudinary.com/cliqtick/raw/upload/v1690781924/swiggy/fasos_tmaved.json",
                restraunt: "fasos",
              })
            )
          }
        >
          <img
            width={200}
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/af33b81798b11deba338e94b7585d348"
          />
          <h2>Fasos</h2>
        </div>
        <div
          onClick={() =>
            dispatch(
              fetchMenu({
                url: "https://res.cloudinary.com/cliqtick/raw/upload/v1690781923/swiggy/theobroma_dz8lcs.json",
                restraunt: "theobroma",
              })
            )
          }
        >
          <img
            width={200}
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/cawlojcnfzsgesxp239i"
          />
          <h2>Theobroma</h2>
        </div>
      </div>
      <div>
        {coupons.map((e) => {
          return <button onClick={() => dispatch(applyCoupon(e))}>{e.title}</button>;
        })}
      </div>
      <div>
        {cart.items.map((e) => {
          return (
            <div>
              <img src={e.img} width={50} />
              <button onClick={() => dispatch(removeFromCart({ item: e }))}>
                -
              </button>
              <span>{e.qty}</span>
              <button
                onClick={() =>
                  dispatch(addToCart({ restraunt: cart.restraunt, item: e }))
                }
              >
                +
              </button>
            </div>
          );
        })}
        <div>Total: {cart.discountedPrice}</div>
      </div>
    </div>
  );
}
