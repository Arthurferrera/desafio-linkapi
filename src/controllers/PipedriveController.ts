import { Request, Response } from 'express';
import pipedrive from '../services/pipedrive';

class PipedriveController {
  async index(req: Request, res: Response) {
    const response = await pipedrive.get('').then(responsePipedrive => {
      return responsePipedrive;
   });
   
   return res.json({teste: response.data});
  }
}

export default PipedriveController;