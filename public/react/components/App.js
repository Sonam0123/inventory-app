
import React, { useState, useEffect } from 'react';
import NavBar  from './NavBar';
import { HomePage } from './HomePage';
import ShopAll from './ShopAll';
import { Route, Routes, useLocation } from 'react-router-dom';
import '../stylesheets/app.css';
import About from './About';
// import and prepend the api url to any fetch calls
import apiURL from '../api';
import Contact from './Contact';
import Footer from './Footer';
import Cart from './Cart';
import { ProductPage } from './ProductPage';

export const App = () => {
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState([]);

	async function fetchItems() {
		try {
		const response = await fetch(`${apiURL}/items`);
		const itemsData = await response.json();
		console.log(itemsData);
		setItems(itemsData);
		} catch (err) {
		console.log("Oh no an error! ", err);
		}
	}
	const addToCart = (id) => {
		for (let i = 0; i < items.length; i++) {
		  if (items[i].id === id) {
			setCart(prevCart => [...prevCart, items[i]]);
			break;
		  }}

		console.log('clicked')
		console.log(cart)
	};
	const removeItem = (id) => {
		const newCart = cart.filter(item => item.id !== id)
		setCart(newCart)
	  }
	  

	useEffect(() => {
		fetchItems();
	}, []);


	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<main className='appContainer'>	
			<NavBar />
			<div className='mainContainer'>
			<Routes>
				<Route path="/" element={<HomePage items={items}/>} />
				<Route path="/shopall" element={<ShopAll />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/cart" element={<Cart cart={cart}  />} />
				<Route path="/product/:id" element={<ProductPage addToCart={addToCart} removeItem={removeItem} items={items}/>} />
			</Routes>
			</div>
			<Footer />
		</main>
	)
}
