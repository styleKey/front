import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import putData from '../../api/putData';

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
                setStylePoints(stylepointsdata.content);
            }
            const data = await getData(`coordilook/${id}`);
            if (data) {
                setCoordiLookData(data.coordiLook);
                setSelectedStylePoint(data.coordiLook.stylepointId);
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
        putData('brand', id, newData, (updatedData) => { setUpdatedCoordiLook(updatedData); });
    };

    return (
        <div>
            <h2>Edit CoordiLook</h2>
            <CoordiLookTableSingle coordiLook={coordiLookData} />

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
                    <CoordiLookTableSingle coordiLook={updatedCoordiLook} />
                </div>
            )}
        </div>
    );
};

export default EditCoordiLook;
