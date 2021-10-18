const localStorageKeyName = 'tagList';
type TagListMode={
  data:string[]    //data做到自己维护
  fetch:()=>string[]
  create:(name:string)=>'success' | 'duplicated' //联合类型   //success表示成功，duplicated表示name重复
  save:()=>void
}
const tagListModel:TagListMode = {
  data:[],
  fetch() {
    this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data
  },
  create(name:string){
    if(this.data.indexOf(name)>=0){return 'duplicated'}
    this.data.push(name)
    this.save();
    return 'success'
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;