import {CreateContactService, ReadContactService} from "../services/ContactService.js";


export const CreateContact = async (req, res) => {
    let result = await CreateContactService(req)
    return res.json(result)
}

export const ReadContact = async (req, res) => {
    let result = await ReadContactService(req)
    return res.json(result)
}