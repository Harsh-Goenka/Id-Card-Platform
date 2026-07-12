import { parentPort } from "worker_threads";
import fs from "fs/promises";
import path from "path";
import BindingResolver from "./BindingResolver.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";
import CardWriter from "./CardWriter.js";

parentPort.on(
  "message",
  async (data) => {
    try {
      parentPort.postMessage({
        type: "started",
        projectId: data.projectId,
      });

      const photoIndex = JSON.parse(
        await fs.readFile(
          path.join(
            process.cwd(),
            "storage",
            data.storageFolder,
            "photos",
            "index.json"
          ),
          "utf8"
        )
      );

      const templatePath = path.join(
        process.cwd(),
        "storage",
        data.storageFolder,
        "template",
        "front.jpg"
      );

      const renderer = new CanvasRenderer(
        data.card
      );

      await renderer.initialize(
        templatePath,
        photoIndex,
        data.storageFolder
      );

      const writer = new CardWriter(
        path.join(
          process.cwd(),
          "storage",
          data.storageFolder,
          "cards"
        )
      );

      const yieldEventLoop = () => new Promise(resolve => setImmediate(resolve));

      for (
        let i = 0;
        i < data.rows.length;
        i++
      ) {
        const row = data.rows[i];
        const resolver = new BindingResolver(row);
        
        const objects = data.layout.map(
          object => resolver.resolve(object)
        );

        await renderer.renderCard(objects);
        const jpeg = await renderer.exportJpeg();

        const cardNumber = data.startIndex + i + 1;
        
        await writer.save(
          `${String(cardNumber).padStart(6, "0")}.jpg`,
          jpeg
        );

        parentPort.postMessage({
          type: "progress",
          completed: i + 1,
          total: data.rows.length,
        });

        // Clear canvas context trace buffers on every single iteration loop
        renderer.clear();

        // Yield control back to macro-tasks every 5 records to allow Garbage Collection sweeps
        if (i % 5 === 0) {
          await yieldEventLoop();
        }
      }

      parentPort.postMessage({
        type: "finished",
        projectId: data.projectId,
      });
    }
    catch (error) {
      console.error(error);
      parentPort.postMessage({
        type: "error",
        message: error.stack,
      });
    }
  }
);