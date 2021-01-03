import { ConcreteRequest } from "relay-runtime";
export declare type AppQueryVariables = {};
export declare type AppQueryResponse = {
    readonly repository: {
        readonly name: string;
    } | null;
};
export declare type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};
declare const node: ConcreteRequest;
export default node;
