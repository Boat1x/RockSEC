import React from 'react';
import ClientDashboardLayout from './ClientDashboardLayout';
import EnhancedDashboard from './EnhancedDashboard';


const ClientPortal: React.FC = () => {
  return (
    <ClientDashboardLayout>
      <EnhancedDashboard />
    </ClientDashboardLayout>
  );
};

export default ClientPortal;