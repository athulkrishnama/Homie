export interface IBasePersistance<T>{
    create(data:T):Promise<T>
    findById(id:string):Promise<T | null>
    deleteById(id:string):Promise<void>
}