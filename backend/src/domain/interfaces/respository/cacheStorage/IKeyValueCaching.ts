export interface IKeyValueCaching{
    setData(key:string, value:string):Promise<void>
    getData(key:string):Promise<string | null>
    deleteData(key:string):Promise<string>
}