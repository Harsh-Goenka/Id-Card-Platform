const MM_PER_INCH=
  25.4;

export const mmToPx=(
  mm,
  dpi
)=>{

  return Math.round(

    (mm/MM_PER_INCH)

    *dpi

  );

};

export const inchToPx=(
  inch,
  dpi
)=>{

  return Math.round(

    inch*dpi

  );

};

export const cardSizeToPixels=(
  card
)=>{

  const{

    width,

    height,

    dpi,

    unit,

  }=card;

  if(
    unit==="mm"
  ){

    return{

      width:
        mmToPx(
          width,
          dpi
        ),

      height:
        mmToPx(
          height,
          dpi
        ),

    };

  }

  return{

    width:
      inchToPx(
        width,
        dpi
      ),

    height:
      inchToPx(
        height,
        dpi
      ),

  };

};