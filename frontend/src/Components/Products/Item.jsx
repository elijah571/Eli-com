import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../Redux/Actions/Products";
import { addToCartAction } from "../../Redux/Actions/Cart";

const Item = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(productAction(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    // Dispatch action to add product to the cart with the selected quantity
    dispatch(addToCartAction(id, quantity));
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded bg-gray-200 group-hover:opacity-75"
                src={product.image}
                alt={product.name}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        fill={index < product.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 ml-3">
                      Reviews: {product.numReviews}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  {product.countInStock > 0 && (
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Quantity</span>
                      <div className="relative">
                        <select
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value, 10))
                          }
                          className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                        >
                          {[...Array(product.countInStock).keys()].map((q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                {product.countInStock > 0 ? (
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${product?.price?.toFixed(2) || "0.00"}
                    </span>
                    <button
                      onClick={addToCartHandler}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <h1 className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Unavailable
                  </h1>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Item;
