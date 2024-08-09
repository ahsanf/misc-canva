export interface IAzureStorageAdapter {
  upload (filename:string, data:ArrayBuffer): Promise<{
    url: string
    filename: string
  }>
  uploadToAzureFunction(filename: string, data:ArrayBuffer): Promise<{
    url: string
    filename: string
  }>
  delete (url:string): Promise<void>
}