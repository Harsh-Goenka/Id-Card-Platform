export function mmToPixels(
  mm,
  dpi
) {

  return Math.round(

    (mm / 25.4) * dpi

  );

}

export function inchToPixels(
  inch,
  dpi
) {

  return Math.round(

    inch * dpi

  );

}

export function getCanvasPixelSize(
  project
) {

  const {

    width,

    height,

    unit,

    dpi,

  } = project.card;

  if (unit === "mm") {

    return {

      width:
        mmToPixels(
          width,
          dpi
        ),

      height:
        mmToPixels(
          height,
          dpi
        ),

    };

  }

  return {

    width:
      inchToPixels(
        width,
        dpi
      ),

    height:
      inchToPixels(
        height,
        dpi
      ),

  };

}

export function getDisplayScale(

  width,

  height,

  maxWidth = 900,

  maxHeight = 600

) {

  return Math.min(

    maxWidth / width,

    maxHeight / height,

    1

  );

}