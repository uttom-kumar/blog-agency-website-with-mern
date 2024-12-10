import {
    SingleTeamListReadService,
    TeamListCreateService,
    TeamListReadService,
    TeamListRemoveService,
    TeamListUpdateService, UserFilterByTeamListService
} from "../services/TeamService.js";


export const TeamListCreate = async (req, res) => {
    let result = await TeamListCreateService(req);
    return res.json(result);
}

export const SingleTeamListRead = async (req, res) => {
    let result = await SingleTeamListReadService(req);
    return res.json(result);
}

export const TeamListRead = async (req, res) => {
    let result = await TeamListReadService(req);
    return res.json(result);
}

export const TeamListRemove = async (req, res) => {
    let result = await TeamListRemoveService(req);
    return res.json(result);
}

export const TeamListUpdate = async (req, res) => {
    let result = await TeamListUpdateService(req);
    return res.json(result);
}

export const UserFilterByTeamList = async (req, res) => {
    let result = await UserFilterByTeamListService(req);
    return res.json(result);
}