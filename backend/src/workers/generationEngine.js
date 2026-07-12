// import os from "os";
// import WorkerPool from "./workerPool.js";
// export default class GenerationEngine{
//   constructor({
//     project,
//     rows,
//     layout,
//     photoIndex,
//   }){
//     this.project=
//       project;
//     this.rows=
//       rows;
//     this.layout=
//       layout;
//     this.photoIndex=
//       photoIndex;
//     this.totalRows=
//       rows.length;
//     this.workerCount=
//       Math.min(
//         Math.max(
//           1,
//           os.cpus().length-1
//         ),
//         this.totalRows
//       );
//   }
//   splitIntoBatches(){

//   const batches=[];

//   const batchSize=
//     Math.ceil(

//       this.totalRows/

//       this.workerCount

//     );

//   for(

//     let startIndex=0;

//     startIndex<this.totalRows;

//     startIndex+=batchSize

//   ){

//     batches.push({

//       startIndex,

//       rows:

//         this.rows.slice(

//           startIndex,

//           startIndex+batchSize

//         ),

//     });

//   }

//   return batches;

// }
//   async run(){
//     const batches=
//       this.splitIntoBatches();
//     const workerPool=
//       new WorkerPool();
//     workerPool.createWorkers();
//     try{
//       await workerPool.run(
//         batches,
//         {
//           project:this.project,
//           layout:this.layout,
//         }
//       );
//     }
//     finally{
//       await workerPool.destroy();
//     }
//   }


  
// }


//new code

import os from "os";
import WorkerPool from "./workerPool.js";

export default class GenerationEngine{
  constructor({
    project,
    rows,
    layout,
    photoIndex,
  }){
    this.project=
      project;
    this.rows=
      rows;
    this.layout=
      layout;
    this.photoIndex=
      photoIndex;
    this.totalRows=
      rows.length;
      
    // Instantiate pool early to safely read its environment-optimized worker limit
    this.pool = new WorkerPool();
    this.workerCount = Math.min(this.pool.maxWorkers, this.totalRows);
  }

  splitIntoBatches(){
    const batches=[];
    const batchSize=
      Math.ceil(
        this.totalRows/
        this.workerCount
      );

    for(
      let startIndex=0;
      startIndex<this.totalRows;
      startIndex+=batchSize
    ){
      batches.push({
        startIndex,
        rows:
          this.rows.slice(
            startIndex,
            startIndex+batchSize
          ),
      });
    }
    return batches;
  }

  async run(){
    const batches=
      this.splitIntoBatches();

    // Pass the pre-instantiated pool to run execution safely
    this.pool.createWorkers();
    try{
      await this.pool.run(
        batches,
        {
          project:this.project,
          layout:this.layout,
        }
      );
    }
    finally{
      await this.pool.destroy();
    }
  }
}