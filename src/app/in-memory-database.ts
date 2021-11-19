import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Categoria } from './pages/categorias/shared/categoria.model';
import { Entrada } from './pages/entradas/shared/entrada.model';

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

        const entradas: Entrada[] = [
            { id: 1, nome: 'Gás de Cozinha', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: "14/10/2018", valor: "70,80", tipo: "despesa", descricao: "Qualquer descrição para essa despesa" } as Entrada,
            { id: 2, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "14/10/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 3, nome: 'Salário na Empresa X', categoriaId: categorias[3].id, categoria: categorias[3], pago: true, data: "15/10/2018", valor: "4405,49", tipo: "receita" } as Entrada,
            { id: 4, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "16/10/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 5, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", valor: "30,00", tipo: "despesa" } as Entrada,
            { id: 6, nome: 'Video Game da Filha', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "17/10/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 11, nome: 'Uber', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", valor: "30,00", tipo: "despesa" } as Entrada,
            { id: 12, nome: 'Aluguel', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "23/10/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 13, nome: 'Gás de Cozinha', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "25/10/2018", valor: "30,00", tipo: "despesa" } as Entrada,
            { id: 14, nome: 'Pagamento Pelo Projeto XYZ', categoriaId: categorias[4].id, categoria: categorias[4], pago: true, data: "25/10/2018", valor: "2980,00", tipo: "receita" } as Entrada,
            { id: 19, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "07/11/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 21, nome: 'Video Game da Filha', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/11/2018", valor: "30,00", tipo: "despesa" } as Entrada,
            { id: 22, nome: 'Cinema', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "18/11/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 23, nome: 'Jiu Jitsu', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "21/11/2018", valor: "130,00", tipo: "despesa" } as Entrada,
            { id: 44, nome: 'Uber', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "28/11/2018", valor: "15,00", tipo: "despesa" } as Entrada,
            { id: 55, nome: 'Cinema', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "28/11/2018", valor: "30,00", tipo: "despesa" }  as Entrada
        ]
        
        return { categorias, entradas }
    }
}