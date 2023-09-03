import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import CoordiLookTableRow from './CoordiLookTableRow';
import CoordiLookTable from './CoordiLookTable';

const EditCoordiLook = () => {
    const { id } = useParams();

    const [stylePoints, setStylePoints] = useState([]);
    const [selectedStylePoint, setSelectedStylePoint] = useState('');

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const [updatedCoordiLook, setUpdatedCoordiLook] = useState(null);

    const [coordiLookData, setCoordiLookData] = useState({});


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

        const fetchCoordiLookDetails = async () => {
            try {
                const response = await axios.get(`/admin/coordilook/${id}`);
                setCoordiLookData(response.data.coordiLook);

                setSelectedStylePoint(response.data.coordiLook.stylepointId || ''); // Use default value if undefined
                setTitle(response.data.coordiLook.title);
                setImage(response.data.coordiLook.image);
            } catch (error) {
                console.error('Error fetching coordilook details:', error);
            }
        };
        fetchCoordiLookDetails();
    }, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedCoordiLookData = {
            stylepointId: selectedStylePoint,
            title,
            image,
        };

        try {
            const response = await axios.put(`/admin/coordilook/${id}`, updatedCoordiLookData);
            setUpdatedCoordiLook(response.data);
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>Edit CoordiLook</h2>
            <table>
                <thead>
                    <CoordiLookTableRow />
                </thead>
                <tbody>
                    <CoordiLookTable key={coordiLookData.id} coordiLook={coordiLookData} />
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
                    <label>image</label>
                    <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
                </div>
                <button type="submit" className="btn btn-edit">edit</button>
            </form>

            {updatedCoordiLook && (
                <div>
                    <h3>Updated CoordiLook</h3>
                    <table>
                        <thead>
                            <CoordiLookTableRow />
                        </thead>
                        <tbody>
                            <CoordiLookTable coordiLook={updatedCoordiLook} />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EditCoordiLook;
