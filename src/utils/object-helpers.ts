import {UsersType} from "Redux/users-reducer";

export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: keyof UsersType, newObjProps: Partial<UsersType>): UsersType[] => {
    return items.map((item: UsersType) => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObjProps };
        }
        return item;
    });
};