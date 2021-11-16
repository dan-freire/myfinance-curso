import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Categoria } from './pages/categorias/shared/categoria.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {

        const categorias: Categoria[] = [
            {
                id: 1,
                nome: "Moradia",
                descricao: "Pagamentos de contas de casa"
            },
            {
                id: 2,
                nome: "Saúde",
                descricao: "Plano de saúde e remédios"
            },
            {
                id: 3,
                nome: "Laser",
                descricao: "Cinema, parques, praia etc"
            },
            {
                id: 4,
                nome: "Salário",
                descricao: "Recebimento de salário"
            },
            {
                id: 5,
                nome: "Freelas",
                descricao: "Trabalhos como freelancer"
            }
        ];

        return { categorias }
    }
}