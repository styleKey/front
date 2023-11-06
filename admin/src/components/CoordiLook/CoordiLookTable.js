import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../formatTimestamp';

function CoordiLookTableRow() {
    return (
        <tr>
            <th>id</th>
            <th>title</th>
            <th>image</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>edit</th>
            <th>delete</th>
        </tr>
    );
}

function CoordiLookTable({ coordiLook, onDelete }) {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete this coordiLook? ${coordiLook.title}`)) {
            onDelete(coordiLook.id);
        }
    };

    return (
        <tr>
            <td>{coordiLook.id}</td>
            <td><Link to={`/coordiLook/${coordiLook.id}`} className="btn btn-title">{coordiLook.title}</Link></td>
            <td><img src={coordiLook.image} alt={coordiLook.title} /></td>
            <td>{formatTimestamp(coordiLook.createdAt)}</td>
            <td>{formatTimestamp(coordiLook.updatedAt)}</td>
            <td><Link to={`/coordiLook/${coordiLook.id}/edit`} className="btn btn-edit">edit</Link></td>
            <td><button className="btn btn-delete" onClick={handleDelete}>delete</button></td>
        </tr>
    );
}

function CoordiLookTableMap({ coordiLooks, onDelete }) {
    return (
        <div>
            <Link to={`/coordiLook/create`} className="btn btn-create">create</Link>
            <table>
                <thead>
                    <CoordiLookTableRow />
                </thead>
                <tbody>
                    {coordiLooks && coordiLooks.map((coordiLook) => (
                        <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CoordiLookTableSingle({ coordiLook, onDelete }) {
    return (
        <div>
            <table>
                <thead>
                    <CoordiLookTableRow />
                </thead>
                <tbody>
                    <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} onDelete={onDelete} />
                </tbody>
            </table>
        </div>
    );
}

export { CoordiLookTableMap, CoordiLookTableSingle };