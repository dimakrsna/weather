export const errorIsHappen = (data) => {
    return {
        type: 'ERROR',
        payload: data
    }
}