import { UserStore } from "./user.store";
import { ApplicationsStore } from "./applications.store";

interface IStore {
    UserStore: UserStore
    ApplicationsStore: ApplicationsStore
}

class Store implements IStore {
    UserStore: UserStore
    ApplicationsStore: ApplicationsStore

    constructor() {
        this.UserStore = new UserStore
        this.ApplicationsStore = new ApplicationsStore
    }
}

export default Store;