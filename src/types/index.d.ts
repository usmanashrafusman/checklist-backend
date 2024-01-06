import { Request } from "express"

export interface IUser {
    username: string
    id: string
}

export interface Request extends Requests {
    user: IUser,
    headers: {
        Authorization: string
    }
}

export interface ITask {
    name: string
    id: string
    checklist: string
    isDeleted:boolean
}

export interface ICheckList {
    name: string
    id: string
    task?: Task[]
}