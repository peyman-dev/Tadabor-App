import React from 'react';
import { InformationSentence } from '../types/types';

type Information = {
  id: number;
  value: 'جزء' | 'حزب' | 'سیاق' | 'Daily' | 'Media';
};

type DataItem = {
  id: number;
  idinformation: number;
  idsentence: number;
  value: string;
  information: Information;
};

const useQuickInformation = (data: InformationSentence[], targetInfo: Information['value']) => {
  return data.find((item) => item.information.value === targetInfo) || null;
};

export default useQuickInformation;