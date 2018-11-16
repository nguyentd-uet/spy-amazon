export default function parseDatetime(date){
  try {
    if(date === '') return '';
    const formatDate = new Date(date);
    let dd = formatDate.getDate();
    let mm = formatDate.getMonth()+1; //January is 0!
    let yyyy = formatDate.getFullYear();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    return mm + '-' + dd + '-' + yyyy;
  } catch (error) {
    return ''
  }
}