declare namespace IProfilePage {
    export interface IStateProps<T> {
        isFetching: boolean;
        data: T;
        errors: T;
    }
}

export { IProfilePage };
