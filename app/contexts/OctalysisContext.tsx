import React, { createContext, useContext, useState } from 'react';
import { CoreDrivesData } from '../interfaces/CoreDrivesInfo';

interface OctalysisContextType {
  projectName: string;
  data: CoreDrivesData;
  loadData: (data: CoreDrivesData) => void;
  updateCoreDrivesScore: (key: string, value: number) => void;
  updateCoreDriveDescription: (key: string, value: string) => void;
  updateProjectName: (name: string) => void;
}

const OctalysisContext = createContext<OctalysisContextType | undefined>(undefined);
const defaultData: CoreDrivesData = {
  CD1: {
    title: 'CD1: Epic meaning & Calling',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 400,
      yPos: 10,
      width: 200,
      height: 150,
    },
  },
  CD2: {
    title: 'CD2: Development & Accomplishment',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 100,
      yPos: 50,
      width: 200,
      height: 150,
    },
  },
  CD3: {
    title: 'CD3: Empowerment of Creativity & Feedback',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 700,
      yPos: 50,
      width: 200,
      height: 150,
    },
  },
  CD4: {
    title: 'CD4: Ownership & Possession',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 10,
      yPos: 300,
      width: 200,
      height: 150,
    },
  },
  CD5: {
    title: 'CD5: Social Influence & Relatedness',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 800,
      yPos: 300,
      width: 200,
      height: 150,
    },
  },
  CD6: {
    title: 'CD6: Scarcity & Impatience',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 100,
      yPos: 500,
      width: 200,
      height: 150,
    },
  },
  CD7: {
    title: 'CD7: Curiosity & Unpredictability',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 700,
      yPos: 500,
      width: 200,
      height: 150,
    },
  },
  CD8: {
    title: 'CD8: Loss & Avoidance',
    score: 5,
    coreDriveDescription: {
      paragraph:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Core Drive notes & ideas","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      xPos: 400,
      yPos: 600,
      width: 200,
      height: 150,
    },
  },
};
export const OctalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectName, setProjectName] = useState<string>('My Octalysis Analysis');
  const [data, setData] = useState<CoreDrivesData>(defaultData);

  const updateCoreDrivesScore = (key: string, value: number) => {
    setData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        score: value,
      },
    }));
  };

  const updateProjectName = (name: string) => {
    setProjectName(name);
  };

  const updateCoreDriveDescription = (key: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        coreDriveDescription: {
          ...prevData[key].coreDriveDescription,
          paragraph: value,
        },
      },
    }));
  };

  const loadData = (storedData: CoreDrivesData) => {
    console.log('Loading data:', storedData);
    setData(storedData);
  };

  return (
    <OctalysisContext.Provider
      value={{ projectName, data, loadData, updateCoreDrivesScore, updateProjectName, updateCoreDriveDescription }}
    >
      {children}
    </OctalysisContext.Provider>
  );
};

export const useOctalysis = (): OctalysisContextType => {
  const context = useContext(OctalysisContext);
  if (!context) {
    throw new Error('useOctalysis must be used within an OctalysisProvider');
  }
  return context;
};
