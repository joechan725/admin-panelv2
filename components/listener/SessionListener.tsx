'use client';

import { useSessionListener } from '@/lib/hooks/user/user/useSessionListener';

interface SessionListenerProps {}

const SessionListener = ({}: SessionListenerProps) => {
  useSessionListener();
  return null;
};

export default SessionListener;
