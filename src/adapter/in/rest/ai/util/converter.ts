import { Stats } from "../../../../../domain/stats"
import { RestResponse } from "../entity/response"

export const dataToRestResponse = (data: any, stats?: Stats): RestResponse => {
  if (stats !== undefined) {
    return {
      success: true,
      message: 'Success',
      data,
      stats: stats,
    }
  } else {
    return {
      success: true,
      message: 'Success',
      data
    }
  }
}

export const errorToRestResponse = (error: any): RestResponse => {
  return {
    success: false,
    message: error.toString()
  }
}
