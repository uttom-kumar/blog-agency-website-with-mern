import {CreateContactService} from "../services/ContactService.js";


export const CreateContact = async (req, res) => {
    let result = await CreateContactService(req)
    return res.json(result)
}
