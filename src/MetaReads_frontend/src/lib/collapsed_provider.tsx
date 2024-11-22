import React, { createContext, useContext, useState, ReactNode } from "react";

interface CollapsedContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapsedContext = createContext<CollapsedContextType | undefined>(undefined);

interface CollapsedProviderProps {
  children: ReactNode;
}

export const CollapsedProvider: React.FC<CollapsedProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const contextValue: CollapsedContextType = {
    collapsed,
    setCollapsed,
  };

  return (
    <CollapsedContext.Provider value={contextValue}>
      {children}
    </CollapsedContext.Provider>
  );
};

export const useCollapsed = () => {
  const context = useContext(CollapsedContext);
  if (!context) {
    throw new Error("useCollapsed must be used within a CollapsedProvider");
  }
  return context;
};
