import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [values,setValues] =useState("");
    
    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        await axios.get(`/api/get_edit_product/${id}`).then(({ data }) => {
            
            console.log(data)
            const { name, description, photo, type, quantity, price } = data.product || {}
            setName(name)
            setDescription(description)
            setPhoto(photo)
            setType(type)
            setQuantity(quantity)
            setPrice(price)
        })
        .catch(({response:{data}}) => {

        })
    }
    
    return (
        <div className="container">
            <div className="product_edit">
                {data.map((item, index) => (
                <p >
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={item.name} onChange={(e) => {setName(e.target.value)}} />
                </p>
                ))}
            </div>
        </div>
    );
};

export default Edit;
