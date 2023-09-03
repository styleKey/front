import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BrandTableRow from './BrandTableRow';
import BrandTable from './BrandTable';

const EditBrand = () => {
    const { id } = useParams();

    const [stylePoints, setStylePoints] = useState([]);
    const [selectedStylePoint, setSelectedStylePoint] = useState('');

    const [title, setTitle] = useState('');
    const [title_eng, setTitleEng] = useState('');
    const [description, setDescription] = useState('');
    const [site_url, setSiteUrl] = useState('');
    const [image, setImage] = useState('');

    const [updatedBrand, setUpdatedBrand] = useState(null);

    const [brandData, setBrandData] = useState({});


    useEffect(() => {
        const fetchStylePoints = async () => {
            try {
                const response = await axios.get('/admin/stylepoints');
                setStylePoints(response.data);
            } catch (error) {
                console.error('Error fetching stylepoints:', error);
            }
        };
        fetchStylePoints();

        const fetchBrandDetails = async () => {
            try {
                const response = await axios.get(`/admin/brand/${id}`);
                setBrandData(response.data.brand);

                setSelectedStylePoint(response.data.brand.stylepointId); // Use default value if undefined
                setTitle(response.data.brand.title);
                setTitleEng(response.data.brand.title_eng);
                setDescription(response.data.brand.description);
                setSiteUrl(response.data.brand.site_url);
                setImage(response.data.brand.image);
            } catch (error) {
                console.error('Error fetching brand details:', error);
            }
        };
        fetchBrandDetails();
    }, [id]);


    const handleDeleteBrand = async (brandId) => {
        try {
            await axios.delete(`/admin/brand/${brandId}`);
            setBrandData(prevBrandData => {
                return prevBrandData.id !== brandId;
            });
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedBrandData = {
            stylepointId: selectedStylePoint,
            title,
            title_eng,
            description,
            site_url,
            image,
        };

        try {
            const response = await axios.put(`/admin/brand/${id}`, updatedBrandData);
            setUpdatedBrand(response.data.brand);
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>Edit Brand</h2>
            <table>
                <thead>
                    <BrandTableRow />
                </thead>
                <tbody>
                    <BrandTable key={brandData.id} brand={brandData} onDelete={handleDeleteBrand} />
                </tbody>
            </table>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>stylepoint</label>
                    <select
                        value={selectedStylePoint}
                        onChange={(event) => setSelectedStylePoint(event.target.value)}
                        required
                    >
                        <option value="">Select a Style Point</option>
                        {stylePoints && stylePoints.map((stylePoint) => (
                            <option key={stylePoint.id} value={stylePoint.id}>
                                {stylePoint.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>title</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>
                <div>
                    <label>title_eng</label>
                    <input type="text" value={title_eng} onChange={(event) => setTitleEng(event.target.value)} required />
                </div>
                <div>
                    <label>description</label>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
                </div>
                <div>
                    <label>site_url</label>
                    <input type="text" value={site_url} onChange={(event) => setSiteUrl(event.target.value)} required />
                </div>
                <div>
                    <label>image</label>
                    <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
                </div>
                <button type="submit" className="btn btn-edit">edit</button>
            </form>

            {brandData && updatedBrand && (
                <div>
                    <h3>Updated Brand</h3>
                    <table>
                        <thead>
                            <BrandTableRow />
                        </thead>
                        <tbody>
                            <BrandTable brand={updatedBrand} onDelete={handleDeleteBrand} />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EditBrand;
