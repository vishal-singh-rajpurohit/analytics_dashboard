import { currentOnlineUsersType } from "../types/compTypes";

export function getPercentage(props: currentOnlineUsersType): number{
    let currentPercentage = (props.maxOnline / 100) * props.current;
    return currentPercentage
}