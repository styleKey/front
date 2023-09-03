import React from 'react';
import { Link } from 'react-router-dom';

function CoordiLookTable({ coordiLook }) {
    return (
        <tr>
            <td>{coordiLook.createdAt}</td>
            <td>{coordiLook.updatedAt}</td>
            <td>{coordiLook.id}</td>
            <td><Link to={`/coordiLook/${coordiLook.id}`} className="btn btn-title">{coordiLook.title}</Link></td>
            <td><img src={coordiLook.image} alt={coordiLook.title} /></td>
            <td> <Link to={`/coordiLook/${coordiLook.id}/edit`} className="btn btn-edit">edit</Link></td>
      <td> <Link to={`/coordiLook/${coordiLook.id}/delete`} className="btn btn-delete">delete</Link></td>
        </tr>
    );
}

export default CoordiLookTable;
