'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { useState } from 'react';

interface SmartBarTogglePublicProps {
  smartBar: SmartBar;
}

const SmartBarTogglePublic = ({ smartBar }: SmartBarTogglePublicProps) => {
  const { toggleIsPublic } = useSmartBar();
  const [isPublic, setIsPublic] = useState(smartBar.isPublic);

  const handleToggle = async () => {
    toggleIsPublic({ isPublic, setIsPublic, smartBar });
  };

  return <ToggleSwitch isToggled={isPublic} onToggle={handleToggle} theme="success" />;
};

export default SmartBarTogglePublic;
