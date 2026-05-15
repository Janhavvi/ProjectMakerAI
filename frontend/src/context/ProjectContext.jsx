// src/context/ProjectContext.jsx

import {
  createContext,
  useState
} from 'react';

export const ProjectContext =
  createContext();

export function ProjectProvider({
  children
}) {

  const [projects, setProjects] =
    useState([]);

  const addProject = (project) => {

    setProjects([
      ...projects,
      project
    ]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject
      }}
    >

      {children}

    </ProjectContext.Provider>
  );
}