import axios from '../../src'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css';
import { create } from 'domain';

const instance = axios.create()

function calcLoadPercentage (loaded: number, total:number): number {
  return Math.floor(loaded * 1.0 / total)
}

function handleNProgress () {
  const setUpProgressStart = () => {
    instance.interceptors.request.use((config) => {
      NProgress.start()
      return config
    })
  }

  const setUpProgressRunning = () => {
    const running = (event: ProgressEvent) => {
      console.log(event)
      console.log(calcLoadPercentage(event.loaded, event.total))
      NProgress.set(calcLoadPercentage(event.loaded, event.total))
    }

    instance.defaults.onDownloadProgress = running
    instance.defaults.onUploadProgress = running
  }

  const setUpProgressStop = () => {
    instance.interceptors.response.use((result) => {
      NProgress.done()
      return result
    }, error => {
      NProgress.done()
      return Promise.reject(error.message)
    })
  }

  setUpProgressStart()
  setUpProgressRunning()
  setUpProgressStop()

}

handleNProgress()

const downloadBtn= document.getElementById('download')
const fileBtn= document.getElementById('file') as HTMLInputElement
const uploadBtn= document.getElementById('upload')

downloadBtn.addEventListener('click', () => instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg'))

uploadBtn.addEventListener('click', () => {
  const data = new FormData()
  if (fileBtn.files) {
    data.append('file', fileBtn.files[0])
    instance.post('/load/upload', data)
  }
})
