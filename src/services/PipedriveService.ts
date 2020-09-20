import axios from 'axios';

import { PipedriveApiReturn, Deal } from '../interfaces/PipedriveInterface'
import HttpError from '../utils/HttpError';

class PipedriveService {
  private api = axios.create({
    baseURL: process.env.PIPEDRIVE_URL
  });
  
  async getWonsPipeDrive() {
    const {data, status} =  await this.api.get<PipedriveApiReturn>('deals', {
      params: {
        status: 'won',
        api_token: process.env.PIPEDRIVE_KEY
      }
    });
  
    if (status <= 199 || status >= 300) {
      throw new HttpError(500, 'An error occurred while trying to get wons from the Pipedrive API');
    }
  
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