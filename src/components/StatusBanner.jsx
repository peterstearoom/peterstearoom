import React from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';
import '../styles/custom.css';

function StatusBanner() {
  const isOnline = useNetworkStatus();

  return (
    <div className={`status-banner ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? '✅ Online - Realtime orders enabled' : '⚠️ Offline - Orders will be queued'}
    </div>
  );
}

export default StatusBanner;
