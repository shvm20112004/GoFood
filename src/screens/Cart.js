import React from 'react';
import { useCart } from '../components/ContextReducer';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Cart() {
    const cartItems = useCart();

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h3>Your cart is empty</h3>
                <Link to="/" className="btn btn-primary mt-3">Go back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <div><Navbar/></div>
        <div className="container mt-5">
            <h2 className="mb-4">My Cart</h2>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-success">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.size}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4 className="text-end">Total: ₹{totalPrice}</h4>
        </div>
        </>
        
    );
}
