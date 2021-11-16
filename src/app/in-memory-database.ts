import { InMemoryDbService } from 'angular-in-memory-web-api'

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {

        const categorias = [
            {
                id: 1,
                name: "Moradia",
                descricao: "Pagamentos de contas de casa"
            },
            {
                id: 2,
                name: "Saúde",
                descricao: "Plano de saúde e remédios"
            },
            {
                id: 3,
                name: "Laser",
                descricao: "Cinema, parques, praia etc"
            },
            {
                id: 4,
                name: "Salário",
                descricao: "Recebimento de salário"
            },
            {
                id: 5,
                name: "Freelas",
                descricao: "Trabalhos como freelancer"
            }
        ];

        return { categorias }
    }
}