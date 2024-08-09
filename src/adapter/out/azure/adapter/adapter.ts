import axios, { AxiosRequestConfig } from "axios";
import { config } from "../../../../../config/config";
import { logger } from "../../../../util/logger/logger";
import { IAzureStorageAdapter } from "./base_adapter";
import { ApplicationError } from "../../../../util/error/application_error";
import { HTTPError } from "../../../../util/error/type/common_error";

export class AzureStorageAdapter implements IAzureStorageAdapter {
  async uploadToAzureFunction(filename: string, data: ArrayBuffer): Promise<{ url: string; filename: string; }> {
    logger.info(this.uploadToAzureFunction.name, AzureStorageAdapter.name)
    try {
      const sasUrl = config.azure.blobServiceSasUrl
      const containerName = config.azure.containerName
      const functionUrl = config.azure.functionUrl
      const fullUrl = `${functionUrl}?fileName=${filename}`
      const extension = filename.split('.').pop() ?? 'jpg';
      const contentType = this.getContentType(extension);
      const blob = new Blob([data], { type: contentType });
      const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: fullUrl,
        data: blob
      }

      const response = await axios(requestConfig);

      if(response.status === 200){
        return {
          url: `${sasUrl}/${containerName}/${filename}`,
          filename: filename
        }
      } else {
        throw new ApplicationError(HTTPError(`Error uploading file with status ${response.status}`).UNPROCESSABLE_ENTITY)
      }
    } catch (error: any) {
      throw new ApplicationError(HTTPError(error.message).INTERNAL_SERVER_ERROR)
    }
  
  }
  
  async upload(filename: string, data: ArrayBuffer): Promise<{
    url: string
    filename: string
  }> {
    logger.info(this.upload.name, AzureStorageAdapter.name)
    try {
      const sasUrl = config.azure.blobServiceSasUrl
      const containerName = config.azure.containerName
      const sasToken = config.azure.sasToken
      const fullUrl = `${sasUrl}/${containerName}/${filename}?${sasToken}`
      const extension = filename.split('.').pop() ?? 'jpg';
      const contentType = this.getContentType(extension);
      const blob = new Blob([data], { type: contentType });
      const requestConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: fullUrl,
        headers: {
          'x-ms-version': '2024-05-04',
          'x-ms-date': this.getGmtDate(),
          'Content-Type': contentType,
          'x-ms-blob-type': 'BlockBlob'
        },
        data: blob
      }
      const response = await axios(requestConfig);
      
      if(response.status === 201){
        return {
          url: `${sasUrl}/${containerName}/${filename}`,
          filename: filename
        }
      } else {
        throw new ApplicationError(HTTPError(`Error uploading file with status ${response.status}`).UNPROCESSABLE_ENTITY)
      }
    } catch (error: any) {
      throw new ApplicationError(HTTPError(error.message).INTERNAL_SERVER_ERROR)
    }
    
    
  }

  async delete(url: string): Promise<void> {
    logger.info(this.delete.name, AzureStorageAdapter.name)
    throw new Error("Method not implemented.");
  }

  getContentType(key: string) {
    const mimeTypes: { [key: string]: string } = {
      pdf: 'application/pdf',
      txt: 'text/plain',
      html: 'text/html',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      json: 'application/json',
      xml: 'application/xml',
      js: 'application/javascript',
      css: 'text/css',
      csv: 'text/csv',
      mp3: 'audio/mpeg',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      zip: 'application/zip',
      // Add more mappings as needed
    };

    return mimeTypes[key];
    
  }

  getGmtDate() {
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions  = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };

     return currentDate.toLocaleString('en-US', options);
  }
} 