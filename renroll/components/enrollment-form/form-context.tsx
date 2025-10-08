import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Student Information
  childFirstName: string;
  childLastName: string;
  gender: string;
  dateOfBirth: string;
  ethnicity: string;
  gradeLevel: string;
  hasSecondChild: boolean;
  
  // Address
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Parent Information
  fatherFirstName: string;
  fatherLastName: string;
  fatherPhone: string;
  fatherEmail: string;
  fatherAddress1: string;
  fatherAddress2: string;
  fatherCity: string;
  fatherState: string;
  fatherZipCode: string;
  fatherOccupation: string;
  fatherEmployment: string;
  
  motherFirstName: string;
  motherLastName: string;
  motherPhone: string;
  motherEmail: string;
  motherSameAddress: boolean;
  motherAddress1: string;
  motherAddress2: string;
  motherCity: string;
  motherState: string;
  motherZipCode: string;
  motherOccupation: string;
  motherEmployment: string;
  
  schoolDistrict: string;
  signature: string;
  healthChanges: boolean;
  
  // Emergency Contacts
  emergency1FirstName: string;
  emergency1LastName: string;
  emergency1Phone: string;
  emergency1Relationship: string;
  
  emergency2FirstName: string;
  emergency2LastName: string;
  emergency2Phone: string;
  emergency2Relationship: string;
  
  emergency3FirstName: string;
  emergency3LastName: string;
  emergency3Phone: string;
  emergency3Relationship: string;
  
  // Authorized Pickup
  authorized1FirstName: string;
  authorized1LastName: string;
  authorized1Phone: string;
  authorized1Relationship: string;
  
  authorized2FirstName: string;
  authorized2LastName: string;
  authorized2Phone: string;
  authorized2Relationship: string;
  
  authorized3FirstName: string;
  authorized3LastName: string;
  authorized3Phone: string;
  authorized3Relationship: string;
  
  hospitalPreference: string;
  
  // Tuition Contract
  guardianFirstName: string;
  guardianLastName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress1: string;
  guardianAddress2: string;
  guardianCity: string;
  guardianState: string;
  guardianZipCode: string;
  
  acknowledgeTuition: boolean;
  acknowledgeTextbookFee: boolean;
  paymentOption: string;
  contractSignature: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const defaultFormData: FormData = {
  childFirstName: "",
  childLastName: "",
  gender: "",
  dateOfBirth: "",
  ethnicity: "",
  gradeLevel: "",
  hasSecondChild: false,
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  fatherFirstName: "",
  fatherLastName: "",
  fatherPhone: "",
  fatherEmail: "",
  fatherAddress1: "",
  fatherAddress2: "",
  fatherCity: "",
  fatherState: "",
  fatherZipCode: "",
  fatherOccupation: "",
  fatherEmployment: "",
  motherFirstName: "",
  motherLastName: "",
  motherPhone: "",
  motherEmail: "",
  motherSameAddress: false,
  motherAddress1: "",
  motherAddress2: "",
  motherCity: "",
  motherState: "",
  motherZipCode: "",
  motherOccupation: "",
  motherEmployment: "",
  schoolDistrict: "",
  signature: "",
  healthChanges: false,
  emergency1FirstName: "",
  emergency1LastName: "",
  emergency1Phone: "",
  emergency1Relationship: "",
  emergency2FirstName: "",
  emergency2LastName: "",
  emergency2Phone: "",
  emergency2Relationship: "",
  emergency3FirstName: "",
  emergency3LastName: "",
  emergency3Phone: "",
  emergency3Relationship: "",
  authorized1FirstName: "",
  authorized1LastName: "",
  authorized1Phone: "",
  authorized1Relationship: "",
  authorized2FirstName: "",
  authorized2LastName: "",
  authorized2Phone: "",
  authorized2Relationship: "",
  authorized3FirstName: "",
  authorized3LastName: "",
  authorized3Phone: "",
  authorized3Relationship: "",
  hospitalPreference: "",
  guardianFirstName: "",
  guardianLastName: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianAddress1: "",
  guardianAddress2: "",
  guardianCity: "",
  guardianState: "",
  guardianZipCode: "",
  acknowledgeTuition: false,
  acknowledgeTextbookFee: false,
  paymentOption: "",
  contractSignature: ""
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};