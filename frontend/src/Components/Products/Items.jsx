import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductsAction } from "../../Redux/Actions/Products";
import { Link } from "react-router-dom";
const Items = () => {
  const dispatch = useDispatch();
  // Access the 'products' slice from the Redux state
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(allProductsAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product._id} className="group relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/product/${product._id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Count: {product.numReviews}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
