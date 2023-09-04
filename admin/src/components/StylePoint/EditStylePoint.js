import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';
import FormField from '../FormField';

import { StylePointTableSingle } from './StylePointTable';

const EditStylePoint = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [stylePointData, setStylePointData] = useState({});
    const [updatedStylePoint, setUpdatedStylePoint] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(`stylepoint/${id}`);
            if (data) {
                setStylePointData(data.stylePoint);
                setTitle(data.stylePoint.title);
                setDescription(data.stylePoint.description);
                setImage(data.stylePoint.image);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            title,
            description,
            image,
        };
        putData('stylepoint', id, newData, (updatedData) => { setUpdatedStylePoint(updatedData); });
    };

    return (
        <div>
            <div className="Main">
                <h2>Edit {stylePointData.title} stylepoint</h2>
                <StylePointTableSingle stylePoint={stylePointData} />
            </div>

            <form onSubmit={handleSubmit}>
                <FormField label="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormField label="description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                <FormField label="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit" className="btn btn-edit">edit</button>
            </form>

            <div className="New">
                {updatedStylePoint && (
                    <div>
                        <h2>Updated {updatedStylePoint.title} stylepoint</h2>
                        <StylePointTableSingle stylePoint={updatedStylePoint} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditStylePoint;
