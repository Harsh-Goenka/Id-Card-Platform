import { v4 as uuid } from "uuid";

export function createTextObject() {
  return {
    id: uuid(),
    type: "text",
    x: 100,
    y: 100,
    width: 250,
    height: 40,
    rotation: 0,
    binding: "",
    staticText: "",
    fontFamily: "Arial",
    fontSize: 22,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
    textAlign: "left",
    textMode: "normal",
  };
}

export function createImageObject() {
  return {
    id: uuid(),
    type: "image",
    x: 100,
    y: 180,
    width: 120,
    height: 150,
    rotation: 0,
    binding: "",
    fitMode: "cover",
  };
}