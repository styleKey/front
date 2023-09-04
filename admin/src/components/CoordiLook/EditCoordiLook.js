import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';
import deleteData from '../../api/deleteData';
import FormField from '../FormField';

import { CoordiLookTableSingle } from './CoordiLookTable';

const EditCoordiLook = () => {
    const { id } = useParams();
    const [stylePoints, setStylePoints] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const [selectedStylePoint, setSelectedStylePoint] = useState('');
    const [coordiLookData, setCoordiLookData] = useState({});
    const [updatedCoordiLook, setUpdatedCoordiLook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const stylepointsdata = await getData('stylepoints');
            if (stylepointsdata) {
                setStylePoints(stylepointsdata);
            }
            const data = await getData(`coordilook/${id}`);
            if (data) {
                setCoordiLookData(data.coordiLook);
                setTitle(data.coordiLook.title);
                setImage(data.coordiLook.image);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            stylepointId: selectedStylePoint,
            title,
            image,
        };
        putData('coordilook', id, newData, (updatedData) => { setUpdatedCoordiLook(updatedData); });
    };

    const handleDelete = async (id) => {
        await deleteData('coordiLook', id);
        window.location.reload();
    };

    return (
        <div>
            <div className="Main">
                <h2>Edit {coordiLookData.title} coordiLook</h2>
                <CoordiLookTableSingle coordiLook={coordiLookData} onDelete={handleDelete} />
            </ div>

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

                    <FormField label="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <FormField label="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />

                    <button type="submit" className="btn btn-edit">edit</button>
                </div>
            </form>

            <div className="New">
                {updatedCoordiLook && (
                    <div>
                        <h2>Updated {updatedCoordiLook.title} coordiLook</h2>
                        <CoordiLookTableSingle coordiLook={updatedCoordiLook} onDelete={handleDelete} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCoordiLook;
