import { makeAutoObservable } from "mobx"
import { ApplicationDTO } from "../interfaces/application.dto"
import ajaxService from "../services/auth/ajax.service"

export class ApplicationsStore {
  applications = [] = [];
  application = {};
  key = ""
  constructor() {
    makeAutoObservable(this)
  }
  async ApplicationCreate(body: ApplicationDTO) {
    const { data, status, error } = await ajaxService.post("/applications/create", body);
    if (status == "Failed") {
      return false;
    }
    return true;
  }
  async GetAllApplications(url: string) {
    const { data, status, error } = await ajaxService.get(`/applications_`, url);
    if (status == "Failed") {
      return false;
    }
    this.applications = data.data.rows
    return this.applications;
  }

  async GetAppByID(url: string, id: any) {
    const { data, status, error } = await ajaxService.get(`/applications_list/${id}`, url);
    if (status == "Failed") {
      return false;
    }
    this.application = data.data.rows[0]
    return this.application;

  }

  async ChangeApiKey(body: ApplicationDTO) {
    this.key = "";
    const { data, status, error } = await ajaxService.post("/applications/key/change", body);
    if (status == "Failed") {
      return false;
    }
    this.key = data.data.key
    return this.key;
  }



};
