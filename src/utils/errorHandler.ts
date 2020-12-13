import React from 'react';
// export const withHandlingErrorResultCode = function <T>(operation: any, dispatch){
//     return async () => {
//         let result: IActionResult<T> = await operation
//         if (result.resultCode !== ActionResultCodes.Success && result.messages.length > 0) {
//             dispatch(showErro(result.messages[0]))
//         }
//     }
// }

// export const withTryCatch = (operation: any, dispatch: any) => async () => {
//   try {
//     return await operation()
//   } catch (error) {
//     dispatch(showError(error.messages))
//   }
// }

// export const withProcessVisualization = function (operation: any, dispatch: any) {
//     return async () => {
//         dispatch(setRequestStatus(RequestStatuses.InProgress))
//         await operation()
//         dispatch(setRequestStatus(RequstStatuses.finished))
//     }
// }

// export const commonAsyncHandler = function (operation: any, dispatch: any) {
//     let handledErrorResultCode = withHandlingErrorResultCode(operatiom, dispatch)
//     let tryCatched = withTryCatch(handledErrorResultCode, dispatch)
//     let visualized = withProcessVisualization(tryCatched, dispatch)
//     return visualized();
// }
