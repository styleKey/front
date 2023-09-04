import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';
import FormField from '../FormField';


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
            if (data) {
                setBrandData(data.brand);
                setTitle(data.brand.title);
                setTitleEng(data.brand.title_eng);
                setDescription(data.brand.description);
                setSiteUrl(data.brand.site_url);
                setImage(data.brand.image);
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
        putData('brand', id, newData, (updatedData) => { setUpdatedBrand(updatedData.brand); });
    };

    return (
        <div>
            <div className="Main">
                <h2>Edit {brandData.title} brand</h2>
                <BrandTableSingle brand={brandData} />
            </div>

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

                <FormField label="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormField label="title_eng" type="text" value={title_eng} onChange={(e) => setTitleEng(e.target.value)} />
                <FormField label="description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                <FormField label="site_url" type="text" value={site_url} onChange={(e) => setSiteUrl(e.target.value)} />
                <FormField label="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />

                <button type="submit" className="btn btn-edit">edit</button>
            </form>


            <div className="New">
                {updatedBrand && (
                    <div>
                        <h2>Updated {updatedBrand.title} brand</h2>
                        <BrandTableSingle brand={updatedBrand} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditBrand;
