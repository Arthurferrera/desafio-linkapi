import axios from 'axios';

import { PipedriveApiReturn, Deal } from '../interfaces/PipedriveInterface'
import HttpError from '../utils/HttpError';

class PipedriveService {
  // Creating the api with the Pipedrive url
  private api = axios.create({
    baseURL: process.env.PIPEDRIVE_URL
  });
  
  // Method that takes orders marked as 'won' on Pipedrive
  async getWonsPipeDrive() {
    const {data, status} =  await this.api.get<PipedriveApiReturn>('deals', {
      params: {
        status: 'won',
        api_token: process.env.PIPEDRIVE_KEY
      }
    });
  
    // Checking the status returned by the request, 
    // to know if there was an error and to return 
    // feedback to the user
    if (status <= 199 || status >= 300) {
      throw new HttpError(500, 'An error occurred while trying to get wons from the Pipedrive API');
    }
  
    // Checking if something returned from the pipedrive, 
    // if it hasn't returned anything, send an empty array to the controller
    if (!data.data) {
      return [];
    }

    // If there are deals, it returns the complete array
    return data.data.map(deal => ({
      id: deal.id,
      title: deal.title,
      person_name: deal.person_name,
      value: deal.value,
      currency: deal.currency,
      update_time: deal.update_time,
      status: deal.status
    })) as Deal[];
  }
}

export default new PipedriveService();