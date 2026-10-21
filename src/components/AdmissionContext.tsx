import { createContext, useContext } from 'react';

/** Lets any page open the admission popup without prop drilling. */
export const AdmissionContext = createContext<{ openAdmission: () => void }>({ openAdmission: () => undefined });

export const useAdmission = () => useContext(AdmissionContext);
