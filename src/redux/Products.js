import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiCall from "../services/apiCall";
import { cartActions } from "./eCommerceStore";

const Products = () => {
  const [list, setList] = useState([]);
  // const [favourite, setFavourite] = useState(true);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  useEffect(() => {
    apiCall
      .get("/products")
      .then((res) => {
        setList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (productItem) => {
    setCount(count + 1);
    var dd = {
      count: 1 + count,
      description: productItem.description,
      id: productItem.id,
      image: productItem.image,
      price: productItem.price,
      title: productItem.title,
    };
    dispatch(cartActions.updatdelteFromCart(dd));
    // dispatch(cartActions.addToCart(productItem));
  };
  const getdata = () => {
    apiCall
      .get("/products")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addlist = (item) => {
    debugger;
    var data = {
      description: item.description,
      id: item.id,
      image: item.image,
      price: item.price,
      title: item.title,
      favourite: !item.favourite,
    };
    apiCall
      .put(`/products/${item.id}`, data)
      .then((res) => {
        getdata();
        // setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #cdcdcd",
                margin: 2,
                textAlign: "center",
                padding: 10,
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <img src={item.image} alt={item.title} />
              <p>₹ {item.price}</p>
              <button onClick={() => handleClick(item)}>Add to Cart</button>
              {item.favourite ? (
                <button
                  onClick={() => {
                    addlist(item);
                  }}
                >
                  Add to Wishlist
                </button>
              ) : (
                <button
                  style={{ color: "red" }}
                  onClick={() => {
                    addlist(item);
                  }}
                >
                  Add to fav
                </button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
