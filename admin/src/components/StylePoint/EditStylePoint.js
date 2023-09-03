import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import StylePointTableRow from './StylePointTableRow';
import StylePointTable from './StylePointTable';

const EditStylePoint = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [updatedStylePoint, setUpdatedStylePoint] = useState(null);

    const [stylePointData, setStylePointData] = useState({});

    useEffect(() => {
        const fetchStylePointDetails = async () => {
            try {
                const response = await axios.get(`/admin/stylepoint/${id}`);
                setStylePointData(response.data.stylePoint);
                
                setTitle(response.data.stylePoint.title);
                setDescription(response.data.stylePoint.description);
                setImage(response.data.stylePoint.image);
            } catch (error) {
                console.error('Error fetching style point details:', error);
            }
        };
        fetchStylePointDetails();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedStylePointData = {
            title,
            description,
            image,
        };

        try {
            const response = await axios.put(`/admin/stylepoint/${id}`, updatedStylePointData);
            setUpdatedStylePoint(response.data);
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>Edit Style Point</h2>
            <table>
                <thead>
                    <StylePointTableRow />
                </thead>
                <tbody>
                    <StylePointTable key={stylePointData.id} stylePoint={stylePointData} />
                </tbody>
            </table>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>title</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>
                <div>
                    <label>description</label>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
                </div>
                <div>
                    <label>image</label>
                    <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
                </div>
                <button type="submit" className="btn btn-edit">edit</button>
            </form>

            {updatedStylePoint && (
                <div>
                    <h3>Updated Style Point</h3>
                    <table>
                        <thead>
                            <StylePointTableRow />
                        </thead>
                        <tbody>
                            <StylePointTable stylePoint={updatedStylePoint} />
                        </tbody>
                    </table>
                </div>
            )}

            
        </div>
    );
};

export default EditStylePoint;
