

//Simple is above good here, trying to make something


type TileData = {
    textContent: string
}
type TileDataStringified = string //JSON stringified of above     // TODO typescript to automatically infer type from above?


type TileLocationCode = `${number}-${number}` // X= kanban panel left to right Y = todo item top to bottom



type KanbanTransaction = 
    `Insert tile: ${TileLocationCode} ${TileDataStringified}` | 
    `Edit tile: ${TileLocationCode} ${TileDataStringified}` |
    `Move tile: ${TileLocationCode} ${TileLocationCode}` | 
    `Delete tile: ${TileLocationCode}` 
//

// type KanbanBoardData //2d map of tilelocationcode to tiledata. idk if location code should be string or broken up

type KanbanBoardData =  Map<TileLocationCode, TileData>

const exampleKanbanBoard:KanbanBoardData = new Map<TileLocationCode, TileData>([
    ["0-0", {textContent:"To-Do"}],

    ["0-1", {textContent:"first task"}],
    ["0-2", {textContent:"second task"}],

    ["1-0", {textContent:"Doing"}],
    ["1-1", {textContent:"third Task (thats in progrss)"}],

    ["2-0", {textContent:"Done"}],
]);


export function calculateKanBanState(
    starting_state:KanbanBoardData=exampleKanbanBoard, 
    changeTransactions:KanbanTransaction[]
) {
    const outState = starting_state

    for (const transaction of changeTransactions) {
        const tS = transaction.split(" ")
        
        const transaction_type = tS[0]
        const tile_location_code = tS[2] as TileLocationCode
        
        if (transaction_type === 'Insert' || transaction_type === 'Edit') {
            const tile_data = parseTileData(tS[3])
            outState.set(tile_location_code, tile_data)
        }
        else if (transaction_type === 'Move') {
            //
        }
        else if (transaction_type === 'Delete') {
            //
        }
        else {
            console.log(`Invalid transaction received: ${transaction}, skipping`)
            continue;
        }
    }

    return outState
}