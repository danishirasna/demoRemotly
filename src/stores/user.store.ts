import { stat } from "fs"
import jwtDecode from "jwt-decode"
import { UserDTO } from "../interfaces/user.dto"
import { makeAutoObservable } from "mobx"
import { LoginDTO } from "../interfaces/login.dto"
import ajaxService from "../services/auth/ajax.service"

export class UserStore {
    user = {}
    users_list = []
    authenticated = false

    constructor() {
        makeAutoObservable(this)
    }
    async login(body: LoginDTO) {
        const { data, status, error } = await ajaxService.post("/login", body)
        if (status == "Failed") {
            return false
        }
        this.setUser(data.token.token);
        ajaxService.setAuthToken(data.token.token)
        localStorage.setItem("jwtToken", data.token.token)
        return true
    }
    logout() {
        // this.authenticated = false
        // this.user = {}
        localStorage.removeItem("jwtToken")
        window.location.href = "/";
    }
    setUser(user: any) {
        this.user = user;
        this.authenticated = true
    }

    async GetAllUsers(url: string, id: any) {
        const { data, status, error } = await ajaxService.get(`/user/list/${id}`, url);
        if (status == "Failed") {
            return false;
        }
        this.users_list = data.data.rows
        return this.users_list;
    }

    async UserCreate(body: UserDTO) {
        const { data, status, error } = await ajaxService.post("/user/create", body);
        if (status == "Failed") {
            return false;
        }
        return true;
    }

    async DeleteUser(url: string, id: any) {
        const { data, status, error } = await ajaxService.destroy(`/user/delete/${id}`, url);
        if (status == "Failed") {
            return false;
        }
        return true;
    }



}