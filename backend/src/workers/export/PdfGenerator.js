// import fs from "fs/promises";
// import path from "path";
// import {
//   PDFDocument,
//   PageSizes,
//   degrees,
// } from "pdf-lib";
// export default class PdfGenerator {
//   constructor({
//     project,
//     cardsFolder,
//     outputFolder,
//   }) {
//     this.project = project;
//     this.cardsFolder = cardsFolder;
//     this.outputFolder = outputFolder;
//     this.outputPath =
//       path.join(
//         outputFolder,
//         "cards.pdf"
//       );
//     this.pdf = null;
//     this.page = null;
//     this.layout = null;
//     this.currentColumn = 0;
//     this.currentRow = 0;
//   }
//   async initialize() {
//     this.pdf =
//       await PDFDocument.create();
//     this.calculateLayout();
//     this.createNewPage();
//   }
//   mmToPoints(mm) {
//     return mm * 72 / 25.4;
//   }
//   calculateLayout() {
//     const PAGE_WIDTH_MM = 210;
//     const PAGE_HEIGHT_MM = 297;
//     const OUTER_MARGIN_MM = 5;
//     const GAP_MM = 3;
//     let cardWidth =
//       this.project.card.width;
//     let cardHeight =
//       this.project.card.height;
//     const rotateCards =
//       cardHeight > cardWidth;
//     if (rotateCards) {
//       [cardWidth, cardHeight] =
//         [cardHeight, cardWidth];
//     }
//     const usableWidth =
//       PAGE_WIDTH_MM -
//       (OUTER_MARGIN_MM * 2);
//     const usableHeight =
//       PAGE_HEIGHT_MM -
//       (OUTER_MARGIN_MM * 2);
//     const columns =
//       Math.floor(
//         (usableWidth + GAP_MM) /
//         (cardWidth + GAP_MM)
//       );
//     const rows =
//       Math.floor(
//         (usableHeight + GAP_MM) /
//         (cardHeight + GAP_MM)
//       );
//     const occupiedWidth =
//       columns * cardWidth +
//       (columns - 1) * GAP_MM;
//     const occupiedHeight =
//       rows * cardHeight +
//       (rows - 1) * GAP_MM;
//     const leftMargin =
//       (PAGE_WIDTH_MM - occupiedWidth) / 2;
//     const topMargin =
//       (PAGE_HEIGHT_MM - occupiedHeight) / 2;
//     this.layout = {
//       rotateCards,
//       columns,
//       rows,
//       cardWidth,
//       cardHeight,
//       leftMargin,
//       topMargin,
//       gap: GAP_MM,
//       pageWidth:
//         this.mmToPoints(
//           PAGE_WIDTH_MM
//         ),
//       pageHeight:
//         this.mmToPoints(
//           PAGE_HEIGHT_MM
//         ),
//     };
//   }
//   createNewPage() {
//     this.page =
//       this.pdf.addPage(
//         PageSizes.A4
//       );
//     this.currentColumn = 0;
//     this.currentRow = 0;
//   }
//   nextPosition() {
//     this.currentColumn++;
//     if (
//       this.currentColumn >=
//       this.layout.columns
//     ) {
//       this.currentColumn = 0;
//       this.currentRow++;
//     }
//     if (
//       this.currentRow >=
//       this.layout.rows
//     ) {
//       this.createNewPage();
//     }
//   }
//   getCurrentPosition() {
//     const {
//       leftMargin,
//       topMargin,
//       gap,
//       cardWidth,
//       cardHeight,
//       pageHeight,
//     } = this.layout;
//     const x =
//       leftMargin +
//       this.currentColumn *
//       (cardWidth + gap);
//     const yMm =
//       topMargin +
//       this.currentRow *
//       (cardHeight + gap);
//     return {
//       x:
//         this.mmToPoints(x),
//       y:
//         pageHeight -
//         this.mmToPoints(
//           yMm +
//           cardHeight
//         ),
//     };
//   }
//   async loadCards(){
//     const files =
//       await fs.readdir(
//         this.cardsFolder
//       );
//     return files.filter(
//       file =>
//         file.toLowerCase().endsWith(".jpg")
//     ).sort();
//   }
//   async placeCard(
//     fileName
//   ){
//     const bytes =
//       await fs.readFile(
//         path.join(
//           this.cardsFolder,
//           fileName
//         )
//       );
//     const image =
//       await this.pdf.embedJpg(
//         bytes
//       );
//     const pos =
//       this.getCurrentPosition();
//     const width =
//       this.mmToPoints(
//         this.layout.cardWidth
//       );
//     const height =
//       this.mmToPoints(
//         this.layout.cardHeight
//       );
//     if(
//       this.layout.rotateCards
//     ){
//       this.page.drawImage(
//         image,
//         {
//           x: pos.x + width,
//           y:
//             pos.y,
//           width:
//             height,
//           height:
//             width,
//           rotate:
//             degrees(90),
//         }
//       );
//     }
//     else{
//       this.page.drawImage(
//         image,
//         {
//           x:
//             pos.x,
//           y:
//             pos.y,
//           width,
//           height,
//         }
//       );
//     }
//     this.nextPosition();
//   }
//   async generate(){
//     const cards =
//       await this.loadCards();
//     for(
//       const file of cards
//     ){
//       await this.placeCard(
//         file
//       );
//     }
//   }
//   async save(){
//     const bytes =
//       await this.pdf.save();
//     await fs.writeFile(
//       this.outputPath,
//       bytes
//     );
//     return this.outputPath;
//   }
// }




//new code
import fs from "fs/promises";
import fsSync from "fs"; // Used for stream creation
import path from "path";
import {
  PDFDocument,
  PageSizes,
  degrees,
} from "pdf-lib";

export default class PdfGenerator {
  constructor({
    project,
    cardsFolder,
    outputFolder,
  }) {
    this.project = project;
    this.cardsFolder = cardsFolder;
    this.outputFolder = outputFolder;
    this.outputPath =
      path.join(
        outputFolder,
        "cards.pdf"
      );
    this.pdf = null;
    this.page = null;
    this.layout = null;
    this.currentColumn = 0;
    this.currentRow = 0;
  }

  async initialize() {
    this.pdf =
      await PDFDocument.create();
    this.calculateLayout();
    this.createNewPage();
  }

  mmToPoints(mm) {
    return mm * 72 / 25.4;
  }

  calculateLayout() {
    const PAGE_WIDTH_MM = 210;
    const PAGE_HEIGHT_MM = 297;
    const OUTER_MARGIN_MM = 5;
    const GAP_MM = 3;

    let cardWidth =
      this.project.card.width;
    let cardHeight =
      this.project.card.height;

    const rotateCards =
      cardHeight > cardWidth;

    if (rotateCards) {
      [cardWidth, cardHeight] =
        [cardHeight, cardWidth];
    }

    const usableWidth =
      PAGE_WIDTH_MM -
      (OUTER_MARGIN_MM * 2);
    const usableHeight =
      PAGE_HEIGHT_MM -
      (OUTER_MARGIN_MM * 2);

    const columns =
      Math.floor(
        (usableWidth + GAP_MM) /
        (cardWidth + GAP_MM)
      );

    const rows =
      Math.floor(
        (usableHeight + GAP_MM) /
        (cardHeight + GAP_MM)
      );

    const occupiedWidth =
      columns * cardWidth +
      (columns - 1) * GAP_MM;
    const occupiedHeight =
      rows * cardHeight +
      (rows - 1) * GAP_MM;

    const leftMargin =
      (PAGE_WIDTH_MM - occupiedWidth) / 2;
    const topMargin =
      (PAGE_HEIGHT_MM - occupiedHeight) / 2;

    this.layout = {
      rotateCards,
      columns,
      rows,
      cardWidth,
      cardHeight,
      leftMargin,
      topMargin,
      gap: GAP_MM,
      pageWidth:
        this.mmToPoints(
          PAGE_WIDTH_MM
        ),
      pageHeight:
        this.mmToPoints(
          PAGE_HEIGHT_MM
        ),
    };
  }

  createNewPage() {
    this.page =
      this.pdf.addPage(
        PageSizes.A4
      );
    this.currentColumn = 0;
    this.currentRow = 0;
  }

  nextPosition() {
    this.currentColumn++;
    if (
      this.currentColumn >=
      this.layout.columns
    ) {
      this.currentColumn = 0;
      this.currentRow++;
    }
    if (
      this.currentRow >=
      this.layout.rows
    ) {
      this.createNewPage();
    }
  }

  getCurrentPosition() {
    const {
      leftMargin,
      topMargin,
      gap,
      cardWidth,
      cardHeight,
      pageHeight,
    } = this.layout;

    const x =
      leftMargin +
      this.currentColumn *
      (cardWidth + gap);

    const yMm =
      topMargin +
      this.currentRow *
      (cardHeight + gap);

    return {
      x:
        this.mmToPoints(x),
      y:
        pageHeight -
        this.mmToPoints(
          yMm +
          cardHeight
        ),
    };
  }

  async loadCards(){
    const files =
      await fs.readdir(
        this.cardsFolder
      );
    return files.filter(
      file =>
        file.toLowerCase().endsWith(".jpg")
    ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  }

  async placeCard(
    fileName
  ){
    const cardPath = path.join(this.cardsFolder, fileName);
    const bytes = await fs.readFile(cardPath);
    
    // Embed the image into the PDF document instance
    const image = await this.pdf.embedJpg(bytes);
    const pos = this.getCurrentPosition();
    
    const width =
      this.mmToPoints(
        this.layout.cardWidth
      );
    const height =
      this.mmToPoints(
        this.layout.cardHeight
      );

    if(
      this.layout.rotateCards
    ){
      this.page.drawImage(
        image,
        {
          x: pos.x + width,
          y:
            pos.y,
          width:
            height,
          height:
            width,
          rotate:
            degrees(90),
        }
      );
    }
    else{
      this.page.drawImage(
        image,
        {
          x:
            pos.x,
          y:
            pos.y,
          width,
          height,
        }
      );
    }
    this.nextPosition();
  }

  async generate(){
    const cards =
      await this.loadCards();
    
    // Process images sequentially to prevent concurrent file buffer build-up
    for(
      const file of cards
    ){
      await this.placeCard(
        file
      );
    }
  }

  async save(){
    const bytes =
      await this.pdf.save();
    await fs.writeFile(
      this.outputPath,
      bytes
    );
    
    // CRITICAL OPTIMIZATION: Manually sever references to clear memory graphs immediately
    this.pdf = null;
    this.page = null;
    
    return this.outputPath;
  }
}