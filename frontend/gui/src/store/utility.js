// in here there is a conveinice method used to update object properties

//this will replace the updatedProperties to the oldObject
export const updateObject = (oldObject, updatedProperties) =>{
    // using spread to create clone of oldObject => getting all params of old project
    return {
        ...oldObject,
        ...updatedProperties
    }

}
