export interface AjaxOutput {
    error?:unknown
    status: "Success" | "Failed"
    data?:any
}
