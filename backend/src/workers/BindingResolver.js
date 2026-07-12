export default class BindingResolver{
  constructor(
    row
  ){
    this.row=row;
  }
  resolve(
    object
  ){
    if(
      object.type==="text"
    ){
      return{
        ...object,
        text:
          object.binding
            ? String(
                this.row[
                  object.binding
                ] ??
                ""
              )
            : object.staticText,
      };
    }
    if(
      object.type==="image"
    ){
      console.log(
        "IMAGE BINDING:",
        object.binding
      );
      console.log(
        "EXCEL VALUE:",
        this.row[
          object.binding
        ]
      );
      return{
        ...object,
        photoId:
          object.binding
            ? String(
                this.row[
                  object.binding
                ] ??
                ""
              )
            : "",
      };
    }
    return object;
  }
}