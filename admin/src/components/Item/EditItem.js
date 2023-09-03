import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ItemTableRow from './ItemTableRow';
import ItemTable from './ItemTable';

const EditItem = () => {
    const { id } = useParams();

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [coordiLooks, setCoordiLooks] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCoordiLook, setSelectedCoordiLook] = useState('');

    const [title, setTitle] = useState('');
    const [salesLink, setSalesLink] = useState('');
    const [image, setImage] = useState('');

    const [updatedItem, setUpdatedItem] = useState(null);

    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('/admin/brands');
                setBrands(response.data.content);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchBrands();

        const fetchCoordiLooks = async () => {
            try {
                const response = await axios.get('/admin/coordilooks');
                setCoordiLooks(response.data.content);
            } catch (error) {
                console.error('Error fetching coordilooks:', error);
            }
        };
        fetchCoordiLooks();

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/admin/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();

        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`/admin/item/${id}`);
                setItemData(response.data);

                setSelectedBrand(response.data.brand.id);
                setSelectedCoordiLook(response.data.coordilook.id);
                setSelectedCategory(response.data.category.id);

                setTitle(response.data.title);
                setSalesLink(response.data.sales_link);
                setImage(response.data.image);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        fetchItemDetails();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedItemData = {
            brandId: selectedBrand,
            coordilookId: selectedCoordiLook,
            categoryId: selectedCategory,
            title,
            sales_link: salesLink,
            image,
        };

        try {
            const response = await axios.put(`/admin/item/${id}`, updatedItemData);
            setUpdatedItem(response.data);
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>Edit Item</h2>
            <table>
                <thead>
                    <ItemTableRow />
                </thead>
                <tbody>
                    <ItemTable key={itemData.id} item={itemData} />
                </tbody>
            </table>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>brand</label>
                    <select
                        value={selectedBrand}
                        onChange={(event) => setSelectedBrand(event.target.value)}
                        required
                    >
                        <option value="">Select a Brand</option>
                        {brands && brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>coordilook</label>
                    <select
                        value={selectedCoordiLook}
                        onChange={(event) => setSelectedCoordiLook(event.target.value)}
                        required
                    >
                        <option value="">Select a CoordiLook</option>
                        {coordiLooks && coordiLooks.map((coordiLook) => (
                            <option key={coordiLook.id} value={coordiLook.id}>
                                {coordiLook.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>category</label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>title</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>

                <div>
                    <label>sales_link</label>
                    <input type="text" value={salesLink} onChange={(event) => setSalesLink(event.target.value)} />
                </div>

                <div>
                    <label>image</label>
                    <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
                </div>

                <button type="submit" className="btn btn-edit">Edit</button>
            </form>

            {updatedItem && (
                <div>
                    <h3>Updated Item</h3>
                    <table>
                        <thead>
                            <ItemTableRow />
                        </thead>
                        <tbody>
                            <ItemTable item={updatedItem} />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EditItem;
