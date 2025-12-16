import React, { useState } from 'react';
import SystemCards from '../components/Dashboard/SystemCards';
import KPICard from '../components/Dashboard/KPICard';
import EquipmentCard from '../components/Dashboard/EquipmentCard';
import CalendarCard from '../components/Dashboard/CalendarCard';
import TaskModal from '../components/Dashboard/TaskModal';
import '../pages/DashboardPage.css';

function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="dashboard-page">
      <SystemCards />
      
      <div className="content-row">
        <KPICard />
        <EquipmentCard />
      </div>

      <CalendarCard onAddTask={() => setModalOpen(true)} />
      
      {modalOpen && (
        <TaskModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default DashboardPage;