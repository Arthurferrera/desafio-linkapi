export interface Deal {
  id: number,
  title: string,
  person_name: string,
  value: number,
  currency: string,
  update_time: string,
  status: String
}

export interface PipedriveApiReturn {
  data: Deal[]
}