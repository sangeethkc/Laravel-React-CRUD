import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
    const navigate = useNavigate();
    const newProduct = () => {
        navigate("/product/new");
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await axios.get("/api/get_all_products").then(({ data }) => {
            setProducts(data.products)
        })
    }

    const editProduct = (id) => {
        navigate('/product/edit/' + id)        
    }

    const deleteProduct = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.get(`/api/delete_product/${id}`)
                        .then(({ data }) => {
                            getProducts()
                            Swal.fire("Deleted!", "Your product has been deleted.", "success")
                            getProducts()
                    })
                    .catch(() => {

                    })
                }
            })
    }

    return (
        <div className="container">
            <div className="products_list">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Products</h1>
                    </div>
                    <div className="titlebar_item">
                        <div className="btn" onClick={() => newProduct()}>
                            Add Product
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className="list_header">
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Price</p>
                        <p>Inventory</p>
                        <p>Actions</p>
                    </div>
                    <div>
                        {products.length > 0 &&
                            products.map((item, index) => (
                                <div className="list_items" key={index}>
                                    <img src={`/upload/${item.photo}`} height="40px" />
                                    <a>{item.name}</a>
                                    <p>{item.type}</p>                        
                                    <a>{item.price}</a>
                                    <p>{item.quantity}</p>
                                    <div>
                                        <button className="btn-icon success" onClick={()=>editProduct(item.id)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn-icon danger" onClick={()=> deleteProduct(item.id)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
