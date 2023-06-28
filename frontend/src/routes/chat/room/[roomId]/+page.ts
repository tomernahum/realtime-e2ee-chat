
export const ssr = false

export function load({params}) {

    return {
        roomId: params.roomId
    }
}