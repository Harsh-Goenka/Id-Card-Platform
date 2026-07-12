import os from "os";

class WorkerManager{

  constructor(){

    this.workers=new Map();

    this.maxWorkers=Math.max(
      1,
      os.cpus().length-1
    );

  }

  getMaxWorkers(){

    return this.maxWorkers;

  }

  hasProject(projectId){

    return this.workers.has(
      projectId
    );

  }

  addProject(
    projectId,
    workerPool
  ){

    this.workers.set(
      projectId,
      workerPool
    );

  }

  getProject(
    projectId
  ){

    return this.workers.get(
      projectId
    );

  }

  removeProject(
    projectId
  ){

    this.workers.delete(
      projectId
    );

  }

  activeProjects(){

    return this.workers.size;

  }

}

const workerManager=
  new WorkerManager();

export default workerManager;