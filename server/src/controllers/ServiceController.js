import {
    CreateService,
    ReadService,
    RemoveService, SingleReadService,
    UpdateService,
    UserFilterByServiceListService
} from "../services/Services.js";



export const CreateServiceController = async (req, res) => {
    let result = await CreateService(req)
    return res.json(result)
}

export const SingleReadServiceController = async (req, res) => {
    let result = await SingleReadService(req)
    return res.json(result)
}
export const ReadServiceController = async (req, res) => {
    let result = await ReadService(req)
    return res.json(result)
}

export const RemoveServiceController = async (req, res) => {
    let result = await RemoveService(req)
    return res.json(result)
}

export const UpdateServiceController = async (req, res) => {
    let result = await UpdateService(req)
    return res.json(result)
}
export const UserFilterByServiceList = async (req, res) => {
    let result = await UserFilterByServiceListService(req)
    return res.json(result)
}