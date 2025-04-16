import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const cart = useCart(); 
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    const options = props.options;
    const priceOptions = Object.keys(options);

    useEffect(() => {
        setSize(priceOptions[0]);
    }, [priceOptions]);

    const handleAddtoCart = async () => {
        // Check if item already exists in cart
        let existingItem = cart.find(item => item.id === props.foodItem._id && item.size === size);

        if (existingItem) {
            await dispatch({
                type: "UPDATE",
                item: {
                    id: props.foodItem._id,
                    price: qty * parseInt(options[size]),
                    qty: qty
                }
            });
        } else {
            await dispatch({
                type: "ADD",
                item: {
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: qty * parseInt(options[size]),
                    qty: qty,
                    size: size
                }
            });
        }
    };

    return (
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
            <img
                src={props.imgSrc}
                className="card-img-top"
                alt={props.foodName}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>

                    <div className='d-inline h-100 fs-5'>
                        ₹{qty * parseInt(options[size])}/-
                    </div>
                </div>
                <hr />
                <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
