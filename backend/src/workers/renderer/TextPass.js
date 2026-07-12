export default class TextPass {

  constructor(context) {

    this.ctx = context;

  }

  draw(
  object
) {

  if (
    !object.text
  ) {

    return;

  }

  if (

    object.textMode ===
    "fit"

  ) {

    object = {

      ...object,

      fontSize:
        this.findBestFontSize(
          object
        ),

    };

  }

  this.applyStyle(
    object
  );
if (

  object.textMode ===
  "wrap"

) {

  this.drawWrappedText(
    object
  );

}

else {

  this.drawNormalText(
    object
  );

};

}

  applyStyle(object) {

    const style = [];

    if (object.italic) {
      style.push("italic");
    }

    if (object.bold) {
      style.push("bold");
    }

    style.push(`${object.fontSize}px`);

    style.push(object.fontFamily);

    this.ctx.font = style.join(" ");

    this.ctx.fillStyle = object.color;

    this.ctx.textAlign =
      object.textAlign || "left";

  }

  getTextX(object) {

    switch (object.textAlign) {

      case "center":

        return (
          object.x +
          object.width / 2
        );

      case "right":

        return (
          object.x +
          object.width
        );

      default:

        return object.x;

    }

  }
  measureTextWidth(
  text
) {

  return this.ctx.measureText(
    text
  ).width;

}
findBestFontSize(
  object
) {

  let low = 6;

  let high =
    object.fontSize;

  let best =
    low;

  while (
    low <= high
  ) {

    const mid =
      Math.floor(
        (low + high) / 2
      );

    const style = [];

    if (
      object.italic
    ) {

      style.push(
        "italic"
      );

    }

    if (
      object.bold
    ) {

      style.push(
        "bold"
      );

    }

    style.push(
      `${mid}px`
    );

    style.push(
      object.fontFamily
    );

    this.ctx.font =
      style.join(" ");

    if (

      this.measureTextWidth(
        object.text
      )

      <=

      object.width

    ) {

      best = mid;

      low = mid + 1;

    }

    else {

      high = mid - 1;

    }

  }

  return best;

}

  drawNormalText(object) {

  this.beginClip(object);

  this.ctx.fillText(

    object.text,

    this.getTextX(object),

    object.y +

    object.fontSize

  );

  this.endClip();

}
  drawWrappedText(object) {

  const words =

    object.text.split(/\s+/);

  const lines = [];

  let current = "";

  for (const word of words) {

    const test =

      current

        ? current + " " + word

        : word;

    if (

      this.measureTextWidth(

        test

      )

      <=

      object.width

    ) {

      current = test;

    }

    else {

      if (current) {

        lines.push(current);

      }

      current = word;

    }

  }

  if (current) {

    lines.push(current);

  }

  const lineHeight =

    object.fontSize * 1.2;

  let y =

    object.y +

    object.fontSize;

  this.beginClip(object);

  for (const line of lines) {

    if (

      y >

      object.y +

      object.height

    ) {

      break;

    }

    this.ctx.fillText(

      line,

      this.getTextX(object),

      y

    );

    y += lineHeight;

  }

  this.endClip();

}
  beginClip(object) {

  this.ctx.save();

  this.ctx.beginPath();

  this.ctx.rect(

    object.x,

    object.y,

    object.width,

    object.height

  );

  this.ctx.clip();

}

endClip() {

  this.ctx.restore();

}

}