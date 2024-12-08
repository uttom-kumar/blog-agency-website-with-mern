import React from 'react';
import AdminLayout from "../adminLayout/admin-layout.jsx";
import AdminTeamUpdateComponent from "../TeamList/admin-team-update-component.jsx";

const AdminTeamUpdatePage = () => {
    return (
        <AdminLayout>
            <AdminTeamUpdateComponent />
        </AdminLayout>
    );
};

export default AdminTeamUpdatePage;