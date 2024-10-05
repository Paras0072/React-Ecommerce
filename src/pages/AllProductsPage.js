
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, deleteFromCart, deleteProduct } from "../store/reducer";

const AllProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [productList, setProductList] = useState([]);
  const [isSorted, setIsSorted] = useState(false); // New state for sorting
 // const [is_sort_asc, set_is_sort_asc] = useState(false);
  const [deletingModalProduct, setDeletingModalProduct] = useState(null);

  const handleProductEdit = useCallback(
    (productId) => {
      navigate(`/create?id=${productId}`);
    },
    [navigate]
  );

  const handleProductDelete = useCallback(
    (productId) => {
      dispatch(deleteProduct(productId));
      setDeletingModalProduct(null);
      toast("Item Deleted successfully!");
    },
    [dispatch]
  );

  // const handleSort = useCallback(() => {
  //   set_is_sort_asc((prev) => !prev);
  // }, []);

  // Function to add product in cart
  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
      toast("Item Added successfully!");
    },
    [dispatch]
  );
// Function o remove product from cart
  const handleRemoveFromCart = useCallback(
    (id) => {
      dispatch(deleteFromCart(id));
      toast("Item Removed successfully!");
    },
    [dispatch]
  );

  useEffect(() => {
    setProductList(products);
  }, [products]);

  
  // const sortedProductList = useMemo(() => {
  //   return productList
  //     .slice()
  //     .sort((a, b) => (is_sort_asc ? a.price - b.price : b.price - a.price));
  // }, [productList, is_sort_asc]);



  // Function to handle sorting
  const handleSort = () => {
    const sortedProducts = productList
      .slice()
      .sort((a, b) => a.price - b.price);
    setProductList(sortedProducts);
    setIsSorted(true); // Mark sorting as active
  };
  // Function to remove sorting and reset the product list
  const handleRemoveSort = () => {
    setProductList(products);
    setIsSorted(false); // Mark sorting as inactive
  };
   useEffect(() => {
     setProductList(products); // Initialize product list from Redux store
   }, [products]);

  return (
    <div style={{ margin: 20 }}>
      {/* Delete modal confirmation */}
      {deletingModalProduct && (
        <div className="confirm-modal">
          <div className="modal-box">
            <h4>
              Are you sure you want to delete "{deletingModalProduct?.name}"?
            </h4>
            <div className="modal-btns">
              <button
                onClick={() => {
                  handleProductDelete(deletingModalProduct?.id);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setDeletingModalProduct(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Button */}
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{ padding: "10px 20px", marginBottom: 20 }}
          onClick={handleSort}
        >
          Sort by Price
        </button>
      </div> */}
      
      
      {/* Sort Button with Cross (X) Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {!isSorted && (
          <button
            style={{ padding: "10px 20px", marginBottom: 20 }}
            onClick={handleSort}
          >
            Sort by Price
          </button>
        )}
        {isSorted && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={{ padding: "10px 20px", marginBottom: 20 }} disabled>
              Sorted by Price
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                fontSize: "18px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={handleRemoveSort}
            >
              ❌
            </button>
          </div>
        )}
      </div>

      {/* Render the product list */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {productList.map((product) => {
          const isInCart = cart?.find((item) => item.id === product?.id);
          return (
            <div key={product.id} className="product">
              <div className="product_left">
                <img src={product.imageUrl} alt={product.name} />
                <div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">Rs.{product.price}</p>
                </div>
              </div>

              <div className="product_right">
                <p className="product-description">{product.description}</p>
                <div>
                  <button onClick={() => handleProductEdit(product.id)}>
                    Edit
                  </button>
                  <button onClick={() => setDeletingModalProduct(product)}>
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      isInCart
                        ? handleRemoveFromCart(product.id)
                        : handleAddToCart(product)
                    }
                  >
                    {isInCart ? "Remove From Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductsPage;
