import { Injectable } from '@angular/core';
import * as qrcode from 'qrcode';


@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

   generateQRBase64 = async (text:any) => {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(text);
      return qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    } catch (error) {
      console.error("Error al generar el código QR:", error);
      return "";
    }
  };

}
