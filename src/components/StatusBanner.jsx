import React from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';
import '../styles/custom.css';

function StatusBanner() {
  const isOnline = useNetworkStatus();

  return (
    <div className={`status-banner ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? '✅ Online - You are connected to the internet' : '⚠️ Offline - You are not connected to the internet'}
    </div>
  );
}

export default StatusBanner;
