import React from 'react';
import { Link } from 'react-router-dom';

function CoordiLookTable({ coordiLook }) {
    return (
        <tr>
            <td>{coordiLook.createdAt}</td>
            <td>{coordiLook.updatedAt}</td>
            <td>{coordiLook.id}</td>
            <td><Link to={`/admin/coordiLook/${coordiLook.id}`} className="btn btn-primary">{coordiLook.title}</Link></td>
            <td><img src={coordiLook.image} alt={coordiLook.title} /></td>
        </tr>
    );
}

export default CoordiLookTable;
