export const isEmpty = (data : any)=>{
      return (
    data == '' ||
    data == undefined ||
    data == null ||
    data == 'null' ||
    data?.length == 0
  );
}