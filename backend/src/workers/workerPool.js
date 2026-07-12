// import os from "os";
// import { Worker } from "worker_threads";
// import path from "path";
// import { fileURLToPath } from "url";
// import {
//   buildWorkerPayload,
// } from "./workerPayload.js";


// const __filename=
//   fileURLToPath(
//     import.meta.url
//   );

// const __dirname=
//   path.dirname(
//     __filename
//   );

// export default class WorkerPool{

//   constructor(){

//     this.workers=[];

//     // this.maxWorkers=Math.max(
//     //   1,
//     //   os.cpus().length-1
//     // );
// //new code
// const physicalCpus = os.cpus().length;
// this.maxWorkers = process.env.NODE_ENV === 'production' 
//   ? Math.min(2, physicalCpus) 
//   : Math.min(4, Math.max(1, physicalCpus - 1));



//     this.workerFile=
//       path.join(
//         __dirname,
//         "generationWorker.js"
//       );

//   }

//   createWorkers(){

//     for(
//       let i=0;
//       i<this.maxWorkers;
//       i++
//     ){

//       const worker=
//         new Worker(
//           this.workerFile,
//           {
//             type:"module",
//           }
//         );

//       this.workers.push(
//         worker
//       );

//     }

//   }

//   getWorkers(){

//     return this.workers;

//   }
//   async run(
//   batches,
//   sharedData
// ){

//   const workers=
//     this.getWorkers();

//   await Promise.all(

//     workers.map(

//       (
//         worker,
//         index
//       )=>

//         new Promise(

//           (
//             resolve,
//             reject
//           )=>{

//             worker.on(
//               "message",
//               message=>{

//                 switch(
//                   message.type
//                 ){

//                   case "started":

//                     console.log(
//                       `Worker ${index+1} started`
//                     );

//                     break;

//                   case "progress":

//                     const progress = Math.round(
//                         (message.completed / message.total) * 100
//                       );

//                       console.log(
//                         `Worker ${index + 1}: ${progress}%`
//                       );

//                     break;

//                   case "finished":

//                     worker.removeAllListeners(
//                       "message"
//                     );

//                     resolve();

//                     break;

//                   case "error":

//                     worker.removeAllListeners(
//                       "message"
//                     );

//                     reject(
//                       new Error(
//                         message.message
//                       )
//                     );

//                     break;

//                 }

//               }
//             );



            

//             worker.postMessage(

//   buildWorkerPayload({

//     ...sharedData,

//     rows:
//       batches[index]?.rows || [],

//     startIndex:
//       batches[index]?.startIndex || 0,

//   })

// );

//           }

//         )

//     )

//   );

// }

//   async destroy(){

//     await Promise.all(

//       this.workers.map(
//         worker=>
//           worker.terminate()
//       )

//     );

//     this.workers=[];

//   }

// }


//new code


import os from "os";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildWorkerPayload,
} from "./workerPayload.js";

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

export default class WorkerPool {
  constructor() {
    this.workers = [];
    
    // Explicitly define the worker execution script path
    this.workerFile =
      path.join(
        __dirname,
        "generationWorker.js"
      );

    const physicalCpus = os.cpus().length;
    const safeLimit = Math.max(1, physicalCpus - 1);
    
    // Production / Local adaptive thread limiting to prevent RAM spikes
    this.maxWorkers = process.env.NODE_ENV === 'production' 
      ? Math.min(2, safeLimit) 
      : Math.min(4, safeLimit); 
  }

  createWorkers() {
    for (
      let i = 0;
      i < this.maxWorkers;
      i++
    ) {
      const worker =
        new Worker(
          this.workerFile,
          {
            type: "module",
          }
        );
      this.workers.push(
        worker
      );
    }
  }

  getWorkers() {
    return this.workers;
  }

  async run(
    batches,
    sharedData
  ) {
    const workers = this.getWorkers();

    await Promise.all(
      batches.map((batch, index) => {
        const worker = workers[index];
        if (!worker) return Promise.resolve();

        return new Promise((resolve, reject) => {
          worker.on("message", message => {
            switch (message.type) {
              case "started":
                console.log(`Worker ${index + 1} started`);
                break;
              case "progress":
                const progress = Math.round((message.completed / message.total) * 100);
                console.log(`Worker ${index + 1}: ${progress}%`);
                break;
              case "finished":
                worker.removeAllListeners("message");
                resolve();
                break;
              case "error":
                worker.removeAllListeners("message");
                reject(new Error(message.message));
                break;
            }
          });

          worker.postMessage(
            buildWorkerPayload({
              ...sharedData,
              rows: batch.rows || [],
              startIndex: batch.startIndex || 0,
            })
          );
        });
      })
    );
  }

  async destroy() {
    await Promise.all(
      this.workers.map(
        worker =>
          worker.terminate()
      )
    );
    this.workers = [];
  }
}