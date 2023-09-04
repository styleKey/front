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
            <h2>Edit Style Point</h2>
            <StylePointTableSingle stylePoint={stylePointData} />

            <form onSubmit={handleSubmit}>
                <FormField label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormField label="Description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                <FormField label="Image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit" className="btn btn-edit">edit</button>
            </form>

            {updatedStylePoint && (
                <div>
                    <h3>Updated Style Point</h3>
                    <StylePointTableSingle stylePoint={updatedStylePoint} />
                </div>
            )}


        </div>
    );
};

export default EditStylePoint;
