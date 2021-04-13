// #region Interface Imports
import { IHomePage, IProfilePage } from "@Interfaces";
// #end region Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    profile: IProfilePage.IStateProps;
}
