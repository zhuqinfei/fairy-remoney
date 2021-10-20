type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: Date  // 类 / 构造函数
}
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

interface Window{
  tagList:Tag[],
  createTag:(name:string)=>void
}