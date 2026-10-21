import { createContext, useContext } from 'react';

/** Site-wide actions any page can trigger without prop drilling. */
export const AdmissionContext = createContext<{
  openAdmission: () => void;
  openJourney: () => void;
  openAssistant: () => void;
}>({ openAdmission: () => undefined, openJourney: () => undefined, openAssistant: () => undefined });

export const useAdmission = () => useContext(AdmissionContext);
