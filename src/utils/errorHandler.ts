import { toast } from "react-toastify"

interface IObj {
  code: number
  message: string
}

export const Errorhandler = (err: any, obj?: IObj | IObj[], show = true) => {
  window.process = { ...window.process }
  if (process) {
    const NODE_ENV = process.env.NODE_ENV
    if (NODE_ENV === "development") {
      console.error(err)
    }
  }
  // eslint-disable-next-line prefer-const
  let { response, body, status } = err
  if (body && !response) {
    response = {
      data: body,
      status: body.status || status,
    }
  }
  let msg
  let statusCode: number
  const constMessage = "Sorry, an error has occurred, Please try again or if issue persist, contact support."
  const msgObj: { [key: string]: string } = {
    "404": "The resource you're looking for cannot be found.",
    "400": "An unexpected error has occurred. Please try again.",
    "600": "An error has occurred. Please check your internet connection and retry.",
    "500": "Oops! Something went wrong. Our team is working to resolve it as quickly as possible.",
    "401": "",
    "403": "Apologies, but you do not have permission to access the requested document or program.",
    "408": "Your request is taking longer than expected. Please try again.",
    "502":
      "We are currently facing an issue with this service. Rest assured, we are aware of it and are working on a fix.",
    "503":
      "We are experiencing a temporary issue with this service. We are aware and are working to restore functionality soon. For immediate assistance, please reach out to our support team.",
    "504": "Your request is taking too long to complete. Please try again.",
  }

  if (response && response instanceof Object) {
    statusCode = response?.status
    const { data } = response
    msg = data || data.message || data.error || constMessage
  } else if (err?.name === "ApiError") {
    statusCode = err?.status
    msg = err?.body?.message || err?.body?.error || constMessage
  } else {
    statusCode = 600
  }
  if (statusCode === 409) {
    msgObj[`${statusCode}`] = msg
  }
  if (!msgObj[`${statusCode}`]) {
    msgObj[`${statusCode}`] = constMessage
  }
  if (obj instanceof Object) {
    const objAsIObj = obj as IObj
    msgObj[`${objAsIObj.code}`] = objAsIObj.message
  }
  if (obj instanceof Array) {
    obj.forEach((x) => {
      msgObj[`${x.code}`] = x.message
    })
  }

  if (show && statusCode !== 401) {
    const showMsg = msg ? msg : msgObj[statusCode]
    toast.error(showMsg, {
      position: "top-right",
    })
  }
  return { success: false, statusCode, message: msg }
}
