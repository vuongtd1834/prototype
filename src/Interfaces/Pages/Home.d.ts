declare namespace IHomePage {
    export interface IStateProps<T> {
        isFetching: boolean;
        data: T;
        errors: T;
    }
}

export { IHomePage };
