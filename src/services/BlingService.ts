import axios from "axios";
const { toXML } = require('jstoxml');

import HttpError from '../utils/HttpError';
import { BlingRequest, BlingReturn } from '../interfaces/Bling';
import { Deal } from "../interfaces/PipedriveInterface";

class BlingService {
  // Creating the api with the Bling url
  private apiBling = axios.create({
    baseURL: process.env.BLING_URL
  });

  // Method that organizes the data that will be sent to Bling
  castOrder(deal: Deal){
    this.createRequest({
      clientName: deal.person_name,
      code: deal.id,
      description: deal.title,
      value: deal.value
    });
  }

  // Method that creates the order on the Bling platform  
  async createRequest(request: BlingRequest) {
    const xml = this.getBlingRequestBody(request);

    const { data, status } = await this.apiBling
      .post<BlingReturn>(
        "/", 
        null, 
        {
          params: {
            apikey: process.env.BLING_KEY,
            xml
          }
        }
      );
      
    // Checking if any errors are returned
    if (data.retorno.erros && data.retorno.erros.length) {
      throw new HttpError(400, data.retorno.erros[0].erro.msg);
    }

    // Checking the status returned by the request, 
    // to know if there was an error and to return 
    // feedback to the user
    if (status < 200 || status > 299) {
      throw new HttpError(500, "An error ocurred trying to create a order on Bling Api");
    }
  }

  // Method that transforms the object into XML to send to Bling
  getBlingRequestBody(request: BlingRequest) {
    return toXML({
      pedido: {
        cliente: {
          nome: request.clientName
        },
        itens: {
          item: {
            codigo: request.code,
            descricao: request.description,
            vlr_unit: request.value,
            qtde: "1"
          }
        }
      }
    });
  }
}

export default new BlingService();