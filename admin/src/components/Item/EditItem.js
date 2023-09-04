import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';

import { ItemTableSingle } from '../Item/ItemTable';

const EditItem = () => {
    const { id } = useParams();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [coordiLooks, setCoordiLooks] = useState([]);
    const [title, setTitle] = useState('');
    const [sales_link, setSalesLink] = useState('');
    const [image, setImage] = useState('');

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCoordiLook, setSelectedCoordiLook] = useState('');
    const [itemData, setItemData] = useState({});
    const [updatedItem, setUpdatedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const brandsdata = await getData('brands');
            if (brandsdata) {
                setBrands(brandsdata.content);
            }
            const coordilooksdata = await getData('coordilooks');
            if (coordilooksdata) {
                setCoordiLooks(coordilooksdata.content);
            }
            const categoriesdata = await getData('categories');
            if (categoriesdata) {
                setCategories(categoriesdata);
            }
            const data = await getData(`item/${id}`);
            if (data) {
                setItemData(data);
                setSelectedBrand(data.brand.id);
                setSelectedCoordiLook(data.coordilook.id);
                setSelectedCategory(data.category.id);
                setTitle(data.title);
                setSalesLink(data.sales_link);
                setImage(data.image);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            brandId: selectedBrand,
            coordilookId: selectedCoordiLook,
            categoryId: selectedCategory,
            title,
            sales_link,
            image,
        };
        putData('item', id, newData, (updatedData) => { setUpdatedItem(updatedData); });
    };

    return (
        <div>
            <h2>Edit Item</h2>
            <ItemTableSingle item={itemData} />

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
                    <input type="text" value={sales_link} onChange={(event) => setSalesLink(event.target.value)} />
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
                    <ItemTableSingle item={updatedItem} />

                </div>
            )}
        </div>
    );
};

export default EditItem;
