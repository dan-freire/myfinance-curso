import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Categoria } from '../../categorias/shared/categoria.model';

export class Entrada extends BaseResourceModel {
    
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria
    ) {
        super();
    }

    public static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    }

    get pagoTexto(): string {
        return this.pago ? 'Pago' : 'Pendente';
    }
}