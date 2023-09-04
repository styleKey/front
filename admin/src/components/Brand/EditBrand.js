import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';

import { BrandTableSingle } from './BrandTable';

const EditBrand = () => {
    const { id } = useParams();
    const [stylePoints, setStylePoints] = useState([]);
    const [title, setTitle] = useState('');
    const [title_eng, setTitleEng] = useState('');
    const [description, setDescription] = useState('');
    const [site_url, setSiteUrl] = useState('');
    const [image, setImage] = useState('');

    const [selectedStylePoint, setSelectedStylePoint] = useState('');
    const [brandData, setBrandData] = useState({});
    const [updatedBrand, setUpdatedBrand] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const stylepointsdata = await getData('stylepoints');
            if (stylepointsdata) {
                setStylePoints(stylepointsdata);
            }
            const data = await getData(`brand/${id}`);
            if (data && data.brand) {
                setBrandData(data);
                setSelectedStylePoint(data.stylepointId);
                setTitle(data.title);
                setTitleEng(data.title_eng);
                setDescription(data.description);
                setSiteUrl(data.site_url);
                setImage(data.image);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            stylepointId: selectedStylePoint,
            title,
            title_eng,
            description,
            site_url,
            image,
        };
        putData('brand', id, newData, (updatedData) => { setUpdatedBrand(updatedData); });
    };

    return (
        <div>
            <h2>Edit Brand</h2>
            <BrandTableSingle brand={brandData} />

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
                    <BrandTableSingle brand={updatedBrand} />
                </div>
            )}
        </div>
    );
};

export default EditBrand;
