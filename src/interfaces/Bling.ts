export interface BlingRequest {
  clientName: string,
  code: number,
  description: string,
  value: number
}

export interface BlingReturn {
  retorno: {
    pedidos: [
      {
        pedido: {
          numero: string,
          idPedido: number
        }
      }
    ],
    erros: [
      {
        erro: {
          cod: 29 | 30 | 31 | 32 | 34,
          msg: string
        }
      }
    ]
  }
}