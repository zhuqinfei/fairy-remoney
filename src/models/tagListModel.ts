const localStorageKeyName = 'tagList';
type Tag={
  id:string
  name:string
}
type TagListModel={
  data:Tag[]    //data做到自己维护
  fetch:()=>Tag[]
  create:(name:string)=>'success' | 'duplicated' //联合类型   //success表示成功，duplicated表示name重复
  update:(id:string,name:string)=>'success' | 'not found' | 'duplicated'
  remove:(id:string)=>boolean
  save:()=>void
}
const tagListModel:TagListModel = {
  data:[],
  fetch() {
    this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data
  },
  create(name){
    //this.data=[{id='1',name='1'},{id='2',name='2'}] 长这样的
    //通过map()收集所有name,产生一个新的数组
    const names=this.data.map(item=>item.name);
    if(names.indexOf(name)>=0){return 'duplicated'}
    this.data.push({id:name,name:name})
    this.save();
    return 'success'
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else{
        const tag=this.data.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id=name;
        this.save();
        return 'success'
      }
    }else{
        return 'not found';
      }
  },
  remove(id:string){
    let index = -1
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id===id){
        index=i;
        break
      }
    }
    this.data.splice(index,1)
    this.save()
    return true
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;